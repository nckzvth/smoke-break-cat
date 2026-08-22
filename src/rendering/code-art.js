const INK='#08090e', PAPER='#f7f0dc', MUZZLE='#e8c3a0';
function rounded(p,x,y,w,h,r,fill,stroke=INK,lw=3){p.beginPath();p.roundRect(x,y,w,h,r);p.fillStyle=fill;p.fill();if(stroke&&lw){p.strokeStyle=stroke;p.lineWidth=lw;p.stroke();}}
function polygon(p,pts,fill,stroke=INK,lw=3){p.beginPath();pts.forEach(([x,y],i)=>i?p.lineTo(x,y):p.moveTo(x,y));p.closePath();p.fillStyle=fill;p.fill();if(stroke&&lw){p.strokeStyle=stroke;p.lineWidth=lw;p.stroke();}}
function ellipse(p,x,y,rx,ry,fill,stroke=INK,lw=3,rot=0){p.beginPath();p.ellipse(x,y,rx,ry,rot,0,Math.PI*2);p.fillStyle=fill;p.fill();if(stroke&&lw){p.strokeStyle=stroke;p.lineWidth=lw;p.stroke();}}

function bodyPattern(p,skin,t){const s=skin.pattern;p.save();p.lineCap='round';p.lineJoin='round';
 if(s==='tux'){p.fillStyle=PAPER;p.beginPath();p.moveTo(13,-35);p.bezierCurveTo(25,-34,30,-27,27,-17);p.lineTo(18,-11);p.lineTo(10,-20);p.closePath();p.fill();}
 else if(s==='calico'){ellipse(p,-33,-27,12,9,'#272832',null,0,-.18);ellipse(p,-7,-34,10,7,'#cf6c35',null,0,.14);ellipse(p,12,-18,8,6,'#272832',null,0,.12);}
 else if(s==='siamese'){p.globalAlpha=.9;ellipse(p,-38,-24,10,12,'#4a3d43',null,0,-.2);ellipse(p,20,-19,8,8,'#4a3d43',null,0,.1);}
 else if(s==='tabby'||s==='tiger'){p.strokeStyle=s==='tiger'?'#21171a':'#51443d';p.lineWidth=s==='tiger'?5:3.5;for(const x of[-22,-9,4]){p.beginPath();p.moveTo(x,-39);p.quadraticCurveTo(x+4,-31,x+7,-24);p.stroke();}p.beginPath();p.moveTo(-43,-23);p.quadraticCurveTo(-34,-21,-29,-15);p.stroke();}
 else if(s==='tortie'){ellipse(p,-32,-28,12,9,'#c85d35',null,0,-.2);ellipse(p,-6,-32,11,7,'#d69445',null,0,.18);ellipse(p,13,-18,8,6,'#bf493b',null,0);}
 else if(s==='neon'){p.globalAlpha=.75+.25*Math.sin(t*8);p.strokeStyle='#80e1c1';p.shadowBlur=9;p.shadowColor='#80e1c1';p.lineWidth=4;p.beginPath();p.moveTo(-39,-24);p.lineTo(-27,-35);p.lineTo(-15,-23);p.lineTo(-2,-36);p.lineTo(12,-25);p.stroke();}
 else if(s==='skeleton'){p.strokeStyle='#eee8d7';p.lineWidth=3;p.beginPath();p.moveTo(-10,-39);p.quadraticCurveTo(-8,-26,-5,-12);for(let y=-34;y<=-20;y+=7){p.moveTo(-8,y);p.quadraticCurveTo(-25,y-2,-29,y+6);p.moveTo(-7,y);p.quadraticCurveTo(8,y-2,14,y+5);}p.stroke();ellipse(p,-38,-22,4,7,'#eee8d7',null,0,.15);}
 else if(s==='ghost'){p.globalAlpha=.38+.1*Math.sin(t*5);p.strokeStyle='#d8fbff';p.shadowBlur=10;p.shadowColor='#80e1c1';p.lineWidth=3;p.beginPath();p.arc(-12,-25,24,.1,4.9);p.stroke();}p.restore();}
function headPattern(p,skin,t){const s=skin.pattern;p.save();p.lineCap='round';
 if(s==='tux'){polygon(p,[[38,-59],[47,-61],[52,-50],[49,-39],[43,-34],[37,-43]],PAPER,null,0);polygon(p,[[34,-27],[48,-25],[44,-20],[35,-21]],PAPER,null,0);}
 else if(s==='calico'){ellipse(p,34,-51,10,9,'#272832',null,0,-.2);ellipse(p,58,-44,8,8,'#cf6c35',null,0,.16);}
 else if(s==='siamese'){p.globalAlpha=.88;ellipse(p,53,-41,17,16,'#4a3d43',null,0,-.04);}
 else if(s==='tabby'||s==='tiger'){p.strokeStyle=s==='tiger'?'#21171a':'#51443d';p.lineWidth=s==='tiger'?4:3;for(const x of[40,47,54]){p.beginPath();p.moveTo(x,-60);p.lineTo(47+(x-47)*.55,-52);p.stroke();}p.beginPath();p.moveTo(27,-43);p.lineTo(35,-39);p.moveTo(63,-43);p.lineTo(58,-38);p.stroke();}
 else if(s==='tortie'){ellipse(p,35,-51,9,9,'#c85d35',null,0,-.2);ellipse(p,57,-37,8,7,'#d69445',null,0,.18);}
 else if(s==='neon'){p.globalAlpha=.7+.3*Math.sin(t*8);p.strokeStyle='#ffd166';p.shadowBlur=8;p.shadowColor='#ffd166';p.lineWidth=3;p.beginPath();p.moveTo(36,-58);p.lineTo(47,-51);p.lineTo(57,-57);p.stroke();}
 else if(s==='skeleton'){p.strokeStyle='#eee8d7';p.lineWidth=2.4;p.beginPath();p.arc(40,-44,5,0,Math.PI*2);p.arc(55,-43,6,0,Math.PI*2);p.moveTo(48,-48);p.lineTo(50,-32);p.stroke();}p.restore();}

export function drawCodeGlasses(p,style,x,y,t=0){if(!style||style==='none')return;p.save();p.translate(x,y);p.lineJoin='round';p.lineCap='round';p.strokeStyle=INK;p.lineWidth=3;
 if(style==='shades'){polygon(p,[[-15,-5],[-1,-4],[-2,6],[-13,5]],INK,INK,2.5);polygon(p,[[4,-4],[19,-5],[18,5],[5,6]],INK,INK,2.5);p.fillStyle='#80e1c1';p.fillRect(-10,-2,5,1.5);p.fillRect(9,-2,5,1.5);}
 else if(style==='round'){p.strokeStyle='#ffd166';p.lineWidth=3.5;p.beginPath();p.arc(-6,0,7,0,Math.PI*2);p.arc(11,0,7,0,Math.PI*2);p.moveTo(1,0);p.lineTo(4,0);p.stroke();}
 else if(style==='heart'){p.fillStyle='#ff5f86';for(const ox of[-6,11]){p.beginPath();p.arc(ox-3,-1,4,Math.PI,0);p.arc(ox+3,-1,4,Math.PI,0);p.lineTo(ox,8);p.closePath();p.fill();p.stroke();}}
 else if(style==='pit'){polygon(p,[[-16,-6],[20,-6],[16,6],[-11,6]],'#dfff46',INK,3);p.fillStyle='#ff5f57';p.fillRect(-7,-2,19,2);}
 else if(style==='cyber'){rounded(p,-16,-7,37,13,4,'#80e1c1',INK,3);p.fillStyle='#10131c';p.fillRect(-11,-2,25,3);p.fillStyle='#ff5f57';p.fillRect(16,-5,3,9);}
 else if(style==='star'){p.fillStyle='#ffd166';for(const ox of[-6,11]){p.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?3:7,px=ox+Math.cos(a)*r,py=Math.sin(a)*r;i?p.lineTo(px,py):p.moveTo(px,py);}p.closePath();p.fill();p.stroke();}}
 else if(style==='goggles'){rounded(p,-16,-7,37,14,6,'#273443',INK,3);rounded(p,-11,-4,11,8,3,'#9ed8dc',null,0);rounded(p,7,-4,10,8,3,'#9ed8dc',null,0);}
 else if(style==='monocle'){p.strokeStyle='#ffd166';p.lineWidth=3;p.beginPath();p.arc(11,0,8,0,Math.PI*2);p.moveTo(17,6);p.quadraticCurveTo(21,13,16,21);p.stroke();}
 else if(style==='threeD'){rounded(p,-15,-6,16,12,2,'#ff5f57',INK,2);rounded(p,5,-6,16,12,2,'#5fc7ff',INK,2);p.fillStyle=PAPER;p.fillRect(1,-1,5,2);}
 else if(style==='lightning'){for(const ox of[-9,10])polygon(p,[[ox,-8],[ox+9,-8],[ox+4,-1],[ox+10,-1],[ox-1,9],[ox+2,2],[ox-6,2]],'#ffd166',INK,2);}
 else if(style==='laser'){rounded(p,-17,-7,39,13,4,'#11131d',INK,2.5);p.save();p.shadowBlur=8+Math.sin(t*8)*3;p.shadowColor='#ff335d';p.fillStyle='#ff335d';p.fillRect(-12,-1,29,2.5);p.restore();}p.restore();}

export function drawCodeHat(p,style,x,y,t=0){if(!style||style==='none')return;p.save();p.translate(x,y+Math.sin(t*3.2)*.6);p.lineJoin='round';p.strokeStyle=INK;p.lineWidth=3;
 if(style==='beanie'){p.fillStyle='#35455f';p.beginPath();p.arc(0,3,20,Math.PI,0);p.fill();p.stroke();rounded(p,-20,0,42,8,3,'#80e1c1',INK,2);}
 else if(style==='trucker'){rounded(p,-18,-12,34,18,5,PAPER,INK,3);p.fillStyle='#ff5f57';p.fillRect(-15,-9,14,11);polygon(p,[[11,1],[33,2],[33,7],[9,6]],'#1b1c24',INK,2);p.fillStyle=INK;p.font='900 7px monospace';p.fillText('SB',-13,0);}
 else if(style==='cowboy'){ellipse(p,1,5,34,8,'#8c5a35',INK,3);rounded(p,-14,-17,30,22,6,'#8c5a35',INK,3);p.fillStyle='#ffd166';p.fillRect(-13,-4,28,4);}
 else if(style==='wizard'){polygon(p,[[-15,5],[4,-35],[20,5]],'#553a78',INK,3);rounded(p,-20,1,44,7,3,'#b388ff',INK,2);p.fillStyle='#ffd166';p.fillRect(2,-21,5,5);}
 else if(style==='crown'){polygon(p,[[-17,7],[-15,-15],[-6,-4],[2,-20],[11,-4],[20,-15],[19,7]],'#ffd166',INK,3);ellipse(p,2,1,3.5,3.5,'#ff5f57',null,0);}
 else if(style==='bucket'){polygon(p,[[-18,-14],[20,-14],[14,8],[-12,8]],'#647c6d',INK,3);rounded(p,-21,5,45,6,2,'#80e1c1',INK,2);p.fillStyle=INK;p.font='900 7px monospace';p.fillText('NOPE',-11,-4);}
 else if(style==='devil'){polygon(p,[[-14,4],[-25,-20],[-4,-7]],'#ff5f57',INK,3);polygon(p,[[13,4],[25,-20],[5,-7]],'#ff5f57',INK,3);}
 else if(style==='propeller'){p.fillStyle='#4c6da8';p.beginPath();p.arc(1,4,20,Math.PI,0);p.fill();p.stroke();p.fillStyle='#ffd166';p.fillRect(-1,-17,5,17);p.save();p.translate(1,-17);p.rotate(t*10);rounded(p,-19,-2,38,4,2,'#ffd166',INK,1);p.restore();}
 else if(style==='halo'){p.save();p.shadowBlur=12;p.shadowColor='#ffd166';p.strokeStyle='#ffd166';p.lineWidth=4;p.beginPath();p.ellipse(1,-20,21,6,0,0,Math.PI*2);p.stroke();p.restore();}
 else if(style==='chef'){for(const [cx,cy,r] of[[-11,-7,10],[1,-14,11],[14,-7,10]])ellipse(p,cx,cy,r,r,PAPER,INK,3);rounded(p,-18,-8,39,17,3,PAPER,INK,3);}
 else if(style==='cone'){polygon(p,[[-18,7],[2,-36],[21,7]],'#f47a42',INK,3);p.fillStyle=PAPER;p.fillRect(-8,-8,21,7);rounded(p,-22,4,48,7,2,'#1b1c24',INK,2);}p.restore();}

const IDLE_LEGS={farRear:[-34,-17,-38,2,-43,20],farFront:[18,-16,12,3,8,20],nearRear:[-29,-17,-20,1,-25,20],nearFront:[21,-16,26,3,34,20]};
const RUN_KEYS=[
 {y:0,sx:1.03,sy:.98,farRear:[-34,-17,-18,2,-8,19],farFront:[18,-16,27,2,41,19],nearRear:[-29,-17,-39,1,-48,19],nearFront:[21,-16,32,2,48,19]},
 {y:2,sx:.98,sy:1.06,farRear:[-34,-17,-36,5,-38,19],farFront:[18,-16,18,5,22,19],nearRear:[-29,-17,-25,5,-19,19],nearFront:[21,-16,24,5,29,19]},
 {y:0,sx:1,sy:1,farRear:[-34,-17,-28,1,-22,19],farFront:[18,-16,11,3,8,19],nearRear:[-29,-17,-15,1,-11,18],nearFront:[21,-16,31,1,37,18]},
 {y:-2,sx:1.02,sy:.96,farRear:[-34,-17,-43,-1,-49,10],farFront:[18,-16,29,-2,40,9],nearRear:[-29,-17,-17,-2,-9,9],nearFront:[21,-16,13,-1,7,10]},
 {y:-5,sx:1.09,sy:.88,farRear:[-34,-17,-49,-8,-55,0],farFront:[18,-16,34,-8,50,-1],nearRear:[-29,-17,-43,-5,-51,2],nearFront:[21,-16,38,-5,54,1]},
 {y:-3,sx:.99,sy:.95,farRear:[-34,-17,-22,-8,-14,1],farFront:[18,-16,11,-6,5,2],nearRear:[-29,-17,-18,-5,-11,4],nearFront:[21,-16,29,-6,36,2]}
];
export const CAT_RUN_KEY_COUNT=RUN_KEYS.length;

function mix(a,b,t){return a+(b-a)*t;}
function mixLeg(a,b,t){return a.map((v,i)=>mix(v,b[i],t));}
function sampleRun(cycle){const phase=((cycle%1)+1)%1*RUN_KEYS.length,i=Math.floor(phase),u=phase-i,s=u*u*(3-2*u),a=RUN_KEYS[i],b=RUN_KEYS[(i+1)%RUN_KEYS.length];return{y:mix(a.y,b.y,s),sx:mix(a.sx,b.sx,s),sy:mix(a.sy,b.sy,s),farRear:mixLeg(a.farRear,b.farRear,s),farFront:mixLeg(a.farFront,b.farFront,s),nearRear:mixLeg(a.nearRear,b.nearRear,s),nearFront:mixLeg(a.nearFront,b.nearFront,s)};}
function poseModel(pose,cycle,puff,t){
 if(pose==='run')return sampleRun(cycle);
 if(pose==='jump')return{y:-3,sx:1.07,sy:.91,farRear:[-34,-17,-46,-8,-50,1],farFront:[18,-16,31,-8,44,0],nearRear:[-29,-17,-15,-6,-9,3],nearFront:[21,-16,35,-5,46,2]};
 if(pose==='puff')return{y:0,sx:.99-puff*.025,sy:1+puff*.035,...IDLE_LEGS};
 return{y:Math.sin(t*2.2)*.45,sx:1,sy:1,...IDLE_LEGS};
}
function modelLeg(p,leg,color,alpha=1){const[hx,hy,kx,ky,px,py]=leg;p.save();p.globalAlpha*=alpha;p.strokeStyle=INK;p.lineWidth=12;p.beginPath();p.moveTo(hx,hy);p.quadraticCurveTo(kx,ky,px,py);p.stroke();p.strokeStyle=color;p.lineWidth=6;p.stroke();ellipse(p,px+3,py,8,3.8,color,INK,2.5,.06);p.strokeStyle=INK;p.lineWidth=1.2;p.beginPath();p.moveTo(px+3,py-2);p.lineTo(px+7,py);p.stroke();p.restore();}
function modelTail(p,body,t,pose,state){const lift=pose==='jump'?7:pose==='run'?Math.sin(t*7)*2:Math.sin(t*3)*2;p.strokeStyle=INK;p.lineWidth=13;p.beginPath();p.moveTo(-44*state.sx,-23);p.bezierCurveTo(-66,-30,-70,-49+lift,-55,-58+lift);p.bezierCurveTo(-40,-67+lift,-38,-79+lift,-51,-75+lift);p.stroke();p.strokeStyle=body;p.lineWidth=6.5;p.stroke();}
function modelTorso(p,body,skin,t,state){p.save();p.scale(state.sx,state.sy);p.fillStyle=body;p.strokeStyle=INK;p.lineWidth=5;p.beginPath();p.moveTo(-48,-22);p.bezierCurveTo(-48,-35,-39,-43,-28,-41);p.bezierCurveTo(-14,-45,5,-42,17,-35);p.bezierCurveTo(27,-31,32,-23,29,-15);p.bezierCurveTo(20,-9,7,-10,-4,-12);p.bezierCurveTo(-15,-7,-33,-8,-44,-14);p.bezierCurveTo(-48,-16,-49,-19,-48,-22);p.closePath();p.fill();p.stroke();bodyPattern(p,skin,t);p.save();p.globalAlpha=.2;p.strokeStyle=PAPER;p.lineWidth=2;p.beginPath();p.arc(-33,-24,11,-1.5,.7);p.moveTo(18,-32);p.quadraticCurveTo(25,-24,20,-15);p.stroke();p.restore();p.restore();}
function modelFace(p,skin,t,puff){const cheek=puff*2;headPattern(p,skin,t);ellipse(p,47,-32,7+cheek*.4,6+cheek*.25,MUZZLE,null,0,-.1);ellipse(p,59,-30,10+cheek,7+cheek*.4,MUZZLE,null,0,.04);polygon(p,[[57,-35],[66,-34],[62,-29]],'#a34e58',INK,1.5);polygon(p,[[33,-49],[43,-48],[42,-41],[34,-42]],'#f6d16e',INK,2);polygon(p,[[46,-50],[59,-48],[58,-39],[47,-41]],'#f6d16e',INK,2);ellipse(p,40,-45,1.5,3.5,INK,null,0);ellipse(p,54,-44,2,4,INK,null,0);p.strokeStyle=INK;p.lineWidth=4;p.beginPath();p.moveTo(32,-53);p.lineTo(44,-50);p.moveTo(46,-53);p.lineTo(61,-51);p.stroke();p.lineWidth=2.2;p.beginPath();p.moveTo(62,-29);p.quadraticCurveTo(66,-25,70,-28);p.stroke();polygon(p,[[65,-27],[69,-22],[72,-28]],PAPER,INK,1.2);p.strokeStyle='#f4d7cb';p.lineWidth=1.2;p.beginPath();p.moveTo(49,-31);p.lineTo(35,-27);p.moveTo(50,-28);p.lineTo(37,-23);p.moveTo(62,-31);p.lineTo(77,-28);p.moveTo(63,-28);p.lineTo(77,-23);p.stroke();}

export function drawCodeCat(p,x,y,t,options={}){
 const skin=options.skin||{body:'#d66e57',head:'#e47c61',inner:'#f0a28d',pattern:'plain'},air=!!options.airborne,puff=Math.max(0,options.puff||0),pose=options.pose||(puff?'puff':air?'jump':options.run!==undefined?'run':'idle'),cycle=options.run||t*.7,state=poseModel(pose,cycle,puff,t),body=options.ghost?'#7da4ff':skin.body,head=options.ghost?'#99b0ff':skin.head;
 p.save();p.globalAlpha=options.alpha??1;p.translate(x,y+state.y);p.scale(options.scale||1,options.scale||1);p.lineCap='round';p.lineJoin='round';if(options.sprint)p.rotate(-.045);if(pose==='jump')p.rotate(options.airTilt??-.06);if(pose==='puff')p.rotate(-.018*puff);
 if(options.shadow!==false){p.save();p.globalAlpha*=.24;ellipse(p,-1,25,pose==='jump'?39:52,pose==='jump'?4:6,'#05060a',null,0);p.restore();}
 if(skin.pattern==='ghost'){p.globalAlpha*=.84;p.shadowBlur=12;p.shadowColor='#80e1c1';}
 modelTail(p,body,t,pose,state);modelLeg(p,state.farRear,body,.48);modelLeg(p,state.farFront,body,.48);modelLeg(p,state.nearRear,body,1);modelLeg(p,state.nearFront,body,1);modelTorso(p,body,skin,t,state);
 const headX=(state.sx-1)*24,recoil=puff*3.2;p.save();p.translate(headX+recoil,-puff*1.3);
 // Neck wedge and bandana bridge the shoulder into the skull.
 p.fillStyle=head;p.strokeStyle=INK;p.lineWidth=5;p.beginPath();p.moveTo(15,-34);p.bezierCurveTo(24,-47,36,-49,45,-39);p.lineTo(48,-22);p.bezierCurveTo(39,-15,27,-14,19,-22);p.closePath();p.fill();p.stroke();
 polygon(p,[[17,-31],[34,-26],[51,-31],[48,-21],[34,-17],[20,-22]],'#171923',INK,3);polygon(p,[[45,-22],[58,-17],[49,-12]],'#171923',INK,2.5);ellipse(p,52,-19,2.2,2.2,'#737789',null,0);
 p.fillStyle=head;p.strokeStyle=INK;p.lineWidth=5;p.beginPath();p.moveTo(23,-47);p.lineTo(21,-70);p.lineTo(35,-59);p.bezierCurveTo(42,-63,51,-61,56,-57);p.lineTo(64,-71);p.lineTo(66,-51);p.bezierCurveTo(69,-47,69,-41,67,-37);p.lineTo(72,-33);p.lineTo(68,-25);p.bezierCurveTo(58,-19,44,-18,33,-23);p.bezierCurveTo(25,-27,21,-36,23,-47);p.closePath();p.fill();p.stroke();
 polygon(p,[[24,-55],[24,-65],[33,-58]],skin.inner||'#f0a28d',null,0);polygon(p,[[59,-58],[63,-67],[64,-53]],skin.inner||'#f0a28d',null,0);modelFace(p,skin,t,puff);
 p.save();p.translate(47,-46);p.rotate(-.045);drawCodeGlasses(p,options.glasses,0,0,t);p.restore();drawCodeHat(p,options.hat,45,-66,t);p.restore();
 if(options.smoking||pose==='puff')modelLeg(p,[20,-16,39,-20,58+recoil,-28],body,1);
 p.restore();
}

export function drawCosmeticThumbnail(canvas,t,loadout){const p=canvas.getContext('2d'),w=canvas.width,h=canvas.height;p.clearRect(0,0,w,h);p.fillStyle='#111522';p.fillRect(0,0,w,h);p.save();p.translate(w*.55,h*.79);p.scale(Math.min(w/126,h/82));drawCodeCat(p,0,0,t,{...loadout,pose:'idle',shadow:true});p.restore();}
export function drawTitleMascot(canvas,t,skin){const p=canvas.getContext('2d'),w=canvas.width,h=canvas.height;p.clearRect(0,0,w,h);p.save();p.translate(w*.48,h*.76);p.scale(1.82,1.82);drawCodeCat(p,0,0,t,{skin,pose:'idle',shadow:true});p.restore();}
export function drawWardrobeMascot(canvas,t,loadout){const p=canvas.getContext('2d'),w=canvas.width,h=canvas.height;p.clearRect(0,0,w,h);p.save();p.globalAlpha=.18;p.strokeStyle='#b388ff';p.lineWidth=3;for(let i=0;i<5;i++){const x=(i*157+t*36)%760-60;p.beginPath();p.moveTo(x,34+i*37);p.lineTo(x+72,34+i*37);p.stroke();}p.restore();p.fillStyle=INK;p.fillRect(0,h-42,w,8);p.fillStyle='#3c3d49';p.fillRect(0,h-34,w,34);p.fillStyle='#ffd166';for(let x=-((t*90)%150);x<w;x+=150)p.fillRect(x,h-17,78,4);p.save();p.translate(172,208);p.scale(2.25,2.25);drawCodeCat(p,0,0,t,{...loadout,pose:'idle',shadow:true});p.restore();p.fillStyle=PAPER;p.font='1000 22px ui-monospace,monospace';p.fillText('LIVE GREMLIN',390,88);p.globalAlpha=.58;p.font='700 15px ui-monospace,monospace';p.fillText('LONG. HOSTILE.',390,116);p.fillText('DRESSED TERRIBLY.',390,139);p.globalAlpha=1;}
