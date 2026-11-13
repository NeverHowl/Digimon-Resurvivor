/* 디지몬 RE:서바이버 · 언어 모듈 (ko / en)
 * - 번역 데이터: lang_en.js (window.DR_LANG_EN = {exact, subs, tokens, names})
 * - 번역표에 없는 문장은 한국어 그대로 표시된다(안전한 폴백).
 * - 화면(DOM) 텍스트, 캔버스 글씨, alert/confirm을 자동으로 번역한다. 한국어로 되돌리면 원문으로 복구된다.
 */
(function(){
'use strict';
const KEY='digimon-resurvivor-lang';
const HAS_KO=/[가-힣]/;
let lang=(window.DR_DEMO&&window.DR_DEMO.defaultLang==='en')?'en':'ko';
try{const v=localStorage.getItem(KEY);if(v==='en'||v==='ko')lang=v}catch(e){}
const D=()=>window.DR_LANG_EN||{};
let exactMap=null,subList=null,tokenMap=null,tokenList=[],patList=[];
const cache=new Map();
function build(){
 const d=D();exactMap=new Map(Object.entries(d.exact||{}));
 patList=(d.pats||[]).map(([ko,en])=>{const parts=ko.split(/\{\d+\}/);const re=new RegExp('^'+parts.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('((?:(?! · )[\\s\\S])+?)')+'$');return {re,en,first:parts[0],w:parts.join('').length}}).sort((a,b)=>b.w-a.w);
 tokenMap=new Map(Object.entries(d.tokens||{}));tokenList=[...tokenMap.entries()].sort((a,b)=>b[0].length-a[0].length);
 const subs=Object.entries(d.subs||{});
 for(const [ko,en] of Object.entries(d.names||{}))subs.push([ko,en]);
 subs.sort((a,b)=>b[0].length-a[0].length);subList=subs;cache.clear();
}
function applySubs(s){let out=s;for(const [ko,en] of subList){if(out.indexOf(ko)>=0)out=out.split(ko).join(en)}return out}
const PREFIX=[['진화 패시브: ','Evolution Passive: '],['계통 패시브 · ','Line Passive · '],['서브웨폰: ','Sub-Weapon: '],['패시브: ','Passive: '],['기본공격: ','Basic attack: '],['E: ','E: '],['Q: ','Q: ']];
function lookup(p){
 let o=exactMap.get(p);if(o!==undefined)return o;
 for(const [ko,en] of PREFIX){if(p.startsWith(ko)&&p.length>ko.length){const r=translate(p.slice(ko.length));if(!HAS_KO.test(r))return en+r}}
 let m=p.match(/^(.+?) (Lv\.\d+)$/);if(m){const r=translate(m[1]);if(!HAS_KO.test(r))return r+' '+m[2]}
 m=p.match(/^(.+?) (\d+)$/);if(m){const r=translate(m[1]);if(!HAS_KO.test(r))return r+' '+m[2]}
 for(const q of patList){
  if(q.first&&p.indexOf(q.first)!==0)continue;
  const m=p.match(q.re);
  if(m){const g=m.slice(1);return q.en.replace(/\{(\d+)\}/g,(_,n)=>{const v=g[n-1];return v===undefined?'':translate(v)})}
 }
 return undefined;
}
function translate(s){
 if(typeof s!=='string'||!HAS_KO.test(s))return s;
 if(!exactMap)build();
 const hit=cache.get(s);if(hit!==undefined)return hit;
 const m=s.match(/^(\s*)([\s\S]*?)(\s*)$/),lead=m[1],core=m[2],trail=m[3];
 let out=lookup(core);
 if(out===undefined){
  const tk=p=>{let o=applySubs(p).replace(/(\d+)회/g,'$1×').replace(/(\d+)점/g,'$1 pts');if(p.length<=40&&HAS_KO.test(o)){for(const [ko,en] of tokenList){if(o.indexOf(ko)>=0)o=o.split(ko).join(en)}}return o};
  if(core.length<140&&/( · | \/ |\+)/.test(core)){
   const seg=core.split(/( · | \/ |\+)/);const outp=[];let i=0;
   while(i<seg.length){
    let done=false;
    for(let j=seg.length-1;j>=i;j-=2){
     const cand=seg.slice(i,j+1).join('').trim();
     const r=lookup(cand)??(j===i?tokenMap.get(cand):undefined);
     if(r!==undefined){outp.push(r);i=j+1;done=true;break}
    }
    if(!done){outp.push(tk(seg[i]));i++}
    if(i<seg.length){outp.push(seg[i]);i++}
   }
   out=outp.join('');
  }else if(core.length<=160){out=tk(core)}
  else out=core; // 긴 미번역 문장은 한국어 유지
 }
 // 한국어가 조금이라도 남으면 반쯤 번역된 문장을 피하기 위해 원문 전체를 유지
 if(HAS_KO.test(out))out=core;
 const res=lead+out+trail;
 if(cache.size>4000)cache.clear();
 cache.set(s,res);return res;
}
// ---------- DOM ----------
const textRec=new WeakMap(),attrRec=new WeakMap();
const ATTRS=['title','placeholder','aria-label','alt'];
function skip(n){const p=n.parentNode;return !p||p.nodeName==='SCRIPT'||p.nodeName==='STYLE'||p.nodeName==='TEXTAREA'}
function applyText(n){
 if(skip(n))return;
 const cur=n.data;let rec=textRec.get(n);
 if(rec&&rec.out===cur)return; // 우리가 쓴 값
 rec={ko:cur,out:cur};
 if(lang==='en'&&HAS_KO.test(cur)){const o=translate(cur);if(o!==cur){rec.out=o;n.data=o}}
 textRec.set(n,rec);
}
function applyAttrs(el){
 for(const a of ATTRS){
  const v=el.getAttribute&&el.getAttribute(a);if(v==null)continue;
  let m=attrRec.get(el);if(!m){m={};attrRec.set(el,m)}
  const r=m[a];if(r&&r.out===v)continue;
  const nr={ko:v,out:v};
  if(lang==='en'&&HAS_KO.test(v)){const o=translate(v);if(o!==v){nr.out=o;el.setAttribute(a,o)}}
  m[a]=nr;
 }
}
function walk(root){
 if(!root)return;
 if(root.nodeType===3){applyText(root);return}
 if(root.nodeType!==1&&root.nodeType!==9&&root.nodeType!==11)return;
 if(root.nodeType===1)applyAttrs(root);
 const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);
 let n;while((n=tw.nextNode())){if(n.nodeType===3)applyText(n);else applyAttrs(n)}
}
function reapplyAll(){
 // 언어 전환: 추적한 모든 노드를 현재 언어로 다시 쓴다.
 const tw=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);
 let n;while((n=tw.nextNode())){
  if(n.nodeType===3){
   if(skip(n))continue;const rec=textRec.get(n);
   if(rec&&rec.out===n.data){const o=lang==='en'?translate(rec.ko):rec.ko;if(o!==n.data){n.data=o}rec.out=o}
   else applyText(n);
  }else{
   const m=attrRec.get(n);
   if(m)for(const a of Object.keys(m)){const r=m[a];if(n.getAttribute(a)===r.out){const o=lang==='en'?translate(r.ko):r.ko;if(o!==r.out){n.setAttribute(a,o)}r.out=o}}
   else applyAttrs(n);
  }
 }
}
let pending=new Set(),raf=0;
function flush(){
 raf=0;const items=[...pending];pending=new Set();
 for(const it of items){try{walk(it)}catch(e){}}
}
function schedule(node){pending.add(node);if(!raf)raf=requestAnimationFrame(flush)}
function startObserver(){
 const mo=new MutationObserver(recs=>{
  for(const r of recs){
   if(r.type==='characterData')schedule(r.target);
   else if(r.type==='attributes'){const el=r.target;const rec=attrRec.get(el);if(!(rec&&rec[r.attributeName]&&rec[r.attributeName].out===el.getAttribute(r.attributeName)))schedule(el)}
   else for(const n of r.addedNodes)schedule(n);
  }
 });
 mo.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTRS});
}
// ---------- canvas / dialogs ----------
function hookCanvas(){
 const P=CanvasRenderingContext2D.prototype;
 for(const fn of ['fillText','strokeText','measureText']){
  const orig=P[fn];if(!orig||orig.__i18n)continue;
  const w=function(text,...a){if(lang==='en'&&typeof text==='string'&&HAS_KO.test(text))text=translate(text);return orig.call(this,text,...a)};
  w.__i18n=true;P[fn]=w;
 }
 for(const fn of ['alert','confirm','prompt']){
  const orig=window[fn];if(!orig)continue;
  window[fn]=function(m,...a){return orig.call(window,lang==='en'?translate(String(m)):m,...a)};
 }
}
// ---------- 언어 버튼 ----------
const LABEL={ko:'한국어',en:'English'};
function setLang(l){
 if(l!=='ko'&&l!=='en')return;
 lang=l;try{localStorage.setItem(KEY,l)}catch(e){}
 document.documentElement.lang=l;
 reapplyAll();syncButtons();
 try{window.dispatchEvent(new CustomEvent('dr-lang',{detail:l}))}catch(e){}
}
function syncLogo(){
 document.querySelectorAll('img[data-en-src]').forEach(im=>{
  if(!im.dataset.koSrc)im.dataset.koSrc=im.getAttribute('src');
  im.setAttribute('src',lang==='en'?im.dataset.enSrc:im.dataset.koSrc);
  if(lang==='en')im.setAttribute('alt','Digimon RE:Survivor');
 });
}
function syncButtons(){syncLogo();
 document.querySelectorAll('.langBtn').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.lang===lang))});
 const t=document.getElementById('langToggle');if(t)t.textContent='LANGUAGE · '+LABEL[lang];
}
function buildButton(){
 const menu=document.querySelector('#menu .menu-card');if(!menu||document.getElementById('langBox'))return;
 const box=document.createElement('div');box.id='langBox';box.className='langBox';box.setAttribute('role','group');box.setAttribute('aria-label','Language');
 box.innerHTML='<span class="langTitle">LANGUAGE</span><button type="button" class="langBtn" data-lang="en">English</button><button type="button" class="langBtn" data-lang="ko">한국어</button>';
 box.addEventListener('click',e=>{const b=e.target.closest('.langBtn');if(b)setLang(b.dataset.lang)});
 const start=document.getElementById('startBtn');
 if(start&&start.parentNode)start.parentNode.insertBefore(box,start.nextSibling);else menu.appendChild(box);
 const st=document.createElement('style');
 st.textContent='.langBox{display:flex;gap:8px;align-items:center;justify-content:center;margin:14px 0 4px}.langBox .langTitle{font-size:12px;letter-spacing:.12em;color:#9dc6de;margin-right:4px}.langBox .langBtn{font:inherit;font-size:13px;padding:6px 14px;border:1px solid #5e7ea0;background:rgba(14,24,40,.8);color:#cfe0f5;border-radius:6px;cursor:pointer}.langBox .langBtn[aria-pressed="true"]{background:#2b5f9a;border-color:#9fd0ff;color:#fff}.langBox .langBtn:hover{border-color:#9fd0ff}';
 document.head.appendChild(st);
 syncButtons();
}
function init(){
 document.documentElement.lang=lang;
 buildButton();hookCanvas();startObserver();
 if(lang==='en')walk(document.documentElement);
 syncButtons();
}
window.DR_I18N={get lang(){return lang},setLang,t:translate,rebuild:build,
 addNames(map){const d=D();d.names=Object.assign(d.names||{},map);window.DR_LANG_EN=d;exactMap=null;cache.clear()}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
