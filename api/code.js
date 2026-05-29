const {
  default: makeWASocket,
  useMultiFileAuthState,
  delay,
  makeCacheableSignalKeyStore,
  Browsers,
  jidNormalizedUser
} = require('baileys');
const pino    = require('pino');
const { MongoClient } = require('mongodb');
const os      = require('os');
const path    = require('path');
const fs      = require('fs-extra');

// ── MongoDB ──────────────────────────────────────────────────
let _client, _db, _sessCol, _numCol;

async function getDB() {
  if (_db) return _db;
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI not set');
  _client  = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
  await _client.connect();
  _db      = _client.db(process.env.MONGO_DB || 'Free_Mini');
  _sessCol = _db.collection('sessions');
  _numCol  = _db.collection('numbers');
  await _sessCol.createIndex({ number: 1 }, { unique: true }).catch(() => {});
  await _numCol.createIndex({ number: 1 }, { unique: true }).catch(() => {});
  return _db;
}

async function saveCreds(number, creds) {
  await getDB();
  await _sessCol.updateOne({ number }, { $set: { number, creds, updatedAt: new Date() } }, { upsert: true });
}

async function loadCreds(number) {
  await getDB();
  return _sessCol.findOne({ number });
}

async function addNumber(number) {
  await getDB();
  await _numCol.updateOne({ number }, { $set: { number } }, { upsert: true });
}

// ── Handler ──────────────────────────────────────────────────
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const number = (req.query.number || '').replace(/[^0-9]/g, '');
  if (!number || number.length < 7) return res.status(400).json({ error: 'Invalid number' });

  const sessionPath = path.join(os.tmpdir(), `sess_${number}`);

  try {
    await fs.ensureDir(sessionPath);

    // Prefill from Mongo if exists
    try {
      const doc = await loadCreds(number);
      if (doc?.creds) {
        await fs.writeFile(path.join(sessionPath, 'creds.json'), JSON.stringify(doc.creds, null, 2));
      }
    } catch (_) {}

    const logger = pino({ level: 'silent' });
    const { state, saveCreds: saveLocal } = await useMultiFileAuthState(sessionPath);

    const sock = makeWASocket({
      auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, logger) },
      printQRInTerminal: false,
      logger,
      browser: Browsers.macOS('Safari')
    });

    sock.ev.on('creds.update', async () => {
      await saveLocal();
      try {
        const raw = await fs.readFile(path.join(sessionPath, 'creds.json'), 'utf8');
        await saveCreds(number, JSON.parse(raw));
      } catch (_) {}
    });

    sock.ev.on('connection.update', ({ connection }) => {
      if (connection === 'open') addNumber(number).catch(() => {});
    });

    // Get pairing code
    if (!sock.authState.creds.registered) {
      let code, retries = 3;
      while (retries-- > 0) {
        try { await delay(1500); code = await sock.requestPairingCode(number); break; }
        catch (e) { if (retries === 0) throw e; await delay(2000); }
      }
      setTimeout(() => { try { sock.ws?.close(); } catch(_){} try { fs.removeSync(sessionPath); } catch(_){} }, 60000);
      return res.status(200).json({ code });
    } else {
      try { sock.ws?.close(); } catch(_) {}
      return res.status(200).json({ code: 'ALREADY_PAIRED' });
    }

  } catch (err) {
    console.error('Pair error:', err.message);
    try { fs.removeSync(sessionPath); } catch(_) {}
    return res.status(503).json({ error: 'Service Unavailable', detail: err.message });
  }
};
