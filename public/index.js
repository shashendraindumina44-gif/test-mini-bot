<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>FREE WA BOT — Pair Device</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <style>
    :root {
      --g1:#25d366; --g2:#128c7e; --cyan:#00ffe7;
      --dark:#060d10; --card:rgba(6,20,28,0.88);
      --border:rgba(0,255,231,0.13); --text:#d6f5ef;
      --muted:rgba(214,245,239,0.45); --err:#ff5e7a;
    }
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Syne',sans-serif;background:var(--dark);color:var(--text);
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      padding:24px 16px;overflow-x:hidden}
    body::before{content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
      background-image:linear-gradient(rgba(0,255,231,0.035) 1px,transparent 1px),
        linear-gradient(90deg,rgba(0,255,231,0.035) 1px,transparent 1px);
      background-size:40px 40px}
    .orb{position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(90px);opacity:.16}
    .o1{width:500px;height:500px;background:#25d366;top:-120px;left:-150px;animation:d1 14s ease-in-out infinite alternate}
    .o2{width:360px;height:360px;background:#00ffe7;bottom:-80px;right:-80px;animation:d2 18s ease-in-out infinite alternate}
    .o3{width:220px;height:220px;background:#128c7e;top:45%;left:55%;animation:d1 22s ease-in-out infinite alternate-reverse}
    @keyframes d1{from{transform:translate(0,0)}to{transform:translate(40px,30px)}}
    @keyframes d2{from{transform:translate(0,0)}to{transform:translate(-30px,-40px)}}

    .card{position:relative;z-index:2;width:100%;max-width:400px;
      background:var(--card);border:1px solid var(--border);border-radius:24px;
      padding:34px 26px 26px;backdrop-filter:blur(20px);
      box-shadow:0 0 60px rgba(37,211,102,0.07),0 0 0 1px rgba(0,255,231,0.06)}

    .header{text-align:center;margin-bottom:26px}
    .ring{width:76px;height:76px;border-radius:50%;border:2px solid rgba(37,211,102,0.35);
      display:flex;align-items:center;justify-content:center;margin:0 auto 14px;
      position:relative;box-shadow:0 0 28px rgba(37,211,102,0.18),inset 0 0 18px rgba(37,211,102,0.05);
      overflow:hidden}
    .ring img{width:100%;height:100%;object-fit:cover;border-radius:50%}
    .ring::after{content:'';position:absolute;inset:-2px;border-radius:50%;
      border:2px solid transparent;border-top-color:var(--g1);border-right-color:var(--cyan);
      animation:spin 3s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}

    .badge{display:inline-flex;align-items:center;gap:6px;
      background:rgba(37,211,102,0.09);border:1px solid rgba(37,211,102,0.22);
      border-radius:100px;padding:4px 12px;font-size:.68rem;color:var(--g1);
      letter-spacing:.08em;text-transform:uppercase;font-family:'Space Mono',monospace;margin-bottom:9px}
    .dot{width:6px;height:6px;border-radius:50%;background:var(--g1);
      box-shadow:0 0 6px var(--g1);animation:pulse 1.5s infinite}
    @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}

    h1{font-size:1.4rem;font-weight:800;color:#fff;letter-spacing:-.02em;line-height:1.2}
    h1 span{color:var(--g1)}
    .sub{font-size:.75rem;color:var(--muted);margin-top:4px;font-family:'Space Mono',monospace}

    .divider{height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);margin:20px 0}

    label{display:block;font-size:.72rem;font-weight:600;color:var(--muted);
      letter-spacing:.08em;text-transform:uppercase;margin-bottom:7px;font-family:'Space Mono',monospace}

    .row{display:flex;gap:8px;margin-bottom:12px}
    input[type=number]{flex:1;background:rgba(255,255,255,0.04);border:1px solid var(--border);
      border-radius:12px;padding:12px 14px;font-size:.92rem;color:#fff;
      font-family:'Space Mono',monospace;outline:none;
      transition:border-color .2s,box-shadow .2s;-moz-appearance:textfield}
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none}
    input:focus{border-color:rgba(37,211,102,.5);box-shadow:0 0 0 3px rgba(37,211,102,.08)}
    input::placeholder{color:rgba(255,255,255,.2)}

    .btn-main{background:linear-gradient(135deg,var(--g1),var(--g2));border:none;
      border-radius:12px;padding:12px 18px;color:#fff;font-weight:700;
      font-family:'Syne',sans-serif;font-size:.88rem;cursor:pointer;white-space:nowrap;
      transition:opacity .2s,transform .15s;box-shadow:0 4px 20px rgba(37,211,102,.22)}
    .btn-main:hover:not(:disabled){opacity:.86;transform:translateY(-1px)}
    .btn-main:disabled{opacity:.38;cursor:not-allowed;transform:none}

    #sa{min-height:54px;display:flex;align-items:center;justify-content:center;margin:4px 0}
    .spinner{display:inline-flex;align-items:center;gap:9px;color:var(--muted);
      font-size:.82rem;font-family:'Space Mono',monospace}
    .spinner i{color:var(--g1);animation:spin 1s linear infinite}

    .code-box{background:rgba(37,211,102,0.07);border:1px solid rgba(37,211,102,0.25);
      border-radius:14px;padding:16px 20px;text-align:center;cursor:pointer;
      transition:background .2s,transform .15s;position:relative;overflow:hidden}
    .code-box:hover{background:rgba(37,211,102,.13);transform:scale(1.01)}
    .clabel{font-size:.62rem;color:var(--g1);letter-spacing:.15em;text-transform:uppercase;
      font-family:'Space Mono',monospace;margin-bottom:5px}
    .cval{font-size:1.95rem;font-family:'Space Mono',monospace;font-weight:700;color:#fff;
      letter-spacing:.15em;text-shadow:0 0 20px rgba(37,211,102,.4)}
    .chint{font-size:.68rem;color:var(--muted);margin-top:5px;font-family:'Space Mono',monospace}

    .err{color:var(--err);font-size:.8rem;text-align:center;font-family:'Space Mono',monospace;
      display:flex;align-items:center;gap:6px;justify-content:center}

    .steps{background:rgba(0,255,231,.025);border:1px solid var(--border);
      border-radius:14px;padding:15px 17px;margin-top:16px}
    .stitle{font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:var(--cyan);
      margin-bottom:11px;font-family:'Space Mono',monospace}
    .step{display:flex;gap:11px;align-items:flex-start;margin-bottom:9px}
    .step:last-child{margin-bottom:0}
    .snum{width:21px;height:21px;border-radius:50%;flex-shrink:0;
      background:rgba(37,211,102,.14);border:1px solid rgba(37,211,102,.28);
      display:flex;align-items:center;justify-content:center;
      font-size:.62rem;font-weight:700;color:var(--g1);font-family:'Space Mono',monospace}
    .stxt{font-size:.78rem;color:var(--muted);line-height:1.5}
    .stxt strong{color:#fff}

    .acts{display:flex;gap:8px;margin-top:16px}
    .btn-sec{flex:1;background:rgba(255,255,255,.04);border:1px solid var(--border);
      border-radius:10px;padding:9px 10px;color:var(--muted);font-family:'Syne',sans-serif;
      font-size:.78rem;font-weight:600;cursor:pointer;
      display:flex;align-items:center;justify-content:center;gap:6px;
      transition:background .2s,color .2s,transform .15s}
    .btn-sec:hover{background:rgba(255,255,255,.09);color:#fff;transform:translateY(-1px)}
    .btn-ch{border-color:rgba(37,211,102,.25);color:var(--g1)}
    .btn-ch:hover{background:rgba(37,211,102,.09);color:var(--g1)}

    .foot{text-align:center;margin-top:18px;font-size:.65rem;color:var(--muted);
      font-family:'Space Mono',monospace;opacity:.55}

    .toast{position:fixed;bottom:22px;left:50%;
      transform:translateX(-50%) translateY(80px);
      background:rgba(37,211,102,.14);border:1px solid rgba(37,211,102,.28);
      backdrop-filter:blur(10px);border-radius:100px;padding:9px 22px;
      color:var(--g1);font-family:'Space Mono',monospace;font-size:.78rem;
      z-index:100;transition:transform .3s cubic-bezier(.34,1.56,.64,1);
      pointer-events:none;white-space:nowrap}
    .toast.show{transform:translateX(-50%) translateY(0)}

    @media(max-width:440px){
      .card{padding:26px 16px 20px}
      .row{flex-direction:column}
      .cval{font-size:1.5rem}
    }
  </style>
</head>
<body>
  <div class="orb o1"></div>
  <div class="orb o2"></div>
  <div class="orb o3"></div>
  <div class="toast" id="toast"></div>

  <div class="card">
    <div class="header">
      <div class="ring">
        <img src="https://files.catbox.moe/sb24ud.jpg" alt="bot"
             onerror="this.style.display='none';this.parentElement.innerHTML='<i class=\'fab fa-whatsapp\' style=\'font-size:2rem;color:#25d366\'></i>'">
      </div>
      <div class="badge"><span class="dot"></span>Live Pairing</div>
      <h1>FREE <span>WA</span> BOT</h1>
      <p class="sub">ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍᴀʟᴠɪɴ ᴛᴇᴄʜ</p>
    </div>

    <div class="divider"></div>

    <label><i class="fas fa-phone-alt" style="margin-right:6px;color:var(--g1)"></i>WhatsApp Number</label>
    <div class="row">
      <input type="number" id="num" placeholder="e.g. 263714757857">
      <button class="btn-main" id="sub"><i class="fab fa-whatsapp"></i> Pair</button>
    </div>

    <div id="sa"></div>

    <div class="steps">
      <div class="stitle"><i class="fas fa-list-ol" style="margin-right:6px"></i>How to pair</div>
      <div class="step"><div class="snum">1</div><div class="stxt">Enter number with country code — no spaces or +</div></div>
      <div class="step"><div class="snum">2</div><div class="stxt">Tap <strong>Pair</strong>, wait for 8-digit code</div></div>
      <div class="step"><div class="snum">3</div><div class="stxt">WhatsApp → <strong>Linked Devices → Link a Device → Link with phone number</strong></div></div>
      <div class="step"><div class="snum">4</div><div class="stxt">Enter code → Bot connects in seconds ✅</div></div>
    </div>

    <div class="acts">
      <button class="btn-sec btn-ch" onclick="window.open('https://whatsapp.com/channel/0029VbB3YxTDJ6H15SKoBv3S','_blank')">
        <i class="fab fa-whatsapp"></i> Channel
      </button>
      <button class="btn-sec" id="clr"><i class="fas fa-rotate-left"></i> Clear</button>
    </div>

    <div class="foot">Not affiliated with WhatsApp Inc. · Use at your own risk.</div>
  </div>

  <script>
    const inp = document.getElementById('num');
    const btn = document.getElementById('sub');
    const sa  = document.getElementById('sa');
    const toast = document.getElementById('toast');

    function showToast(m){ toast.textContent='✓ '+m; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2800); }
    function setStatus(h){ sa.innerHTML=h; }
    function spin(m){ setStatus(`<div class="spinner"><i class="fas fa-spinner"></i>${m}</div>`); }
    function errMsg(m){ setStatus(`<div class="err"><i class="fas fa-exclamation-circle"></i>${m}</div>`); }

    function showCode(code){
      const fmt = code.length===8 ? code.slice(0,4)+'-'+code.slice(4) : code;
      setStatus(`
        <div class="code-box" onclick="copyCode('${code}')">
          <div class="clabel"><i class="fas fa-key"></i> Pairing Code</div>
          <div class="cval">${fmt}</div>
          <div class="chint"><i class="fas fa-copy"></i> Tap to copy</div>
        </div>`);
    }

    async function copyCode(raw){
      try{ await navigator.clipboard.writeText(raw); showToast('Code copied!'); }
      catch{ showToast('Select and copy manually'); }
    }

    btn.addEventListener('click', async()=>{
      const num = inp.value.replace(/[^0-9]/g,'');
      if(!num) return errMsg('Enter your WhatsApp number');
      if(num.length < 7) return errMsg('Too short — include country code');

      btn.disabled=true;
      spin('Connecting to WhatsApp…');

      try{
        const r = await fetch(`/code?number=${num}`);
        const d = await r.json();
        if(!r.ok)          errMsg(d.error || 'Service unavailable');
        else if(d.code==='ALREADY_PAIRED') errMsg('Already paired!');
        else if(d.code)    showCode(d.code);
        else               errMsg('Unexpected error. Retry.');
      }catch{
        errMsg('Network error. Check connection and retry.');
      }finally{
        btn.disabled=false;
      }
    });

    inp.addEventListener('keydown', e=>{ if(e.key==='Enter') btn.click(); });
    document.getElementById('clr').addEventListener('click',()=>{ inp.value=''; setStatus(''); btn.disabled=false; });
  </script>
</body>
</html>
