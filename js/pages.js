/* ===== HALAMAN ===== */
const pages = {
  home:()=>`${char("m","l")}${char("f","r")}
    <div class="hero">Kenali Peralatan dan <span>Teknologi Pengembangan</span></div>
    <div class="sub">Lab Maya RPL<small>SMK TEXAR Klari Karawang</small></div>
    <div class="bubble" style="left:19%;top:60%;width:36%;font-size:1.25em">${DATA.say.home}</div>
    <div class="nav"><button class="btn" data-go="guide">▶ Mulai Eksplorasi</button></div>`,
  guide:()=>`${char("m","l")}${char("f","r")}
    <div class="clip"><h2>📖 Panduan Simulasi</h2>
      <div class="goal"><b>🎯 Tujuan Pembelajaran</b><br>Peserta didik mampu mengidentifikasi dan menggunakan peralatan serta teknologi (perangkat keras & lunak) yang biasa digunakan dalam pengembangan perangkat lunak dan gim.</div>
      <div class="steps">
        <div class="step"><i>1</i><h3>Pilih Objek</h3><p>Klik atau pilih objek di laboratorium (misal: komputer, headset, software).</p></div>
        <div class="step"><i>2</i><h3>Baca Informasi</h3><p>Perhatikan nama, fungsi, dan cara penggunaannya.</p></div>
        <div class="step"><i>3</i><h3>Klasifikasikan</h3><p>Tempatkan objek ke kategori yang tepat: perangkat keras atau lunak.</p></div>
      </div>
      <button class="btn green ok" data-go="menu" data-sfx="good">✔ MENGERTI</button></div>`,
  menu:()=>{
    const n = Store.count(), t = DATA.activities.length, p = Math.round(n/t*100);
    return `${char("m","l")}${char("f","r")}
    <div class="menu"><h2>Peta Aktivitas</h2>
      <div class="bar" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100"><div style="width:${p}%"></div></div>
      <div style="font-weight:800">Progres belajar: ${n} dari ${t} aktivitas selesai (${p}%)</div>
      <div class="grid">${DATA.activities.map(a=>`<button class="tile" data-go="${a.id}"><span class="st">${Store.isDone(a.id)?"✅":""}</span><span class="ic">${a.icon}</span>${a.name}<small>${a.desc}</small></button>`).join("")}</div>
      ${n===t?'<div class="badge">🏅 Lencana: Penjelajah Lab Maya RPL!</div>':""}
      <div class="bubble" style="position:relative;display:inline-block;margin-top:1em;font-size:1.1em">${DATA.say.menu}</div>
    </div>`;},
  stub:id=>{const a = DATA.activities.find(x=>x.id===id);
    return `${char("m","l")}${char("f","r")}
    <div class="stub"><div style="font-size:2.5em">${a.icon}</div><h2>${a.name}</h2>
    <p>Halaman ini dibangun pada ${a.stage}. Navigasi dan penyimpanan progres sudah bisa diuji di sini.</p>
    <button class="btn sm green" data-done="${id}">Tandai selesai (uji coba)</button></div>`;}
};
