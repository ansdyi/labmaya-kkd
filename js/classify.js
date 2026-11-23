/* ===== TAHAP 5: TANTANGAN KLASIFIKASI (mouse + sentuhan via Pointer Events) ===== */
const AFTER={};
const Scores=(()=>{let m={};try{m=JSON.parse(localStorage.getItem("labmaya-rpl-scores"))||{}}catch(e){}
 return{get:k=>m[k]||0,set(k,v){m[k]=v;try{localStorage.setItem("labmaya-rpl-scores",JSON.stringify(m))}catch(e){}}}})();
DATA.classify=[["laptop","Laptop","💻","hw"],["vscode","VS Code","&lt;/&gt;","sw"],["mouse","Mouse","🖱️","hw"],["mysql","Database","🐬","sw"],["monitor","Monitor","📺","hw"],["windows","Windows","🪟","sw"],["keyboard","Keyboard","⌨️","hw"],["unity","Unity","🧊","sw"],["headset","Headset","🎧","hw"],["chrome","Chrome","🌐","sw"]].map(([id,name,icon,type])=>({id,name,icon,type}));
const CL={place:{},locked:{},score:0,picked:null};
const ZN={hw:"hardware",sw:"software"};
pages.classify=()=>{CL.place={};CL.locked={};CL.score=0;CL.picked=null;
 const z=(k,t,s)=>`<div class="zone ${k}" data-zone="${k}" tabindex="0" aria-label="Zona ${t}"><div class="zh">${k==="hw"?"🖥️":"&lt;/&gt;"} ${t} <small>(${s})</small></div><div class="drop" id="z-${k}"></div></div>`;
 return `${char("m","l mini")}${char("f","r mini")}<div class="ttl">Tantangan Klasifikasi<small>Seret kartu ke kategori yang tepat</small></div>
 <div class="say">Kelompokkan setiap alat ke dalam kategori yang tepat. Perhatikan bahwa hardware merupakan perangkat fisik, sedangkan software berupa program atau aplikasi.</div>
 <div class="score" id="score"></div>${z("hw","Perangkat Keras","Hardware")}${z("sw","Perangkat Lunak","Software")}
 <div class="fb" id="fb">Seret kartu ke zona (atau ketuk kartu, lalu ketuk zona), kemudian tekan Periksa.</div><div class="tray" id="z-tray"></div>
 <div class="nav"><button class="btn blue sm" id="clReset">↻ Reset</button><button class="btn sm" id="clCheck">✔ Periksa</button></div>`;};
AFTER.classify=()=>{clDraw();$("#clReset").onclick=()=>{Sound.play("whoosh");render()};$("#clCheck").onclick=clCheck};
function clCard(c){const lk=CL.locked[c.id];return `<div class="card${lk?" ok":""}${CL.picked===c.id?" pick":""}" data-c="${c.id}" tabindex="0" role="button" aria-label="${c.name}"><span>${c.icon}</span>${c.name}${lk?"<i>✓</i>":""}</div>`}
function clDraw(){const by=z=>DATA.classify.filter(c=>(CL.place[c.id]||"tray")===z).map(clCard).join("");
 ["hw","sw","tray"].forEach(z=>$("#z-"+z).innerHTML=by(z));
 $("#score").innerHTML=`⭐ Skor: ${CL.score}<b>${Object.keys(CL.place).length}/10</b>`;}
function clMove(id,z){if(CL.locked[id])return;if(z==="tray")delete CL.place[id];else CL.place[id]=z;CL.picked=null;clDraw()}
function clCheck(){const ids=Object.keys(CL.place).filter(id=>!CL.locked[id]);
 if(!ids.length){toast("Letakkan kartu ke zona dulu, lalu tekan Periksa");return}
 let ok=0;const bad=[];
 ids.forEach(id=>{const c=DATA.classify.find(x=>x.id===id);if(c.type===CL.place[id]){CL.locked[id]=true;CL.score+=10;ok++}else bad.push(c)});
 clDraw();bad.forEach(c=>{const el=document.querySelector(`[data-c="${c.id}"]`);el&&el.classList.add("bad")});
 Sound.play(bad.length?"bad":"good");if(ok&&bad.length)setTimeout(()=>Sound.play("good"),250);
 const total=Object.keys(CL.locked).length;let msg=`✅ ${ok} benar.`;
 if(bad.length)msg+=` ❌ Perlu diperbaiki: ${bad.map(c=>`${c.name} (bukan ${ZN[c.type]==="hardware"?"software":"hardware"})`).join(", ")}. Ingat: hardware = perangkat fisik, software = program atau aplikasi.`;
 if(total===10){msg=`🎉 Semua benar! Skor akhir ${CL.score}/100. Kamu menguasai klasifikasi hardware dan software.`;Store.mark("classify");Scores.set("classify",Math.max(CL.score,Scores.get("classify")));Sound.play("good");toast("Tantangan selesai 🏅")}
 $("#fb").textContent=msg;
 setTimeout(()=>{if(!$("#z-tray"))return;bad.forEach(c=>delete CL.place[c.id]);clDraw()},1500);}
let drag=null,clSkip=false;
const zoneAt=e=>{const t=document.elementFromPoint(e.clientX,e.clientY),z=t&&t.closest("[data-zone]");return z?z.dataset.zone:(t&&t.closest("#z-tray")?"tray":null)};
const endDrag=()=>{if(drag&&drag.ghost)drag.ghost.remove();document.querySelectorAll(".zone").forEach(n=>n.classList.remove("over"));drag=null;clSkip=true;setTimeout(()=>clSkip=false,60)};
document.addEventListener("pointerdown",e=>{const c=e.target.closest(".card");if(!c||!$("#z-tray")||CL.locked[c.dataset.c])return;
 drag={id:c.dataset.c,x:e.clientX,y:e.clientY,moved:false,el:c,ghost:null};e.preventDefault()});
document.addEventListener("pointermove",e=>{if(!drag)return;
 if(!drag.moved){if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<6)return;drag.moved=true;
  const g=drag.el.cloneNode(true);g.className="card ghost";$("#stage").appendChild(g);drag.ghost=g;drag.el.classList.add("dim");Sound.play("click")}
 drag.ghost.style.left=e.clientX+"px";drag.ghost.style.top=e.clientY+"px";
 const z=zoneAt(e);document.querySelectorAll(".zone").forEach(n=>n.classList.toggle("over",n.dataset.zone===z))});
document.addEventListener("pointerup",e=>{if(!drag)return;const d=drag;
 if(d.moved){const z=zoneAt(e);endDrag();if(z){Sound.play("drop");clMove(d.id,z)}else clDraw()}
 else{endDrag();CL.picked=CL.picked===d.id?null:d.id;Sound.play("click");clDraw()}});
document.addEventListener("pointercancel",()=>{if(drag){endDrag();if($("#z-tray"))clDraw()}});
document.addEventListener("click",e=>{if(clSkip||!$("#z-tray"))return;
 const z=e.target.closest("[data-zone],#z-tray");if(z&&CL.picked&&!e.target.closest(".card"))clMove(CL.picked,z.dataset.zone||"tray")});
document.addEventListener("keydown",e=>{if(!$("#z-tray")||(e.key!=="Enter"&&e.key!==" "))return;
 const c=e.target.closest(".card"),z=e.target.closest("[data-zone]");
 if(c&&!CL.locked[c.dataset.c]){e.preventDefault();CL.picked=CL.picked===c.dataset.c?null:c.dataset.c;clDraw();const n=document.querySelector(`[data-c="${CL.picked}"]`);n&&n.focus()}
 else if(z&&CL.picked){e.preventDefault();clMove(CL.picked,z.dataset.zone)}});
