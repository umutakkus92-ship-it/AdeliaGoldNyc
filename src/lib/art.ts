/* Gold jewelry SVG renderer, ported verbatim from the prototype.
 * Used as placeholder imagery until real product photographs are uploaded.
 * Output is generated only from the whitelisted type keys and fixed colours below,
 * so it is safe to inject with dangerouslySetInnerHTML. */
/* eslint-disable */

export const ART_TYPES = new Set(["cuban","rope","franco","paperclip","herringbone","cubanbr","set","ring-solitaire","ring-signet","ring-band","hoops","bangle","tennis","pendant-disc","pendant-halo","diamond","watch","watch-dia","coin","coins","coins-s","bar","bars","bars-s","minibar"]);

const TK: Record<string,string>={Yellow:"Y",White:"W",Rose:"R",Gold:"Y",Silver:"W","Two-tone":"Y"};
function starP(cx:number,cy:number,r1:number,r2:number,n=5){let d="";for(let i=0;i<n*2;i++){const r=i%2?r2:r1,a=Math.PI*i/n-Math.PI/2;d+=(i?"L":"M")+(cx+r*Math.cos(a)).toFixed(1)+" "+(cy+r*Math.sin(a)).toFixed(1)}return d+"Z"}
const mtl=(t:string)=>t==="W"?"SILVER":"GOLD";
function coinArt(t:string,cx=200,cy=205,r=128){const T=`url(#g${t})`,R=`url(#r${t})`,ink="rgba(60,38,8,.5)";
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${T}"/><circle cx="${cx}" cy="${cy}" r="${r-3}" fill="none" stroke="rgba(40,25,5,.4)" stroke-width="6" stroke-dasharray="1.2 2.4"/><circle cx="${cx}" cy="${cy}" r="${r*.89}" fill="${R}"/><circle cx="${cx}" cy="${cy}" r="${r*.78}" fill="none" stroke="${ink}" stroke-width="1.6"/>
  <path d="${starP(cx,cy-r*.12,r*.36,r*.15)}" fill="${T}" stroke="${ink}" stroke-width="1.2"/>
  <text x="${cx}" y="${cy+r*.5}" text-anchor="middle" font-family="Inter,sans-serif" font-size="${(r*.11).toFixed(1)}" letter-spacing="${(r*.03).toFixed(1)}" fill="${ink}">FINE ${mtl(t)}</text>
  ${Array.from({length:24},(_,i)=>{const a=2*Math.PI*i/24;return `<circle cx="${(cx+r*.83*Math.cos(a)).toFixed(1)}" cy="${(cy+r*.83*Math.sin(a)).toFixed(1)}" r="${(r*.012).toFixed(1)}" fill="${ink}"/>`}).join("")}
  <ellipse cx="${cx-r*.3}" cy="${cy-r*.35}" rx="${r*.4}" ry="${r*.16}" fill="rgba(255,255,255,.22)" transform="rotate(-35 ${cx-r*.3} ${cy-r*.35})"/>`}
function coinsArt(t:string){const T=`url(#g${t})`,R=`url(#r${t})`;let g="";for(let i=0;i<6;i++){const cy=318-i*17;g+=`<ellipse cx="150" cy="${cy+13}" rx="104" ry="30" fill="${T}"/><rect x="46" y="${cy}" width="208" height="13" fill="${T}"/><rect x="46" y="${cy}" width="208" height="13" fill="none" stroke="rgba(40,25,5,.35)" stroke-width="13" stroke-dasharray="1 2.2"/><ellipse cx="150" cy="${cy}" rx="104" ry="30" fill="${R}" stroke="rgba(40,25,5,.3)" stroke-width="1.2"/>`}
  return g+coinArt(t,282,196,92)}
function bar3d(t:string,x:number,y:number,w:number,h:number,label?:string){const T=`url(#g${t})`,R=`url(#r${t})`,ink="rgba(60,38,8,.5)";
  return `<polygon points="${x-12},${y+h} ${x+w+12},${y+h} ${x+w},${y} ${x},${y}" fill="${T}"/><polygon points="${x},${y} ${x+w},${y} ${x+w-10},${y-30} ${x+10},${y-30}" fill="${R}" stroke="rgba(40,25,5,.25)" stroke-width="1"/>
  <text x="${x+w/2}" y="${y-11}" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" letter-spacing="1.5" fill="${ink}">${label||"FINE "+mtl(t)}</text><path d="M${x-6} ${y+h-4}H${x+w+6}" stroke="rgba(255,250,232,.5)" stroke-width="2"/>`}
function barArt(t:string){const T=`url(#g${t})`,R=`url(#r${t})`,ink="rgba(60,38,8,.55)";
  return `<g transform="rotate(-10 200 205)"><rect x="70" y="120" width="260" height="170" rx="16" fill="${T}"/><rect x="88" y="138" width="224" height="134" rx="10" fill="${R}" stroke="rgba(40,25,5,.3)" stroke-width="1.5"/>
  <text x="200" y="190" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="34" fill="${ink}">FINE ${mtl(t)}</text><text x="200" y="228" text-anchor="middle" font-family="Inter,sans-serif" font-size="20" letter-spacing="4" fill="${ink}">${t==="W"?"999":"999.9"}</text>
  <path d="M120 248H280" stroke="${ink}" stroke-width="1"/><ellipse cx="140" cy="150" rx="60" ry="10" fill="rgba(255,255,255,.28)"/></g>`}
function barsArt(t:string){return bar3d(t,52,292,140,46)+bar3d(t,212,292,140,46)+bar3d(t,132,232,140,46)}
function minibarArt(t:string){const T=`url(#g${t})`,R=`url(#r${t})`,ink="rgba(60,38,8,.55)";
  return `<rect x="112" y="46" width="176" height="300" rx="12" fill="#F7F3EA" stroke="#D9CFBA" stroke-width="1.5"/><rect x="112" y="46" width="176" height="44" rx="12" fill="#171717"/><rect x="112" y="78" width="176" height="12" fill="#171717"/>
  <text x="200" y="74" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" letter-spacing="3" fill="#E8D3A2">FINE ${mtl(t)}</text>
  <rect x="150" y="112" width="100" height="148" rx="8" fill="${T}"/><rect x="159" y="121" width="82" height="130" rx="5" fill="${R}" stroke="rgba(40,25,5,.3)"/>
  <text x="200" y="182" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="20" fill="${ink}">${mtl(t)}</text><text x="200" y="206" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" letter-spacing="2" fill="${ink}">${t==="W"?"999":"999.9"}</text>
  <rect x="136" y="282" width="128" height="5" rx="2" fill="#D9CFBA"/><rect x="152" y="296" width="96" height="5" rx="2" fill="#E5DDCB"/><rect x="164" y="310" width="72" height="5" rx="2" fill="#E5DDCB"/>`}
function along(fx:(t:number)=>number[],n:number){const N=400,pts:number[][]=[];let L=0,prev=fx(0);pts.push([prev[0],prev[1],0]);for(let i=1;i<=N;i++){const q=fx(i/N);L+=Math.hypot(q[0]-prev[0],q[1]-prev[1]);pts.push([q[0],q[1],L]);prev=q}
  const out:number[][]=[];let j=0;for(let k=0;k<n;k++){const target=L*k/(n-1);while(j<N&&pts[j+1][2]<target)j++;const a=pts[j],b=pts[Math.min(j+1,N)];const ang=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI;out.push([a[0],a[1],ang])}return out}
const hl=(_sw?:number)=>`rgba(255,250,232,.55)`;
function link(kind:string,x:number,y:number,a:number,t:string,i:number,s:number):string{
  const T=`url(#g${t})`,f=(v:number)=>v.toFixed(1);
  if(kind==="cuban"){const fl=i%2?.66:1,rx=s*1.7,ry=s*1.05*fl,sw=s*.85;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a+(i%2?0:0))})"><ellipse rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="${T}" stroke-width="${f(sw)}"/><ellipse rx="${f(rx)}" ry="${f(ry)}" fill="none" stroke="rgba(40,25,5,.35)" stroke-width="${f(sw*.12)}" transform="translate(0 ${f(sw*.35)})"/><path d="M${f(-rx*.6)} ${f(-ry-sw*.15)} Q0 ${f(-ry-sw*.5)} ${f(rx*.6)} ${f(-ry-sw*.15)}" fill="none" stroke="${hl()}" stroke-width="${f(sw*.2)}" stroke-linecap="round"/></g>`}
  if(kind==="rope"){return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a+38)})"><ellipse rx="${f(s*1.25)}" ry="${f(s*.55)}" fill="${T}" stroke="rgba(50,30,5,.45)" stroke-width="${f(s*.12)}"/><ellipse rx="${f(s*.7)}" ry="${f(s*.14)}" fill="${hl()}" transform="translate(${f(-s*.2)} ${f(-s*.18)})"/></g>`}
  if(kind==="franco"){const w=s*1.3,h=s*1.1;return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"><rect x="${f(-w)}" y="${f(-h)}" width="${f(2*w)}" height="${f(2*h)}" rx="${f(h*.45)}" fill="${T}" stroke="rgba(40,25,5,.45)" stroke-width="${f(s*.12)}"/><path d="M${f(-w*.7)} ${f(-h*.1)} L0 ${f(h*.55)} L${f(w*.7)} ${f(-h*.1)}" fill="none" stroke="rgba(40,25,5,.35)" stroke-width="${f(s*.14)}"/><rect x="${f(-w*.75)}" y="${f(-h*.82)}" width="${f(w*1.5)}" height="${f(h*.25)}" rx="${f(h*.12)}" fill="${hl()}"/></g>`}
  if(kind==="paperclip"){const rx=s*2.1,ry=s*.75;return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})"><rect x="${f(-rx)}" y="${f(-ry)}" width="${f(2*rx)}" height="${f(2*ry)}" rx="${f(ry)}" fill="none" stroke="${T}" stroke-width="${f(s*.42)}"/></g>`}
  return "";
}
function chainOn(kind:string,fx:(t:number)=>number[],n:number,t:string,s:number,backTest?:(x:number,y:number)=>boolean){const P=along(fx,n);let back="",front="";
  const draw=(arr:number[][],par:number)=>arr.forEach(([x,y,a],i)=>{if(i%2!==par)return;const g=link(kind,x,y,a,t,i,s);if(backTest&&backTest(x,y))back+=g;else front+=g});
  if(kind==="cuban"){draw(P,0);draw(P,1)}else{draw(P,0);draw(P,1)}
  return (back?`<g opacity=".72">${back}</g>`:"")+front}
function stone(cx:number,cy:number,r:number){const f=(v:number)=>v.toFixed(1),t=cy-r*.55,g=cy,b=cy+r*.95;
  return `<g><polygon points="${f(cx-r*.55)},${f(t)} ${f(cx+r*.55)},${f(t)} ${f(cx+r)},${f(g)} ${f(cx-r)},${f(g)}" fill="url(#dA)"/><polygon points="${f(cx-r)},${f(g)} ${f(cx+r)},${f(g)} ${f(cx)},${f(b)}" fill="url(#dC)"/>
  <polygon points="${f(cx-r*.55)},${f(t)} ${f(cx-r*.15)},${f(g)} ${f(cx-r)},${f(g)}" fill="url(#dB)" opacity=".8"/><polygon points="${f(cx+r*.55)},${f(t)} ${f(cx+r*.15)},${f(g)} ${f(cx+r)},${f(g)}" fill="url(#dB)" opacity=".55"/>
  <polygon points="${f(cx-r*.15)},${f(g)} ${f(cx+r*.15)},${f(g)} ${f(cx)},${f(b)}" fill="#FFFFFF" opacity=".55"/>
  <path d="M${f(cx-r*.55)} ${f(t)} L${f(cx-r*.15)} ${f(g)} L${f(cx)} ${f(t)} L${f(cx+r*.15)} ${f(g)} L${f(cx+r*.55)} ${f(t)} M${f(cx-r)} ${f(g)} L${f(cx)} ${f(b)} L${f(cx+r)} ${f(g)} M${f(cx-r*.5)} ${f(g)} L${f(cx)} ${f(b)} L${f(cx+r*.5)} ${f(g)}" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="${f(Math.max(.6,r*.03))}"/></g>`}
function sparkle(x:number,y:number,s:number,cls=""){return `<g class="${cls}" style="transform-origin:${x}px ${y}px"><path d="M${x} ${y-s}L${x+s*.18} ${y-s*.18}L${x+s} ${y}L${x+s*.18} ${y+s*.18}L${x} ${y+s}L${x-s*.18} ${y+s*.18}L${x-s} ${y}L${x-s*.18} ${y-s*.18}Z" fill="#FFFDF6"/><circle cx="${x}" cy="${y}" r="${s*.35}" fill="#FFFFFF" filter="url(#glow)"/></g>`}
function band(t:string,cx:number,cy:number,rx:number,ry:number,sw:number,opts:{mid?:string}={}){const T=`url(#g${t})`;
  const backP=`M${cx-rx} ${cy} A${rx} ${ry} 0 0 1 ${cx+rx} ${cy}`,frontP=`M${cx-rx} ${cy} A${rx} ${ry} 0 0 0 ${cx+rx} ${cy}`;
  return `<path d="${backP}" fill="none" stroke="${T}" stroke-width="${sw*.86}"/><path d="${backP}" fill="none" stroke="rgba(30,18,4,.38)" stroke-width="${sw*.86}"/>
  ${opts.mid||""}
  <path d="${frontP}" fill="none" stroke="${T}" stroke-width="${sw}"/>
  <path d="M${cx-rx*.75} ${cy+ry*.62} A${rx} ${ry} 0 0 0 ${cx+rx*.35} ${cy+ry*.94}" fill="none" stroke="rgba(255,250,232,.6)" stroke-width="${sw*.16}" stroke-linecap="round" transform="translate(0 ${-sw*.22})"/>
  <path d="${frontP}" fill="none" stroke="rgba(40,25,5,.25)" stroke-width="1.2" transform="translate(0 ${sw/2})"/>`}
function watchArt(t:string,dia:boolean){const T=`url(#g${t})`,R=`url(#r${t})`,dial=t==="Y"?"#E9DBB8":t==="R"?"#4A2E24":"#1E2632",ink=t==="Y"?"#3A2A12":"#EDE6D6",mk=t==="Y"?"#8A6420":"#D9C08A";
  let L="";for(let i=0;i<5;i++){const w=86+i*4;[14+i*21,368-i*21].forEach(y=>{L+=`<rect x="${200-w/2}" y="${y}" width="${w}" height="18" rx="4" fill="${T}"/><rect x="${(200-w*.18).toFixed(1)}" y="${y+2}" width="${(w*.36).toFixed(1)}" height="14" rx="3" fill="${R}"/>`})}
  let I="";for(let i=0;i<12;i++){const big=i%3===0;I+=`<rect x="198" y="${big?138:142}" width="4" height="${big?17:10}" rx="1.5" fill="${mk}" transform="rotate(${i*30} 200 200)"/>`}
  let B="";if(dia){for(let i=0;i<34;i++){const a=2*Math.PI*i/34,x=200+82*Math.cos(a),y=200+82*Math.sin(a);B+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5.3" fill="url(#dA)" stroke="rgba(255,255,255,.7)" stroke-width=".6"/>`}}else B=`<circle cx="200" cy="200" r="82" fill="none" stroke="rgba(50,30,5,.38)" stroke-width="11" stroke-dasharray="1.5 3.1"/>`;
  return `${L}<rect x="288" y="187" width="17" height="26" rx="4" fill="${T}"/><circle cx="200" cy="200" r="97" fill="${T}"/><circle cx="200" cy="200" r="89" fill="${R}"/>${B}<circle cx="200" cy="200" r="72" fill="${dial}"/><circle cx="200" cy="200" r="72" fill="none" stroke="${T}" stroke-width="3"/>${I}
  <rect x="236" y="193" width="20" height="14" rx="2" fill="#F7F3EA" stroke="${mk}" stroke-width="1"/>
  <path d="M200 200V157" stroke="${ink}" stroke-width="5.5" stroke-linecap="round" transform="rotate(-58 200 200)"/><path d="M200 200V141" stroke="${ink}" stroke-width="3.6" stroke-linecap="round" transform="rotate(52 200 200)"/><path d="M200 214V138" stroke="#B8924F" stroke-width="1.4" transform="rotate(158 200 200)"/><circle cx="200" cy="200" r="5" fill="${T}"/>
  <ellipse cx="174" cy="168" rx="48" ry="22" fill="rgba(255,255,255,.13)" transform="rotate(-35 174 168)"/>${dia?sparkle(270,128,12):""}`}
export function artSvg(type:string|null|undefined,color:string="Yellow"):string{
  if(!type||!ART_TYPES.has(type))type="ring-band";
  let t=TK[color]||"Y";if(type&&type.endsWith("-s")){t="W";type=type.slice(0,-2)}const T=`url(#g${t})`,R=`url(#r${t})`;let g="";
  const hang=(x0:number,x1:number,top:number,amp:number)=>(tt:number)=>[x0+(x1-x0)*tt,top+amp*Math.sin(Math.PI*tt)];
  switch(type){
   case "cuban":g=chainOn("cuban",hang(46,354,70,230),24,t,10.5);break;
   case "rope":g=chainOn("rope",hang(56,344,70,236),92,t,7.4);break;
   case "franco":g=chainOn("franco",hang(56,344,70,232),34,t,7.6);break;
   case "paperclip":g=chainOn("paperclip",hang(60,340,66,240),22,t,8.5);break;
   case "herringbone":g=`<path d="M64 60 Q200 380 336 60" fill="none" stroke="${T}" stroke-width="22" stroke-linecap="round"/><path d="M64 60 Q200 380 336 60" fill="none" stroke="rgba(50,30,5,.38)" stroke-width="20" stroke-dasharray="1.6 2.6"/><path d="M70 58 Q200 366 330 58" fill="none" stroke="rgba(255,250,230,.55)" stroke-width="3" stroke-linecap="round"/>`;break;
   case "cubanbr":g=chainOn("cuban",(tt:number)=>[200+132*Math.cos(2*Math.PI*tt),210+78*Math.sin(2*Math.PI*tt)],27,t,11,(_x:number,y:number)=>y<205);break;
   case "set":g=`<g transform="translate(0 -18)">${chainOn("cuban",hang(60,340,50,190),20,t,9.5)}</g><g transform="translate(118 222) scale(.42)">${chainOn("cuban",(tt:number)=>[200+132*Math.cos(2*Math.PI*tt),210+78*Math.sin(2*Math.PI*tt)],27,t,11,(_x:number,y:number)=>y<205)}</g>`;break;
   case "ring-band":g=band(t,200,232,120,64,32);break;
   case "ring-signet":g=band(t,200,250,112,60,26,{mid:`<ellipse cx="200" cy="186" rx="58" ry="30" fill="${R}" stroke="${T}" stroke-width="6"/><ellipse cx="200" cy="186" rx="42" ry="20" fill="none" stroke="rgba(40,25,5,.3)" stroke-width="1.5"/><text x="200" y="196" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="30" font-style="italic" fill="rgba(60,38,8,.55)">A</text>`});break;
   case "ring-solitaire":g=band(t,200,262,112,60,20)+`<path d="M182 206 L174 164 M218 206 L226 164 M192 204 L188 170 M208 204 L212 170" stroke="${T}" stroke-width="6" stroke-linecap="round"/>${stone(200,160,40)}${sparkle(236,124,14)}${sparkle(160,146,7)}`;break;
   case "hoops":g=`<g opacity=".85"><ellipse cx="248" cy="206" rx="70" ry="104" fill="none" stroke="${T}" stroke-width="17"/></g><ellipse cx="152" cy="216" rx="70" ry="104" fill="none" stroke="${T}" stroke-width="17"/><path d="M98 160 A70 104 0 0 1 152 112" fill="none" stroke="rgba(255,250,232,.6)" stroke-width="3" stroke-linecap="round"/>`;break;
   case "bangle":g=band(t,200,220,142,74,24);break;
   case "tennis":{let d="";for(let k=0;k<=14;k++){const th=Math.PI*(.06+.88*k/14),x=200+142*Math.cos(th),y=222+74*Math.sin(th);d+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10.5" fill="${T}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7.5" fill="url(#dA)"/><path d="M${(x-4).toFixed(1)} ${y.toFixed(1)}h8M${x.toFixed(1)} ${(y-4).toFixed(1)}v8" stroke="#fff" stroke-width=".9" opacity=".8"/>`}
     g=band(t,200,222,142,74,9)+d+sparkle(150,290,9)+sparkle(270,286,6);break}
   case "pendant-disc":g=`<path d="M108 30 Q200 250 292 30" fill="none" stroke="${T}" stroke-width="4" stroke-dasharray="5 2.4"/><rect x="192" y="134" width="16" height="22" rx="7" fill="${T}"/><circle cx="200" cy="230" r="72" fill="${R}"/><circle cx="200" cy="230" r="72" fill="none" stroke="${T}" stroke-width="7"/><circle cx="200" cy="230" r="56" fill="none" stroke="rgba(40,25,5,.25)" stroke-width="1.5"/><text x="200" y="256" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="78" font-style="italic" fill="rgba(60,38,8,.42)">A</text><ellipse cx="176" cy="196" rx="22" ry="10" fill="rgba(255,255,255,.35)" transform="rotate(-30 176 196)"/>`;break;
   case "pendant-halo":{let h="";for(let k=0;k<14;k++){const a=2*Math.PI*k/14,x=200+40*Math.cos(a),y=232+40*Math.sin(a);h+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7.2" fill="url(#dA)" stroke="${T}" stroke-width="1.6"/>`}
     g=`<path d="M108 30 Q200 250 292 30" fill="none" stroke="${T}" stroke-width="3.4" stroke-dasharray="5 2.4"/><rect x="194" y="134" width="12" height="28" rx="5" fill="${T}"/><circle cx="200" cy="232" r="52" fill="none" stroke="${T}" stroke-width="7"/>${h}<circle cx="200" cy="232" r="27" fill="${T}"/>${stone(200,236,24)}${sparkle(228,200,12)}`;break}
   case "diamond":g=`${stone(200,210,110)}${sparkle(296,112,20)}${sparkle(118,150,10)}${sparkle(250,300,8)}`;break;
   case "coin":g=coinArt(t);break;
   case "coins":g=coinsArt(t);break;
   case "bar":g=barArt(t);break;
   case "bars":g=barsArt(t);break;
   case "minibar":g=minibarArt(t);break;
   case "watch":g=watchArt(t,false);break;
   case "watch-dia":g=watchArt(t,true);break;
   default:g=band(t,200,232,120,64,32);
  }
  return `<svg viewBox="0 0 400 400" aria-hidden="true"><g filter="url(#sh)">${g}</g></svg>`;
}

/** Shared gradients/filters referenced by every render. Mount once per page (in the root layout). */
export const GOLD_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
<defs>
  <linearGradient id="gY" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5E400F"/><stop offset=".18" stop-color="#A97A26"/><stop offset=".36" stop-color="#F7E1A4"/><stop offset=".48" stop-color="#DDB257"/><stop offset=".66" stop-color="#8A6220"/><stop offset=".84" stop-color="#EBCB7C"/><stop offset="1" stop-color="#6E4C16"/></linearGradient>
  <linearGradient id="gW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#55595E"/><stop offset=".18" stop-color="#9EA3A9"/><stop offset=".36" stop-color="#FAFBFC"/><stop offset=".48" stop-color="#CDD1D6"/><stop offset=".66" stop-color="#7B8087"/><stop offset=".84" stop-color="#E6E9EC"/><stop offset="1" stop-color="#5F6368"/></linearGradient>
  <linearGradient id="gR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6B3A2A"/><stop offset=".18" stop-color="#B27660"/><stop offset=".36" stop-color="#FAD7C7"/><stop offset=".48" stop-color="#D99B82"/><stop offset=".66" stop-color="#8C5442"/><stop offset=".84" stop-color="#EEBCA6"/><stop offset="1" stop-color="#6E3D2E"/></linearGradient>
  <radialGradient id="rY" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#FFF1C4"/><stop offset=".3" stop-color="#E7C470"/><stop offset=".7" stop-color="#A57724"/><stop offset="1" stop-color="#5E400F"/></radialGradient>
  <radialGradient id="rW" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".3" stop-color="#DCE0E4"/><stop offset=".7" stop-color="#959AA1"/><stop offset="1" stop-color="#55595E"/></radialGradient>
  <radialGradient id="rR" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#FFE4D8"/><stop offset=".3" stop-color="#E5AA92"/><stop offset=".7" stop-color="#A36752"/><stop offset="1" stop-color="#6B3A2A"/></radialGradient>
  <linearGradient id="dA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".45" stop-color="#E3ECF4"/><stop offset=".7" stop-color="#A9BACB"/><stop offset="1" stop-color="#F4F8FB"/></linearGradient>
  <linearGradient id="dB" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FA3B7"/><stop offset=".5" stop-color="#FFFFFF"/><stop offset="1" stop-color="#C5D3E0"/></linearGradient>
  <linearGradient id="dC" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#6E8398"/><stop offset=".6" stop-color="#D6E2EC"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient>
  <filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#2A1C06" flood-opacity=".35"/></filter>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
</defs>
</svg>`;
