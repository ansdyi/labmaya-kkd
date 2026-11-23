/* ===== STORAGE (localStorage + cadangan memori) ===== */
const Store = (() => {
  let mem = {done:{}, score:0};
  const K = "labmaya-rpl-v1";
  try { const s = localStorage.getItem(K); if (s) mem = JSON.parse(s); } catch(e){}
  const save = () => { try { localStorage.setItem(K, JSON.stringify(mem)); } catch(e){} };
  return {
    isDone:id => !!mem.done[id],
    mark(id){ mem.done[id] = true; save(); },
    count:() => Object.keys(mem.done).length,
    reset(){ mem = {done:{}, score:0}; save(); }
  };
})();
