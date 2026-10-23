/* UI only. No reward selection, prices or combat values are changed. */
(() => {
 'use strict';
 const modal=document.getElementById('modal'), choices=document.getElementById('choices');
 if(!modal||!choices)return;
 const glyphs={
  V:['10001','10001','10001','01010','00100'],I:['11111','00100','00100','00100','11111'],
  D:['11110','10001','10001','10001','11110'],A:['01110','10001','11111','10001','10001'],
  B:['11110','10001','11110','10001','11110'],Q:['01110','10001','10101','10010','01101'],
  E:['11111','10000','11110','10000','11111']
 };
 function drawIcon(canvas,kind,label){
  const c=canvas.getContext('2d',{alpha:true});
  c.imageSmoothingEnabled=false;
  const box=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
  const line=(x1,y1,x2,y2,col,width=2)=>{c.strokeStyle=col;c.lineWidth=width;c.lineCap='square';c.beginPath();c.moveTo(Math.round(x1)+.5,Math.round(y1)+.5);c.lineTo(Math.round(x2)+.5,Math.round(y2)+.5);c.stroke()};
  const diamond=(x,y,r,col)=>{for(let dy=-r;dy<=r;dy++){const span=Math.round(r-Math.abs(dy)*.76);box(x-span,y+dy,span*2+1,1,col)}};
  const disk=(x,y,r,col)=>{for(let dy=-r;dy<=r;dy++){const span=Math.floor(Math.sqrt(r*r-dy*dy));box(x-span,y+dy,span*2+1,1,col)}};
  const text=(letters,x,y,col,size=2)=>{let cursor=x;for(const ch of letters){let rows=glyphs[ch]||glyphs.B;rows.forEach((row,yy)=>{[...row].forEach((on,xx)=>{if(on==='1')box(cursor+xx*size,y+yy*size,size,size,col)})});cursor+=size*6}};
  const frame=(inner='#1b3046')=>{box(2,2,28,28,'#050c17');box(4,4,24,24,inner);box(4,4,24,2,'#6a8194');box(4,26,24,2,'#090f20')};
  const flame=(x=16,y=18,r=7,dark=false)=>{
   diamond(x,y,r+2,dark?'#5f081e':'#a83220');
   diamond(x,y+1,r,dark?'#bd2041':'#f06d23');
   diamond(x,y+3,Math.max(3,r-3),dark?'#e96254':'#ffd055');
   box(x-1,y-10,3,5,dark?'#b8283f':'#ffba3d');
  };
  const slash=(x=16,y=16,wide=false)=>{line(x-10,y+9,x+10,y-10,'#3e5668',wide?8:4);line(x-9,y+7,x+9,y-9,'#eaf5f3',wide?5:2);box(x+8,y-12,4,4,'#fff8d0')};
  const bolt=(x=17,y=15)=>{box(x+2,y-11,4,9,'#ffe682');box(x-3,y-1,11,4,'#ffe682');box(x-5,y+1,5,8,'#ffd04c');box(x-9,y+7,7,4,'#ffe682')};
  const chip=(letter)=>{frame('#142d35');box(8,8,16,16,'#58c9b2');box(10,10,12,12,'#153b48');for(let i=0;i<3;i++){box(5,10+i*5,3,2,'#e2c975');box(24,10+i*5,3,2,'#e2c975')}text(letter,11,11,'#f7de83',2)};
  c.clearRect(0,0,32,32);
  if(kind==='virus'||kind==='data'||kind==='vaccine'){
   const v={virus:['#14121a','#ec5053','VI'],data:['#183c88','#ffdc5e','DA'],vaccine:['#e9f3e8','#348b57','VA']}[kind];
   box(2,2,28,28,'#030910');box(4,4,24,24,v[0]);
   box(4,4,24,2,kind==='vaccine'?'#a6c4b9':'#536879');
   text(v[2],5,12,v[1],2);
   return;
  }
  if(kind.startsWith('element:')){
   const el=kind.slice(8);frame();
   if(el==='fire')flame();
   else if(el==='cold'){for(let i=0;i<4;i++){const a=i*Math.PI/4;line(16-Math.cos(a)*10,16-Math.sin(a)*10,16+Math.cos(a)*10,16+Math.sin(a)*10,'#9aeaff',2)}diamond(16,16,3,'#e0ffff')}
   else if(el==='electric'){bolt();box(7,7,3,3,'#fcf7a2')}
   else if(el==='nature'){line(13,25,18,8,'#86cd65',3);for(let y=0;y<6;y++)box(9-y,17-y,12+y*2,2,'#70b96b');box(15,10,6,4,'#c2e588')}
   else if(el==='wind'){for(let i=0;i<3;i++){line(6,12+i*5,22-i*2,12+i*5,'#a4e5d3',2);box(21-i*2,10+i*5,5,3,'#6fb3c7')}}
   else if(el==='earth'){for(let i=0;i<4;i++)box(5+i*3,23-i*3,22-i*5,3,i%2?'#b9a677':'#847d5b')}
   else if(el==='light'){disk(16,16,7,'#f6e9ae');disk(16,16,4,'#fffaf0');for(let i=0;i<8;i++){const a=i*Math.PI/4;box(15+Math.cos(a)*12,15+Math.sin(a)*12,3,3,'#f7d77d')}}
   else if(el==='dark'){disk(17,15,10,'#7359a9');disk(22,11,9,'#14273c');box(8,25,4,2,'#bd86d1')}
   else slash(16,16,true);
   return;
  }
  if(kind.startsWith('path:')){
   frame('#202a40');
   const id=kind.slice(5);
   if(id==='strong'||id==='rapid'||id==='giant'){
    if(id==='strong'){slash(16,16,true);box(5,20,8,4,'#f5ad5e')}
    if(id==='rapid'){for(const dy of [-6,0,6])slash(16,16+dy,false)}
    if(id==='giant'){disk(16,16,11,'#d6dce6');disk(16,16,7,'#69819c');diamond(16,16,4,'#f0f6ef')}
   }else if(id==='mobility'){for(let i=0;i<3;i++){line(5,10+i*6,24,10+i*6,'#67dbc7',2);box(22,8+i*6,5,4,'#d4f7d6')}}
   else if(id==='ultimate'||id==='ultDamage'){disk(16,16,id==='ultDamage'?11:8,'#b77a37');flame(16,16,id==='ultDamage'?9:5,true);text('Q',13,12,'#fff4ba',1)}
   else if(id==='attack'){slash(16,15,true);diamond(23,8,3,'#e85455')}
   else{
    const spots=id==='spam'?[[9,12],[22,11],[16,22]]:[[16,16]];
    for(const [x,y] of spots)flame(x,y,id==='area'?10:id==='overcharge'?8:5,id==='overcharge');
   }
   return;
  }
  const lower=(label||'').toLowerCase();
  if(/플러그인|칩|코어|디바이스/.test(label)){chip(/B\b| B|부스트/.test(label)?'B':'A');return}
  if(/강철낫|낫/.test(label)){frame();line(10,26,20,7,'#e8d2a1',3);line(19,7,27,12,'#c6dce0',3);line(27,12,22,21,'#e5f1ea',2);return}
  if(/박쥐/.test(label)){frame('#24203c');for(const [x,y] of [[11,14],[22,10],[19,23]]){box(x-5,y,4,3,'#a986c2');box(x+2,y,4,3,'#a986c2');diamond(x,y,2,'#644989')}return}
  if(/드릴/.test(label)){frame();for(let i=0;i<5;i++)box(6+i*4,13-i,4,9-i,'#adb9c7');box(5,22,11,4,'#b77552');return}
  if(/방패|쉴드/.test(label)){frame();diamond(16,16,11,'#b7c2c4');diamond(16,15,7,'#438cac');text('V',13,12,'#f3f1d0',1);return}
  if(/날개/.test(label)){frame('#29446d');for(let i=0;i<4;i++){line(14,20,6+i*2,8+i*3,'#f2f2dc',3);line(18,20,26-i*2,8+i*3,'#f2f2dc',3)}return}
  if(/검|소드|칼|킬러/.test(label)){frame();slash(16,16,true);box(10,22,12,3,'#d8a250');return}
  if(/주먹/.test(label)){frame();box(10,12,13,13,'#e7bb87');box(8,8,5,7,'#f3d093');box(14,7,5,6,'#f3d093');box(20,9,5,7,'#d8a875');return}
  if(/카드/.test(label)){frame('#31384f');box(8,5,17,23,'#dfe8e6');box(11,8,11,17,'#cf6267');diamond(16,16,5,'#fff3cc');return}
  if(/회복|체력|생명|깁스/.test(label)){frame();box(13,6,6,20,'#e8f0ed');box(6,13,20,6,'#eb7676');return}
  if(/진화|포인트/.test(label)){frame();diamond(16,16,10,'#6dbbeb');diamond(16,16,5,'#d4faff');return}
  if(/골드|gold/i.test(label)){frame();disk(16,16,10,'#bd8d34');disk(16,16,7,'#f4d363');box(14,9,4,14,'#fff0af');return}
  if(/특화|평타|공격|연타/.test(label)){frame();slash(16,16,true);return}
  if(/스킬|궁극|충전/.test(label)){frame();flame(16,16,7,true);return}
  if(/뒤로|나가기|리롤/.test(label)){frame();line(23,16,8,16,'#d2ddea',3);line(8,16,15,9,'#d2ddea',3);line(8,16,15,23,'#d2ddea',3);return}
  frame();diamond(16,16,8,'#63b5c5');diamond(16,16,4,'#d8f1e7');
 }
 function classify(title,desc){
  const t=(title||'').replace(/^\s*\d+\.\s*/,''),s=t+' '+(desc||'');
  if(/바이러스 조각/.test(s))return 'virus';
  if(/데이터 조각/.test(s))return 'data';
  if(/백신 조각/.test(s))return 'vaccine';
  const elements=[['physical','물리'],['fire','화염'],['cold','냉기'],['nature','자연'],['electric','전기'],['wind','바람'],['earth','땅'],['light','빛'],['dark','어둠']];
  if(/공격력/.test(t)&&!/\[특화\]/.test(t))for(const [id,kr] of elements)if(t.startsWith(kr+' '))return 'element:'+id;
  const paths=[['strong','기본 공격력 증가'],['rapid','기본 공격속도 증가'],['giant','기본 공격 범위 증가'],['overcharge','스킬 피해 증가'],['area','스킬 범위 증가'],['spam','스킬 쿨다운 감소'],['ultimate','궁극기 충전효율 증가'],['mobility','이동속도 증가'],['attack','공격력 증가'],['ultDamage','궁극기 피해 증가']];
  if(t.includes('[특화]'))for(const [id,kr] of paths)if(t.includes(kr))return 'path:'+id;
  return 'item';
 }
 function decorate(button,index){
  if(button.classList.contains('equipBtn'))return;
  const top=button.querySelector(':scope > .retroCardTop');
  if(top){
   const body=button.querySelector(':scope > .retroCardBody');
   for(const child of [...button.children])if(child!==top&&child!==body)body.appendChild(child);
   return;
  }
  const h=button.querySelector(':scope > h3'),p=button.querySelector(':scope > p');
  if(!h)return;
  const title=h.textContent,description=p?.textContent||'';
  const icon=classify(title,description);
  const frame=document.createElement('span');frame.className='retroIconFrame';
  const canvas=document.createElement('canvas');canvas.width=32;canvas.height=32;canvas.setAttribute('aria-hidden','true');
  drawIcon(canvas,icon,title);frame.appendChild(canvas);
  const wrapper=document.createElement('div');wrapper.className='retroCardTop';
  const name=document.createElement('div');name.className='retroCardName';
  const badge=button.querySelector(':scope > .rarity');
  if(badge)name.appendChild(badge);
  name.appendChild(h);wrapper.append(frame,name);
  const body=document.createElement('div');body.className='retroCardBody';
  for(const child of [...button.children])if(child!==wrapper)body.appendChild(child);
  button.append(wrapper,body);
  button.style.setProperty('--retro-index',String(index));
 }
 let updateQueued=false;
 function update(){
  updateQueued=false;
  const reward=modal.classList.contains('show')&&document.getElementById('modalTitle')?.textContent?.startsWith('레벨업 보상');
  modal.classList.toggle('retroRewardOpen',!!reward);
  [...choices.querySelectorAll('button.choice')].forEach((button,i)=>decorate(button,i));
 }
 function queue(){if(updateQueued)return;updateQueued=true;queueMicrotask(update)}
 function burst(){
  if(!document.getElementById('modalTitle')?.textContent?.startsWith('레벨업 보상'))return;
  const panel=modal.querySelector('.modalcard');if(!panel)return;
  panel.querySelector('.retroPixelBurst')?.remove();
  const layer=document.createElement('div');layer.className='retroPixelBurst';
  const colors=['#79d6eb','#f9d477','#b38df0','#f7f3d2','#80e6bb'];
  for(let i=0;i<64;i++){
   const pixel=document.createElement('i'),x=(i*67%97),y=(i*43%89);
   pixel.style.setProperty('--px-x',x+'%');pixel.style.setProperty('--px-y',y+'%');
   pixel.style.setProperty('--px-dx',((i*19%83)-41)+'px');
   pixel.style.setProperty('--px-dy',((i*29%105)-52)+'px');
   pixel.style.setProperty('--px-size',(i%4===0?7:4)+'px');
   pixel.style.setProperty('--px-delay',(i%13*24)+'ms');
   pixel.style.setProperty('--px-color',colors[i%colors.length]);
   layer.appendChild(pixel);
  }
  panel.appendChild(layer);setTimeout(()=>layer.remove(),1200);
 }
 let wasOpen=false;
 new MutationObserver(()=>{
  const now=modal.classList.contains('show');
  if(now&&!wasOpen){queue();setTimeout(burst,0)}
  wasOpen=now;
 }).observe(modal,{attributes:true,attributeFilter:['class']});
 new MutationObserver(queue).observe(choices,{childList:true,subtree:true});
 new MutationObserver(queue).observe(document.getElementById('modalTitle'),{childList:true,subtree:true,characterData:true});
 queue();
})();
