/* ===== MOCKUP3: halaman berbasis gambar mockup 1440x900 (koordinat piksel mockup) ===== */
const PW=1440,PH=900;
DATA.audioFiles.bgm="assets/audio/bgm.mp3";
DATA.bg={splash:"assets/bg/splash.jpg",home:"assets/bg/home.jpg",guide:"assets/bg/guide.jpg",menu:"assets/bg/menu.jpg",hardware:"assets/bg/hardware.jpg",software:"assets/bg/software.jpg",classify:"assets/bg/classify.jpg",simulate:"assets/bg/simulate.jpg",assemble:"assets/bg/assemble.jpg",quiz:"assets/bg/quiz.jpg",result:"assets/bg/result.jpg",summary:"assets/bg/summary.jpg"};
DATA.bsnd={};
const bx=b=>`left:${b[0]/PW*100}%;top:${b[1]/PH*100}%;width:${b[2]/PW*100}%;height:${b[3]/PH*100}%`;
const fs=n=>`font-size:calc(var(--u)*${(n/PW*100).toFixed(3)})`;
const hs=(b,attr,cls,label)=>`<button class="hs ${cls||""}" style="${bx(b)}" aria-label="${label||""}" ${attr||""}></button>`;
const bgImg=id=>`<img class="bg" src="${DATA.bg[id]}" alt="" draggable="false">`;
const pt=(b,html,st,cls,at)=>`<div class="pt ${cls||""}" ${at||""} style="${bx(b)};${st||""}">${!html||/^\s*<div/.test(html)?html:`<div>${html}</div>`}</div>`;
const SC=1440/1586,Q=a=>Array.isArray(a)?a.map(Q):a*SC,fq=n=>fs(n*SC);
const mkPage=(id,inner)=>bgImg(id)+inner;
const BER=(to,b)=>hs(b,`data-go="${to}"`,"","Beranda");
/* ---- panel suara ---- */
const PB={home:[1010,832,380,52],guide:[1010,845,380,48],menu:[1075,772,350,62],hardware:[900,862,500,34],software:[900,862,500,34],classify:[1098,748,325,62],simulate:[1082,776,338,60],assemble:[560,859,330,36],quiz:[1090,773,330,60],result:[1020,845,380,48],summary:[1092,765,330,62]};
function sndPanel(id){const b=PB[id];if(!b)return"";const t=(k,ic,ti)=>`<button data-snd="${k}" title="${ti}" aria-label="${ti}">${ic}</button>`;
 return `<div class="sndp" style="${bx(b)};font-size:calc(var(--u)*${(b[3]*.30/PW*100).toFixed(2)})">${t("master","🔊","Suara aktif/nonaktif")}${t("vdn","➖","Volume turun")}<span class="vl">80%</span>${t("vup","➕","Volume naik")}${t("music","🎵","Musik latar aktif/nonaktif")}${t("voice","🗣️","Voice-over aktif/nonaktif")}${t("replay","🔁","Ulangi narasi")}${t("fs","⛶","Layar penuh")}</div>`}
function sndSync(){const S=Sound.S;document.querySelectorAll("[data-snd]").forEach(n=>{const k=n.dataset.snd;n.classList.toggle("off",(k==="master"&&!S.master)||(k==="music"&&!S.music)||(k==="voice"&&!S.voice))});document.querySelectorAll(".vl").forEach(n=>n.textContent=Math.round(S.vol*100)+"%")}
document.addEventListener("click",e=>{const n=e.target.closest("[data-snd]");if(!n)return;const S=Sound.S,k=n.dataset.snd;Sound.start();
 if(k==="vdn"||k==="vup")Sound.set("vol",Math.max(0,Math.min(1,Math.round((S.vol+(k==="vup"?.1:-.1))*10)/10)));
 else if(k==="replay")Narrate(location.hash.slice(1));else if(k==="fs")toggleFS();else Sound.set(k,!S[k]);sndSync()});
/* ---- karakter: gambar terpisah (potongan mockup), latar di belakangnya sudah dibersihkan ---- */
DATA.chars={"home": [["assets/chars/home-0.webp", [118, 313, 372, 504]], ["assets/chars/home-1.webp", [1008, 363, 318, 472]]], "guide": [["assets/chars/guide-0.webp", [30, 325, 375, 530]], ["assets/chars/guide-1.webp", [1115, 375, 300, 475]]], "menu": [["assets/chars/menu-0.webp", [35, 305, 250, 550]], ["assets/chars/menu-1.webp", [1195, 330, 190, 520]]], "hardware": [["assets/chars/hardware-0.webp", [0, 336, 291, 518]]], "software": [["assets/chars/software-0.webp", [0, 350, 290, 505]]], "classify": [["assets/chars/classify-0.webp", [0, 425, 215, 430]], ["assets/chars/classify-1.webp", [1195, 405, 240, 450]]], "simulate": [["assets/chars/simulate-0.webp", [45, 436, 263, 413]], ["assets/chars/simulate-1.webp", [1203, 477, 236, 381]]], "assemble": [["assets/chars/assemble-0.webp", [5, 627, 281, 236]], ["assets/chars/assemble-1.webp", [1262, 604, 178, 254]]], "quiz": [["assets/chars/quiz-0.webp", [15, 335, 265, 520]], ["assets/chars/quiz-1.webp", [1180, 345, 260, 505]]], "summary": [["assets/chars/summary-0.webp", [5, 445, 270, 410]], ["assets/chars/summary-1.webp", [1240, 230, 200, 625]]], "result": [["assets/chars/result-0.webp", [0, 316, 389, 574]], ["assets/chars/result-1.webp", [1058, 459, 354, 431]]]};
function charLayer(id){return (DATA.chars[id]||[]).map(([src,r],i)=>`<img class="chr c${i}" src="${src}" alt="" draggable="false" style="${bx(r)}">`).join("")}
function decorate(id){const pg=document.querySelector(".page"),bg=pg&&pg.querySelector(".bg");if(!bg)return;bg.insertAdjacentHTML("afterend",charLayer(id));pg.insertAdjacentHTML("beforeend",sndPanel(id));sndSync()}
function fitTxt(){document.querySelectorAll(".mtxt").forEach(el=>{if(el.dataset.f0===undefined)el.dataset.f0=el.style.fontSize;el.style.fontSize=el.dataset.f0;let f=parseFloat(getComputedStyle(el).fontSize),n=0;while(el.scrollHeight>el.clientHeight+1&&f>8&&n++<60){f-=.4;el.style.fontSize=f+"px"}})}
/* ---- layar penuh (desktop & HP) ---- */
const isFS=()=>document.fullscreenElement||document.webkitFullscreenElement;
function goFS(){const d=document.documentElement,f=d.requestFullscreen||d.webkitRequestFullscreen;if(!f)return false;
 try{const r=f.call(d,{navigationUI:"hide"});r&&r.catch&&r.catch(()=>{})}catch(e){}
 try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch(e){}return true}
function toggleFS(){if(isFS()){const x=document.exitFullscreen||document.webkitExitFullscreen;x&&x.call(document)}else if(!goFS())toast("Di iPhone: ketuk Bagikan lalu Tambah ke Layar Utama untuk layar penuh")}
document.addEventListener("click",e=>{if(e.target.closest("[data-fs]"))toggleFS()});
document.addEventListener("click",()=>{if(matchMedia("(pointer:coarse)").matches&&!isFS())goFS()},{once:true});
/* ---- suara sambutan: gerbang ketuk pertama ---- */
function gateInit(){if(Sound.canAuto()){Sound.start();Narrate("home");return}
 const g=document.createElement("div");g.id="gate";g.innerHTML='<div><div class="gi">🔊</div>Ketuk atau klik layar untuk memulai<small>Musik dan suara sambutan akan diputar</small></div>';$("#stage").appendChild(g);
 const open=()=>{if(!g.isConnected)return;g.remove();Sound.start();Narrate("home")};g.addEventListener("click",open);document.addEventListener("keydown",open,{once:true})}
/* ---- 0. SPLASH ---- */
pages.splash=()=>bgImg("splash")+pt([566,632,394,40],`<div id="spb" style="position:absolute;left:3px;top:3px;bottom:3px;width:0;border-radius:2em;background:linear-gradient(90deg,#16d6ff,#8ff4ff)"></div><span id="spp" style="position:absolute;right:.9em;top:50%;transform:translateY(-50%);color:#fff;font-weight:800;${fs(17)}">0%</span>`,"background:#06235c;border:.2em solid #5fe1ff;border-radius:2em")+hs([0,0,PW,PH],'data-go="home" data-sfx="pop"',"","Lewati");
AFTER.splash=()=>{const t0=performance.now(),D=3300;const tick=t=>{const b=$("#spb"),p=$("#spp");if(!b||location.hash!=="#splash")return;const v=Math.min(1,(t-t0)/D);b.style.width=`calc(${(v*100).toFixed(1)}% - 6px)`;p.textContent=Math.round(v*100)+"%";if(v<1)requestAnimationFrame(tick);else go("home")};requestAnimationFrame(tick)};
/* ---- 1-2. AWAL & PANDUAN ---- */
pages.home=()=>bgImg("home")+hs(Q([545,762,495,112]),'data-go="guide"',"cta","Mulai Eksplorasi")+hs(Q([1348,826,228,88]),'data-fs="1"',"cta","Layar Penuh");
AFTER.home=()=>{sndSync();if(!window.__gate){window.__gate=1;gateInit()}};
pages.guide=()=>bgImg("guide")+hs([543,740,352,95],'data-go="menu" data-sfx="good"',"cta","Mengerti");
/* ---- 3. PETA AKTIVITAS ---- */
const TL=[["hardware",[290,350,288,190]],["software",[590,350,288,190]],["classify",[890,350,270,190]],["simulate",[262,557,222,193]],["assemble",[495,557,222,193]],["quiz",[724,557,226,193]],["summary",[960,557,222,193]]];
pages.menu=()=>{const n=TL.filter(([id])=>Store.isDone(id)).length,p=Math.round(n/7*100);
 return mkPage("menu",(p?pt([412,274,610*p/100,16],"","background:linear-gradient(90deg,#3ddc6a,#ffc928);border-radius:1em"):"")
 +pt([430,303,580,34],`Progres belajar: <span style="color:#ffc928;margin:0 .25em">${n}</span> dari 7 aktivitas selesai (${p}%)`,`color:#fff;white-space:nowrap;text-shadow:0 .1em .2em rgba(0,0,0,.6);${fs(22)}`)
 +TL.map(([id,b])=>hs(b,`data-go="${id}"`,"",id)+(Store.isDone(id)?pt([b[0]+8,b[1]+8,38,38],"✅",fs(32)):"")).join("")+hs([22,770,205,62],'data-go="home"',"","Keluar"))};
AFTER.menu=sndSync;
/* ---- 4. HARDWARE & SOFTWARE ---- */
{const H=DATA.hardware;DATA.hardware=[H[0],
 I("🖥️","PC / Casing","Rangka pelindung yang menampung komponen PC (motherboard, CPU, RAM, PSU, kartu grafis) dan mengatur aliran udara.",["Panel samping – akses ke dalam PC.","Kipas casing – mengalirkan udara.","Tombol power dan port depan.","Bay – dudukan storage."],["Merakit komputer sendiri.","Melindungi komponen dari debu.","Menjaga suhu komponen."]),
 I("🧩","CPU","Prosesor yang menjadi otak komputer: mengolah data dan menjalankan instruksi program.",["Core – inti pemroses instruksi.","Clock speed – kecepatan kerja.","Cache – memori kecil super cepat.","Socket – dudukan di motherboard."],["Menjalankan sistem operasi dan program.","Mengompilasi kode program.","Menjalankan gim dan aplikasi."]),
 I("🌀","CPU Cooler","Pendingin yang membuang panas dari CPU agar komputer tetap stabil saat bekerja berat.",["Heatsink – menyerap panas CPU.","Kipas – mengalirkan udara.","Pasta termal – penghantar panas.","Bracket – pengunci pendingin."],["Menjaga CPU tidak terlalu panas.","Mendukung kompilasi dan gim.","Memperpanjang umur CPU."]),
 I("🔲","Motherboard","Papan sirkuit utama yang menghubungkan CPU, RAM, storage, kartu grafis, dan komponen lainnya.",["Socket CPU – dudukan prosesor.","Slot RAM – dudukan memori.","Slot PCIe – kartu grafis.","Chipset dan port – penghubung."],["Menghubungkan semua komponen.","Menentukan komponen yang kompatibel.","Dasar perakitan komputer."]),
 I("🧠","RAM","Memori sementara yang menyimpan data program yang sedang berjalan agar akses lebih cepat.",["Kapasitas (GB) – ruang data.","Kecepatan (MHz) – laju data.","Tipe – DDR4 atau DDR5.","Modul – dipasang di slot."],["Membuka banyak aplikasi sekaligus.","Menjalankan IDE dan emulator.","Menjalankan gim dengan lancar."]),
 I("🎞️","Kartu Grafis (VGA)","Pemroses khusus yang mengolah gambar dan grafis untuk ditampilkan ke monitor.",["GPU – chip pemroses grafis.","VRAM – memori grafis.","Kipas pendingin.","Port HDMI/DisplayPort."],["Membuat dan menguji gim.","Mengolah gambar dan video.","Menampilkan grafis 3D."]),
 I("🔌","PSU (Power Supply)","Catu daya yang mengubah listrik dari stopkontak menjadi daya untuk komponen komputer.",["Daya (Watt) – kapasitas listrik.","Kabel motherboard 24-pin.","Kabel CPU dan kartu grafis.","Kipas pendingin PSU."],["Menyalakan semua komponen.","Menjaga daya tetap stabil.","Memilih watt sesuai kebutuhan."]),
 H[2],H[3],H[4],H[5],H[6],H[7],H[8]]}
const MK={
 hardware:{box:Q([[815,445,205,140],[435,385,160,170],[628,600,80,55],[750,555,80,85],[350,640,225,100],[578,650,140,75],[735,665,215,85],[965,655,150,90],[597,390,228,160],[455,568,180,45],[692,605,65,55],[335,505,100,125],[820,285,100,70],[860,590,185,70],[1040,510,100,100]]),
  strip:Q([[222,810,80,92],[308,810,78,92],[393,810,75,92],[474,810,74,92],[554,810,76,92],[636,810,76,92],[718,810,76,92],[800,810,76,92],[882,810,76,92],[964,810,80,92],[1050,810,78,92],[1134,810,76,92],[1216,810,78,92],[1300,810,92,92],[1398,810,90,92]]),
  home:Q([20,812,190,64]),arrow:Q([1510,830,60,60]),X:Q([1515,185,45,45]),title:Q([1285,188,215,38]),icon:Q([1175,155,100,100]),F:Q([1195,400,350,75]),B:Q([1195,527,350,90]),C:Q([1195,667,350,60]),cnt:Q([1210,762,330,30])},
 software:{box:[[402,292,180,188],[594,292,192,188],[798,292,175,188],[296,495,185,168],[488,495,177,168],[677,495,176,168],[863,495,166,168]],
  strip:[[253,722,145,98],[407,722,145,98],[562,722,145,98],[718,722,145,98],[875,722,145,98],[1031,722,145,98],[1188,722,150,98]],
  home:[18,740,175,62],X:[1378,160,46,46],title:[1140,163,232,40],icon:[1052,140,84,84],F:[1068,352,340,76],B:[1068,474,340,78],C:[1068,598,340,70],cnt:[1068,690,340,26]}};
function mExplore(k){const m=MK[k],L=DATA[k];sel[k]=-1;
 const h=(b,i,c)=>hs(b,`data-sel="${i}" data-k="${k}"`,c,L[i].name);
 return bgImg(k)+m.box.map((b,i)=>h(b,i,"obj2")).join("")+m.strip.map((b,i)=>h(b,i,"tab2")).join("")+hs(m.home,'data-go="menu"',"","Beranda")
  +(m.arrow?hs(m.arrow,'data-nx="1"',"","Berikutnya"):"")+hs(m.X,'data-mx="1"',"","Tutup")+`<div id="mp" class="layer"></div>`}
function mpDraw(k){const m=MK[k],i=sel[k],it=i>=0?DATA[k][i]:null;
 const txt=`flex-direction:column;align-items:flex-start;justify-content:flex-start;text-align:left;color:#2f2414;font-weight:700;line-height:1.16;${fs(15)}`,li=a=>a.map(x=>`<div>• ${x}</div>`).join("");
 let h=pt(m.title,it?it.name:(k==="hardware"?"Pilih Perangkat":"Pilih Perangkat Lunak"),`justify-content:flex-start;color:#fff;text-shadow:0 .1em .2em rgba(0,40,120,.6);line-height:1.1;${fs(24)}`,"mtxt");
 if(it)h+=pt(m.icon,it.icon,`background:#f4f9ff;border-radius:50%;${fs(38)}`)+pt(m.F,it.fungsi,txt,"mtxt")+pt(m.B,li(it.parts),txt,"mtxt")+pt(m.C,li(it.use),txt,"mtxt");
 h+=pt(m.cnt,cnt(k),`background:#0b3a9e;color:#ffc928;border-radius:2em;${fs(14)}`);
 $("#mp").innerHTML=h;fitTxt()}
function pick(k,i){sel[k]=i;if(i>=0)seen[k].add(i);document.querySelectorAll(".hs[data-sel]").forEach(n=>n.classList.toggle("on",+n.dataset.sel===i));
 if(seen[k].size===DATA[k].length&&!Store.isDone(k)){Store.mark(k);Sound.play("good");toast("Eksplorasi selesai ✅")}mpDraw(k)}
pages.hardware=()=>mExplore("hardware");pages.software=()=>mExplore("software");
AFTER.hardware=()=>{mpDraw("hardware");sndSync()};AFTER.software=()=>{mpDraw("software");sndSync()};
document.addEventListener("click",e=>{if(e.target.closest("[data-mx]")){const k=location.hash.slice(1);sel[k]=-1;document.querySelectorAll(".hs[data-sel]").forEach(n=>n.classList.remove("on"));mpDraw(k)}
 const n=e.target.closest("[data-nx]");if(n){const k=location.hash.slice(1);if(DATA[k]){Sound.play("whoosh");pick(k,(sel[k]+1)%DATA[k].length)}}});
let swX=null,swSkip=false;
document.addEventListener("pointerdown",e=>{swX=e.target.closest&&e.target.closest(".tab2")?e.clientX:null});
document.addEventListener("pointerup",e=>{if(swX===null)return;const dx=e.clientX-swX;swX=null;if(Math.abs(dx)<50)return;
 const k=location.hash.slice(1);if(!MK[k])return;pick(k,Math.max(0,Math.min(DATA[k].length-1,sel[k]+(dx<0?1:-1))));Sound.play("whoosh");swSkip=true;setTimeout(()=>swSkip=false,80)},true);
document.addEventListener("click",e=>{if(swSkip){e.stopPropagation();e.preventDefault()}},true);
/* ---- 5. KLASIFIKASI (seret kartu) ---- */
const CT=[[239,530,92,102],[337,530,88,102],[433,530,88,102],[530,530,90,102],[629,530,90,102],[725,530,90,102],[821,530,92,102],[920,530,88,102],[1017,530,88,102],[1113,530,88,102]];
const crop=(R,i)=>{const [x,y,w,h]=R[i];return `background-size:${PW/w*100}% ${PH/h*100}%;background-position:${x/(PW-w)*100}% ${y/(PH-h)*100}%;aspect-ratio:${w}/${h}`};
const mkCl=()=>{CL.place={};CL.locked={};CL.score=0;CL.picked=null;CL.fb="Seret (drag) kartu ke zona yang sesuai, lalu tekan Periksa."};
pages.classify=()=>{mkCl();return mkPage("classify",`<div id="cl" class="layer" style="--cbg:url(${new URL(DATA.bg.classify,document.baseURI).href})"></div>`+hs([22,748,195,62],'data-go="menu"',"","Beranda")+hs([465,735,212,72],'id="clReset"',"cta","Reset")+hs([708,735,266,72],'id="clCheck"',"cta","Periksa"))};
function clDraw(){const D=DATA.classify,card=(c,i,z)=>`<div class="mc${z?" in":""}${CL.locked[c.id]?" ok":""}${CL.picked===c.id?" pick":""}" data-c="${c.id}" style="${z?"":`left:${CT[i][0]/PW*100}%;top:${CT[i][1]/PH*100}%;width:${CT[i][2]/PW*100}%;`}${crop(CT,i)}">${CL.locked[c.id]?"<i>✓</i>":""}</div>`;
 const zone=(z,b,bg,bd)=>{const it=D.map((c,i)=>[c,i]).filter(([c])=>CL.place[c.id]===z);return pt(b,it.map(([c,i])=>card(c,i,1)).join(""),`gap:1%;${it.length?`background:${bg};border:.15em dashed ${bd};border-radius:1.4em`:""}`,"zone2",`data-z="${z}"`)};
 const ok=Object.keys(CL.locked).length;
 $("#cl").innerHTML=D.map((c,i)=>CL.place[c.id]?pt(CT[i],"","background:#1c4db0;border-radius:1em;border:.12em dashed rgba(170,200,255,.7)"):card(c,i)).join("")
  +zone("hw",[376,330,320,142],"#cfe3fb","#6fa6e8")+zone("sw",[778,330,322,142],"#fdf0b8","#e0b030")
  +pt([1262,186,110,42],`<span style="color:#ffc928;margin-right:.3em">${ok}</span> / 10`,`color:#fff;white-space:nowrap;${fs(30)}`)
  +pt([388,668,665,42],"ℹ️ "+CL.fb,`background:#fff;border-radius:2em;color:#0d2a6b;font-weight:700;padding:0 3%;text-align:left;${fs(16)}`,"mtxt")}
function mcMove(id,z){if(CL.locked[id])return;if(z)CL.place[id]=z;else delete CL.place[id];CL.picked=null;clDraw();fitTxt()}
function mcCheck(){const ids=Object.keys(CL.place).filter(id=>!CL.locked[id]);if(!ids.length){toast("Letakkan kartu ke zona dulu, lalu tekan Periksa");return}
 let ok=0;const bad=[];ids.forEach(id=>{const c=DATA.classify.find(x=>x.id===id);if(c.type===CL.place[id]){CL.locked[id]=true;ok++}else bad.push(c)});
 CL.score=Object.keys(CL.locked).length*10;
 Sound.play(bad.length?"bad":"good");let m=`✅ ${ok} benar.`;
 if(bad.length)m+=` ❌ Perlu diperbaiki: ${bad.map(c=>c.name).join(", ")}. Hardware = perangkat fisik, software = program atau aplikasi.`;
 if(Object.keys(CL.locked).length===10){m="🎉 Semua benar! Skor akhir 100/100.";Store.mark("classify");Scores.set("classify",100);Sound.play("win");toast("Tantangan selesai 🏅")}
 CL.fb=m;clDraw();fitTxt();const mark=()=>bad.forEach(c=>{const el=document.querySelector(`#cl [data-c="${c.id}"]`);el&&el.classList.add("bad")});mark();
 setTimeout(()=>{if(!$("#cl"))return;bad.forEach(c=>delete CL.place[c.id]);clDraw();fitTxt()},1500)}
AFTER.classify=()=>{clDraw();fitTxt();sndSync();$("#clReset").onclick=()=>{Sound.play("whoosh");render()};$("#clCheck").onclick=mcCheck};
/* ---- 6. SIMULASI MEMILIH ALAT ---- */
const HINT=["Untuk mengetik, menjalankan, dan menguji program, kamu membutuhkan komputer (laptop sudah lengkap dengan keyboard) serta aplikasi editor kode seperti Visual Studio Code.","Merancang tampilan membutuhkan komputer dengan layar yang jelas dan aplikasi desain antarmuka. Mouse eksternal membantu, tetapi laptop bisa memakai touchpad.","Menyimpan perubahan dan bekerja bersama tim membutuhkan komputer dan layanan version control.","Aset gim dibuat dengan komputer, aplikasi pengolah gambar, dan game engine. Mouse membantu menata objek."];
const SMB=Q([[50,245,270,70],[52,318,266,44],[52,370,266,44],[52,422,266,44]]),TX=Q([342,486,620]),TXS=Q([770,917,1054]),TY=Q([533,636]);
pages.simulate=()=>{smReset();return mkPage("simulate",`<div id="ms" class="layer"></div>`+hs(Q([24,855,222,64]),'data-go="menu"',"","Beranda")+hs(Q([533,855,220,64]),'id="smRst"',"cta","Reset")+hs(Q([777,852,272,68]),'id="smChk"',"cta","Periksa"))};
function msDraw(){const c=SM.cur,s=DATA.sim[c],p=SM.pick[c],r=SM.res[c],wr=r?r.wrong:[],N=smNames(),sc=Object.keys(SM.solved).length;let h="";
 SMB.forEach((b,i)=>h+=hs(b,`data-scn="${i}"`,i===c?"on":"",DATA.sim[i].menu));
 h+=pt(Q([363,318,808,148]),`<div style="${fq(72)};width:18%;text-align:center">${s.icon}</div><div style="flex:1;text-align:left"><div style="display:inline-block;background:#0d3a9a;color:#fff;border-radius:2em;padding:.15em .9em;${fq(24)}">${s.title}</div><div style="margin-top:.45em;font-weight:600;color:#10306e;${fq(18)}">${s.desc}</div></div>`,"background:#dfecfb;border-radius:1.4em;padding:0 2%");
 const tile=(t,id,x,y)=>{const on=p[t].has(id),st=on?(r&&wr.includes(id)?"bad":"sel"):"";return hs([x,y,126*SC,100*SC],`data-pk="${id}" data-t="${t}"`,st,N[id])+(on?pt([x+100*SC,y+3*SC,26*SC,26*SC],st==="bad"?"✗":"✓",fq(18),"cb on"+(st==="bad"?" bad":"")):"")};
 DATA.simHw.forEach(([id],i)=>h+=tile("hw",id,TX[i%3],TY[Math.floor(i/3)]));DATA.simSw.forEach(([id],i)=>h+=tile("sw",id,TXS[i%3],TY[Math.floor(i/3)]));
 const li=t=>[...p[t]].map(id=>`<span>${wr.includes(id)?"❌":"✅"} ${N[id]}</span>`).join("");
 const lst=`flex-direction:row;flex-wrap:wrap;gap:.2em .8em;align-content:flex-start;align-items:flex-start;justify-content:flex-start;text-align:left;color:#10306e;font-weight:700;${fq(18)}`;
 h+=pt(Q([1215,384,298,55]),li("hw"),lst,"mtxt")+pt(Q([1215,488,298,55]),li("sw"),lst,"mtxt");
 h+=pt(Q([1318,192,176,48]),`Skor: ${sc}/4`,`color:#fff;white-space:nowrap;${fq(30)}`);
 h+=pt(Q([340,755,852,76]),SM.fb[c]||`💡 Tips: ${HINT[c]}`,`background:#0e2e80;border:.12em dashed #5aa9ff;border-radius:1.3em;color:#fff;font-weight:600;padding:0 2.5%;text-align:left;${fq(18)}`,"mtxt");
 $("#ms").innerHTML=h;fitTxt();sndSync()}
function msCheck(){const c=SM.cur,s=DATA.sim[c],p=SM.pick[c],sel=new Set([...p.hw,...p.sw]),N=smNames();if(!sel.size){toast("Pilih alat dulu, lalu tekan Periksa");return}
 const has=a=>Array.isArray(a)?a.every(x=>sel.has(x)):sel.has(a),miss=s.need.filter(g=>!g.some(has)),al=new Set([...s.need.flat(2),...s.ok]),wrong=[...sel].filter(x=>!al.has(x));SM.res[c]={wrong};let m;
 if(!miss.length&&!wrong.length){const f=!SM.solved[c];SM.solved[c]=true;Sound.play("good");m=`✅ Tepat! ${s.why}${f?" (+25 poin)":""}`;
  if(Object.keys(SM.solved).length===4){m=`🎉 Keempat skenario selesai! Skor 100/100. ${s.why}`;Store.mark("simulate");Scores.set("simulate",100);Sound.play("win");toast("Simulasi selesai 🏅")}}
 else{Sound.play("bad");m="❌ Kurang sesuai."+(miss.length?` Masih kurang: ${miss.map(g=>g.map(a=>Array.isArray(a)?a.map(x=>N[x]).join(" + "):N[a]).join(" atau ")).join("; ")}.`:"")+(wrong.length?` Kurang sesuai: ${wrong.map(x=>N[x]).join(", ")}.`:"")+` ${s.why}`}
 SM.fb[c]=m;msDraw()}
AFTER.simulate=()=>{msDraw();$("#smRst").onclick=()=>{const c=SM.cur;SM.pick[c]={hw:new Set(),sw:new Set()};delete SM.res[c];SM.fb[c]="";Sound.play("whoosh");msDraw()};$("#smChk").onclick=msCheck};
document.addEventListener("click",e=>{if(!$("#ms"))return;
 const k=e.target.closest("[data-pk]");if(k){const st=SM.pick[SM.cur][k.dataset.t],id=k.dataset.pk;st.has(id)?st.delete(id):st.add(id);delete SM.res[SM.cur];SM.fb[SM.cur]="";Sound.play("click");msDraw();return}
 const n=e.target.closest("[data-scn]");if(n){SM.cur=+n.dataset.scn;Sound.play("whoosh");msDraw()}});
/* ---- 7. SIMULASI MERAKIT KOMPUTER ---- */
DATA.voice.result=DATA.say.result;VW.result="f";
DATA.voice.assemble="Rakit komputer langkah demi langkah. Seret komponen yang tepat ke meja kerja sesuai urutan tahapan, lalu perhatikan hasilnya.";VW.assemble="f";DATA.audioFiles.voice.assemble="assets/audio/vo-assemble.mp3";
const AC=Object.fromEntries(Object.entries({cpu:[1207,275,118,115],cooler:[1327,275,108,115],ram:[1442,275,112,115],ssd:[1207,402,118,115],mb:[1327,402,108,115],psu:[1442,402,112,115],gpu:[1207,530,118,118],case:[1327,530,108,118],cable:[1442,530,112,118]}).map(([k,v])=>[k,Q(v)]));
const AK=Object.keys(AC),ACR=AK.map(k=>AC[k]);
const STEPS=[{n:"Persiapan",h:"Siapkan semua komponen, lalu klik Mulai Perakitan untuk merakit komputer dari awal."},
 {n:"Pasang CPU",c:"cpu",h:"Seret CPU ke meja kerja untuk dipasang di socket motherboard.",ok:"CPU terpasang di socket motherboard."},
 {n:"Pasang CPU Cooler",c:"cooler",h:"Seret CPU Cooler untuk memasang pendingin di atas CPU.",ok:"CPU Cooler terpasang di atas CPU."},
 {n:"Pasang RAM",c:"ram",h:"Seret RAM untuk dipasang pada slot memori motherboard.",ok:"RAM terpasang di slot memori."},
 {n:"Pasang Storage (SSD)",c:"ssd",h:"Seret SSD untuk dipasang sebagai penyimpan data dan sistem operasi.",ok:"SSD terpasang."},
 {n:"Pasang Motherboard",c:"mb",h:"Seret Motherboard untuk dipasang ke dalam casing.",ok:"Motherboard terpasang di casing."},
 {n:"Pasang PSU",c:"psu",h:"Seret PSU (power supply) untuk dipasang sebagai sumber daya.",ok:"PSU terpasang."},
 {n:"Pasang Kartu Grafis",c:"gpu",h:"Seret Kartu Grafis untuk dipasang pada slot PCIe.",ok:"Kartu Grafis terpasang di slot PCIe."},
 {n:"Rakit ke Casing",c:"case",h:"Seret Casing untuk menutup dan merapikan rakitan.",ok:"Casing terpasang dan rakitan rapi."},
 {n:"Hubungkan Kabel",c:"cable",h:"Seret Kabel Set untuk menghubungkan daya dan data antar komponen.",ok:"Kabel terhubung."},
 {n:"Nyalakan Komputer",p:1,h:"Klik ikon Nyalakan Komputer di bagian bawah untuk menyalakan komputer.",ok:"Komputer menyala!"}];
const PHB=Q([[650,758,100,74],[788,758,98,74],[920,758,86,74],[1042,758,82,74],[1160,758,76,74]]),PHS=[0,1,1,1,1,2,2,2,2,3,4];
const SPOT=Object.fromEntries(Object.entries({cpu:[775,562],cooler:[862,548],ram:[955,558],ssd:[822,617],mb:[670,622],psu:[1068,538],gpu:[985,632],case:[572,490],cable:[500,610]}).map(([k,v])=>[k,Q(v)]));
const AS={started:false,step:0,used:{},on:false,fb:"",pick:null};
const asReset=()=>{AS.started=false;AS.step=0;AS.used={};AS.on=false;AS.pick=null;AS.fb=STEPS[0].h};
pages.assemble=()=>{asReset();return mkPage("assemble",`<div id="as" class="layer" style="--cbg:url(${new URL(DATA.bg.assemble,document.baseURI).href})"></div>`+hs(Q([645,688,296,48]),'data-as="start"',"cta","Mulai Perakitan")+hs(Q([230,865,192,52]),'data-go="menu"',"cta","Beranda")+hs(Q([578,865,185,52]),'data-as="reset"',"cta","Reset")+hs(Q([800,865,205,52]),'data-as="next"',"cta","Lanjut")+hs(Q([1162,865,205,52]),'data-as="help"',"cta","Panduan")+hs(PHB[4],'data-as="power"',"","Nyalakan Komputer"))};
function asDraw(){const doneN=Object.keys(AS.used).length+(AS.started?1:0)+(AS.on?1:0),p=Math.round(doneN/11*100);let h="";
 h+=pt(Q([38,262,300,426]),"","background:#dfeafb;border-radius:1em");
 STEPS.forEach((s,i)=>{const done=i<AS.step||(i===10&&AS.on),cur=AS.started?i===AS.step&&!AS.on:i===0,yc=285+i*38.1;
  h+=pt(Q([42,yc-18,292,36]),`<div style="display:flex;align-items:center;width:100%;gap:.5em"><span style="flex:0 0 1.7em;height:1.7em;border-radius:50%;background:${cur?"#0d3a9a":"#14449f"};color:#fff;display:grid;place-items:center;${fq(14)}">${i+1}</span><span style="flex:1;text-align:left;white-space:nowrap">${s.n}</span><span>${done?"✅":cur?"▶":"○"}</span></div>`,
   `background:${cur?"linear-gradient(#ffe066,#ffc928)":done?"linear-gradient(#bff0cf,#8fe0ab)":"linear-gradient(#3f86f2,#2766d8)"};color:${cur||done?"#10306e":"#fff"};border-radius:.9em;padding:0 3%;font-weight:700;${fq(16)}`)});
 const used=AK.filter(k=>AS.used[k]);
 h+=AK.map((k,i)=>AS.used[k]?pt(ACR[i],"✓ terpasang","background:#1d4fb8;border-radius:1em;border:.12em dashed rgba(170,200,255,.7);color:#9fe8b4;"+fq(15)):`<div class="mc${AS.pick===k?" pick":""}" data-c="${k}" style="left:${ACR[i][0]/PW*100}%;top:${ACR[i][1]/PH*100}%;width:${ACR[i][2]/PW*100}%;${crop(ACR,i)}"></div>`).join("");
 h+=pt(Q([365,330,830,350]),"","border-radius:1.2em","zone2","data-z=\"bench\"");
 used.forEach(k=>h+=pt([SPOT[k][0]-14,SPOT[k][1]-14,28,28],"✓",`background:#22c55e;border-radius:50%;color:#fff;box-shadow:0 0 .8em #22c55e;${fs(18)}`));
 if(AS.on)h+=pt(Q([765,350,225,160]),"✔ Komputer<br>menyala!",`background:radial-gradient(#2cff9a,#0a7a4a);color:#fff;text-shadow:0 .1em .3em rgba(0,0,0,.5);border-radius:.5em;${fq(26)}`);
 PHB.forEach((b,i)=>{const cur=PHS[Math.min(AS.started?AS.step:0,10)]===i&&!AS.on;if(cur)h+=pt(b,"","box-shadow:inset 0 0 0 .22em #ffc928,0 0 1em #ffc928;border-radius:1em");if(PHS.slice(0,AS.started?AS.step:0).includes(i)&&!PHS.slice(AS.step).includes(i)||(AS.on&&i<=4))h+=pt([b[0]+b[2]-20,b[1]-4,24,24],"✓",`background:#22c55e;border-radius:50%;color:#fff;${fs(15)}`)});
 h+=pt(Q([514,766,46,28]),`${p}%`,`color:#fff;${fq(20)}`)+(p?pt([356*SC,802*SC,262*SC*p/100,14*SC],"","background:linear-gradient(90deg,#3ddc6a,#ffc928);border-radius:1em"):"");
 h+=pt(Q([430,284,740,40]),AS.fb,`background:#eaf1fc;color:#10306e;font-weight:700;border-radius:1.2em;justify-content:flex-start;padding:0 1.5%;text-align:left;${fq(16)}`,"mtxt");
 if(AS.started)h+=pt(Q([647,690,292,44]),AS.on?"✅ Selesai":`Langkah ${Math.min(AS.step+1,11)} / 11`,`background:linear-gradient(#2f78ee,#1d57cc);border:.15em solid #fff;border-radius:2em;color:#fff;${fq(21)}`);
 $("#as").innerHTML=h;fitTxt();sndSync()}
function asDrop(id,z){if(!AS.started){AS.fb="Klik Mulai Perakitan dulu.";Sound.play("bad");asDraw();return}
 if(!z){AS.pick=null;asDraw();return}
 const s=STEPS[AS.step];if(!s||!s.c){AS.fb=s?s.h:"";Sound.play("bad");asDraw();return}
 if(id===s.c){AS.used[id]=true;Sound.play("drop");Sound.play("good");AS.fb="✅ "+s.ok+(STEPS[AS.step+1]?" Selanjutnya: "+STEPS[AS.step+1].h:"");AS.step++}
 else{Sound.play("bad");AS.fb=`❌ Belum waktunya komponen itu. Langkah ${AS.step+1}: ${s.h}`}
 AS.pick=null;asDraw()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-as]");if(!b||!$("#as"))return;const a=b.dataset.as;
 if(a==="start"){if(!AS.started){AS.started=true;AS.step=1;AS.fb="✅ Persiapan selesai. "+STEPS[1].h;Sound.play("good")}}
 else if(a==="reset"){asReset();Sound.play("whoosh")}
 else if(a==="help")AS.fb="Panduan: seret komponen dari Daftar Komponen ke meja kerja sesuai urutan tahapan di kiri. "+STEPS[Math.min(AS.step,10)].h;
 else if(a==="power"){if(AS.started&&AS.step===10&&!AS.on){AS.on=true;AS.step=11;AS.fb="🎉 Komputer menyala! Perakitan selesai dengan benar.";Store.mark("assemble");Scores.set("assemble",100);Sound.play("win");toast("Perakitan selesai 🏅")}else{AS.fb=AS.started?"Selesaikan langkah sebelumnya dulu. "+STEPS[Math.min(AS.step,10)].h:"Klik Mulai Perakitan dulu.";Sound.play("bad")}}
 else if(a==="next"){if(AS.on){go("menu");return}AS.fb=AS.started?"Selesaikan langkah ini dulu: "+STEPS[Math.min(AS.step,10)].h:"Klik Mulai Perakitan dulu.";Sound.play("bad")}
 asDraw()});
AFTER.assemble=asDraw;
/* ---- seret kartu (klasifikasi & perakitan) ---- */
let cd=null,cSkip=false;const cEnd=()=>{if(cd&&cd.g)cd.g.remove();document.querySelectorAll(".zone2").forEach(n=>n.classList.remove("over"));cd=null;cSkip=true;setTimeout(()=>cSkip=false,60)};
const zAt=e=>{const t=document.elementFromPoint(e.clientX,e.clientY),z=t&&t.closest("[data-z]");return z?z.dataset.z:null};
const cLayer=el=>el.closest("#cl")?"cl":el.closest("#as")?"as":null;
document.addEventListener("pointerdown",e=>{const c=e.target.closest(".mc"),L=c&&cLayer(c);if(!L||(L==="cl"&&CL.locked[c.dataset.c]))return;const r=c.getBoundingClientRect();cd={L,id:c.dataset.c,x:e.clientX,y:e.clientY,w:r.width,h:r.height,el:c,m:false,g:null};e.preventDefault()});
document.addEventListener("pointermove",e=>{if(!cd)return;
 if(!cd.m){if(Math.hypot(e.clientX-cd.x,e.clientY-cd.y)<6)return;cd.m=true;const g=cd.el.cloneNode(true);g.className="mc ghost";g.style.cssText+=`;position:fixed;width:${cd.w}px;height:${cd.h}px;aspect-ratio:auto;pointer-events:none;z-index:60`;$("#stage").appendChild(g);cd.g=g;cd.el.classList.add("dim");Sound.play("click")}
 cd.g.style.left=e.clientX-cd.w/2+"px";cd.g.style.top=e.clientY-cd.h/2+"px";const z=zAt(e);document.querySelectorAll(".zone2").forEach(n=>n.classList.toggle("over",n.dataset.z===z))});
document.addEventListener("pointerup",e=>{if(!cd)return;const d=cd;
 if(d.m){const z=zAt(e);cEnd();if(d.L==="cl"){Sound.play(z?"drop":"click");mcMove(d.id,z&&z!=="bench"?z:null)}else asDrop(d.id,z)}
 else{cEnd();if(d.L==="cl"){CL.picked=CL.picked===d.id?null:d.id;Sound.play("click");clDraw();fitTxt()}else{AS.pick=AS.pick===d.id?null:d.id;Sound.play("click");asDraw()}}});
document.addEventListener("pointercancel",()=>{if(cd){const L=cd.L;cEnd();L==="cl"?clDraw():asDraw()}});
document.addEventListener("click",e=>{if(cSkip)return;const z=e.target.closest("[data-z]");if(!z||e.target.closest(".mc"))return;
 if($("#cl")&&CL.picked)mcMove(CL.picked,z.dataset.z);else if($("#as")&&AS.pick)asDrop(AS.pick,"bench")});
/* ---- 8. EVALUASI (KUIS) ---- */
const QO=[[307,484,408,72],[729,484,408,72],[307,571,408,72],[729,571,408,72]];
pages.quiz=()=>{QZ.i=0;QZ.ans=[];return mkPage("quiz",`<div id="mq" class="layer"></div>`+BER("menu",[22,770,206,62])+hs([437,764,247,64],'data-qp="1"',"cta","Sebelumnya")+hs([718,762,278,66],'data-qn2="1"',"cta","Selanjutnya"))};
function mqDraw(){const n=DATA.quiz.length,q=DATA.quiz[QZ.i],a=QZ.ans[QZ.i],d=a!=null;
 $("#mq").innerHTML=pt([308,262,830,40],`<div style="display:flex;justify-content:space-between;align-items:center;width:100%"><span>Soal ${QZ.i+1} / ${n}</span><span style="background:#fff0b3;border-radius:2em;padding:.1em 1em;${fs(18)}">${CATN[q.c]}</span></div>`,`background:#fcfdff;justify-content:space-between;padding:0 1.4%;color:#0d2a6b;${fs(25)}`)
  +pt([308,309,830,26],`<div style="position:absolute;left:0;top:0;bottom:0;width:${(QZ.i+(d?1:0))/n*100}%;background:linear-gradient(90deg,#1fc8b0,#ffc928);border-radius:1em"></div>`,"background:#c9ddf8;border-radius:1em")
  +pt([318,358,808,98],q.q,`color:#0d2a6b;line-height:1.25;padding:0 1%;${fs(q.q.length<=60?27:q.q.length<=90?24:20)}`,"mtxt")
  +QO.map((b,j)=>`<button class="hs qa ${d?(j===q.a?"good":(j===a?"bad":"")):""}" style="${bx(b)}" data-qo="${j}"><span style="${fs(q.o[j].length<=22?21:q.o[j].length<=40?18:q.o[j].length<=60?15:13)};line-height:1.15">${q.o[j]}</span></button>`).join("")
  +pt([308,658,830,40],d?(a===q.a?"✅ Benar! ":"❌ Belum tepat. ")+q.e:"Pilih satu jawaban.",`background:#fcfdff;color:#0d2a6b;justify-content:flex-start;text-align:left;padding:0 1.4%;line-height:1.15;${fs(17)}`,"mtxt")
  +pt([1340,184,56,46],`${qzOk()*10}`,`color:#fff;${fs(30)}`);fitTxt();sndSync()}
AFTER.quiz=mqDraw;
document.addEventListener("click",e=>{if(!$("#mq"))return;
 const o=e.target.closest("[data-qo]");if(o){if(QZ.ans[QZ.i]==null){const j=+o.dataset.qo;QZ.ans[QZ.i]=j;Sound.play(j===DATA.quiz[QZ.i].a?"good":"bad");mqDraw()}return}
 if(e.target.closest("[data-qp]")){if(QZ.i>0){QZ.i--;Sound.play("whoosh");mqDraw()}return}
 if(e.target.closest("[data-qn2]")){if(QZ.ans[QZ.i]==null){toast("Pilih satu jawaban dulu");return}Sound.play("whoosh");if(QZ.i>=DATA.quiz.length-1)go("result");else{QZ.i++;mqDraw()}}});
/* ---- 9. HASIL EVALUASI (mockup lama dipotong ke 16:10) ---- */
const RC=b=>[(b[0]-83.4)*.9562,b[1]*.9564,b[2]*.9562,b[3]*.9564],fr=n=>fs(n*.956);
pages.result=()=>{const n=DATA.quiz.length,ok=qzOk(),b=(y,t,bg,c)=>pt(RC([987,y,78,42]),t,`background:${bg};color:${c};border-radius:.9em;${fr(40)}`);
 const ms=DATA.mastery.map(([c],i)=>{const qs=DATA.quiz.map((x,k)=>[x,k]).filter(([x])=>x.c===c),g=qs.filter(([x,k])=>QZ.ans[k]===x.a).length;
  return g/qs.length>=.6?"":pt(RC([1405,[327,390,452][i],150,42]),"Pelajari lagi","background:#ffe6c4;color:#b36200;border-radius:1.6em;"+fr(21))}).join("");
 return bgImg("result")+pt(RC([535,400,125,95]),`<span id="rsc">0</span>`,`color:#fff;text-shadow:0 .1em .3em rgba(0,0,40,.55);font-style:italic;${fr(92)}`)
  +b(345,ok,"#e0f6e0","#1f9b3d")+b(407,n-ok,"#fde4e4","#d93030")+b(470,n,"#dcebff","#1565c0")+ms
  +hs(RC([497,765,315,85]),'data-go="quiz"',"cta","Ulangi")+hs(RC([840,765,325,85]),'data-go="summary"',"cta","Selesai")};
AFTER.result=()=>{if(QZ.ans.filter(x=>x!=null).length<DATA.quiz.length){toast("Selesaikan semua soal kuis dulu");go("quiz");return}const ok=qzOk(),sc=Math.round(ok/DATA.quiz.length*100);Store.mark("quiz");Scores.set("quiz",Math.max(sc,Scores.get("quiz")));Sound.play("win");sndSync();
 const el=$("#rsc");if(matchMedia("(prefers-reduced-motion:reduce)").matches||!sc){el.textContent=sc}else{let v=0;const t=setInterval(()=>{v=Math.min(sc,v+5);if(!el.isConnected||v>=sc)clearInterval(t);el.textContent=v},40)}};
/* ---- 10. RANGKUMAN ---- */
const SR=[["hardware","Eksplorasi Perangkat Keras"],["software","Eksplorasi Perangkat Lunak"],["classify","Tantangan Klasifikasi"],["simulate","Simulasi Memilih Alat"],["assemble","Simulasi Merakit Komputer"],["quiz","Evaluasi dan Hasil"]];
const RY=[368,394,419,445,471,501];
function sumNote(has,q){if(!has)return["Belum ada","#dbeafe"];if(q>=90)return["Sangat Baik","#4ade80"];if(q>=75)return["Baik","#4ade80"];if(q>=60)return["Cukup","#fbbf24"];return["Perlu Belajar","#fb923c"]}
pages.summary=()=>{const done=SR.filter(([id])=>Store.isDone(id)).length,p=Math.round(done/6*100),q=Scores.get("quiz"),has=Store.isDone("quiz"),[note,col]=sumNote(has,q);
 return mkPage("summary",pt([1006,285,108,30],`${has?q:"–"} / 100`,`color:#ffc928;white-space:nowrap;${fs(22)}`)+pt([1147,288,126,24],note,`color:${col};font-weight:800;${fs(13)};white-space:nowrap`)
  +SR.map(([id],i)=>Store.isDone(id)?pt([1243,RY[i]-12,25,25],"✓",`background:#22c55e;border-radius:50%;color:#fff;${fs(17)}`):"").join("")
  +(p?pt([1009,562,239*p/100,14],"","background:#22c55e;border-radius:1em"):"")+pt([1005,583,246,26],`${done} / 6 Aktivitas (${p}%)`,`background:#fff;color:#10306e;${fs(16)}`)
  +hs([24,766,200,62],'data-go="menu"',"","Beranda")+hs([375,761,292,64],'id="sumReset"',"cta","Ulangi dari Awal")+hs([706,760,346,64],'data-go="home" data-sfx="win"',"cta","Selesai Pembelajaran"))};
AFTER.summary=()=>{Store.mark("summary");sndSync();fitTxt();let arm=false;const b=$("#sumReset");
 b.onclick=()=>{if(!arm){arm=true;toast("Tekan sekali lagi untuk menghapus semua progres");setTimeout(()=>arm=false,3000);return}
  Store.reset();["classify","simulate","quiz","assemble"].forEach(k=>Scores.set(k,0));seen.hardware.clear();seen.software.clear();Sound.play("whoosh");go("home")}};
