/* ===== TAHAP 6: SIMULASI MEMILIH ALAT KERJA (kunci jawaban bisa diedit guru) ===== */
/* need = daftar kelompok wajib (salah satu dalam kelompok cukup); ok = alat pelengkap yang boleh */
DATA.simHw=[["laptop","Laptop","💻"],["pc","Casing CPU","🖥️"],["monitor","Monitor","📺"],["keyboard","Keyboard","⌨️"],["mouse","Mouse","🖱️"],["headset","Headset","🎧"]];
DATA.simSw=[["vscode","Visual Studio Code","&lt;/&gt;"],["android","Android Studio","🤖"],["unity","Unity","🧊"],["github","GitHub","🐙"],["photoshop","Photoshop","Ps"],["figma","Figma","🎨"]];
DATA.sim=[
 {icon:"&lt;/&gt;",menu:"Mengetik Kode Program",title:"Skenario 1: Mengetik Kode Program",desc:"Kamu diminta membuat program sederhana menggunakan bahasa pemrograman, lalu menjalankannya untuk diuji.",need:[["laptop",["pc","monitor","keyboard"]],["vscode"]],ok:["mouse","keyboard","monitor","headset"],why:"Menulis kode memerlukan komputer (laptop sudah lengkap dengan keyboard dan layar, atau PC dengan monitor dan keyboard) serta editor kode seperti Visual Studio Code. Android Studio khusus aplikasi Android."},
 {icon:"🎨",menu:"Membuat Desain UI",title:"Skenario 2: Membuat Desain UI",desc:"Kamu diminta merancang tampilan (antarmuka) sebuah aplikasi sebelum diprogram.",need:[["laptop",["pc","monitor","keyboard","mouse"]],["figma"]],ok:["mouse","keyboard","monitor","photoshop"],why:"Desain UI memerlukan komputer (laptop yang sudah lengkap, atau PC dengan monitor, keyboard, dan mouse) serta aplikasi desain seperti Figma. Mouse eksternal dan Photoshop boleh sebagai pelengkap."},
 {icon:"🔀",menu:"Mengelola Versi Kode",title:"Skenario 3: Mengelola Versi Kode",desc:"Kamu dan timmu perlu menyimpan setiap perubahan kode dan bekerja bersama pada proyek yang sama.",need:[["laptop",["pc","monitor","keyboard"]],["github"]],ok:["keyboard","mouse","monitor","vscode"],why:"Mengelola versi memerlukan komputer (laptop, atau PC dengan monitor dan keyboard) dan layanan version control seperti Git/GitHub."},
 {icon:"🎮",menu:"Membuat Aset Gim",title:"Skenario 4: Membuat Aset Gim",desc:"Kamu diminta menyiapkan gambar dan objek untuk prototipe gim, lalu menyusunnya di game engine.",need:[["laptop",["pc","monitor","keyboard","mouse"]],["unity"],["photoshop"]],ok:["mouse","monitor","keyboard","headset"],why:"Aset gim memerlukan komputer (laptop yang sudah lengkap, atau PC dengan monitor, keyboard, dan mouse), Photoshop untuk aset gambar, dan Unity sebagai game engine."}
];
const SM={cur:0,pick:[],res:[],solved:{},fb:[]};
const smNames=()=>Object.fromEntries([...DATA.simHw,...DATA.simSw].map(([id,n,i])=>[id,n]));
const smReset=()=>{SM.cur=0;SM.pick=DATA.sim.map(()=>({hw:new Set(),sw:new Set()}));SM.res=[];SM.solved={};SM.fb=[]};
pages.simulate=()=>{smReset();return `${char("f","r mini")}<div id="sm"></div>
 <div class="nav"><button class="btn blue sm" id="smReset">↻ Reset</button><button class="btn sm" id="smCheck">✔ Periksa</button></div>`};
AFTER.simulate=()=>{smDraw();
 $("#smReset").onclick=()=>{const c=SM.cur;SM.pick[c]={hw:new Set(),sw:new Set()};delete SM.res[c];SM.fb[c]="";Sound.play("whoosh");smDraw()};
 $("#smCheck").onclick=smCheck};
function smDraw(){const c=SM.cur,s=DATA.sim[c],p=SM.pick[c],r=SM.res[c],N=smNames(),wr=r?r.wrong:[];
 const card=(t,[id,n,ic])=>{const on=p[t].has(id),st=r&&on?(wr.includes(id)?" bad":" good"):"";
  return `<button class="pk${on?" on":""}${st}" data-pk="${id}" data-t="${t}" aria-pressed="${on}"><i>${on?(st===" bad"?"✗":"✓"):""}</i><span>${ic}</span>${n}</button>`};
 const list=t=>[...p[t]].map(id=>`<li>${N[id]}${r?(wr.includes(id)?" ❌":" ✅"):""}</li>`).join("")||`<li class="mt">belum dipilih</li>`;
 $("#sm").innerHTML=`<div class="smenu"><h4>Pilih Skenario Tugas</h4>${DATA.sim.map((x,i)=>`<button class="sc${i===c?" on":""}" data-scn="${i}"><span>${x.icon}</span>${x.menu}${SM.solved[i]?" ✅":""}</button>`).join("")}</div>
 <div class="say wide">Pilih alat yang tepat sesuai kebutuhan pekerjaan. Satu tugas dapat memerlukan beberapa perangkat yang saling mendukung.</div>
 <div class="score">⭐ ${Object.keys(SM.solved).length*25}<button class="sa" data-sc="-1" aria-label="Skenario sebelumnya">‹</button><button class="sa" data-sc="1" aria-label="Skenario berikutnya">›</button><b>${c+1} / ${DATA.sim.length}</b></div>
 <div class="scard"><h3>${s.title}</h3><p>${s.desc}</p></div>
 <div class="pg hwg"><div class="ph2">🖥️ Pilih Perangkat Keras (Hardware)</div><div class="pgrid">${DATA.simHw.map(x=>card("hw",x)).join("")}</div></div>
 <div class="pg swg"><div class="ph2 y">&lt;/&gt; Pilih Perangkat Lunak (Software)</div><div class="pgrid">${DATA.simSw.map(x=>card("sw",x)).join("")}</div></div>
 <div class="chosen"><h4>✔ Alat yang Dipilih</h4><b>Perangkat Keras:</b><ul>${list("hw")}</ul><b>Perangkat Lunak:</b><ul>${list("sw")}</ul></div>
 <div class="fb sfb">${SM.fb[c]||""}</div>`;}
function smCheck(){const c=SM.cur,s=DATA.sim[c],p=SM.pick[c],sel=new Set([...p.hw,...p.sw]),N=smNames();
 if(!sel.size){toast("Pilih alat dulu, lalu tekan Periksa");return}
 const miss=s.need.filter(g=>!g.some(x=>sel.has(x))),allowed=new Set([...s.need.flat(),...s.ok]),wrong=[...sel].filter(x=>!allowed.has(x));
 SM.res[c]={wrong};let msg;
 if(!miss.length&&!wrong.length){const first=!SM.solved[c];SM.solved[c]=true;Sound.play("good");
  msg=`✅ Tepat! ${s.why}${first?" (+25 poin)":""}`;
  if(Object.keys(SM.solved).length===DATA.sim.length){msg=`🎉 Keempat skenario selesai! Skor ${DATA.sim.length*25}/100. ${s.why}`;Store.mark("simulate");Scores.set("simulate",DATA.sim.length*25);toast("Simulasi selesai 🏅")}}
 else{Sound.play("bad");msg="❌ Jawaban kurang sesuai."+(miss.length?` Masih kurang: ${miss.map(g=>g.map(a=>Array.isArray(a)?a.map(x=>N[x]).join(" + "):N[a]).join(" atau ")).join("; ")}.`:"")+(wrong.length?` Kurang sesuai: ${wrong.map(x=>N[x]).join(", ")}.`:"")+` Petunjuk: ${s.why}`}
 SM.fb[c]=msg;smDraw();}
document.addEventListener("click",e=>{if(!$("#sm"))return;
 const k=e.target.closest("[data-pk]");if(k){const set=SM.pick[SM.cur][k.dataset.t],id=k.dataset.pk;set.has(id)?set.delete(id):set.add(id);delete SM.res[SM.cur];SM.fb[SM.cur]="";Sound.play("click");smDraw();return}
 const n=e.target.closest("[data-scn]");if(n){SM.cur=+n.dataset.scn;Sound.play("whoosh");smDraw();return}
 const a=e.target.closest("[data-sc]");if(a){SM.cur=(SM.cur+ +a.dataset.sc+DATA.sim.length)%DATA.sim.length;Sound.play("whoosh");smDraw()}});
document.addEventListener("mouseover",e=>{if(e.target.closest(".pk,.sc"))Sound.play("hover")});
