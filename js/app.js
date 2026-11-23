/* ===== ROUTER (hash ASCII sederhana) ===== */
const $ = s => document.querySelector(s);
function toast(m){ const t=$("#toast"); t.textContent=m; t.classList.add("on"); setTimeout(()=>t.classList.remove("on"),1600); }
function render(){
  const id = (location.hash||"#home").slice(1);
  const html = pages[id] ? pages[id]() : (DATA.activities.some(a=>a.id===id) ? pages.stub(id) : pages.home());
  $("#pages").innerHTML = `<section class="page on">${html}</section>`;
  if (AFTER[id]) AFTER[id]();
  Narrate(id);
  if (id !== "home") $(".page").insertAdjacentHTML("beforeend", `<button class="btn blue sm home" data-go="menu">🏠 Beranda</button>`);
}
function go(id){ if (location.hash === "#"+id) render(); else location.hash = id; }
window.addEventListener("hashchange", render);

document.addEventListener("click", e => {
  const d = e.target.closest("[data-done]"); 
  if (d){ Store.mark(d.dataset.done); Sound.play("good"); toast("Aktivitas ditandai selesai ✅"); return; }
  const b = e.target.closest("[data-go]");
  if (b){ Sound.startBgm(); Sound.play(b.dataset.sfx || "click"); go(b.dataset.go); }
});
document.addEventListener("mouseover", e => { if (e.target.closest(".btn,.tile")) Sound.play("hover"); });

/* ===== KONTROL SUARA ===== */
function sndUI(){const S=Sound.S,b=(id,ic,t,on)=>`<button id="${id}" title="${t}" aria-label="${t}" class="${on?"":"off"}">${ic}</button>`;
  $("#snd").innerHTML=b("bM",S.master?"🔊":"🔇","Suara aktif/nonaktif",S.master)+b("bB","🎵","Musik latar dan ambience",S.music)+b("bV","🗣️","Voice-over",S.voice)+b("bR","🔁","Ulangi narasi",true)
    +`<input id="sv" type="range" min="0" max="1" step=".1" value="${S.vol}" aria-label="Volume">`;
  $("#bM").onclick=()=>{Sound.set("master",!S.master);Sound.start();sndUI()};
  $("#bB").onclick=()=>{Sound.set("music",!S.music);Sound.start();sndUI()};
  $("#bV").onclick=()=>{Sound.set("voice",!S.voice);sndUI()};
  $("#bR").onclick=()=>{Sound.start();Narrate((location.hash||"#home").slice(1))};
  $("#sv").oninput=e=>Sound.set("vol",+e.target.value);
}

/* ===== MULAI ===== */
$("#logo").innerHTML = (DATA.logoSrc ? `<img src="${DATA.logoSrc}" alt="Logo SMK TEXAR" style="width:4.6em">` : logo) + `<div><b>SMK TEXAR</b><b style="font-size:1.4em">Klari Karawang</b><small>Kreatif, Inovatif, Kompeten</small></div>`;
if(!location.hash)history.replaceState(null,"","#splash");sndUI();render();
