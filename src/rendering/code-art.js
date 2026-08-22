// GREMLIN ZINE renderer: original urban chibi biped informed by the supplied Cat Quest proportion references.
const INK='#09090b',PAPER='#efe6c8',BONE='#d9c39e',GOLD='#f3c84b',HOT='#ef4b3f',MINT='#65cfad',PANTS='#29272d';

function polygon(p,pts,fill,stroke=INK,lw=3){p.beginPath();pts.forEach(([x,y],i)=>i?p.lineTo(x,y):p.moveTo(x,y));p.closePath();p.fillStyle=fill;p.fill();if(stroke&&lw){p.strokeStyle=stroke;p.lineWidth=lw;p.stroke();}}
function ellipse(p,x,y,rx,ry,fill,stroke=INK,lw=3,rot=0){p.beginPath();p.ellipse(x,y,rx,ry,rot,0,Math.PI*2);p.fillStyle=fill;p.fill();if(stroke&&lw){p.strokeStyle=stroke;p.lineWidth=lw;p.stroke();}}
function roughLine(p,pts,color=INK,lw=3){p.strokeStyle=color;p.lineWidth=lw;p.beginPath();pts.forEach(([x,y],i)=>i?p.lineTo(x,y):p.moveTo(x,y));p.stroke();}
function blob(p,draw,fill,stroke=INK,lw=4){p.beginPath();draw();p.closePath();p.fillStyle=fill;p.fill();if(stroke&&lw){p.strokeStyle=stroke;p.lineWidth=lw;p.stroke();}}

// Two legs and two arms in every key. Coordinates are shoulder/hip, joint, hand/foot.
const RUN_POSES=[
 {y:0,tilt:-.04,headX:1,headY:0,legs:[[-8,-10,-17,1,-25,16],[8,-10,18,2,28,15]],arms:[[12,-29,22,-23,30,-18],[-12,-29,-22,-18,-29,-7]]},
 {y:3,tilt:.018,headX:-1,headY:1,legs:[[-8,-10,-13,5,-13,16],[8,-10,14,5,18,16]],arms:[[12,-29,19,-22,24,-17],[-12,-29,-18,-18,-23,-8]]},
 {y:0,tilt:-.025,headX:1,headY:0,legs:[[-8,-10,4,-3,16,7],[8,-10,-2,3,-16,15]],arms:[[12,-29,2,-17,-6,-7],[-12,-29,2,-23,12,-18]]},
 {y:-5,tilt:-.055,headX:2,headY:-1,legs:[[-8,-10,12,-4,23,7],[8,-10,-8,-3,-20,7]],arms:[[12,-29,0,-18,-10,-8],[-12,-29,4,-24,16,-19]]},
 {y:0,tilt:-.04,headX:1,headY:0,legs:[[-8,-10,17,1,27,15],[8,-10,-17,2,-26,16]],arms:[[12,-29,1,-17,-8,-7],[-12,-29,3,-23,14,-18]]},
 {y:3,tilt:.018,headX:-1,headY:1,legs:[[-8,-10,13,5,17,16],[8,-10,-13,5,-14,16]],arms:[[12,-29,3,-19,-3,-9],[-12,-29,1,-22,10,-17]]}
];
export const CAT_RUN_KEY_COUNT=RUN_POSES.length;
const IDLE={y:0,tilt:0,headX:0,headY:0,legs:[[-8,-10,-11,4,-12,16],[8,-10,11,4,12,16]],arms:[[12,-29,20,-18,22,-6],[-12,-29,-20,-17,-18,-6]]};
const JUMP={y:-5,tilt:-.05,headX:2,headY:-1,legs:[[-8,-10,-18,-1,-12,7],[8,-10,18,-2,13,7]],arms:[[12,-29,24,-18,26,-6],[-12,-29,-24,-17,-22,-5]]};

function poseFor(name,cycle,puff,t){
 if(name==='run'){
  const base=((Math.floor(cycle)%RUN_POSES.length)+RUN_POSES.length)%RUN_POSES.length,next=(base+1)%RUN_POSES.length,raw=cycle-Math.floor(cycle),mix=raw*raw*(3-2*raw);
  const blend=(a,b)=>Array.isArray(a)?a.map((v,i)=>blend(v,b[i])):a+(b-a)*mix;
  const a=RUN_POSES[base],b=RUN_POSES[next];
  return{y:blend(a.y,b.y),tilt:blend(a.tilt,b.tilt),headX:blend(a.headX,b.headX),headY:blend(a.headY,b.headY),legs:blend(a.legs,b.legs),arms:blend(a.arms,b.arms)};
 }
 if(name==='jump')return JUMP;
 if(name==='puff')return{...IDLE,y:Math.sin(t*12)*.18,headX:puff*1.6,headY:-puff*.8};
 return{...IDLE,y:Math.sin(t*2.2)*.45,headY:Math.sin(t*2.2)*-.25,tilt:Math.sin(t*1.5)*.006};
}

export function sampleCodeCatRunPose(cycle){return poseFor('run',cycle,0,0);}

function drawTail(p,fur,t,pose){const flick=(pose==='run'?Math.sin(t*10)*1.7:Math.sin(t*3)*1.5);p.lineCap='round';p.strokeStyle=INK;p.lineWidth=11;p.beginPath();p.moveTo(-12,-18);p.bezierCurveTo(-30,-16,-40,-22+flick,-35,-31+flick);p.bezierCurveTo(-31,-38+flick,-35,-42+flick,-43,-37+flick);p.stroke();p.strokeStyle=fur;p.lineWidth=5.5;p.stroke();}

function drawLeg(p,leg,fur,far=false){const[hx,hy,kx,ky,fx,fy]=leg;p.save();p.globalAlpha*=far?.72:1;p.lineCap='round';p.lineJoin='round';p.strokeStyle=INK;p.lineWidth=12;p.beginPath();p.moveTo(hx,hy);p.lineTo(kx,ky);p.stroke();p.strokeStyle=PANTS;p.lineWidth=6.5;p.stroke();p.strokeStyle=INK;p.lineWidth=10;p.beginPath();p.moveTo(kx,ky);p.lineTo(fx,fy-1);p.stroke();p.strokeStyle=fur;p.lineWidth=4.5;p.stroke();ellipse(p,fx+3,fy,8,4,MINT,INK,2,.02);p.restore();}

function drawArm(p,arm,fur,far=false){const[sx,sy,ex,ey,hx,hy]=arm;p.save();p.globalAlpha*=far?.68:1;p.lineCap='round';p.lineJoin='round';p.strokeStyle=INK;p.lineWidth=13;p.beginPath();p.moveTo(sx,sy);p.quadraticCurveTo(ex,ey,hx,hy);p.stroke();p.strokeStyle=HOT;p.lineWidth=7;p.stroke();ellipse(p,hx,hy,5.5,6.2,fur,INK,2,-.12);roughLine(p,[[hx-2,hy+1],[hx+2,hy+3]],INK,1);p.restore();}

function drawJacket(p){
 blob(p,()=>{p.moveTo(-17,-35);p.quadraticCurveTo(0,-42,18,-34);p.lineTo(20,-11);p.quadraticCurveTo(4,-5,-19,-11);p.closePath();},HOT,INK,4);
 polygon(p,[[-18,-17],[20,-16],[19,-9],[-18,-10]],'#232126',INK,2);
 roughLine(p,[[1,-35],[1,-10]],GOLD,2);ellipse(p,1,-23,2,2,GOLD,null,0);
 p.strokeStyle=INK;p.lineWidth=1.7;p.beginPath();p.moveTo(-11,-19);p.quadraticCurveTo(-5,-15,0,-18);p.moveTo(4,-18);p.quadraticCurveTo(10,-15,15,-19);p.stroke();
 polygon(p,[[-14,-35],[-4,-38],[0,-32],[-7,-28]],PANTS,INK,2);polygon(p,[[15,-35],[5,-38],[1,-32],[8,-28]],PANTS,INK,2);
}

function drawHeadPattern(p,skin,t){const s=skin.pattern;p.save();p.lineCap='round';p.lineJoin='round';
 if(s==='tux'){blob(p,()=>{p.moveTo(-4,-70);p.quadraticCurveTo(13,-69,23,-58);p.lineTo(18,-34);p.quadraticCurveTo(5,-27,-7,-35);p.lineTo(-12,-54);},PAPER,null,0);}
 else if(s==='calico'){ellipse(p,-11,-59,12,10,'#202024',null,0,-.2);ellipse(p,19,-43,10,8,'#d26732',null,0,.15);}
 else if(s==='siamese'){p.globalAlpha=.86;ellipse(p,20,-48,19,16,'#44343a',null,0,-.05);}
 else if(s==='tabby'||s==='tiger'){p.strokeStyle=s==='tiger'?'#1a1110':'#4c4037';p.lineWidth=s==='tiger'?4.5:3.2;for(const x of[-7,2,11]){p.beginPath();p.moveTo(x,-73);p.lineTo(x+5,-64);p.stroke();}p.beginPath();p.moveTo(-17,-54);p.lineTo(-9,-50);p.moveTo(30,-53);p.lineTo(23,-48);p.stroke();}
 else if(s==='tortie'){ellipse(p,-10,-60,11,10,'#c65032',null,0,-.2);ellipse(p,19,-39,9,8,'#d8903d',null,0,.18);}
 else if(s==='neon'){p.globalAlpha=.7+.3*Math.sin(t*8);p.strokeStyle=GOLD;p.shadowBlur=8;p.shadowColor=GOLD;p.lineWidth=3;p.beginPath();p.moveTo(-10,-67);p.lineTo(2,-59);p.lineTo(14,-67);p.stroke();}
 else if(s==='skeleton'){p.strokeStyle=PAPER;p.lineWidth=2.3;p.beginPath();p.arc(-1,-52,6,0,Math.PI*2);p.arc(17,-50,7,0,Math.PI*2);p.moveTo(8,-55);p.lineTo(11,-36);p.stroke();}
 else if(s==='ghost'){p.globalAlpha=.35+.1*Math.sin(t*5);p.strokeStyle='#cff8f4';p.shadowBlur=10;p.shadowColor=MINT;p.lineWidth=3;p.beginPath();p.arc(5,-51,25,.1,4.9);p.stroke();}p.restore();
}

function drawFace(p,skin,t,puff){drawHeadPattern(p,skin,t);
 // Short, round three-quarter muzzle: the nose sits inside the cheek, never on a long snout.
 ellipse(p,17,-43,10.5,7.2,BONE,null,0,-.06);ellipse(p,25,-42,8.5,6.3,BONE,null,0,.08);
 // Oversized dark chibi eyes, with the far eye smaller to preserve the natural street-facing angle.
 ellipse(p,-5,-53,5.4,7.2,INK,INK,1.5,-.06);ellipse(p,-3.5,-55,1.8,2.3,PAPER,null,0);
 ellipse(p,10,-53,7,8.6,INK,INK,1.5,-.04);ellipse(p,12,-56,2.2,2.7,PAPER,null,0);
 p.strokeStyle=INK;p.lineCap='round';p.lineWidth=3.4;p.beginPath();p.moveTo(-12,-62);p.quadraticCurveTo(-6,-65,1,-61);p.moveTo(4,-63);p.quadraticCurveTo(12,-67,19,-61);p.stroke();
 polygon(p,[[19,-47],[25,-44],[19,-40]],'#9e4548',INK,1.4);
 p.strokeStyle=INK;p.lineWidth=1.8;p.beginPath();p.moveTo(20,-40);p.quadraticCurveTo(20,-36,25,-37);p.moveTo(20,-40);p.quadraticCurveTo(17,-36,14,-38);p.stroke();polygon(p,[[22,-37],[26,-32],[28,-38]],PAPER,INK,1);
 p.globalAlpha=.7;ellipse(p,-13,-43,3.4,1.7,HOT,null,0);p.globalAlpha=1;
 p.strokeStyle='#f2d8c2';p.lineWidth=1.1;p.beginPath();p.moveTo(24,-44);p.lineTo(42,-43);p.moveTo(24,-41);p.lineTo(41,-37);p.moveTo(22,-39);p.lineTo(35,-33);p.stroke();
 if(puff){p.globalAlpha=.18*puff;ellipse(p,23,-42,10+puff,7+puff,HOT,null,0);p.globalAlpha=1;}
}

function drawHead(p,fur,skin,t,puff,options,x=0,y=0){p.save();p.translate(x+puff*1.6,y-puff*.8);
 // One compact head silhouette. Both ears rise from its top edge; no literal neck mass exists.
 blob(p,()=>{p.moveTo(-28,-54);p.quadraticCurveTo(-27,-63,-21,-68);p.lineTo(-19,-82);p.lineTo(-6,-70);p.quadraticCurveTo(2,-75,11,-70);p.lineTo(20,-84);p.lineTo(25,-66);p.quadraticCurveTo(34,-60,35,-49);p.quadraticCurveTo(34,-38,25,-33);p.quadraticCurveTo(13,-27,-2,-29);p.quadraticCurveTo(-18,-29,-25,-39);p.quadraticCurveTo(-30,-45,-28,-54);},fur,INK,4.5);
 polygon(p,[[-17,-70],[-17,-78],[-8,-70]],skin.inner||'#ec927f',null,0);polygon(p,[[18,-69],[20,-79],[23,-66]],skin.inner||'#ec927f',null,0);
 drawFace(p,skin,t,puff);p.save();p.translate(3,-53);p.rotate(-.03);drawCodeGlasses(p,options.glasses,0,0,t);p.restore();drawCodeHat(p,options.hat,1,-79,t);p.restore();return puff*1.6;}

export function drawCodeGlasses(p,style,x,y,t=0){
 if(!style||style==='none')return;
 p.save();p.translate(x,y);p.rotate(-.035);p.lineCap='round';p.lineJoin='round';p.strokeStyle=INK;p.lineWidth=2.4;
 const bridge=(color=INK,lw=2.2)=>roughLine(p,[[-1,-1],[3,-1.5]],color,lw);
 const strap=()=>roughLine(p,[[-19,-2],[-13,-1]],INK,3);
 const heart=(cx,cy,s)=>{p.save();p.translate(cx,cy);p.scale(s,s);p.beginPath();p.moveTo(0,7);p.bezierCurveTo(-10,0,-8,-7,-3,-7);p.bezierCurveTo(0,-7,1,-5,2,-3);p.bezierCurveTo(4,-7,11,-7,11,-1);p.bezierCurveTo(11,2,7,5,0,7);p.closePath();p.fill();p.stroke();p.restore();};
 const star=(cx,cy,r)=>{p.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.44:r,px=cx+Math.cos(a)*rr,py=cy+Math.sin(a)*rr;i?p.lineTo(px,py):p.moveTo(px,py);}p.closePath();p.fill();p.stroke();};
 if(style==='shades'){
  strap();polygon(p,[[-14,-6],[0,-5],[-2,5],[-12,4]],'#17171b',INK,2.4);polygon(p,[[3,-5],[21,-7],[19,6],[4,7]],'#17171b',INK,2.6);bridge();roughLine(p,[[-10,-2],[-5,-1]],MINT,1.2);roughLine(p,[[8,-2],[15,-3]],MINT,1.2);
 }else if(style==='round'){
  strap();p.strokeStyle=GOLD;p.lineWidth=2.6;p.beginPath();p.ellipse(-7,0,5.5,6.3,0,0,Math.PI*2);p.ellipse(10,-1,7.2,7.8,0,0,Math.PI*2);p.stroke();bridge(GOLD,2.4);
 }else if(style==='heart'){
  strap();p.fillStyle='#ef5c84';heart(-7,0,.72);heart(10,-1,.92);bridge('#ef5c84',2.4);
 }else if(style==='pit'){
  strap();polygon(p,[[-16,-7],[22,-8],[19,6],[4,7],[1,2],[-2,6],[-12,5]],'#dbe64b',INK,3);roughLine(p,[[-10,-2],[15,-3]],PAPER,1.4);
 }else if(style==='cyber'){
  strap();polygon(p,[[-17,-7],[22,-9],[20,6],[-13,6]],'#65cfad',INK,3);polygon(p,[[-9,-3],[16,-4],[12,1],[-5,2]],'#c6fff0',null,0);roughLine(p,[[1,-6],[1,5]],INK,2);
 }else if(style==='star'){
  strap();p.fillStyle=GOLD;star(-7,0,6);star(10,-1,7.4);bridge(GOLD,2.2);
 }else if(style==='goggles'){
  roughLine(p,[[-19,-3],[23,-5]],'#4a4a52',5);ellipse(p,-7,0,6,5,'#91d5d2',INK,2.5);ellipse(p,10,-1,7.5,6,'#91d5d2',INK,2.7);bridge('#4a4a52',3);roughLine(p,[[-10,-2],[-6,-3]],PAPER,1.2);roughLine(p,[[7,-3],[12,-4]],PAPER,1.2);
 }else if(style==='monocle'){
  p.strokeStyle=GOLD;p.lineWidth=2.8;p.beginPath();p.ellipse(10,-1,8,8.5,0,0,Math.PI*2);p.moveTo(16,5);p.quadraticCurveTo(22,13,17,21);p.stroke();ellipse(p,8,-4,2,1.4,PAPER,null,0);
 }else if(style==='threeD'){
  strap();polygon(p,[[-14,-6],[0,-5],[-1,6],[-13,5]],HOT,INK,2.4);polygon(p,[[3,-5],[21,-7],[20,6],[4,7]],'#5cbdea',INK,2.6);bridge();
 }else if(style==='lightning'){
  strap();p.fillStyle=GOLD;polygon(p,[[-13,-8],[-2,-7],[-6,-1],[0,-1],[-11,9],[-8,2],[-15,2]],GOLD,INK,2);polygon(p,[[5,-8],[20,-9],[14,-2],[21,-2],[7,10],[11,2],[3,2]],GOLD,INK,2);
 }else if(style==='laser'){
  strap();polygon(p,[[-17,-7],[23,-9],[21,6],[-14,6]],'#151217',INK,2.8);p.save();p.shadowBlur=9+Math.sin(t*8)*3;p.shadowColor='#ff315b';roughLine(p,[[-12,-1],[18,-3]],'#ff315b',2.6);p.restore();
 }
 p.restore();
}

export function drawCodeHat(p,style,x,y,t=0){
 if(!style||style==='none')return;
 p.save();p.translate(x,y+Math.sin(t*3.2)*.5);p.rotate(-.025);p.lineJoin='round';p.lineCap='round';
 if(style==='beanie'){
  blob(p,()=>{p.moveTo(-25,5);p.lineTo(-22,-8);p.lineTo(-17,-21);p.lineTo(-7,-11);p.quadraticCurveTo(3,-15,11,-11);p.lineTo(19,-22);p.lineTo(25,-8);p.lineTo(28,4);},'#314359',INK,3.2);polygon(p,[[-26,0],[29,-2],[28,8],[-25,9]],MINT,INK,2.5);polygon(p,[[18,0],[27,-1],[27,6],[19,6]],GOLD,INK,1.5);
 }else if(style==='trucker'){
  blob(p,()=>{p.moveTo(-24,5);p.lineTo(-21,-14);p.quadraticCurveTo(-3,-22,21,-10);p.lineTo(24,5);},PAPER,INK,3.2);polygon(p,[[-22,-13],[-2,-17],[-1,5],[-23,6]],HOT,null,0);polygon(p,[[13,1],[37,2],[38,8],[10,8]],INK,INK,2.4);polygon(p,[[-9,-10],[4,-11],[4,1],[-9,2]],GOLD,INK,1.5);p.fillStyle=INK;p.font='900 7px sans-serif';p.fillText('SB',-7,-2);
 }else if(style==='cowboy'){
  ellipse(p,2,6,37,7.5,'#895631',INK,3.2,-.03);blob(p,()=>{p.moveTo(-17,3);p.lineTo(-13,-18);p.quadraticCurveTo(1,-11,19,-20);p.lineTo(21,4);},'#895631',INK,3.2);roughLine(p,[[-15,-5],[19,-7]],GOLD,3);
 }else if(style==='wizard'){
  polygon(p,[[-22,5],[5,-39],[25,4]],'#55386f',INK,3.2);p.fillStyle=GOLD;ellipse(p,3,-18,3,3,GOLD,null,0);polygon(p,[[-28,2],[30,0],[29,9],[-27,10]],'#a77ce8',INK,2.5);
 }else if(style==='crown'){
  polygon(p,[[-25,8],[-22,-16],[-10,-4],[1,-23],[12,-5],[25,-18],[28,7]],GOLD,INK,3.2);ellipse(p,2,2,3,3,HOT,INK,1.3);roughLine(p,[[-23,3],[27,2]],'#d99b25',3);
 }else if(style==='bucket'){
  polygon(p,[[-24,-16],[25,-18],[20,7],[-18,8]],'#5c7566',INK,3.2);polygon(p,[[-28,4],[32,2],[31,11],[-27,12]],MINT,INK,2.5);roughLine(p,[[-16,-6],[20,-8]],'#8fa778',2);
 }else if(style==='devil'){
  polygon(p,[[-19,5],[-29,-22],[-6,-8]],HOT,INK,3.2);polygon(p,[[17,4],[29,-24],[5,-8]],HOT,INK,3.2);roughLine(p,[[-19,3],[18,2]],'#7a1f27',3);
 }else if(style==='propeller'){
  blob(p,()=>{p.moveTo(-25,5);p.quadraticCurveTo(-21,-19,0,-22);p.quadraticCurveTo(22,-19,27,4);},'#426496',INK,3.2);polygon(p,[[-25,0],[27,-1],[27,8],[-24,9]],HOT,INK,2.2);roughLine(p,[[1,-21],[1,-34]],GOLD,4);p.save();p.translate(1,-34);p.rotate(t*10);roughLine(p,[[-21,0],[21,0]],GOLD,4);p.restore();
 }else if(style==='halo'){
  p.save();p.shadowBlur=12;p.shadowColor=GOLD;p.strokeStyle=GOLD;p.lineWidth=4;p.beginPath();p.ellipse(2,-23,28,7,-.05,0,Math.PI*2);p.stroke();p.restore();
 }else if(style==='chef'){
  for(const[cx,cy,r]of[[-15,-8,11],[0,-16,13],[17,-9,12]])ellipse(p,cx,cy,r,r,PAPER,INK,3);polygon(p,[[-25,-7],[28,-9],[28,9],[-24,10]],PAPER,INK,3);roughLine(p,[[-18,2],[22,1]],'#c7bfa8',2);
 }else if(style==='cone'){
  polygon(p,[[-24,6],[3,-40],[28,5]],'#ef7736',INK,3.2);polygon(p,[[-10,-10],[16,-11],[20,-3],[-14,-2]],PAPER,null,0);polygon(p,[[-30,3],[34,1],[33,11],[-29,13]],INK,INK,2.5);
 }
 p.restore();
}

export function drawCodeCat(p,x,y,t,options={}){const skin=options.skin||{body:'#d66e57',head:'#e47c61',inner:'#ec927f',pattern:'plain'},air=!!options.airborne,puff=Math.max(0,options.puff||0),poseName=options.pose||(puff?'puff':air?'jump':options.run!==undefined?'run':'idle'),cycle=options.run||t*.7,pose=poseFor(poseName,cycle,puff,t),fur=options.ghost?'#8ea6ef':skin.head,smoking=!!options.smoking||poseName==='puff';
 p.save();p.globalAlpha=options.alpha??1;p.translate(x,y+pose.y);p.scale(options.scale||1,options.scale||1);p.rotate((pose.tilt||0)+(options.sprint?-.035:0)+(poseName==='jump'?(options.airTilt||0):0));p.lineCap='round';p.lineJoin='round';if(options.shadow!==false){p.save();p.globalAlpha*=.24;ellipse(p,0,20,poseName==='jump'?21:28,poseName==='jump'?3:5,INK,null,0);p.restore();}if(skin.pattern==='ghost'){p.globalAlpha*=.84;p.shadowBlur=11;p.shadowColor=MINT;}
 drawTail(p,fur,t,poseName);drawLeg(p,pose.legs[0],fur,true);drawArm(p,pose.arms[0],fur,true);drawLeg(p,pose.legs[1],fur,false);drawJacket(p);if(!smoking)drawArm(p,pose.arms[1],fur,false);const recoil=drawHead(p,fur,skin,t,puff,options,pose.headX,pose.headY);if(smoking)drawArm(p,[-12,-29,5,-33,25+recoil,-43],fur,false);p.restore();
}

export function drawCosmeticThumbnail(canvas,t,loadout){const p=canvas.getContext('2d'),w=canvas.width,h=canvas.height,scale=Math.min(w/112,h/110);p.clearRect(0,0,w,h);p.fillStyle='#1a1818';p.fillRect(0,0,w,h);p.save();p.translate(w*.5,h*.84);p.scale(scale,scale);drawCodeCat(p,0,0,t,{...loadout,pose:'idle',shadow:true});p.restore();}
export function drawTitleMascot(canvas,t,skin){const p=canvas.getContext('2d'),w=canvas.width,h=canvas.height;p.clearRect(0,0,w,h);p.save();p.translate(w*.5,h*.82);p.scale(1.72,1.72);drawCodeCat(p,0,0,t,{skin,pose:'idle',shadow:true});p.restore();}
export function drawWardrobeMascot(canvas,t,loadout){const p=canvas.getContext('2d'),w=canvas.width,h=canvas.height;p.clearRect(0,0,w,h);p.fillStyle='#191717';p.fillRect(0,0,w,h);p.globalAlpha=.14;p.fillStyle=PAPER;for(let y=16;y<h;y+=22)for(let x=(y%44);x<w;x+=44)ellipse(p,x,y,2,2,PAPER,null,0);p.globalAlpha=1;p.fillStyle=INK;p.fillRect(0,h-42,w,8);p.fillStyle='#51483e';p.fillRect(0,h-34,w,34);p.fillStyle=HOT;for(let x=-((t*90)%150);x<w;x+=150)p.fillRect(x,h-17,78,4);p.save();p.translate(177,225);p.scale(2.18,2.18);drawCodeCat(p,0,0,t,{...loadout,pose:'idle',shadow:true});p.restore();p.fillStyle=PAPER;p.font='1000 22px Arial Black,sans-serif';p.fillText('LIVE GREMLIN',390,88);p.fillStyle=HOT;p.font='900 15px Arial Black,sans-serif';p.fillText('NO CLEAN LINES.',390,116);p.fillText('NO GOOD CHOICES.',390,139);}
