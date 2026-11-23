/* ===== KARAKTER (SVG sementara; ganti dengan gambar asli di versi ZIP) ===== */
const char = (g, cls) => {
  if (DATA.charSrc && DATA.charSrc[g]) return `<img class="char ${cls}" src="${DATA.charSrc[g]}" alt="">`;
  const f = g === "f";
  return `<svg class="char ${cls}" viewBox="0 0 200 320" aria-hidden="true">
  <path d="M30 320 L40 200 Q100 170 160 200 L170 320Z" fill="#4a2c24"/>
  <path d="M60 190 L100 230 L140 190 L145 205 L100 245 L55 205Z" fill="#a8d62c"/>
  <rect x="75" y="245" width="50" height="22" rx="4" fill="#a8d62c"/><text x="100" y="262" font-size="14" font-weight="900" text-anchor="middle" fill="#333">RPL</text>
  ${f?`<path d="M40 110 Q40 30 100 30 Q160 30 160 110 L168 190 Q100 215 32 190Z" fill="#a8d62c"/>`:`<path d="M52 100 Q50 38 100 34 Q152 38 148 100 Q120 60 52 100Z" fill="#3a2418"/>`}
  <ellipse cx="100" cy="112" rx="42" ry="48" fill="#f6d2b4"/>
  ${f?`<path d="M55 95 Q100 40 145 95 Q140 70 100 62 Q60 70 55 95Z" fill="#a8d62c"/>`:`<path d="M58 98 Q62 58 100 56 Q140 58 142 98 Q110 76 58 98Z" fill="#3a2418"/>`}
  <ellipse cx="82" cy="112" rx="6" ry="9" fill="#3a2418"/><ellipse cx="118" cy="112" rx="6" ry="9" fill="#3a2418"/>
  <path d="M84 135 Q100 152 116 135 Q100 142 84 135Z" fill="#c2453a"/>
  <ellipse cx="72" cy="128" rx="7" ry="4" fill="#f4a39a" opacity=".7"/><ellipse cx="128" cy="128" rx="7" ry="4" fill="#f4a39a" opacity=".7"/></svg>`;
};
const logo = `<svg viewBox="0 0 100 100" aria-label="Logo SMK TEXAR"><path d="M50 4 96 38 78 94H22L4 38Z" fill="#1e88e5" stroke="#1565c0" stroke-width="3"/><circle cx="50" cy="40" r="14" fill="#ffc928"/><path d="M50 26v40M38 66h24" stroke="#0a2a6b" stroke-width="5"/><text x="50" y="86" font-size="11" font-weight="900" text-anchor="middle" fill="#fff">TEXAR</text></svg>`;
