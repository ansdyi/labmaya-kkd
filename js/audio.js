/* ===== AUDIO: musik latar, ambience, SFX, voice-over (MP3 bila ada; jika tidak, bunyi sintetis / Web Speech) ===== */
const Sound=(()=>{
  /* Level sesuai PDF: BGM 15-20%, ambience 10-15%, SFX 50-70%, voice-over 80-90% */
  const LV={bgm:.3,amb:.12,sfx:.6,vo:.85};
  const S={master:true,music:true,voice:true,ttsOn:false,vol:.8}; /* ttsOn: suara bawaan perangkat (sintetis) HANYA bila dinyalakan; default memakai rekaman MP3 */
  try{Object.assign(S,JSON.parse(localStorage.getItem("labmaya-rpl-audio"))||{})}catch(e){}
  const save=()=>{try{localStorage.setItem("labmaya-rpl-audio",JSON.stringify(S))}catch(e){}};
  let ctx=null,started=false,bgmOn=false,bgmT=null,ambNode=null,fileBgm=null,fileAmb=null,vAudio=null;
  const ac=()=>ctx||(ctx=new (window.AudioContext||window.webkitAudioContext)());
  const tone=(f,d,type="sine",g=.15,t0=0,lv=LV.sfx)=>{
    try{const c=ac(),o=c.createOscillator(),a=c.createGain(),t=c.currentTime+t0;
      o.type=type;o.frequency.value=f;a.gain.setValueAtTime(g*S.vol*(lv/.6),t);a.gain.exponentialRampToValueAtTime(.0001,t+d);
      o.connect(a).connect(c.destination);o.start(t);o.stop(t+d)}catch(e){}};
  const synth={
    hover:()=>tone(900,.05,"sine",.05),click:()=>tone(520,.09,"triangle",.18),pop:()=>tone(700,.1,"sine",.16),drop:()=>tone(330,.12,"triangle",.2),
    whoosh:()=>{tone(300,.18,"sawtooth",.05);tone(600,.18,"sine",.05,.05)},
    good:()=>[660,880,1100].forEach((f,i)=>tone(f,.2,"sine",.16,i*.1)),
    bad:()=>tone(160,.25,"square",.1),
    win:()=>[523,659,784,1047,1319].forEach((f,i)=>tone(f,.35,"triangle",.2,i*.13))
  };
  const play=n=>{if(!S.master)return;const f=DATA.audioFiles[n];
    if(f){try{const a=new Audio(f);a.volume=LV.sfx*S.vol;a.play().catch(()=>{});return}catch(e){}}
    (synth[n]||synth.click)()};
  const MID=m=>440*Math.pow(2,(m-69)/12),BEAT=60/68;
  const JZ=[{b:38,v:[53,57,60,64],s:[0,3,7,5]},{b:43,v:[53,59,62,64],s:[0,4,7,9]},{b:48,v:[55,59,62,64],s:[0,4,7,11]},{b:45,v:[55,60,64,67],s:[0,3,7,5]}],PENT=[72,74,76,79,81,84];let bar=0;
  const jn=(f,t,d,g,type="sine",att=.02)=>{try{const c=ac(),o=c.createOscillator(),a=c.createGain(),v=g*S.vol*LV.bgm;o.type=type;o.frequency.value=f;
    a.gain.setValueAtTime(.0001,t);a.gain.linearRampToValueAtTime(v,t+att);a.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(a).connect(c.destination);o.start(t);o.stop(t+d+.05)}catch(e){}};
  const brush=(t,g)=>{try{const c=ac(),n=Math.floor(c.sampleRate*.12),b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);
    const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type="highpass";f.frequency.value=5000;const a=c.createGain();a.gain.value=g*S.vol*LV.bgm;s.connect(f).connect(a).connect(c.destination);s.start(t)}catch(e){}};
  /* Jazz santai: piano elektrik (Dm9-G13-Cmaj9-Am7), bass berjalan, sapuan brush, melodi pentatonik acak lembut */
  const playBar=()=>{const t=ac().currentTime+.08,ch=JZ[bar++%4];
    ch.v.forEach((m,i)=>{jn(MID(m),t+i*.012,BEAT*3.2,.4,"triangle",.04);jn(MID(m)*2,t+i*.012,BEAT*1.5,.08,"sine",.03);jn(MID(m),t+BEAT*1.67,BEAT*.7,.25,"triangle",.02)});
    ch.s.forEach((iv,k)=>{jn(MID(ch.b+iv),t+k*BEAT,BEAT*.9,.9,"sine",.012);jn(MID(ch.b+iv)*2,t+k*BEAT,BEAT*.6,.25,"sine",.012)});
    [1,3].forEach(k=>brush(t+k*BEAT,.35));brush(t+2.67*BEAT,.18);
    for(let k=0;k<4;k++)if(Math.random()<.55)jn(MID(PENT[Math.floor(Math.random()*PENT.length)]),t+(k+(Math.random()<.5?0:.67))*BEAT,BEAT*.9,.4,"sine",.03)};
  const bgmLoop=()=>{if(!bgmOn)return;playBar();bgmT=setTimeout(bgmLoop,BEAT*4000)};
  const startBgm=()=>{if(bgmOn)return;bgmOn=true;
    if(DATA.audioFiles.bgm){fileBgm=new Audio(DATA.audioFiles.bgm);fileBgm.loop=true;fileBgm.volume=LV.bgm*S.vol;fileBgm.play().catch(()=>{})}else bgmLoop()};
  const stopBgm=()=>{bgmOn=false;clearTimeout(bgmT);if(fileBgm){fileBgm.pause();fileBgm=null}};
  const startAmb=()=>{if(ambNode||fileAmb||DATA.audioFiles.bgm)return;
    if(DATA.audioFiles.ambience){fileAmb=new Audio(DATA.audioFiles.ambience);fileAmb.loop=true;fileAmb.volume=LV.amb*S.vol;fileAmb.play().catch(()=>{});return}
    try{const c=ac(),b=c.createBuffer(1,c.sampleRate*2,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
      const s=c.createBufferSource();s.buffer=b;s.loop=true;const f=c.createBiquadFilter();f.type="lowpass";f.frequency.value=380;
      const g=c.createGain();g.gain.value=LV.amb*S.vol*.25;s.connect(f).connect(g).connect(c.destination);s.start();ambNode={s,g}}catch(e){}};
  const stopAmb=()=>{if(ambNode){try{ambNode.s.stop()}catch(e){}ambNode=null}if(fileAmb){fileAmb.pause();fileAmb=null}};
  const stopVoice=()=>{try{speechSynthesis.cancel()}catch(e){}if(vAudio){vAudio.pause();vAudio=null}};
  try{speechSynthesis.getVoices()}catch(e){}
  const pickVoice=who=>{let vs=[];try{vs=speechSynthesis.getVoices().filter(x=>/^id/i.test(x.lang))}catch(e){}
    const sc=v=>(/natural|online|neural/i.test(v.name)?4:0)+(/google/i.test(v.name)?2:0)+(who==="f"?(/gadis|damayanti|female|wanita|perempuan/i.test(v.name)?3:0):(/ardi|andika|male|pria|laki/i.test(v.name)?3:0));
    return vs.sort((a,b)=>sc(b)-sc(a))[0]||null};
  const say=(text,who,vol)=>{if(!S.ttsOn||!text||!("speechSynthesis" in window))return;
    try{const u=new SpeechSynthesisUtterance(text);u.lang="id-ID";u.rate=1;u.pitch=1;u.volume=vol;const v=pickVoice(who);if(v)u.voice=v;speechSynthesis.speak(u)}catch(e){}};
  /* rekaman manusia: assets/audio/vo-<kunci>.mp3 (atau DATA.audioFiles.voice[kunci]); jika tidak ada, pakai suara perangkat */
  const speak=(text,key,who)=>{if(!S.master||!S.voice||!started)return;stopVoice();
    const vol=Math.min(1,LV.vo*S.vol/.8),f=DATA.audioFiles.voice&&DATA.audioFiles.voice[key];if(!f){say(text,who,vol);return}
    try{const a=new Audio(f);vAudio=a;a.volume=vol;let fb=false;const fall=()=>{if(fb||vAudio!==a)return;fb=true;say(text,who,vol)};a.addEventListener("error",fall);a.play().catch(fall)}catch(e){say(text,who,vol)}};
  const apply=()=>{const on=started&&S.master&&S.music;
    if(on){try{ac().resume()}catch(e){}startBgm();startAmb();
      if(fileBgm)fileBgm.volume=LV.bgm*S.vol;if(fileAmb)fileAmb.volume=LV.amb*S.vol;if(ambNode)ambNode.g.gain.value=LV.amb*S.vol*.25}
    else{stopBgm();stopAmb()}
    if(!S.master||!S.voice)stopVoice()};
  return{S,play,speak,stopVoice,canAuto(){try{return ac().state==="running"}catch(e){return false}},
    start(){started=true;apply()},startBgm(){started=true;apply()},
    set(k,v){S[k]=v;save();apply()}};
})();
