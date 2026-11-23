/* ===== DATA (mudah diedit guru) ===== */
const DATA = {
  logoSrc: "assets/images/logotexar.png",
  charSrc: {}, /* gambar karakter PNG transparan, mis. {m:"assets/characters/male.png", f:"assets/characters/female.png"} */
  activities: [
    {id:"hardware", icon:"🖥️", name:"Eksplorasi Perangkat Keras", desc:"Kenali 9 perangkat", stage:"Tahap 4"},
    {id:"software", icon:"&lt;/&gt;", name:"Eksplorasi Perangkat Lunak", desc:"Kenali 7 kategori", stage:"Tahap 4"},
    {id:"classify", icon:"🧩", name:"Tantangan Klasifikasi", desc:"Seret ke kategori", stage:"Tahap 5"},
    {id:"simulate", icon:"🛠️", name:"Simulasi Memilih Alat", desc:"4 skenario kerja", stage:"Tahap 6"},
    {id:"quiz", icon:"🏆", name:"Evaluasi dan Hasil", desc:"10 soal kuis", stage:"Tahap 7"},
    {id:"summary", icon:"📘", name:"Penutup dan Rangkuman", desc:"Ringkasan belajar", stage:"Tahap 7"}
  ],
  say: {
    home:"Selamat datang di Lab Maya RPL! Jelajahi berbagai peralatan dan teknologi yang digunakan dalam pengembangan perangkat lunak dan gim.",
    guide:"Klik atau pilih objek di laboratorium untuk mengetahui nama, fungsi, dan cara penggunaannya. Selesaikan setiap tantangan dengan teliti.",
    menu:"Pilih aktivitas. Kamu boleh mengerjakannya berurutan atau memilih sendiri."
  },
  audioFiles: {voice:{home:"assets/audio/vo-home.mp3",guide:"assets/audio/vo-guide.mp3",menu:"assets/audio/vo-menu.mp3",hardware:"assets/audio/vo-hardware.mp3",software:"assets/audio/vo-software.mp3",classify:"assets/audio/vo-classify.mp3",simulate:"assets/audio/vo-simulate.mp3",result:"assets/audio/vo-result.mp3",summary:"assets/audio/vo-summary.mp3"}} /* rekaman manusia; tambah click/good/win/bgm bila ada */
};
