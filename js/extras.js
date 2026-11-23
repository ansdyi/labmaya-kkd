/* ===== TAHAP 8: NARASI, ANIMASI, PENYIMPANAN ===== */
DATA.voice={home:DATA.say.home,guide:DATA.say.guide,menu:DATA.say.menu,hardware:META.hardware.s,software:META.software.s,
 classify:"Kelompokkan setiap alat ke dalam kategori yang tepat. Perhatikan bahwa hardware merupakan perangkat fisik, sedangkan software berupa program atau aplikasi.",
 simulate:"Pilih alat yang tepat sesuai kebutuhan pekerjaan. Satu tugas dapat memerlukan beberapa perangkat yang saling mendukung.",
 quiz:"Jawab setiap soal dengan teliti. Pilih satu jawaban yang paling tepat.",
 summary:"Selamat! Kamu telah menyelesaikan Lab Maya RPL. Pelajari kembali bagian yang belum kamu kuasai."};
const VW={home:"m",guide:"f",menu:"f",hardware:"f",software:"m",classify:"m",simulate:"f",quiz:"m",summary:"f"};
function Narrate(id){$("#stage").classList.toggle("img",!!(DATA.bg&&DATA.bg[id]));$("#stage").classList.toggle("bsnd",!!(DATA.bsnd&&DATA.bsnd[id]));if(typeof decorate==="function")decorate(id);const t=DATA.voice[id];if(t)Sound.speak(t,id,VW[id]);else Sound.stopVoice()}
const STORE_OK=(()=>{try{localStorage.setItem("lm-t","1");localStorage.removeItem("lm-t");return true}catch(e){return false}})();
const _menu=pages.menu;
pages.menu=()=>_menu()+(STORE_OK?"":`<div class="stnote">ℹ️ Penyimpanan browser tidak tersedia di sini. Progres hanya tersimpan selama halaman ini terbuka.</div>`);
document.addEventListener("pointerdown",()=>Sound.start(),{once:true});
