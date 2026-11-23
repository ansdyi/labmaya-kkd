/* ===== TAHAP 7: EVALUASI, HASIL, RANGKUMAN (soal bisa diedit guru) ===== */
const CATN={hw:"Perangkat Keras",sw:"Perangkat Lunak",cls:"Klasifikasi & Alat"};
DATA.mastery=[["hw","Eksplorasi Perangkat Keras"],["sw","Eksplorasi Perangkat Lunak"],["cls","Klasifikasi Hardware & Software"]];
DATA.say.result="Bagus! Periksa hasil belajarmu. Pelajari kembali perangkat yang belum dikenali agar semakin siap bekerja di lingkungan pengembangan.";
DATA.quiz=[
 {c:"hw",q:"Bagian laptop yang menyimpan data dan aplikasi secara tetap adalah …",o:["RAM","Storage (SSD/HDD)","Layar (Display)","Prosesor (CPU)"],a:1,e:"Storage menyimpan data dan aplikasi. RAM hanya menyimpan data sementara."},
 {c:"hw",q:"Alat input yang paling utama untuk mengetik kode program adalah …",o:["Monitor","Headset","Keyboard","Router"],a:2,e:"Keyboard dipakai untuk mengetik huruf, angka, simbol, dan perintah."},
 {c:"hw",q:"Perangkat yang menghubungkan komputer ke jaringan dan internet adalah …",o:["Webcam","Router","Flash drive","Mouse"],a:1,e:"Router membagi koneksi jaringan dan internet ke banyak perangkat."},
 {c:"hw",q:"Untuk mencadangkan berkas proyek di luar komputer, alat yang tepat adalah …",o:["Flash drive atau SSD eksternal","Monitor","Headset","Webcam"],a:0,e:"Media penyimpanan dipakai untuk backup dan memindahkan berkas."},
 {c:"sw",q:"Editor kode ringan yang mendukung banyak bahasa pemrograman dan ekstensi adalah …",o:["Photoshop","Visual Studio Code","Windows","MySQL"],a:1,e:"Visual Studio Code adalah editor kode (IDE) ringan dan fleksibel."},
 {c:"sw",q:"Alat yang mencatat riwayat perubahan kode agar tim bisa berkolaborasi adalah …",o:["Git","Chrome","Figma","Unity"],a:0,e:"Git dan GitHub adalah version control untuk mengelola versi kode."},
 {c:"sw",q:"Perangkat lunak yang dipakai untuk membangun gim adalah …",o:["MySQL","Figma","Unity","Chrome"],a:2,e:"Unity adalah game engine untuk membuat dan menguji gim."},
 {c:"cls",q:"Manakah yang termasuk perangkat lunak (software)?",o:["Keyboard","MySQL","Monitor","Laptop"],a:1,e:"MySQL adalah program pengelola database. Yang lain berupa perangkat fisik."},
 {c:"cls",q:"Perbedaan hardware dan software yang benar adalah …",o:["Hardware berupa program, software berupa benda fisik","Hardware berupa perangkat fisik, software berupa program atau aplikasi","Keduanya berupa benda fisik","Keduanya berupa program"],a:1,e:"Hardware dapat disentuh, sedangkan software adalah program atau aplikasi."},
 {c:"cls",q:"Untuk membuat rancangan tampilan aplikasi, kombinasi alat yang paling sesuai adalah …",o:["Laptop/PC, monitor, mouse, dan Figma","Laptop, headset, dan MySQL","Router, webcam, dan GitHub","Monitor saja"],a:0,e:"Desain UI memerlukan perangkat komputer, mouse, dan aplikasi desain seperti Figma."}
];
const QZ={i:0,ans:[]};
const qzOk=()=>QZ.ans.filter((a,i)=>a===DATA.quiz[i].a).length;
pages.quiz=()=>{QZ.i=0;QZ.ans=[];return `${char("m","l mini")}${char("f","r mini")}<div class="ttl">Evaluasi dan Hasil<small>Kuis identifikasi dan pemilihan alat</small></div><div id="qz"></div>`};
AFTER.quiz=()=>qzDraw();
function qzDraw(){const n=DATA.quiz.length;if(QZ.i>=n)return qzResult();
 const q=DATA.quiz[QZ.i],a=QZ.ans[QZ.i],done=a!=null;
 $("#qz").innerHTML=`<div class="score">⭐ ${qzOk()*10}</div><div class="qcard"><div class="qh"><span>Soal ${QZ.i+1} / ${n}</span><span>${CATN[q.c]}</span></div>
 <div class="qbar"><div style="width:${(QZ.i+(done?1:0))/n*100}%"></div></div><div class="qq">${q.q}</div>
 <div class="qo">${q.o.map((t,j)=>`<button class="qb${done?(j===q.a?" good":(j===a?" bad":"")):""}" data-qo="${j}"${done?" disabled":""}><b>${"ABCD"[j]}</b>${t}</button>`).join("")}</div>
 <div class="qf"><span>${done?(a===q.a?"✅ Benar! ":"❌ Belum tepat. ")+q.e:"Pilih satu jawaban."}</span>${done?`<button class="btn sm" data-qn="1">${QZ.i===n-1?"Lihat Hasil ›":"Lanjut ›"}</button>`:""}</div></div>`;}
function qzResult(){const n=DATA.quiz.length,ok=qzOk(),score=Math.round(ok/n*100),weak=[];
 const rows=DATA.mastery.map(([c,name])=>{const qs=DATA.quiz.map((x,i)=>[x,i]).filter(([x])=>x.c===c),g=qs.filter(([x,i])=>QZ.ans[i]===x.a).length,m=g/qs.length>=.6;if(!m)weak.push(name);
  return `<div class="mr"><span>${name}</span><span class="tag2 ${m?"y":"n"}">${m?"✔ Dikuasai":"Pelajari lagi"}</span></div>`}).join("");
 Store.mark("quiz");Scores.set("quiz",Math.max(score,Scores.get("quiz")));Sound.play("win");Sound.speak(DATA.say.result,"result","f");
 $("#qz").innerHTML=`<div class="trophy">🏆</div><div class="rt">Hasil Evaluasi</div>
 <div class="rcard"><div class="ring"><small>Skor Akhir</small><b id="rsc">0</b><small>/ 100</small></div><div class="rstats"><div class="rs">✅ Jawaban Benar<b>${ok}</b></div><div class="rs">❌ Jawaban Salah<b>${n-ok}</b></div><div class="rs">🎯 Jumlah Soal<b>${n}</b></div></div></div>
 <div class="mast"><h3>Penguasaan Materi</h3>${rows}</div>
 <div class="bubble rbub">${DATA.say.result}${weak.length?`<br><small>Perlu diulang: ${weak.join(", ")}.</small>`:""}</div>
 <div class="nav"><button class="btn blue sm" id="qzAgain">↻ Ulangi</button><button class="btn sm" data-go="summary">✔ Selesai</button></div>`;
 $("#qzAgain").onclick=()=>{Sound.play("whoosh");render()};
 const el=$("#rsc");if(matchMedia("(prefers-reduced-motion:reduce)").matches||!score){el.textContent=score}else{let v=0;const t=setInterval(()=>{v=Math.min(score,v+5);if(!el.isConnected||v>=score)clearInterval(t);el.textContent=v},40)}}
document.addEventListener("click",e=>{if(!$("#qz"))return;
 const o=e.target.closest("[data-qo]");
 if(o&&QZ.ans[QZ.i]==null){const j=+o.dataset.qo;QZ.ans[QZ.i]=j;Sound.play(j===DATA.quiz[QZ.i].a?"good":"bad");qzDraw();return}
 if(e.target.closest("[data-qn]")){Sound.play("click");QZ.i++;qzDraw()}});
document.addEventListener("mouseover",e=>{if(e.target.closest(".qb:not([disabled])"))Sound.play("hover")});

pages.summary=()=>{const act=DATA.activities.filter(a=>a.id!=="summary"),all=act.every(a=>Store.isDone(a.id)),sc=["classify","simulate","quiz"];
 return `${char("m","l mini")}${char("f","r mini")}<div class="ttl">Penutup dan Rangkuman</div>
 <div class="qcard" style="top:1em"><div class="sg"><div><h3>📘 Rangkuman Materi</h3><ul>
 <li><b>Perangkat keras</b> adalah perangkat fisik: laptop/PC, monitor, keyboard, mouse, headset, webcam, media penyimpanan, dan router.</li>
 <li><b>Perangkat lunak</b> adalah program atau aplikasi: sistem operasi, editor kode/IDE, browser, aplikasi desain, version control, database tools, dan game engine.</li>
 <li>Pilih alat sesuai tugas. Satu tugas dapat memerlukan beberapa perangkat yang saling mendukung.</li>
 <li>Bekerja dengan aman: atur posisi duduk (ergonomi), jaga keamanan akun dan berkas, rawat perangkat, dan hargai lisensi perangkat lunak.</li></ul></div>
 <div><h3>🏆 Hasil Belajarmu</h3><ul style="list-style:none;padding:0">${act.map(a=>`<li>${Store.isDone(a.id)?"✅":"⬜"} ${a.name}${sc.includes(a.id)&&Store.isDone(a.id)?` – skor ${Scores.get(a.id)}`:""}</li>`).join("")}</ul>
 <p style="font-weight:800;margin:.6em 0 0">${all?"🏅 Lencana: Penjelajah Lab Maya RPL!":"Selesaikan semua aktivitas ✅ untuk mendapatkan lencana."}</p></div></div></div>
 <div class="nav"><button class="btn blue sm" id="sumReset">↻ Ulangi dari Awal</button><button class="btn sm" data-go="menu">✔ Kembali ke Menu</button></div>`};
AFTER.summary=()=>{Store.mark("summary");let arm=false;const b=$("#sumReset");
 b.onclick=()=>{if(!arm){arm=true;b.textContent="Yakin? Tekan lagi";setTimeout(()=>{if(b.isConnected){arm=false;b.textContent="↻ Ulangi dari Awal"}},3000);return}
  Store.reset();["classify","simulate","quiz"].forEach(k=>Scores.set(k,0));seen.hardware.clear();seen.software.clear();Sound.play("whoosh");go("home")}};
