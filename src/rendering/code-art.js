const INK = '#08090e';
const PAPER = '#f7f0dc';

function rounded(p, x, y, w, h, r, fill, stroke = INK, lineWidth = 3) {
  p.beginPath();
  p.roundRect(x, y, w, h, r);
  p.fillStyle = fill;
  p.fill();
  if (stroke && lineWidth > 0) {
    p.strokeStyle = stroke;
    p.lineWidth = lineWidth;
    p.stroke();
  }
}

function polygon(p, points, fill, stroke = INK, lineWidth = 3) {
  p.beginPath();
  points.forEach(([x, y], index) => index ? p.lineTo(x, y) : p.moveTo(x, y));
  p.closePath();
  p.fillStyle = fill;
  p.fill();
  if (stroke && lineWidth > 0) {
    p.strokeStyle = stroke;
    p.lineWidth = lineWidth;
    p.stroke();
  }
}

function drawSkinPattern(p, skin, t) {
  const pattern = skin.pattern;
  p.save();
  p.lineCap = 'round';
  p.lineJoin = 'round';
  if (pattern === 'tux') {
    polygon(p, [[4,-28],[18,-27],[18,-8],[8,0],[-1,-8]], PAPER, null, 0);
    p.fillStyle = PAPER; p.fillRect(-23, 12, 9, 4); p.fillRect(9, 12, 9, 4);
  } else if (pattern === 'calico') {
    p.fillStyle = '#252630';
    p.beginPath(); p.arc(-12,-17,8,0,Math.PI*2); p.arc(9,-8,6,0,Math.PI*2); p.fill();
    p.fillStyle = '#d26d34'; p.beginPath(); p.arc(35,-43,7,0,Math.PI*2); p.fill();
  } else if (pattern === 'siamese') {
    p.fillStyle = '#4a3d43'; p.globalAlpha = .82;
    p.beginPath(); p.ellipse(36,-35,16,11,-.08,0,Math.PI*2); p.fill();
    p.fillRect(-24,10,9,6); p.fillRect(10,10,9,6);
  } else if (pattern === 'tabby' || pattern === 'tiger') {
    p.strokeStyle = pattern === 'tiger' ? '#24191a' : '#51463f'; p.lineWidth = pattern === 'tiger' ? 4 : 3;
    for (let i = 0; i < 3; i++) { p.beginPath(); p.moveTo(-15+i*12,-24); p.lineTo(-10+i*12,-15); p.stroke(); }
    p.lineWidth = 2.4;
    for (const x of [26,37]) { p.beginPath(); p.moveTo(x,-50); p.lineTo(x+2,-42); p.stroke(); }
  } else if (pattern === 'tortie') {
    p.fillStyle = '#c95e35';
    for (const [x,y,r] of [[-12,-18,8],[11,-9,7],[35,-44,5]]) { p.beginPath(); p.arc(x,y,r,0,Math.PI*2); p.fill(); }
    p.fillStyle = '#e3ad55'; p.beginPath(); p.arc(25,-41,4,0,Math.PI*2); p.fill();
  } else if (pattern === 'neon') {
    const pulse = .7 + .3*Math.sin(t*8);
    p.globalAlpha = pulse; p.strokeStyle = '#80e1c1'; p.shadowBlur = 7; p.shadowColor = '#80e1c1'; p.lineWidth = 3;
    p.beginPath(); p.moveTo(-17,-18); p.lineTo(-7,-25); p.lineTo(3,-17); p.lineTo(15,-24); p.stroke();
    p.strokeStyle = '#ffd166'; p.beginPath(); p.moveTo(24,-47); p.lineTo(41,-43); p.stroke();
  } else if (pattern === 'skeleton') {
    p.strokeStyle = '#eee8d7'; p.lineWidth = 2.5;
    p.beginPath(); p.moveTo(0,-25); p.lineTo(0,-5);
    for (let y = -21; y <= -9; y += 6) { p.moveTo(0,y); p.lineTo(-12,y+4); p.moveTo(0,y); p.lineTo(12,y+4); }
    p.stroke(); p.fillStyle = '#eee8d7'; p.fillRect(-24,11,9,3); p.fillRect(9,11,9,3);p.beginPath();p.arc(25,-40,2.5,0,Math.PI*2);p.arc(41,-39,2.5,0,Math.PI*2);p.fill();
  } else if (pattern === 'ghost') {
    p.globalAlpha = .38 + .12*Math.sin(t*5); p.strokeStyle = '#d8fbff'; p.shadowBlur = 9; p.shadowColor = '#80e1c1'; p.lineWidth = 3;
    p.beginPath(); p.arc(-1,-18,18,.1,Math.PI*1.55); p.stroke();
  }
  p.restore();
}

export function drawCodeGlasses(p, style, x, y, t = 0) {
  if (!style || style === 'none') return;
  p.save(); p.translate(x,y); p.lineJoin = 'round'; p.lineCap = 'round'; p.strokeStyle = INK; p.lineWidth = 2.5;
  if (style === 'shades') {
    polygon(p,[[-11,-5],[1,-4],[-1,5],[-10,4]],'#08090e',INK,2); polygon(p,[[5,-4],[18,-5],[17,4],[6,5]],'#08090e',INK,2); p.fillStyle='#80e1c1';p.fillRect(-7,-2,4,1);p.fillRect(9,-2,4,1);
  } else if (style === 'round') {
    p.strokeStyle='#ffd166';p.lineWidth=3;p.beginPath();p.arc(-4,0,6,0,Math.PI*2);p.arc(11,0,6,0,Math.PI*2);p.moveTo(2,0);p.lineTo(5,0);p.stroke();
  } else if (style === 'heart') {
    p.fillStyle='#ff5f86';for(const ox of [-5,11]){p.beginPath();p.arc(ox-2,-1,4,Math.PI,0);p.arc(ox+2,-1,4,Math.PI,0);p.lineTo(ox,7);p.closePath();p.fill();p.stroke();}
  } else if (style === 'pit') {
    polygon(p,[[-12,-5],[19,-5],[15,5],[-8,5]],'#dfff46',INK,3);p.fillStyle='#ff5f57';p.fillRect(-5,-2,18,2);
  } else if (style === 'cyber') {
    rounded(p,-12,-6,31,11,3,'#80e1c1',INK,3);p.fillStyle='#10131c';p.fillRect(-8,-2,20,3);p.fillStyle='#ff5f57';p.fillRect(14,-4,3,7);
  } else if (style === 'star') {
    p.fillStyle='#ffd166';for(const ox of [-4,11]){p.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?2.5:6,px=ox+Math.cos(a)*r,py=Math.sin(a)*r;i?p.lineTo(px,py):p.moveTo(px,py);}p.closePath();p.fill();p.stroke();}
  } else if (style === 'goggles') {
    rounded(p,-12,-6,32,12,5,'#273443',INK,3);rounded(p,-8,-3,9,7,3,'#9ed8dc',null,0);rounded(p,7,-3,9,7,3,'#9ed8dc',null,0);
  } else if (style === 'monocle') {
    p.strokeStyle='#ffd166';p.lineWidth=3;p.beginPath();p.arc(11,0,7,0,Math.PI*2);p.moveTo(16,5);p.quadraticCurveTo(18,11,15,17);p.stroke();
  } else if (style === 'threeD') {
    rounded(p,-11,-5,13,10,2,'#ff5f57',INK,2);rounded(p,6,-5,13,10,2,'#5fc7ff',INK,2);p.fillStyle=PAPER;p.fillRect(1,-1,6,2);
  } else if (style === 'lightning') {
    for(const ox of [-7,10]) polygon(p,[[ox,-7],[ox+8,-7],[ox+3,-1],[ox+9,-1],[ox-1,8],[ox+2,2],[ox-5,2]],'#ffd166',INK,2);
  } else if (style === 'laser') {
    rounded(p,-13,-6,34,11,3,'#11131d',INK,2);p.save();p.shadowBlur=8+Math.sin(t*8)*3;p.shadowColor='#ff335d';p.fillStyle='#ff335d';p.fillRect(-9,-1,26,2);p.restore();
  }
  p.restore();
}

export function drawCodeHat(p, style, x, y, t = 0) {
  if (!style || style === 'none') return;
  p.save(); p.translate(x,y+Math.sin(t*3.2)*.5); p.lineJoin='round'; p.strokeStyle=INK; p.lineWidth=3;
  if(style==='beanie'){p.fillStyle='#35455f';p.beginPath();p.arc(2,3,18,Math.PI,0);p.fill();p.stroke();rounded(p,-17,0,38,7,3,'#80e1c1',INK,2);}
  else if(style==='trucker'){rounded(p,-15,-10,29,15,4,'#f0e7d1',INK,3);p.fillStyle='#ff5f57';p.fillRect(-12,-7,12,9);polygon(p,[[10,1],[29,2],[29,6],[9,5]],'#1b1c24',INK,2);p.fillStyle=INK;p.font='900 6px monospace';p.fillText('SB',-10,0);}
  else if(style==='cowboy'){p.fillStyle='#8c5a35';p.beginPath();p.ellipse(2,4,31,7,0,0,Math.PI*2);p.fill();p.stroke();rounded(p,-12,-14,27,18,5,'#8c5a35',INK,3);p.fillStyle='#ffd166';p.fillRect(-11,-3,25,3);}
  else if(style==='wizard'){polygon(p,[[-13,4],[5,-31],[18,4]],'#553a78',INK,3);rounded(p,-18,1,40,6,3,'#b388ff',INK,2);p.fillStyle='#ffd166';p.fillRect(2,-18,4,4);}
  else if(style==='crown'){polygon(p,[[-15,6],[-13,-13],[-5,-3],[2,-17],[10,-3],[18,-13],[17,6]],'#ffd166',INK,3);p.fillStyle='#ff5f57';p.beginPath();p.arc(2,1,3,0,Math.PI*2);p.fill();}
  else if(style==='bucket'){polygon(p,[[-15,-12],[18,-12],[13,7],[-10,7]],'#647c6d',INK,3);rounded(p,-18,4,39,5,2,'#80e1c1',INK,2);p.fillStyle=INK;p.font='900 6px monospace';p.fillText('NOPE',-9,-3);}
  else if(style==='devil'){polygon(p,[[-12,3],[-21,-17],[-3,-6]],'#ff5f57',INK,3);polygon(p,[[12,3],[22,-17],[5,-6]],'#ff5f57',INK,3);}
  else if(style==='propeller'){p.fillStyle='#4c6da8';p.beginPath();p.arc(2,3,17,Math.PI,0);p.fill();p.stroke();p.fillStyle='#ffd166';p.fillRect(0,-15,4,14);p.save();p.translate(2,-15);p.rotate(t*10);rounded(p,-17,-2,34,4,2,'#ffd166',INK,1);p.restore();}
  else if(style==='halo'){p.save();p.shadowBlur=12;p.shadowColor='#ffd166';p.strokeStyle='#ffd166';p.lineWidth=4;p.beginPath();p.ellipse(2,-18,19,6,0,0,Math.PI*2);p.stroke();p.restore();}
  else if(style==='chef'){p.fillStyle=PAPER;for(const [cx,cy,r] of [[-9,-6,9],[2,-12,10],[13,-6,9]]){p.beginPath();p.arc(cx,cy,r,0,Math.PI*2);p.fill();p.stroke();}rounded(p,-15,-7,34,15,3,PAPER,INK,3);}
  else if(style==='cone'){polygon(p,[[-15,6],[3,-31],[19,6]],'#f47a42',INK,3);p.fillStyle=PAPER;p.fillRect(-7,-5,20,6);rounded(p,-19,4,42,6,2,'#1b1c24',INK,2);}
  p.restore();
}

export function drawCodeCat(p, x, y, t, options = {}) {
  const skin = options.skin || { body:'#d66e57', head:'#e47c61', inner:'#f0a28d', pattern:'plain' };
  const run = options.run || 0, airborne = !!options.airborne, puff = options.puff || 0, ghost = !!options.ghost;
  const step = airborne ? 0 : Math.sin(run*Math.PI), bob = airborne ? -2 : -Math.abs(Math.sin(run*Math.PI*2))*1.8;
  const body = ghost ? '#7da4ff' : skin.body, head = ghost ? '#99b0ff' : skin.head;
  p.save(); p.globalAlpha = options.alpha ?? 1; p.translate(x,y+bob); p.scale(options.scale||1,options.scale||1);
  if(options.sprint)p.rotate(-.045); if(airborne)p.rotate(options.airTilt||-.06); if(puff)p.rotate(-.025*puff);
  p.lineCap='round';p.lineJoin='round';
  if(options.shadow!==false){p.save();p.globalAlpha*=.28;p.fillStyle='#05060a';p.beginPath();p.ellipse(2,31,43-airborne*8,7-airborne*2,0,0,Math.PI*2);p.fill();p.restore();}
  if(skin.pattern==='ghost'){p.globalAlpha*=.8;p.shadowBlur=13;p.shadowColor='#80e1c1';}
  p.strokeStyle=INK;p.lineWidth=10;p.beginPath();p.moveTo(-25,-8);p.quadraticCurveTo(-52,-19+Math.sin(t*5)*5,-39,-46+Math.sin(t*3)*2);p.stroke();p.strokeStyle=body;p.lineWidth=5;p.stroke();p.shadowBlur=0;
  p.fillStyle=body;p.strokeStyle=INK;p.lineWidth=5;p.beginPath();p.moveTo(-32,-19);p.quadraticCurveTo(-28,-35,-9,-35);p.quadraticCurveTo(15,-36,24,-23);p.lineTo(21,-5);p.quadraticCurveTo(6,4,-18,1);p.quadraticCurveTo(-35,-5,-32,-19);p.closePath();p.fill();p.stroke();
  const leftX=-21+step*10,rightX=10-step*10,legY=airborne?7:18;
  p.strokeStyle=INK;p.lineWidth=10;p.beginPath();p.moveTo(-20,-5);p.lineTo(leftX,legY);p.moveTo(11,-5);p.lineTo(rightX,legY);p.stroke();p.strokeStyle=body;p.lineWidth=5;p.stroke();
  p.fillStyle=body;p.strokeStyle=INK;p.lineWidth=3;for(const px of [leftX,rightX]){p.beginPath();p.ellipse(px,legY+1,7,3.5,0,0,Math.PI*2);p.fill();p.stroke();}
  polygon(p,[[8,-34],[29,-31],[22,-17],[15,-25],[8,-18]],'#171923',INK,3);p.fillStyle='#4a4d5d';p.beginPath();p.arc(25,-27,2.2,0,Math.PI*2);p.fill();
  const recoil=puff*3;
  p.save();p.translate(recoil,-puff*1.5);
  p.fillStyle=head;p.strokeStyle=INK;p.lineWidth=4;p.beginPath();p.moveTo(10,-46);p.lineTo(9,-65);p.lineTo(22,-53);p.quadraticCurveTo(32,-57,41,-51);p.lineTo(47,-66);p.lineTo(53,-47);p.lineTo(57,-37);p.lineTo(52,-30);p.lineTo(57,-26);p.lineTo(46,-20);p.quadraticCurveTo(29,-17,15,-25);p.lineTo(18,-31);p.lineTo(10,-36);p.closePath();p.fill();p.stroke();
  p.fillStyle=skin.inner||'#f0a28d';polygon(p,[[13,-51],[12,-60],[20,-53]],p.fillStyle,null,0);polygon(p,[[47,-52],[49,-61],[52,-49]],p.fillStyle,null,0);
  drawSkinPattern(p,skin,t);
  p.fillStyle='#e9c6a5';p.beginPath();p.ellipse(33,-31,8,6,-.12,0,Math.PI*2);p.ellipse(43,-31,8,6,.12,0,Math.PI*2);p.fill();
  p.fillStyle='#f6d16e';p.strokeStyle=INK;p.lineWidth=2;polygon(p,[[19,-44],[29,-43],[27,-37],[18,-39]],'#f6d16e',INK,2);polygon(p,[[36,-44],[48,-42],[46,-36],[36,-38]],'#f6d16e',INK,2);
  p.strokeStyle=INK;p.lineWidth=3;p.beginPath();p.moveTo(18,-46);p.lineTo(29,-44);p.moveTo(36,-45);p.lineTo(49,-43);p.stroke();
  p.fillStyle='#7f3f46';polygon(p,[[35,-34],[42,-34],[38.5,-30]],'#7f3f46',INK,1.5);
  p.strokeStyle=INK;p.lineWidth=2;p.beginPath();p.moveTo(39,-29);p.quadraticCurveTo(45,-25,51,-29);p.stroke();
  polygon(p,[[46,-28],[50,-24],[52,-29]],PAPER,INK,1);p.strokeStyle='#f4d7cb';p.lineWidth=1.2;p.beginPath();p.moveTo(32,-30);p.lineTo(18,-27);p.moveTo(32,-27);p.lineTo(19,-23);p.moveTo(45,-30);p.lineTo(61,-28);p.moveTo(45,-27);p.lineTo(60,-23);p.stroke();
  drawCodeGlasses(p,options.glasses,33,-41,t);drawCodeHat(p,options.hat,31,-60,t);
  p.restore();
  if(options.smoking){p.strokeStyle=INK;p.lineWidth=10;p.beginPath();p.moveTo(12,-8);p.lineTo(35,-23);p.stroke();p.strokeStyle=body;p.lineWidth=5;p.stroke();p.fillStyle=body;p.strokeStyle=INK;p.lineWidth=2;p.beginPath();p.arc(36,-23,4,0,Math.PI*2);p.fill();p.stroke();}
  p.restore();
}

export function drawTitleMascot(canvas, t, skin) {
  const p=canvas.getContext('2d'),w=canvas.width,h=canvas.height;p.clearRect(0,0,w,h);p.save();p.translate(w*.46,h*.76);p.scale(2.15,2.15);drawCodeCat(p,0,0,t,{skin,run:t*.7,hat:'trucker',glasses:'shades',shadow:true});p.restore();
}

export function drawWardrobeMascot(canvas, t, loadout) {
  const p=canvas.getContext('2d'),w=canvas.width,h=canvas.height;p.clearRect(0,0,w,h);
  p.save();p.globalAlpha=.18;p.strokeStyle='#b388ff';p.lineWidth=3;for(let i=0;i<5;i++){const x=(i*157+t*36)%760-60;p.beginPath();p.moveTo(x,34+i*37);p.lineTo(x+72,34+i*37);p.stroke();}p.restore();
  p.fillStyle='#08090e';p.fillRect(0,h-42,w,8);p.fillStyle='#3c3d49';p.fillRect(0,h-34,w,34);p.fillStyle='#ffd166';for(let x=-((t*90)%150);x<w;x+=150)p.fillRect(x,h-17,78,4);
  p.save();p.translate(170,205);p.scale(2.65,2.65);drawCodeCat(p,0,0,t,{skin:loadout.skin,glasses:loadout.glasses,hat:loadout.hat,run:t*.65,shadow:true});p.restore();
  p.fillStyle=PAPER;p.font='1000 22px ui-monospace,monospace';p.fillText('LIVE GREMLIN',390,88);p.globalAlpha=.58;p.font='700 15px ui-monospace,monospace';p.fillText('NO THOUGHTS',390,116);p.fillText('ONLY DRIP',390,139);p.globalAlpha=1;
}
