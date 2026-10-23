(function(){
  function init(){
    var hero=document.querySelector('.hero-reference-grid');
    if(!hero || !('IntersectionObserver' in window)) return;
    var observer=new IntersectionObserver(function(entries){
      var entry=entries[0];
      if(entry) document.documentElement.classList.toggle('hero-controls-muted', entry.isIntersecting);
    },{threshold:0.04});
    observer.observe(hero);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

;
/* Opens WhatsApp / Gmail links reliably. Phones get mailto: for email, popup-blocked links open in the same tab. */
(function(){var mob=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
function toMailto(u){try{var q=new URL(u).searchParams,s="mailto:"+encodeURIComponent(q.get("to")||"").replace(/%40/g,"@"),a=[];
["su","body","cc"].forEach(function(k){var v=q.get(k);if(v)a.push((k==="su"?"subject":k)+"="+encodeURIComponent(v))});return s+(a.length?"?"+a.join("&"):"")}catch(e){return u}}
window.openUrl=function(u){if(mob&&u.indexOf("https://mail.google.com/mail/")===0)u=toMailto(u);var w=null;try{w=window.open(u,"_blank")}catch(e){}if(!w)location.href=u;return w};
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest('a[href^="https://mail.google.com/mail/"]');if(a&&mob){e.preventDefault();location.href=toMailto(a.href)}});})();

;
(function(){
  var loginBar=document.getElementById("topbar");
  var menu=document.getElementById("nl");
  var nav=document.getElementById("nav");
  if(!loginBar||!menu||!nav)return;
  var wide=window.matchMedia("(min-width: 1500px)");
  function placeLoginBar(){
    if(wide.matches){
      if(loginBar.parentElement!==nav)nav.insertBefore(loginBar,menu);
    }else if(loginBar.parentElement!==menu){
      menu.appendChild(loginBar);
    }
  }
  placeLoginBar();
  if(wide.addEventListener)wide.addEventListener("change",placeLoginBar);
  else if(wide.addListener)wide.addListener(placeLoginBar);
})();

;
(function(){var d=document.getElementById("player"),f=document.getElementById("pl-frame"),o=document.getElementById("pl-open");
document.getElementById("work").addEventListener("click",function(e){var a=e.target.closest(".card");if(!a)return;var m=a.href.match(/\/d\/([^\/]+)/);if(!m||!d.showModal)return;e.preventDefault();o.href=a.href;f.src="https://drive.google.com/file/d/"+m[1]+"/preview";d.showModal()});
function c(){f.src="about:blank";if(d.open)d.close()}
document.getElementById("pl-close").addEventListener("click",c);d.addEventListener("click",function(e){if(e.target===d)c()});d.addEventListener("close",function(){f.src="about:blank"});})();

;
(function(){var g=document.getElementById("gallery"),grid=document.getElementById("g-grid"),root=document.documentElement;
function show(){if(!grid.children.length){document.querySelectorAll("#work .card").forEach(function(c){grid.appendChild(c.cloneNode(true))})}g.hidden=false;g.scrollTop=0;root.style.overflow="hidden"}
function hide(){g.hidden=true;root.style.overflow="";try{history.replaceState(null,"",location.href.split("#")[0])}catch(e){}}
window.openFilmGallery=show;
var showreelButton=document.getElementById("open-gallery");
var featuredFilm=document.getElementById("featured-film");
showreelButton.addEventListener("click",function(e){
  e.preventDefault();
  if(!featuredFilm)return;
  featuredFilm.hidden=false;
  featuredFilm.setAttribute("aria-hidden","false");
  showreelButton.setAttribute("aria-expanded","true");
  featuredFilm.classList.remove("featured-film-reveal");
  void featuredFilm.offsetWidth;
  featuredFilm.classList.add("featured-film-reveal");
  featuredFilm.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
});
document.getElementById("g-back").addEventListener("click",hide);
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!g.hidden&&!document.getElementById("player").open)hide()});
g.addEventListener("click",function(e){var a=e.target.closest(".card"),d=document.getElementById("player");if(!a)return;var m=a.href.match(/\/d\/([^\/]+)/);if(!m||!d.showModal)return;e.preventDefault();document.getElementById("pl-open").href=a.href;document.getElementById("pl-frame").src="https://drive.google.com/file/d/"+m[1]+"/preview";d.showModal()});
if(location.hash==="#gallery")show();
window.addEventListener("hashchange",function(){if(location.hash==="#gallery")show()});
})();

;
(function(){var $=function(i){return document.getElementById(i)},WA="919284423297",msg=$("b-msg");
var d=new Date();$("b-date").min=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
$("b-type").addEventListener("change",function(){var o=this.value==="Other";$("b-other-wrap").hidden=!o;if(o)$("b-other").focus()});
function v(){return{n:$("b-name").value.trim(),p:$("b-phone").value.trim(),e:$("b-email").value.trim(),t:$("b-type").value==="Other"?($("b-other").value.trim()||"Other"):$("b-type").value,d:$("b-date").value,city:$("b-city").value.trim(),venue:$("b-venue").value.trim(),x:$("b-note").value.trim(),s:$("b-slot").value,tm:$("b-time").value}}
function text(f,i){return (i||"Hi Shubham, I would like to discuss a booking with you.")+"\nName: "+f.n+(f.p?"\nWhatsApp: "+f.p:"")+(f.e?"\nEmail: "+f.e:"")+"\nShoot: "+f.t+(f.d?"\nDate: "+f.d:"")+(f.s?"\nEvent time: "+f.s+(f.tm?" (from "+f.tm+")":""):"")+(f.venue?"\nVenue: "+f.venue:"")+(f.city?"\nCity: "+f.city:"")+(f.x?"\nDetails: "+f.x:"")}
$("b-discuss").addEventListener("click",function(){var f=v();if(!f.n){msg.textContent="Please enter your name first, so Shubham knows who is writing.";$("b-name").focus();return}msg.textContent="";openUrl("https://api.whatsapp.com/send?phone="+window.SB_WA+"&text="+encodeURIComponent(text(f)),"_blank")});
})();

;
(function(){var $=function(i){return document.getElementById(i)};
/* Approved reviews go here. Example: {n:"Priya",r:5,t:"Review text",s:"Wedding highlight"} */
var REVIEWS=[];
var list=$("rv-list");REVIEWS.forEach(function(x){var c=document.createElement("div");c.className="rv-card";var s=document.createElement("div");s.className="s";s.textContent="\u2605".repeat(x.r)+"\u2606".repeat(5-x.r);var p=document.createElement("p");p.textContent=x.t;var m=document.createElement("small");m.textContent=x.n+(x.s?", "+x.s:"");c.append(s,p,m);list.appendChild(c)});
var rating=0,btns=document.querySelectorAll("#r-stars button");
function paint(n){btns.forEach(function(b){var on=+b.dataset.v<=n;b.classList.toggle("on",on);b.setAttribute("aria-checked",String(+b.dataset.v===rating))})}
function rmv(el){return function(){el.remove()}}
function celebrate(n){var box=$("r-stars"),great=n>=4;box.classList.toggle("great",great);$("r-msg").textContent=great?"Wow, thank you for the great rating!":"";
if(matchMedia("(prefers-reduced-motion: reduce)").matches||!box.animate)return;
var on=[].filter.call(btns,function(b){return +b.dataset.v<=n});
on.forEach(function(b,i){b.animate(great?[{transform:"scale(1) rotate(0)"},{transform:"scale(1.7) rotate(-18deg)",filter:"drop-shadow(0 0 14px #E8A317)"},{transform:"scale(1) rotate(0)"}]:[{transform:"scale(1)"},{transform:"scale(1.25)"},{transform:"scale(1)"}],{duration:great?650:300,delay:i*90,easing:"cubic-bezier(.2,.8,.3,1.4)"})});
if(!great)return;
var br=box.getBoundingClientRect(),per=Math.ceil((n===5?34:20)/on.length),cols=["#E8A317","#F6D58A","#FFFFFF","#FF9F43"];
on.forEach(function(b,i){var r=b.getBoundingClientRect(),cx=r.left-br.left+r.width/2,cy=r.top-br.top+r.height/2;
for(var k=0;k<per;k++){var s=document.createElement("span"),a=Math.random()*6.283,d=30+Math.random()*(n===5?70:50);s.className="spark";s.style.cssText="left:"+cx+"px;top:"+cy+"px;opacity:0;background:"+cols[k%4];box.appendChild(s);
s.animate([{transform:"translate(-50%,-50%) scale(1)",opacity:1},{transform:"translate(calc(-50% + "+Math.cos(a)*d+"px),calc(-50% + "+Math.sin(a)*d+"px)) scale(0)",opacity:0}],{duration:700+Math.random()*500,delay:i*90,easing:"ease-out",fill:"forwards"}).onfinish=rmv(s)}})}
btns.forEach(function(b){b.addEventListener("click",function(){rating=+b.dataset.v;paint(rating);celebrate(rating)});b.addEventListener("mouseenter",function(){paint(+b.dataset.v)});b.addEventListener("mouseleave",function(){paint(rating)})});
$("r-send").addEventListener("click",function(){var n=$("r-name").value.trim(),t=$("r-text").value.trim(),m=$("r-msg");
if(!rating){m.textContent="Please tap the stars to rate first.";return}
if(!n){m.textContent="Please enter your name.";$("r-name").focus();return}
if(!t){m.textContent="Please write a few words about your experience.";$("r-text").focus();return}
var msg="Hi Shubham, here is my review.\nRating: "+rating+"/5 "+"\u2605".repeat(rating)+"\nName: "+n+"\nReview: "+t+"\nYou may show my review on your website: "+($("r-ok").checked?"Yes":"No");
m.textContent="Thank you! WhatsApp is opening: press send to share your review.";
openUrl("https://api.whatsapp.com/send?phone="+window.SB_WA+"&text="+encodeURIComponent(msg),"_blank")});
document.getElementById("nav-films").addEventListener("click",function(e){e.preventDefault();if(window.openFilmGallery)window.openFilmGallery()});
})();

;
(function(){var Q={"Total price":"What is the total price for this shoot?","Advance payment":"How much advance payment is needed?","Package offers":"Do you have any package offers?","Delivery time":"How many days will the delivery take?"};
var box=document.getElementById("packages");
box.addEventListener("click",function(e){var c=e.target.closest(".chip");if(c){var g=c.parentNode;if(g.dataset.mode==="single"){var was=c.getAttribute("aria-pressed")==="true";g.querySelectorAll(".chip").forEach(function(x){x.setAttribute("aria-pressed","false")});c.setAttribute("aria-pressed",was?"false":"true")}else{c.setAttribute("aria-pressed",c.getAttribute("aria-pressed")==="true"?"false":"true")}return}
var b=e.target.closest("[data-ask]");if(!b)return;var card=b.closest(".pk"),len=card.querySelector('[data-mode="single"] [aria-pressed="true"]'),qs=[].map.call(card.querySelectorAll('[data-mode="multi"] [aria-pressed="true"]'),function(x){return Q[x.textContent]});
if(!qs.length)qs=[Q["Total price"]];
var m="Hi Shubham, I am interested in: "+card.dataset.t+(len?" ("+len.textContent+")":"")+".\nMy questions about pricing:\n"+qs.map(function(q,i){return (i+1)+". "+q}).join("\n");
openUrl("https://api.whatsapp.com/send?phone="+window.SB_WA+"&text="+encodeURIComponent(m),"_blank")});
})();

;
(function(){var $=function(i){return document.getElementById(i)};
var T={studio:["Studio","rgba(232,163,23,.30)","rgba(194,65,12,.26)","rgba(80,100,220,.30)"],
sunny:["Sunny","rgba(255,196,60,.32)","rgba(70,160,255,.28)","rgba(255,140,60,.24)"],
golden:["Golden hour","rgba(255,140,50,.34)","rgba(255,90,120,.26)","rgba(255,200,90,.28)"],
night:["Night","rgba(70,80,220,.32)","rgba(140,70,220,.26)","rgba(30,120,200,.24)"],
monsoon:["Monsoon","rgba(40,160,150,.30)","rgba(70,100,170,.30)","rgba(120,150,160,.26)"],
winter:["Winter","rgba(130,190,255,.30)","rgba(190,170,255,.24)","rgba(200,220,240,.22)"],
summer:["Summer","rgba(255,120,50,.32)","rgba(255,190,60,.28)","rgba(230,70,70,.22)"],
diwali:["Diwali","rgba(255,175,40,.38)","rgba(220,60,60,.30)","rgba(255,110,30,.30)"],
navratri:["Navratri","rgba(230,40,140,.32)","rgba(255,140,30,.30)","rgba(255,215,60,.26)"],
holi:["Holi","rgba(255,60,150,.32)","rgba(60,200,120,.28)","rgba(80,140,255,.30)"],
christmas:["Christmas","rgba(220,40,50,.30)","rgba(40,160,90,.28)","rgba(255,215,120,.24)"],
newyear:["New Year","rgba(150,90,255,.32)","rgba(255,200,80,.30)","rgba(60,160,255,.26)"],
india:["Tricolour","rgba(255,140,30,.32)","rgba(255,255,255,.18)","rgba(20,150,60,.30)"],
sankranti:["Makar Sankranti","rgba(255,190,60,.34)","rgba(80,170,255,.28)","rgba(255,110,60,.26)"]};
var ORDER=["sunny","golden","night","monsoon","winter","summer","diwali","navratri","holi","christmas","newyear","india","sankranti","studio"];
var LUNAR=[["2026-10-11","2026-10-20","navratri"],["2026-11-05","2026-11-10","diwali"],["2027-03-20","2027-03-23","holi"],["2027-04-07","2027-04-15","navratri"]];
var YEARLY=[[1225-3,1226,"christmas"],[1230,1231,"newyear"],[101,102,"newyear"],[113,115,"sankranti"],[125,127,"india"],[814,816,"india"]];
function auto(){var d=new Date(),m=d.getMonth()+1,md=m*100+d.getDate(),h=d.getHours(),
iso=d.getFullYear()+"-"+String(m).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"),i;
for(i=0;i<LUNAR.length;i++)if(iso>=LUNAR[i][0]&&iso<=LUNAR[i][1])return LUNAR[i][2];
for(i=0;i<YEARLY.length;i++)if(md>=YEARLY[i][0]&&md<=YEARLY[i][1])return YEARLY[i][2];
if(h>=20||h<5)return"night";if(h<8||h>=17)return"golden";
if(m>=6&&m<=9)return"monsoon";if(m>=11||m<=2)return"winter";if(m>=3&&m<=5)return"summer";return"sunny"}
var ACC={studio:"#E8A317",sunny:"#FFC83D",golden:"#FF9F4A",night:"#9FA8FF",monsoon:"#4FD1C5",winter:"#9AD1FF",summer:"#FF9A3D",diwali:"#FFB627",navratri:"#FF4FA3",holi:"#FF5CAA",christmas:"#FF6B6B",newyear:"#B794FF",india:"#FF9933",sankranti:"#FFC13D"};
var FX={sunny:[["dust"],["#FFD36B","#FFF1B0","#FFE08A"]],golden:[["dust"],["#FFB26B","#FF8FA3","#FFD98A"]],night:[["stars","shoot"],["#FFFFFF","#CFE0FF"]],monsoon:[["rain"],[]],winter:[["snow"],["#DCEEFF"]],summer:[["dust"],["#FF9A4D","#FFD24D","#FF7A59"]],diwali:[["fire","dust"],["#FFC23D","#FF6B35","#FF3D5A","#FFF3B0"]],navratri:[["garba"],["#FF2E93","#FF9A1F","#FFD93D","#8E5BFF","#2ECC71"]],holi:[["powder"],["#FF3D8E","#3DDC84","#4C8DFF","#FFD93D","#B04CFF"]],christmas:[["snow"],["#FFFFFF"]],newyear:[["fire","confetti"],["#B794FF","#FFD24D","#4CC9F0","#FF5CAA"]],india:[["confetti"],["#FF9933","#FFFFFF","#138808"]],sankranti:[["kites"],["#FF5C5C","#FFC13D","#4CC9F0","#7CE38B","#FF8AD8"]],studio:[[],[]]};
function isLight(){var r=document.documentElement;return r.dataset.theme==="light"||(r.dataset.theme!=="dark"&&r.dataset.theme!=="red"&&matchMedia("(prefers-color-scheme: light)").matches)}
var cv=$("fx"),cx=cv.getContext("2d"),W=0,H=0,COARSE=matchMedia("(pointer:coarse)").matches,dpr=Math.min(window.devicePixelRatio||1,COARSE?1:1.25),kinds=[],cols=[],ST={},raf=0,last=0,tt=0,tm={},reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
function rnd(a,b){return a+Math.random()*(b-a)}function pick(a){return a[Math.floor(Math.random()*a.length)]}
function size(){W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}
function glow(x,y,r,c,a){var g=cx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,c);g.addColorStop(1,c+"00");cx.globalAlpha=a;cx.fillStyle=g;cx.beginPath();cx.arc(x,y,r,0,6.2832);cx.fill();cx.globalAlpha=1}
function dim(c){return isLight()?({"#FFFFFF":"#C3CEE3","#DCEEFF":"#8FB0D6","#CFE0FF":"#5A6FB5"}[c]||c):c}
var K={
rain:{n:function(){return Math.round(W/10)},mk:function(i){return{x:rnd(-120,W),y:i?rnd(0,H):rnd(-H,0),v:rnd(900,1400),l:rnd(14,28)}},up:function(p,d){p.y+=p.v*d;p.x+=p.v*.18*d;if(p.y>H){p.y=rnd(-80,0);p.x=rnd(-120,W)}},dr:function(p){cx.strokeStyle=isLight()?"rgba(70,110,160,.4)":"rgba(170,210,235,.45)";cx.lineWidth=1.2;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(p.x+p.l*.18,p.y+p.l);cx.stroke()}},
snow:{n:function(){return Math.round(W/13)},mk:function(i){return{x:rnd(0,W),y:i?rnd(0,H):-10,r:rnd(1.3,3.4),v:rnd(24,64),ph:rnd(0,6.3),s:rnd(.4,1.2)}},up:function(p,d){p.y+=p.v*d;p.x+=Math.sin(tt*p.s+p.ph)*22*d;if(p.y>H+8){p.y=-8;p.x=rnd(0,W)}},dr:function(p){cx.fillStyle=dim(cols[0]);cx.globalAlpha=.85;cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.2832);cx.fill();cx.globalAlpha=1}},
stars:{n:function(){return Math.round(W*H/8000)},mk:function(){return{x:rnd(0,W),y:rnd(0,H),r:rnd(.5,1.7),ph:rnd(0,6.3),s:rnd(.6,2)}},up:function(){},dr:function(p){cx.fillStyle=dim(pick(cols.length?[cols[0]]:["#FFFFFF"]));cx.globalAlpha=.25+.75*Math.pow(Math.sin(tt*p.s+p.ph),2);cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.2832);cx.fill();cx.globalAlpha=1}},
shoot:{n:function(){return 0},tick:function(a,d){tm.sh=(tm.sh||0)-d;if(tm.sh<=0){tm.sh=rnd(4,9);a.push({x:rnd(0,W*.8),y:rnd(0,H*.4),vx:rnd(500,800),vy:rnd(250,400),life:1})}},up:function(p,d){p.x+=p.vx*d;p.y+=p.vy*d;p.life-=d*1.1},dr:function(p){cx.strokeStyle=isLight()?"rgba(60,70,150,"+p.life*.6+")":"rgba(255,255,255,"+p.life*.8+")";cx.lineWidth=1.6;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(p.x-p.vx*.09,p.y-p.vy*.09);cx.stroke()},dead:function(p){return p.life<=0}},
dust:{n:function(){return Math.max(10,Math.round(W*H/38000))},mk:function(i){return{x:rnd(0,W),y:i?rnd(0,H):H+40,r:rnd(8,30),vy:-rnd(6,22),vx:rnd(-8,8),a:rnd(.1,.26),c:pick(cols),ph:rnd(0,6.3)}},up:function(p,d){p.y+=p.vy*d;p.x+=p.vx*d+Math.sin(tt*.5+p.ph)*8*d;if(p.y<-p.r*2){p.y=H+p.r;p.x=rnd(0,W)}},dr:function(p){glow(p.x,p.y,p.r,p.c,p.a)}},
confetti:{n:function(){return Math.round(W/16)},mk:function(i){return{x:rnd(0,W),y:i?rnd(0,H):-20,w:rnd(5,9),h:rnd(9,15),v:rnd(40,110),s:rnd(.6,2),ph:rnd(0,6.3),rot:rnd(0,6.3),vr:rnd(-3,3),c:pick(cols)}},up:function(p,d){p.y+=p.v*d;p.x+=Math.sin(tt*p.s+p.ph)*30*d;p.rot+=p.vr*d;if(p.y>H+20){p.y=-20;p.x=rnd(0,W)}},dr:function(p){cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillStyle=dim(p.c);cx.globalAlpha=.8;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore();cx.globalAlpha=1}},
kites:{n:function(){return Math.max(4,Math.round(W/230))},mk:function(i){return{x:i?rnd(-40,W):-40,y:i?rnd(H*.3,H+60):rnd(H*.5,H),vx:rnd(14,34),vy:rnd(12,30),s:rnd(14,26),c:pick(cols),ph:rnd(0,6.3)}},up:function(p,d){p.x+=p.vx*d;p.y-=p.vy*d;if(p.x>W+60||p.y<-80){p.x=rnd(-60,W*.5);p.y=H+60}},dr:function(p){var a=Math.sin(tt*.8+p.ph)*.25-.35;cx.save();cx.translate(p.x,p.y);cx.rotate(a);cx.fillStyle=p.c;cx.globalAlpha=.6;cx.beginPath();cx.moveTo(0,-p.s);cx.lineTo(p.s*.7,0);cx.lineTo(0,p.s*1.2);cx.lineTo(-p.s*.7,0);cx.closePath();cx.fill();cx.globalAlpha=.5;cx.strokeStyle=p.c;cx.lineWidth=1.2;cx.beginPath();cx.moveTo(0,p.s*1.2);cx.quadraticCurveTo(-8,p.s*2,3,p.s*2.8);cx.stroke();cx.restore();cx.globalAlpha=1}},
powder:{n:function(){return 0},tick:function(a,d){tm.po=(tm.po||0)-d;if(tm.po<=0){tm.po=rnd(.45,1.1);a.push({x:rnd(0,W),y:rnd(0,H),r:0,max:rnd(90,200),c:pick(cols),a:.5})}},up:function(p,d){p.r+=(p.max-p.r)*d*1.8;p.a-=d*.17},dr:function(p){glow(p.x,p.y,Math.max(p.r,1),p.c,Math.max(p.a,0))},dead:function(p){return p.a<=0}},
fire:{n:function(){return 0},tick:function(a,d){tm.fi=(tm.fi||0)-d;if(tm.fi<=0){tm.fi=rnd(.7,1.7);a.push({t:"r",x:rnd(W*.1,W*.9),y:H+10,ty:rnd(H*.15,H*.5),v:rnd(380,520),c:pick(cols)})}},up:function(p,d,a){if(p.t==="r"){p.y-=p.v*d;if(p.y<=p.ty){p.dead=1;var n=Math.round(rnd(36,60)),k=pick(cols);for(var i=0;i<n;i++){var an=i/n*6.2832,sp=rnd(60,200);a.push({t:"s",x:p.x,y:p.y,vx:Math.cos(an)*sp,vy:Math.sin(an)*sp,life:1,c:Math.random()<.7?p.c:k})}}}else{p.vx*=.985;p.vy=p.vy*.985+90*d;p.x+=p.vx*d;p.y+=p.vy*d;p.life-=d*.75}},dr:function(p){cx.fillStyle=p.c;if(p.t==="r"){cx.globalAlpha=.9;cx.fillRect(p.x-1,p.y,2,10)}else{cx.globalAlpha=Math.max(p.life,0);cx.beginPath();cx.arc(p.x,p.y,2,0,6.2832);cx.fill()}cx.globalAlpha=1},dead:function(p){return p.dead||(p.t==="s"&&p.life<=0)}}};
var gi=0;
K.garba={n:function(){gi=0;return W<600?18:28},mk:function(){var i=gi++;return{i:i,sc:i%2?.62:1,dir:i%2?-1:1,a:(i>>1)*(6.2832/(W<600?9:14))+(i%2?.3:0)}},
geo:function(sc){var rx=Math.min(W*.46,560)*sc;return[W/2,H*.6,rx,rx*.3]},
pre:function(){[1,.62].forEach(function(s){var g=K.garba.geo(s);cx.strokeStyle=isLight()?"rgba(160,90,30,.2)":"rgba(255,200,120,.2)";cx.lineWidth=1.2;cx.beginPath();cx.ellipse(g[0],g[1],g[2],g[3],0,0,6.2832);cx.stroke()})},
up:function(p,d){p.a+=p.dir*.35*d},
dr:function(p){var g=K.garba.geo(p.sc),x=g[0]+g[2]*Math.cos(p.a),y=g[1]+g[3]*Math.sin(p.a)+Math.sin(tt*3+p.i)*3,z=.8+.35*Math.sin(p.a),c=cols[p.i%cols.length],ang=tt*5+p.i;
glow(x,y,28*z,c,.55);cx.fillStyle=c;cx.beginPath();cx.arc(x,y,3.6*z,0,6.2832);cx.fill();
cx.strokeStyle=isLight()?"rgba(90,50,20,.75)":"rgba(255,255,255,.8)";cx.lineWidth=2.2*z;cx.lineCap="round";cx.beginPath();cx.moveTo(x-Math.cos(ang)*15*z,y-Math.sin(ang)*15*z);cx.lineTo(x+Math.cos(ang)*15*z,y+Math.sin(ang)*15*z);cx.stroke()}};
K.petals={n:function(){return Math.round(W/22)},mk:function(i){return{x:rnd(0,W),y:i?rnd(0,H):-20,w:rnd(4,7),h:rnd(9,15),v:rnd(24,60),s:rnd(.5,1.6),ph:rnd(0,6.3),rot:rnd(0,6.3),vr:rnd(-2,2),c:pick(["#FF9A1F","#FFB627","#FF7A00","#FFD93D"])}},up:function(p,d){p.y+=p.v*d;p.x+=Math.sin(tt*p.s+p.ph)*26*d;p.rot+=p.vr*d;if(p.y>H+20){p.y=-20;p.x=rnd(0,W)}},dr:function(p){cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.fillStyle=p.c;cx.globalAlpha=.8;cx.beginPath();cx.ellipse(0,0,p.w,p.h,0,0,6.2832);cx.fill();cx.restore();cx.globalAlpha=1}};
var NAV=[["#FF8A1F","255,138,31"],["#F4F4F4","255,255,255"],["#FF3B3B","255,59,59"],["#3D6BFF","61,107,255"],["#FFD21F","255,210,31"],["#2ECC71","46,204,113"],["#A0A8B5","160,168,181"],["#A855F7","168,85,247"],["#14B8A6","20,184,166"]];
function navDay(){var d=new Date(),b=Math.floor((new Date(d.getFullYear(),d.getMonth(),d.getDate())-new Date(2026,9,11))/864e5);return b>=0&&b<9?b:-1}
function seed(){ST={};tm={};kinds.forEach(function(k){var o=K[k],a=[],n=Math.min(o.n(),COARSE?42:96),i;for(i=0;i<n;i++)a.push(o.mk(true));ST[k]=a})}
function loop(ts){raf=0;if(document.hidden||!kinds.length)return;if(ts-last<42){raf=requestAnimationFrame(loop);return}var d=Math.min((ts-last)/1000||0,.08);last=ts;tt+=d;cx.clearRect(0,0,W,H);
kinds.forEach(function(k){var o=K[k],a=ST[k];if(o.tick)o.tick(a,d);if(o.pre)o.pre();var i,p;for(i=0;i<a.length;i++){p=a[i];o.up(p,d,a)}if(o.dead)ST[k]=a=a.filter(function(q){return!o.dead(q)});for(i=0;i<a.length;i++)o.dr(a[i])});
raf=requestAnimationFrame(loop)}
function startFx(k){var f=FX[k]||[[],[]];var lowPower=COARSE||!!(navigator.connection&&navigator.connection.saveData);var manualChoice=choice!=="auto";kinds=(reduced||lowPower||!manualChoice)?[]:f[0];cols=f[1];if(k==="navratri"&&navDay()>=0)cols=[NAV[navDay()][0]].concat(cols);cx.clearRect(0,0,W,H);seed();if(!raf&&kinds.length){last=performance.now();raf=requestAnimationFrame(loop)}}
size();window.addEventListener("resize",function(){size();seed()});
document.addEventListener("visibilitychange",function(){if(!document.hidden&&!raf&&kinds.length){last=performance.now();raf=requestAnimationFrame(loop)}});
function paint(k){if(!T[k])k="studio";var t=T[k],s=document.documentElement.style,ac=ACC[k]||ACC.studio;s.setProperty("--a1",t[1]);s.setProperty("--a2",t[2]);s.setProperty("--a3",t[3]);if(k==="navratri"&&navDay()>=0){var nv=NAV[navDay()];ac=nv[0];s.setProperty("--a1","rgba("+nv[1]+",.40)")}s.setProperty("--gold",isLight()?"color-mix(in srgb,"+ac+" 55%,#1B2038)":ac);if(document.documentElement.dataset.theme==="red"){s.setProperty("--a1","rgba(200,20,60,.34)");s.setProperty("--a2","rgba(120,8,20,.36)");s.setProperty("--a3","rgba(30,0,8,.55)");s.setProperty("--gold","#E23B52")}startFx(k)}
try{matchMedia("(prefers-color-scheme: light)").addEventListener("change",function(){apply()})}catch(e){}
var choice="auto";try{choice=localStorage.getItem("mood")||"auto"}catch(e){}
if(choice!=="auto"&&!T[choice])choice="auto";
var chips=$("mood-chips");
function build(){chips.innerHTML="";var a=auto(),list=["auto"].concat(ORDER);
list.forEach(function(k){var b=document.createElement("button");b.type="button";b.className="chip";b.dataset.k=k;b.textContent=k==="auto"?"Auto: "+T[a][0]:T[k][0];b.setAttribute("aria-pressed",String(k===choice));chips.appendChild(b)})}
function apply(){paint(choice==="auto"?auto():choice)}
window.sbRepaint=apply;
chips.addEventListener("click",function(e){var b=e.target.closest(".chip");if(!b)return;choice=b.dataset.k;try{localStorage.setItem("mood",choice)}catch(x){}build();apply()});
var btn=$("mood-btn"),panel=$("mood-panel");
function toggle(open){panel.hidden=!open;btn.setAttribute("aria-expanded",String(open))}
btn.addEventListener("click",function(e){e.stopPropagation();toggle(panel.hidden)});
document.addEventListener("click",function(e){if(!panel.hidden&&!$("mood").contains(e.target))toggle(false)});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!panel.hidden)toggle(false)});
build();apply();setInterval(function(){if(choice==="auto"){build();apply()}},600000);
/* smooth scroll reveal */
if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!COARSE&&!(navigator.connection&&navigator.connection.saveData)){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.1});
[".sw>li",".pkg>.pk",".pm-grid>.pm-i",".faq>.fq",".masonry>.ph",".ft-g>div",".stat>div",".eq li",".rv-list>*"].forEach(function(sel){var par=new Map();document.querySelectorAll(sel).forEach(function(el){var q=el.parentNode,i=par.get(q)||0;par.set(q,i+1);el.classList.add("stg");el.style.setProperty("--d",Math.min(i,8)*80+"ms")})});
document.querySelectorAll("section").forEach(function(s){s.classList.add("reveal");io.observe(s)})}
})();

;
(function(){var $=function(i){return document.getElementById(i)};
/* Calendar availability is read from the Apps Script endpoint, which merges booking-sheet and public-calendar data. */
var BOOKED_DATES=[];
/* Same-origin Cloudflare Pages Function; it forwards requests to the Apps Script backend. */
var BACKEND_URL="/api/booking";/* Address of your live site. Used for the Customer login button when this page is viewed somewhere the booking system is not connected. */
var LIVE_SITE="https://photowalashubham.pages.dev";
function tokFor(r){try{var b=JSON.parse(localStorage.getItem("sb_booking")||"null");return b&&b.tok&&String(b.ref).toUpperCase()===String(r).toUpperCase()?b.tok:""}catch(e){return ""}}
function getJ(q,cb,err){
  var mr=/[?&]ref=([^&]+)/.exec(q),tk="";
  try{tk=mr?tokFor(decodeURIComponent(mr[1])):""}catch(e){}
  if(tk)q+="&token="+encodeURIComponent(tk);
  var ctrl=typeof AbortController!=="undefined"?new AbortController():null;
  var timer=setTimeout(function(){if(ctrl)ctrl.abort()},18000);
  fetch(BACKEND_URL+q,ctrl?{signal:ctrl.signal}:{})
    .then(function(r){return r.text().then(function(t){var j;try{j=JSON.parse(t)}catch(e){throw new Error("Booking service returned an unreadable response (HTTP "+r.status+").")};if(!r.ok)throw new Error("Booking service returned HTTP "+r.status+".");return j})})
    .then(function(j){clearTimeout(timer);if(typeof cb==="function")cb(j)})
    .catch(function(e){clearTimeout(timer);if(typeof err==="function")err(e);else try{console.warn("GET booking API failed",e)}catch(x){}})
}
function postJ(o){try{if(o&&o.ref&&!o.token){var tk=tokFor(o.ref);if(tk)o.token=tk}fetch(BACKEND_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(o)}).catch(function(){})}catch(e){}}
/* ======================================================= */
var MN=["January","February","March","April","May","June","July","August","September","October","November","December"],booked={},sel="",view=new Date();view.setDate(1);view.setHours(0,0,0,0);
function pad(n){return String(n).padStart(2,"0")}
function iso(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())}
BOOKED_DATES.forEach(function(x){booked[x]=3});
var pendM={},pend={};function bm(s){return(booked[s]|0)|(pendM[s]|0)}
try{JSON.parse(localStorage.getItem("sb_pending")||"[]").forEach(function(x){pend[x]=1})}catch(e){}
var now=new Date();now.setDate(1);now.setHours(0,0,0,0);
function status(t){$("cal-status").textContent=t}
function render(){var y=view.getFullYear(),m=view.getMonth(),g=$("cal-grid"),today=iso(new Date()),first=new Date(y,m,1).getDay(),n=new Date(y,m+1,0).getDate(),i;
$("cal-title").textContent=MN[m]+" "+y;g.innerHTML="";
for(i=0;i<first;i++)g.appendChild(document.createElement("span"));
for(i=1;i<=n;i++){var s=y+"-"+pad(m+1)+"-"+pad(i),b=document.createElement("button"),past=s<today,cmk=booked[s]|0,pmk=pendM[s]|0,mk=cmk|pmk,bk=cmk===3,pn=!bk&&mk===3;b.type="button";b.textContent=i;b.dataset.d=s;
b.className="cd "+(past?"past":bk?"bk":pn?"pnd":pend[s]?"op pend":"op")+(mk&&!bk&&!pn?(cmk?" part":" partp"):"")+(s===today?" td":"")+(s===sel?" sel":"");
if(past)b.disabled=true;b.setAttribute("aria-label",i+" "+MN[m]+" "+y+", "+(past?"past date":bk?"booked":pn?"pending confirmation":mk?((cmk?"":"pending confirmation, ")+(mk===1?"day booked, night available":"night booked, day available")):pend[s]?"payment pending":"available"));g.appendChild(b)}
$("cal-prev").disabled=view<=now;var lim=new Date(now.getFullYear(),now.getMonth()+18,1);$("cal-next").disabled=new Date(y,m+1,1)>=lim}
$("cal-prev").addEventListener("click",function(){view=new Date(view.getFullYear(),view.getMonth()-1,1);render()});
$("cal-next").addEventListener("click",function(){view=new Date(view.getFullYear(),view.getMonth()+1,1);render()});
$("cal-grid").addEventListener("click",function(e){var b=e.target.closest(".cd");if(!b||b.disabled)return;var s=b.dataset.d;
if(bm(s)===3){status((booked[s]|0)===3?"That date is already booked. Please choose a green date.":"That date is pending Shubham's confirmation. Please choose another date or check back soon.");return}
sel=s;var inp=$("b-date");inp.value=s;inp.dispatchEvent(new Event("change"));render();
var picked=$("cal-picked-date"),featureTitle=$("cal-feature-title"),featureCopy=$("cal-feature-copy");
if(picked){var pd=new Date(s+"T12:00:00");picked.textContent=pd.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric",year:"numeric"});}
if(featureTitle)featureTitle.textContent="Your shoot is taking shape.";
if(featureCopy)featureCopy.textContent="Your selected date has been added to the booking form. Choose your event details below to complete your request.";
status("Date added to the booking form below: "+s);
inp.classList.add("flash");setTimeout(function(){inp.classList.remove("flash")},1600);
setTimeout(function(){$("booking").scrollIntoView({behavior:"smooth",block:"start"})},350)});
$("b-date").addEventListener("change",function(){var s=this.value;sel=s;if(s){var d=new Date(s+"T00:00:00");view=new Date(d.getFullYear(),d.getMonth(),1);if(bm(s)===3)$("b-msg").textContent="That date is already booked or pending. Please choose a green date.";applySlots(s)}render()});
$("b-date").addEventListener("change",function(){var v=this.value,p=$("cal-picked-date"),t=$("cal-feature-title"),c=$("cal-feature-copy");if(!p)return;if(v){var d=new Date(v+"T12:00:00");p.textContent=d.toLocaleDateString(undefined,{weekday:"short",month:"short",day:"numeric",year:"numeric"});if(t)t.textContent="Your shoot is taking shape.";if(c)c.textContent="Your selected date has been added to the booking form. Choose your event details below to continue.";}else{p.textContent="Choose an available date";if(t)t.textContent="Your story starts here.";if(c)c.textContent="Pick an available day on the calendar. We’ll add it to your booking details so you can continue without re-entering the date.";}});
function applySlots(s){var m=bm(s),sl=$("b-slot");[].forEach.call(sl.options,function(o){var k=o.value==="Day"?1:o.value==="Night"?2:3;o.disabled=!!(m&k)});
if(sl.options[sl.selectedIndex].disabled){var f=[].filter.call(sl.options,function(o){return!o.disabled})[0];if(f){sl.value=f.value;status("That slot is taken, so "+f.text+" is selected.")}}}
function live(){
  if(!BACKEND_URL){status("Live availability is not connected. You can still review the calendar and contact Shubham to confirm a date.");render();return}
  status("Refreshing availability…");
  getJ("?action=booked",function(j){
    if(!j||j.ok===false){status("Availability could not be refreshed. Showing the calendar with saved dates.");render();return}
    var sm=j.slots||{};
    Object.keys(sm).forEach(function(k){booked[k]=(booked[k]|0)|(+sm[k]||0)});
    pendM={};
    var pm=j.pending||{};
    Object.keys(pm).forEach(function(k){pendM[k]=+pm[k]||0});
    (j.booked||[]).forEach(function(x){booked[x]=3});
    render();
    status("Availability updated from Shubham’s booking sheet and calendar.");
    if(sel)applySlots(sel);
  },function(e){
    render();
    status("Live sync is unavailable right now. The calendar remains usable; Shubham will confirm availability before approving the request.");
    try{console.warn("Availability request failed",e)}catch(x){}
  });
}
render();live();
/* ---- navbar ---- */
var nav=$("nav"),bg=$("burger");
function sc(){nav.classList.toggle("scrolled",window.scrollY>20)}window.addEventListener("scroll",sc,{passive:true});sc();
bg.addEventListener("click",function(){var o=!nav.classList.contains("open");nav.classList.toggle("open",o);bg.setAttribute("aria-expanded",String(o))});
$("nl").addEventListener("click",function(e){if(e.target.closest("a")){nav.classList.remove("open");bg.setAttribute("aria-expanded","false")}});
/* ---- photo gallery ---- */
function FG(){return [].slice.call(document.querySelectorAll("#ph-grid .ph"))}var tabs=$("ph-tabs"),lb=$("lb"),li=$("lb-i"),cur=0,vis=[];
tabs.addEventListener("click",function(e){var c=e.target.closest(".chip");if(!c)return;[].forEach.call(tabs.children,function(x){x.setAttribute("aria-pressed","false")});c.setAttribute("aria-pressed","true");var cat=c.textContent,n=0;
FG().forEach(function(f){var s=cat==="All"||f.dataset.cat===cat;f.hidden=!s;if(s)n++});$("ph-empty").hidden=n>0});
function show(i){vis=FG().filter(function(f){return!f.hidden});if(!vis.length)return;cur=((i%vis.length)+vis.length)%vis.length;var card=vis[cur],im=card.querySelector("img");li.alt=im.alt||card.dataset.title||"Photography";li.loading="eager";li.decoding="async";li.src=card.dataset.full||im.currentSrc||im.src;}
function openViewer(){
  if(lb.open)return;
  try{if(typeof lb.showModal==="function"){lb.showModal();return;}}catch(e){}
  lb.classList.add("lb-fallback-open");lb.setAttribute("open","");document.body.classList.add("lb-open");
}
function closeViewer(){
  if(lb.classList.contains("lb-fallback-open")){lb.classList.remove("lb-fallback-open");lb.removeAttribute("open");document.body.classList.remove("lb-open");return;}
  try{if(lb.open&&typeof lb.close==="function")lb.close();else lb.removeAttribute("open");}catch(e){lb.removeAttribute("open");}
}
function open(f){vis=FG().filter(function(x){return!x.hidden});var idx=vis.indexOf(f);if(idx<0)return;show(idx);openViewer();}
$("ph-grid").addEventListener("click",function(e){var f=e.target.closest(".ph");if(f&&e.currentTarget.contains(f))open(f)});
$("ph-grid").addEventListener("keydown",function(e){var f=e.target.closest(".ph");if(f&&(e.key==="Enter"||e.key===" ")){e.preventDefault();open(f)}});
$("lb-x").addEventListener("click",function(e){e.preventDefault();closeViewer()});$("lb-p").addEventListener("click",function(e){e.preventDefault();show(cur-1)});$("lb-nx").addEventListener("click",function(e){e.preventDefault();show(cur+1)});
lb.addEventListener("click",function(e){if(e.target===lb)closeViewer()});
lb.addEventListener("keydown",function(e){if(e.key==="ArrowLeft"){e.preventDefault();show(cur-1)}if(e.key==="ArrowRight"){e.preventDefault();show(cur+1)}});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&lb.classList.contains("lb-fallback-open"))closeViewer()});
lb.addEventListener("close",function(){lb.classList.remove("lb-fallback-open");document.body.classList.remove("lb-open")});
var tx=0;lb.addEventListener("touchstart",function(e){tx=e.changedTouches[0].clientX},{passive:true});lb.addEventListener("touchend",function(e){var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)show(cur+(d<0?1:-1))},{passive:true});
/* ---- pay advance ---- */
var PAY={payee:"SHUBHAM DNYANESHWAR BANKAR",upiId:"9284423297@axl",qr:[{n:"PhonePe",src:"/assets/payment-phonepe.jpg"},{n:"Google Pay",src:"/assets/payment-google-pay.jpg"}]};
var GPAY={id:"shubhambankar96214@okhdfcbank",name:"Shubham Bankar",aid:"uGICAgMDwicO-JA"};
var pd=$("pay"),pb=$("pay-b");
function el(t,tx,c){var e=document.createElement(t);if(tx)e.textContent=tx;if(c)e.className=c;return e}
function wa(txt,label,cls){var a=el("a",label,cls);a.href="https://api.whatsapp.com/send?phone="+window.SB_WA+"&text="+encodeURIComponent(txt);a.target="_blank";a.rel="noopener";return a}
var lastSel=0,lastBr,advAmt=0;
function esc(){return "\u20B9"}
function showPaid(){pb.innerHTML="";var sv=getBk(),cont=sv&&sv.pays.length<3,pl=cont&&(sv.total||sv.adv)?plan(sv):null;
pb.appendChild(el("p",(cont?"Payment "+(sv.pays.length+1)+" of 3: "+lblOf(getBk(),sv.pays.length)+". ":"")+"Enter your payment details. I will check them and confirm your booking on WhatsApp."));
[["Your name","text","pf-n",cont?sv.n:$("b-name").value],["Your WhatsApp number","tel","pf-p",cont?sv.ph:$("b-phone").value],["Event date","date","pf-d",cont?sv.d:$("b-date").value],["Amount paid (INR)","number","pf-a",cont?(pl?pl[sv.pays.length]:""):(advAmt||"")],["UPI transaction ID (UTR)","text","pf-u",""]].forEach(function(x){var l=el("label",x[0]),i=el("input");i.type=x[1];i.id=x[2];i.value=x[3];if(x[2]==="pf-a"&&x[3])i.readOnly=true;if(x[1]==="number"){i.min="1";i.inputMode="numeric"}l.appendChild(i);pb.appendChild(l)});
var m=el("p",null,"pf-m");m.id="pf-m";m.setAttribute("role","status");pb.appendChild(m);
var go=el("button","Send payment confirmation on WhatsApp","btn");go.type="button";go.addEventListener("click",submitPaid);pb.appendChild(go);
var bk=el("button","Back","gbtn");bk.type="button";bk.addEventListener("click",function(){openPay(lastSel,lastBr)});pb.appendChild(bk)}
function submitPaid(){var v=function(i){return $(i).value.trim()},m=$("pf-m"),n=v("pf-n"),ph=v("pf-p").replace(/\D/g,""),d=v("pf-d"),a=v("pf-a"),u=v("pf-u");
if(!n){m.textContent="Please enter your name.";return}if(ph.length<10){m.textContent="Please enter your 10-digit WhatsApp number.";return}
if(!d){m.textContent="Please choose your event date.";return}if(!(+a>0)){m.textContent="Please enter the amount you paid.";return}
if(!/^[A-Za-z0-9]{8,30}$/.test(u)){m.textContent="Please enter the UPI transaction ID (UTR) from your payment app.";return}
var t=new Date(),ref="SB"+String(t.getFullYear()).slice(2)+pad(t.getMonth()+1)+pad(t.getDate())+Math.floor(1000+Math.random()*9000);
var sv0=getBk(),cont=sv0&&sv0.pays.length<3&&sv0.d===d,k=cont?sv0.pays.length:0;if(cont)ref=sv0.ref;if(BACKEND_URL&&!cont){m.textContent="Please book your slot first with the Book this slot button, or find your booking on the customer page.";return}var slotTxt=cont&&sv0.slot?sv0.slot+(sv0.tm?" (from "+sv0.tm+")":""):$("b-slot").value+($("b-time").value?" (from "+$("b-time").value+")":"");
var txt="Hi Shubham, I have paid: "+lblOf(getBk(),k)+".\nBooking ref: "+ref+"\nName: "+n+"\nWhatsApp: "+ph+"\nEvent date: "+d+"\nEvent time: "+slotTxt+"\nAmount paid: "+esc()+a+"\nUPI transaction ID: "+u+"\nPlease confirm my booking.";
try{var arr=JSON.parse(localStorage.getItem("sb_pending")||"[]");if(arr.indexOf(d)<0)arr.push(d);localStorage.setItem("sb_pending",JSON.stringify(arr))}catch(e){}
pend[d]=1;render();
var tp=$("b-type").value==="Other"?($("b-other").value.trim()||"Other"):$("b-type").value,spv=0;
if(cont&&!sv0.total&&spv>0)sv0.total=spv;saveBk(cont?sv0:{ref:ref,n:n,ph:ph,e:$("b-email").value.trim(),d:d,slot:$("b-slot").value,tm:$("b-time").value,t:tp,total:spv>0?spv:Math.round(+a*2),pays:[]},{k:k,a:+a,u:u,ts:new Date().toISOString()});
if(BACKEND_URL){var bk0=getBk();postJ({action:"payment",ref:ref,name:n,phone:ph,email:bk0.e||"",date:d,type:bk0.t,total:bk0.total||0,stage:k+1,amount:+a,utr:u});setTimeout(syncMy,3000)}
try{localStorage.setItem("sb_profile",JSON.stringify({n:n,p:ph,e:$("b-email").value.trim()}))}catch(e){}renderMy();
pb.innerHTML="";pb.appendChild(el("p","Payment details ready. Press send in WhatsApp so I receive them. I will check the payment and confirm your booking on WhatsApp.","upi-id"));
pb.appendChild(el("p","Booking ref: "+ref+"\nPayment: "+lblOf(getBk(),k)+"\nEvent date: "+d+"\nEvent time: "+slotTxt+"\nAmount paid: "+esc()+a+"\nUTR: "+u));
pb.lastChild.style.whiteSpace="pre-line";
pb.appendChild(wa(txt,"Open WhatsApp and send","btn"));
var em=$("b-email").value.trim();if(/^\S+@\S+\.\S+$/.test(em)){var g=el("a","Email me a copy","gbtn");g.href="https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent(em)+"&cc=bankarshubhan384%40gmail.com&su="+encodeURIComponent("Payment details, ref "+ref)+"&body="+encodeURIComponent(txt);g.target="_blank";g.rel="noopener";pb.appendChild(g)}
openUrl("https://api.whatsapp.com/send?phone="+window.SB_WA+"&text="+encodeURIComponent(txt),"_blank")}
function openPay(sel,br){pb.innerHTML="";lastSel=sel;lastBr=br;pd.dataset.brand=br||(sel===0?"p":"g");
var bk0=getBk(),idx=bk0&&bk0.pays?bk0.pays.length:0;
pb.appendChild(el("p",(idx>0?"Pay your next installment.":"Pay the 50% advance to block your date.")+" Then send the payment details so I can confirm your booking."));
var pl0=bk0&&idx<3&&(bk0.total||bk0.adv)?plan(bk0):null,amt0=pl0?pl0[idx]:0,dyn=amt0>0,tabs=[];
function tnp(){return bk0?encodeURIComponent((bk0.ref+" "+lblOf(getBk(),idx).split(" ")[0]).slice(0,40)):""}
function mkLink(a,g){return g?"upi://pay?pa="+GPAY.id+"&pn="+encodeURIComponent(GPAY.name)+(a>0?"&am="+a.toFixed(2):"")+"&cu=INR"+(a>0&&bk0?"&tn="+tnp():"")+"&aid="+GPAY.aid:"upi://pay?pa="+PAY.upiId+"&pn="+encodeURIComponent(PAY.payee)+(a>0?"&am="+a.toFixed(2):"")+"&cu=INR"+(a>0&&bk0?"&tn="+tnp():"")+"&mc=0000&mode=02&purpose=00"}
if(dyn){tabs.push({n:"PhonePe / any UPI app",dyn:true,brand:"p",link:mkLink(amt0),src:qrDataUrl(mkLink(amt0),6)});tabs.push({n:"Google Pay",dyn:true,brand:"g",link:mkLink(amt0,true),src:qrDataUrl(mkLink(amt0,true),6)})}
else PAY.qr.forEach(function(q,i){tabs.push({n:q.n,src:q.src,brand:i===0?"p":"g",link:mkLink(0,i===1)})});
var start=dyn?(br==="g"||(br==null&&sel===1)?1:0):sel,tb=el("div",null,"chips"),im=el("img"),note=el("p",null,"mute-note"),u=el("a","Open UPI app","btn");
function pick(i){var q=tabs[i];[].forEach.call(tb.children,function(x,k){x.setAttribute("aria-pressed",String(k===i))});pd.dataset.brand=q.brand;im.src=q.src;im.alt=q.n+" payment QR code";u.href=q.link;note.textContent=q.dyn?"Scan to pay exactly "+inr(amt0)+" ("+lblOf(getBk(),idx)+") with "+q.n+". The amount is already filled in.":"Scan with PhonePe or Google Pay and enter the amount yourself."}
tabs.forEach(function(q,i){var b=el("button",q.n,"chip "+(q.brand==="g"?"tb-g":"tb-p"));b.type="button";b.setAttribute("aria-pressed","false");b.addEventListener("click",function(){pick(i)});tb.appendChild(b)});
pb.appendChild(tb);pb.appendChild(im);pb.appendChild(note);pick(start);
pb.appendChild(el("p",null,"Or pay to this UPI ID:"));pb.appendChild(el("div",PAY.upiId,"upi-id"));pb.appendChild(u);
var cp=el("button","Copy UPI ID","gbtn");cp.type="button";cp.addEventListener("click",function(){try{navigator.clipboard.writeText(PAY.upiId).then(function(){cp.textContent="Copied"})}catch(e){}});pb.appendChild(cp);
var pdb=el("button","I have paid: confirm my payment","btn");pdb.type="button";pdb.addEventListener("click",showPaid);pb.appendChild(pdb);
pb.appendChild(wa("Hi Shubham, I have paid the advance for my booking. Sharing the screenshot.","Send payment screenshot","gbtn"));
pd.showModal()}
var po=$("pay-open");if(po)po.addEventListener("click",function(){openPay(0,"s")});
document.querySelectorAll("#payment [data-pay]").forEach(function(b){b.addEventListener("click",function(e){e.stopPropagation();openPay(+b.dataset.pay,b.dataset.b)})});
document.querySelectorAll("#payment .pm-i").forEach(function(c){c.tabIndex=0;c.setAttribute("role","button");c.addEventListener("click",function(){openPay(0,"s")});c.addEventListener("keydown",function(e){if(e.target===c&&(e.key==="Enter"||e.key===" ")){e.preventDefault();openPay(0,"s")}})});
$("pay-x").addEventListener("click",function(){pd.close()});pd.addEventListener("click",function(e){if(e.target===pd)pd.close()});
/* ---- remember the customer on this device ---- */
var LBL=["Advance (50%)","Shoot day payment (25%)","Delivery day payment (25%)"];
function getBk(){try{return JSON.parse(localStorage.getItem("sb_booking")||"null")}catch(e){return null}}
function saveBk(b,pay){b.pays.push(pay);try{localStorage.setItem("sb_booking",JSON.stringify(b))}catch(e){}}
function lblOf(b,i){return(b&&b.labels&&b.labels[i])||LBL[i]}
function plan(b){if(b.plan&&b.plan.length===3)return b.plan.map(Number);var t=b.total||0,a=b.adv||0,p=a>0?a:Math.round(t*.5);if(!t)return[p,0,0];var q=Math.round((t-p)/2);return[p,q,t-p-q]}
function renderMy(skip){var c=$("mybk");c.innerHTML="";c.hidden=true;if(!skip)syncMy()}
function syncMy(){var b=getBk();if(!BACKEND_URL||!b)return;getJ("?action=lookup&ref="+encodeURIComponent(b.ref)+"&phone="+b.ph.slice(-10),function(j){if(!j||!j.ok)return;if(j.completed){try{localStorage.removeItem("sb_booking")}catch(e){}return}j.pays.forEach(function(x){var s=b.pays[x.stage-1];if(s)s.s=x.status});b.labels=j.booking.labels||null;b.total=+j.booking.total||b.total||0;b.adv=+j.booking.advance||0;b.plan=j.booking.plan||null;try{localStorage.setItem("sb_booking",JSON.stringify(b))}catch(e){}renderMy(true)})}
function saveProfile(){try{localStorage.setItem("sb_profile",JSON.stringify({n:$("b-name").value,p:$("b-phone").value,e:$("b-email").value}))}catch(e){}}
function loadProfile(){try{var p=JSON.parse(localStorage.getItem("sb_profile")||"null");if(!p)return;if(!$("b-name").value)$("b-name").value=p.n||"";if(!$("b-phone").value)$("b-phone").value=p.p||"";if(!$("b-email").value)$("b-email").value=p.e||""}catch(e){}}
["b-book","b-discuss"].forEach(function(i){$(i).addEventListener("click",saveProfile)});
loadProfile();renderMy();
/* ---- customer login (opens customer.html inside the main page) ---- */
var cd=$("cust"),cf=$("cust-f");
function openCust(r,p){var b=getBk(),k="";if(typeof r==="string"&&r&&p)k="#ref="+encodeURIComponent(r)+"&ph="+encodeURIComponent(p);else if(b&&b.ref&&b.ph)k="#ref="+encodeURIComponent(b.ref)+"&ph="+encodeURIComponent(b.ph);cf.src="customer.html"+k;if(!cd.open)cd.showModal()}
var tbar=$("topbar");if(BACKEND_URL){tbar.hidden=false;var sb=getBk();if(sb){$("tb-ref").value=sb.ref||"";$("tb-ph").value=sb.ph||""}}
$("tb-form").addEventListener("submit",function(e){e.preventDefault();openCust($("tb-ref").value.trim().toUpperCase(),$("tb-ph").value.replace(/\D/g,"").slice(-10))});
document.querySelectorAll('a[href="customer.html"]').forEach(function(a){if(!BACKEND_URL){a.href=LIVE_SITE+"/customer.html";a.target="_blank";a.rel="noopener";a.hidden=false;return}
a.hidden=false;a.addEventListener("click",function(e){e.preventDefault();nav.classList.remove("open");bg.setAttribute("aria-expanded","false");openCust()})});
$("cust-x").addEventListener("click",function(){cd.close()});cd.addEventListener("click",function(e){if(e.target===cd)cd.close()});cd.addEventListener("close",function(){cf.src="about:blank"});
/* ---- Book this slot: creates the event in Shubham's calendar through the backend ---- */
function postR(o,cb,err){
  var ctrl=typeof AbortController!=="undefined"?new AbortController():null;
  var timer=setTimeout(function(){if(ctrl)ctrl.abort()},30000);
  fetch(BACKEND_URL,{
    method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},
    body:JSON.stringify(o), signal:ctrl?ctrl.signal:undefined
  }).then(function(r){return r.text().then(function(t){var j;try{j=JSON.parse(t)}catch(e){throw new Error("Booking service returned an unreadable response (HTTP "+r.status+").")};if(!r.ok)throw new Error("Booking service returned HTTP "+r.status+".");return j})})
    .then(function(j){clearTimeout(timer);if(typeof cb==="function")cb(j)})
    .catch(function(e){clearTimeout(timer);if(typeof err==="function")err(e);else try{console.warn("POST booking API failed",e)}catch(x){}})
}
var bb=$("b-book");bb.hidden=false;if(BACKEND_URL){var bs=document.querySelector("#booking .bk-sub");if(bs)bs.textContent="Pick your date and time, give your city and venue, and tap Book this slot. It goes straight into Shubham's calendar. Want to talk first? Tap Discuss with Shubham.";var fa=document.querySelector("#faq .fq p");if(fa)fa.textContent="Pick a green date on the calendar, choose Day or Night, add your city and venue and tap Book this slot. If the slot is free it is booked straight away. If not, your request goes to Shubham. Then pay the 50% advance to complete your booking."}
var confirmed=false;
/* ---- event location map picker (Leaflet + OpenStreetMap, loaded only when opened) ---- */
(function(){var $=function(i){return document.getElementById(i)},map=null,mk=null,me=null,meC=null,loading=false,MB="";
function st(t){$("mp-st").textContent=t}
var CDN=["https://unpkg.com/leaflet@1.9.4/dist/","https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/","https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/"],q=[];
function load(cb){if(window.L){cb();return}q.push(cb);if(loading)return;loading=true;var i=0;
function done(){loading=false;var f=q.splice(0);f.forEach(function(c){try{c()}catch(e){}})}
function next(){if(window.L){done();return}if(i>=CDN.length){loading=false;q=[];st("Map could not load. Please type your venue and city instead.");return}
var b=CDN[i++],l=document.createElement("link");l.rel="stylesheet";l.href=b+"leaflet.css";document.head.appendChild(l);
var sc=document.createElement("script");sc.src=b+"leaflet.js";sc.onload=function(){window.L?done():(sc.remove(),next())};sc.onerror=function(){sc.remove();l.remove();next()};document.head.appendChild(sc)}
next()}
function init(){if(map)return;map=L.map("mp-map").setView([19.9, 75.3],8);
var osm=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"&copy; OpenStreetMap contributors"});
if(MB){var mbS=L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token="+MB,{tileSize:512,zoomOffset:-1,maxZoom:19,attribution:"&copy; Mapbox &copy; OpenStreetMap"}),mbT=L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/512/{z}/{x}/{y}@2x?access_token="+MB,{tileSize:512,zoomOffset:-1,maxZoom:19,attribution:"&copy; Mapbox &copy; Maxar"}),bad=false;
mbS.on("tileerror",function(){if(!bad){bad=true;map.removeLayer(mbS);osm.addTo(map)}});mbS.addTo(map);L.control.layers({"Map":mbS,"Satellite":mbT},null,{position:"topright"}).addTo(map)}else osm.addTo(map);
map.on("click",function(e){pick(e.latlng.lat,e.latlng.lng)});setTimeout(function(){map.invalidateSize()},200)}
var sug="";
function fill(a,label){var ad=a||{},city=ad.city||ad.town||ad.village||ad.suburb||ad.county||"";
if(city){$("b-city").value=city}
var parts=label?String(label).split(",").map(function(x){return x.trim()}):[],v="",i;
for(i=0;i<parts.length;i++){if(/[A-Za-z\u0900-\u097F]{3}/.test(parts[i])){v=parts[i];break}}
sug=v;var ve=$("b-venue"),ub=$("mp-use");
if(v&&(!ve.value.trim()||ve.dataset.auto==="1")){ve.value=v;ve.dataset.auto="1";ub.hidden=true}
else if(v&&ve.value.trim()!==v){ub.hidden=false;ub.textContent="Use \""+v+"\" as the venue"}else{ub.hidden=true}}
$("mp-use").addEventListener("click",function(){$("b-venue").value=sug;$("b-venue").dataset.auto="1";this.hidden=true});
$("b-venue").addEventListener("input",function(){this.dataset.auto="0"});
function pick(lat,lng,label,addr){if(!mk){mk=L.marker([lat,lng],{draggable:true}).addTo(map);mk.on("dragend",function(){var p=mk.getLatLng();pick(p.lat,p.lng)})}else mk.setLatLng([lat,lng]);
map.setView([lat,lng],Math.max(map.getZoom(),16));window.__mp={lat:+lat.toFixed(6),lng:+lng.toFixed(6)};
if(label){fill(addr,label);st("Selected: "+label);return}
st("Finding address...");
revGeo(lat,lng)}
function mbCity(f){var c=f.context||[],i,x;for(i=0;i<c.length;i++){x=c[i].id||"";if(/^(place|locality|district)\./.test(x))return c[i].text}return /^(place|locality)\./.test(f.id||"")?f.text:""}
function showRes(list){var ul=$("mp-res");ul.innerHTML="";if(!list.length){ul.hidden=true;st("No results. Try another name or tap the map.");return}
list.forEach(function(it){var li=document.createElement("li");li.textContent=it.label;li.onclick=function(){ul.hidden=true;pick(it.lat,it.lng,it.label,{city:it.city})};ul.appendChild(li)});ul.hidden=false;st("Choose a result.")}
function nomSearch(q){fetch("https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=in&q="+encodeURIComponent(q)).then(function(r){return r.json()}).then(function(list){showRes(list.map(function(it){var a=it.address||{};return{label:it.display_name,lat:parseFloat(it.lat),lng:parseFloat(it.lon),city:a.city||a.town||a.village||a.suburb||a.county||""}}))}).catch(function(){st("Search failed. Please tap the map instead.")})}
function search(){var q=$("mp-q").value.trim();if(!q)return;st("Searching...");
if(!MB){nomSearch(q);return}
var c=map?map.getCenter():{lat:19.9,lng:75.3};
fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(q)+".json?access_token="+MB+"&country=in&limit=5&autocomplete=true&proximity="+c.lng+","+c.lat).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){var l=(d.features||[]).map(function(f){return{label:f.place_name,lat:f.center[1],lng:f.center[0],city:mbCity(f)}});if(!l.length){nomSearch(q);return}showRes(l)}).catch(function(){nomSearch(q)})}
function revGeo(lat,lng){
function done(n,city){fill({city:city},n);st("Selected: "+n)}
function pinned(){st("Location pinned ("+lat.toFixed(5)+", "+lng.toFixed(5)+"). Please type your venue and city above.")}
function nom(){fetch("https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat="+lat+"&lon="+lng).then(function(r){return r.json()}).then(function(d){var a=d.address||{};done(d.display_name||(lat.toFixed(5)+", "+lng.toFixed(5)),a.city||a.town||a.village||a.suburb||a.county||"")}).catch(pinned)}
st("Finding address...");
if(!MB){nom();return}
fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+lng+","+lat+".json?access_token="+MB+"&limit=1&types=poi,address,neighborhood,locality,place").then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(d){var f=(d.features||[])[0];if(!f){nom();return}done(f.place_name,mbCity(f))}).catch(nom)}
$("mp-open").addEventListener("click",function(){var p=$("mp-panel");p.hidden=!p.hidden;if(!p.hidden)load(function(){init();setTimeout(function(){map.invalidateSize()},150)})});
$("mp-gps").addEventListener("click",function(){if(!navigator.geolocation){st("Location is not supported on this browser. Please search or tap the map.");return}
st("Getting your location...");load(function(){init();navigator.geolocation.getCurrentPosition(function(p){var la=p.coords.latitude,lo=p.coords.longitude,ac=p.coords.accuracy||30;if(me)map.removeLayer(me);if(meC)map.removeLayer(meC);meC=L.circle([la,lo],{radius:ac,color:"#1a73e8",weight:1,fillColor:"#1a73e8",fillOpacity:.15}).addTo(map);me=L.circleMarker([la,lo],{radius:8,color:"#fff",weight:3,fillColor:"#1a73e8",fillOpacity:1}).addTo(map);pick(la,lo)},function(){st("Could not get your location. Please allow location for this site in your browser (on a Mac also in System Settings > Privacy and Security > Location Services), or search a place or tap the map.")},{enableHighAccuracy:true,timeout:10000})})});
$("mp-go").addEventListener("click",function(){load(function(){init();search()})});
if("IntersectionObserver" in window){new IntersectionObserver(function(es,o){if(es[0].isIntersecting){o.disconnect();load(init)}},{rootMargin:"300px"}).observe($("mp-map"))}else{load(init)}
$("mp-q").addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();load(function(){init();search()})}});
})();
/* ---- required fields turn red; secure-connection note ---- */
window.__ft=Date.now();
(function(){var $=function(i){return document.getElementById(i)};
var sn=$("secure-note");if(sn&&location.protocol!=="https:"&&location.hostname!=="localhost")sn.textContent="This page is not using a secure connection. Please do not enter personal details here.";
var req=[["b-name",function(v){return v.trim().length>1}],["b-phone",function(v){return v.replace(/\D/g,"").length>=10}],["b-date",function(v){return !!v}],["b-city",function(v){return v.trim().length>1}],["b-venue",function(v){return v.trim().length>1}]];
function chk(){var bad=[];req.forEach(function(r){var e=$(r[0]);if(!e)return;var ok=r[1](e.value);e.classList.toggle("req-bad",!ok);if(!ok)bad.push(e)});
var t=$("b-type"),o=$("b-other");if(t&&o&&t.value==="Other"){var okO=!!o.value.trim();o.classList.toggle("req-bad",!okO);if(!okO)bad.push(o)}return bad}
$("b-book").addEventListener("click",function(e){var bad=chk();if(bad.length){e.stopImmediatePropagation();$("b-msg").textContent="Please fill the sections marked in red.";try{bad[0].scrollIntoView({behavior:"smooth",block:"center"});bad[0].focus()}catch(x){}}});
["input","change"].forEach(function(ev){document.addEventListener(ev,function(e){var t=e.target;if(t&&t.classList&&t.classList.contains("req-bad"))t.classList.remove("req-bad")})})})();
bb.addEventListener("click",function(){var m=$("b-msg"),f={action:"book",plan:"",name:$("b-name").value.trim(),phone:$("b-phone").value.replace(/\D/g,"").slice(-10),email:$("b-email").value.trim(),date:$("b-date").value,slot:$("b-slot").value,time:$("b-time").value,type:$("b-type").value==="Other"?($("b-other").value.trim()||"Other"):$("b-type").value,location:$("b-venue").value.trim()+", "+$("b-city").value.trim(),notes:$("b-note").value.trim()};if(window.__mp){f.lat=window.__mp.lat;f.lng=window.__mp.lng}f.hp=$("b-hp")?$("b-hp").value:"";f.ft=Date.now()-(window.__ft||Date.now());
if(!f.name){m.textContent="Please enter your name first.";$("b-name").focus();return}if(f.phone.length<10){m.textContent="Please enter your 10-digit WhatsApp number.";$("b-phone").focus();return}if(!f.date){m.textContent="Please choose your event date.";return}
if(!$("b-city").value.trim()){m.textContent="Please enter the city of your event.";$("b-city").focus();return}
if(!$("b-venue").value.trim()){m.textContent="Please enter the venue of your event.";$("b-venue").focus();return}
if(BACKEND_URL&&!confirmed){askConfirm(f,function(){confirmed=true;bb.click();confirmed=false});return}
if(!BACKEND_URL){m.textContent="This copy of the website is not connected to the booking system, so no reference code can be made. Please use Discuss with Shubham.";return}
m.textContent="Booking your slot...";bb.disabled=true;
postR(f,function(j){bb.disabled=false;
if(j&&j.ok){var mk=f.slot==="Day"?1:f.slot==="Night"?2:3;if(j.auto)booked[f.date]=(booked[f.date]|0)|mk;else if(!j.taken)pendM[f.date]=(pendM[f.date]|0)|mk;render();
try{localStorage.setItem("sb_booking",JSON.stringify({ref:j.ref,n:f.name,ph:f.phone,e:f.email,d:f.date,slot:f.slot,tm:f.time,t:f.type,total:j.total||0,adv:j.advance||0,tok:j.token||"",pays:[]}));localStorage.setItem("sb_profile",JSON.stringify({n:f.name,p:f.phone,e:f.email}))}catch(e){}
renderMy(true);showAfter(j,f);var ok=$("b-ok");ok.innerHTML="";ok.hidden=false;ok.appendChild(el("h3",j.auto?"Slot booked!":j.taken?"Request sent to Shubham":"Slot requested: pending confirmation"));
ok.appendChild(el("p","Booking ref: "+j.ref+"\nDate: "+f.date+"\nTime: "+f.slot+(f.time?" (from "+f.time+")":"")+(j.auto?"\nYour slot is confirmed and shows as booked on the calendar. Pay the 50% advance to complete your booking.":j.taken?"\nThat slot was already taken, so nothing was booked. I sent your request to Shubham. He will reply on WhatsApp.":"\nYour request is with Shubham. Your slot is held for "+j.holdHours+" hours and shows as Pending on the calendar until he confirms it. After he confirms, he will share the payment plan for your shoot."),"my-l"));
if(!j.taken)ok.appendChild(el("p","After Shubham confirms, log in on the customer page with your reference code and mobile number to see your payment plan and pay."));
var pdfb=el("button","Download booking PDF","gbtn");pdfb.type="button";pdfb.addEventListener("click",function(){getPdf(j.ref,f.phone,"booking",0,pdfb)});
var pb2=el("button","Customer login","btn");pb2.type="button";pb2.addEventListener("click",function(){openCust(j.ref,f.phone)});if(!j.taken)ok.appendChild(pb2);
ok.appendChild(pdfb);ok.appendChild(wa("Hi Shubham, I have booked a slot on your website.\nRef: "+j.ref+"\nName: "+f.name+"\nDate: "+f.date+"\nTime: "+f.slot+(f.time?" (from "+f.time+")":""),"Message Shubham on WhatsApp","gbtn"));
m.textContent=(j.auto?"Done. Your slot is booked.":j.taken?"That slot was already taken. Your request is with Shubham.":"Done. Your request is saved as Pending until Shubham confirms it.")+(j.ownerNotified===false?" Automatic email notification failed, so please message Shubham on WhatsApp to make sure he sees it.":" Shubham has been notified.");
if(j.ownerNotified===false){var nf=el("p","Automatic email alert did not send. Your request is saved in the booking system. Please also message Shubham on WhatsApp.","my-l");ok.appendChild(nf)}
ok.scrollIntoView({behavior:"smooth",block:"center"})}
else{try{console.error("Booking failed:",j)}catch(x){}var why=j&&(j.error||j.message||j.msg),errors={invalid:"Some details were not accepted. Check your name, phone number, event date and shoot type.",date:"That date is outside the allowed booking window. Please choose another date.",location:"Please enter both the event city and venue.",limit:"Too many booking requests were made from this number today. Please message Shubham on WhatsApp.",server:"The booking service hit a server error. Before retrying, check with Shubham in case your request was already saved."};m.textContent=j&&j.error==="slot_taken"?"Sorry, that slot was just taken. Please choose another date or time.":(why&&errors[why])||("Could not book the slot"+(why?" ("+String(why).slice(0,80)+")":"")+". Please use the WhatsApp option below if needed.");bkFallback(f,m);live()}},
function(e){try{console.error("Booking request failed:",e)}catch(x){}bb.disabled=false;
var timed=e&&e.name==="AbortError";
m.textContent=timed?"The booking server took too long to reply. Your request may still have reached the booking sheet. Please check with Shubham before submitting again.":"Could not reach the booking service. Check with Shubham before retrying, in case the booking was saved; you can use WhatsApp below to follow up.";
bkFallback(f,m)})});
function bkFallback(f,m){var o=document.getElementById("b-fb");if(o)o.remove();o=document.createElement("div");o.id="b-fb";o.style.marginTop="10px";
o.appendChild(wa("Hi Shubham, I would like to book a shoot.\nName: "+f.name+"\nPhone: "+f.phone+"\nDate: "+f.date+"\nTime: "+f.slot+(f.time?" (from "+f.time+")":"")+"\nEvent: "+f.type+"\nLocation: "+f.location+(f.notes?"\nNotes: "+f.notes:""),"Send booking on WhatsApp","gbtn"));m.insertAdjacentElement("afterend",o)}
/* approved customer reviews from the booking sheet */
if(BACKEND_URL)getJ("?action=reviews",function(j){var L=$("rv-list");(j.reviews||[]).forEach(function(x){var c=document.createElement("div");c.className="rv-card";var s=document.createElement("div");s.className="s";s.textContent="\u2605".repeat(x.rating)+"\u2606".repeat(5-x.rating);var p=document.createElement("p");p.textContent=x.text;var q=document.createElement("small");q.textContent=x.name+(x.type?", "+x.type:"");c.append(s,p,q);L.appendChild(c)})});
/* ---- payment divider ---- */
function inr(n){return "\u20B9"+n.toLocaleString("en-IN")}

/* ---- alarm-style event time picker: drag the dial, scroll or drag the wheels, tap the arrows, or type a time ---- */
var ck=$("clk"),AMPM=["AM","PM"],cs={h:6,m:0,p:1},cha=0,cma=0,dmode="h",prog=false,progT;
function p2(n){return String(n).padStart(2,"0")}
function nearA(cur,t){return cur+(((t-cur)%360+540)%360-180)}
function mkWheel(id,vals){var w=$(id);w.innerHTML="";var a=document.createElement("div");a.className="wp";w.appendChild(a);
vals.forEach(function(v,i){var d=document.createElement("div");d.className="wi";d.textContent=v;d.dataset.i=i;d.addEventListener("click",function(){if(w._moved)return;w.scrollTo({top:i*44,behavior:"smooth"})});w.appendChild(d)});
var z=document.createElement("div");z.className="wp";w.appendChild(z)}
function wIdx(id,n){return Math.max(0,Math.min(n-1,Math.round($(id).scrollTop/44)))}
function wMark(id,i){[].forEach.call($(id).querySelectorAll(".wi"),function(x){x.classList.toggle("on",+x.dataset.i===i)})}
function clkDraw(){var h24=(cs.h%12)+(cs.p?12:0),day=h24>=6&&h24<18;
$("clk-read").textContent=cs.h+":"+p2(cs.m)+" "+AMPM[cs.p];
$("clk-part").textContent=(h24<12?"Morning":h24<17?"Afternoon":h24<20?"Evening":"Night")+" | counts as the "+(h24<17?"Day":"Night")+" slot";
cha=nearA(cha,(cs.h%12)*30+cs.m*.5);cma=nearA(cma,cs.m*6);
$("clk-hh").style.transform="rotate("+cha+"deg)";$("clk-mh").style.transform="rotate("+cma+"deg)";
$("clk-card").classList.toggle("night",!day);
if(document.activeElement!==$("clk-in"))$("clk-in").value=cs.h+":"+p2(cs.m)+" "+AMPM[cs.p]}
function clkRead(){var oh=cs.h,om=cs.m,op=cs.p;cs.h=wIdx("w-h",12)+1;cs.m=wIdx("w-m",60);cs.p=wIdx("w-p",2);if(oh!==cs.h||om!==cs.m||op!==cs.p)SFX.soft();clkDraw()}
function clkSet(h,m,p,smooth){var b=smooth?"smooth":"auto";prog=!!smooth;clearInterval(progT);
if(smooth){var n=0;progT=setInterval(function(){var ok=Math.abs($("w-h").scrollTop-(h-1)*44)<2&&Math.abs($("w-m").scrollTop-m*44)<2&&Math.abs($("w-p").scrollTop-p*44)<2;if(ok||++n>25){clearInterval(progT);prog=false}},60)}

$("w-h").scrollTo({top:(h-1)*44,behavior:b});$("w-m").scrollTo({top:m*44,behavior:b});$("w-p").scrollTo({top:p*44,behavior:b});cs.h=h;cs.m=m;cs.p=p;wMark("w-h",h-1);wMark("w-m",m);wMark("w-p",p);clkDraw()}
function parseTime(t){t=String(t).toLowerCase().replace(/\s+/g,"").replace(/\./g,":").replace(/a:m:?/,"am").replace(/p:m:?/,"pm");var r,h,m=0,mer=null;
if(r=t.match(/^(\d{1,2}):(\d{2})(am|pm|a|p)?$/)){h=+r[1];m=+r[2];mer=r[3]}else if(r=t.match(/^(\d{1,2})(am|pm|a|p)$/)){h=+r[1];mer=r[2]}else if(r=t.match(/^(\d{3,4})(am|pm|a|p)?$/)){h=+r[1].slice(0,-2);m=+r[1].slice(-2);mer=r[2]}else if(r=t.match(/^(\d{1,2})$/)){h=+r[1]}else return null;
if(m>59||h>23)return null;var pm;if(mer)pm=mer.charAt(0)==="p";else if(h>=13||h===0)pm=h>=13;else pm=!!cs.p;if(mer&&h>12)return null;
var h12=h%12||12;if(!mer&&h>=13)pm=true;return{h:h12,m:m,p:pm?1:0}}
function applyTyped(){var r=parseTime($("clk-in").value);if(r){clkSet(r.h,r.m,r.p,true);$("clk-in").classList.remove("bad");return true}$("clk-in").classList.add("bad");return false}
function setMode(m){dmode=m;[].forEach.call(document.querySelectorAll("#clk-seg button"),function(b){b.setAttribute("aria-pressed",String(b.dataset.m===m))})}
(function(){var hrs=[],mins=[],i;for(i=1;i<=12;i++)hrs.push(i);for(i=0;i<60;i++)mins.push(p2(i));
mkWheel("w-h",hrs);mkWheel("w-m",mins);mkWheel("w-p",AMPM);
[["w-h",12],["w-m",60],["w-p",2]].forEach(function(x){var t,w=$(x[0]),down=false,y0=0,s0=0;
w.addEventListener("scroll",function(){if(prog)return;wMark(x[0],wIdx(x[0],x[1]));clearTimeout(t);t=setTimeout(clkRead,90)},{passive:true});
w.addEventListener("pointerdown",function(e){if(e.pointerType!=="mouse")return;down=true;w._moved=false;y0=e.clientY;s0=w.scrollTop;w.style.scrollSnapType="none";w.setPointerCapture(e.pointerId)});
w.addEventListener("pointermove",function(e){if(!down)return;if(Math.abs(e.clientY-y0)>4)w._moved=true;w.scrollTop=s0-(e.clientY-y0)});
function end(){if(!down)return;down=false;w.style.scrollSnapType="";w.scrollTo({top:wIdx(x[0],x[1])*44,behavior:"smooth"});setTimeout(function(){w._moved=false},80)}
w.addEventListener("pointerup",end);w.addEventListener("pointercancel",end)});
[].forEach.call(document.querySelectorAll(".wbtn"),function(b){b.addEventListener("click",function(){var id=b.dataset.w,n=id==="w-h"?12:id==="w-m"?60:2,k=(wIdx(id,n)+(+b.dataset.d)+n)%n;$(id).scrollTo({top:k*44,behavior:"smooth"})})});
var sv=$("clk-svg"),ns="http://www.w3.org/2000/svg";
for(i=0;i<12;i++){var a=i*30*Math.PI/180,l=document.createElementNS(ns,"line");l.setAttribute("x1",100+Math.sin(a)*(i%3?80:74));l.setAttribute("y1",100-Math.cos(a)*(i%3?80:74));l.setAttribute("x2",100+Math.sin(a)*86);l.setAttribute("y2",100-Math.cos(a)*86);l.setAttribute("class",i%3?"tk":"tk big");sv.insertBefore(l,$("clk-hh"))}
[[12,100,34],[3,166,106],[6,100,176],[9,34,106]].forEach(function(n){var t=document.createElementNS(ns,"text");t.setAttribute("x",n[1]);t.setAttribute("y",n[2]);t.setAttribute("text-anchor","middle");t.setAttribute("class","num");t.textContent=n[0];sv.insertBefore(t,$("clk-hh"))});
var drag=false;function dialAt(e){var r=sv.getBoundingClientRect(),x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2),a2=(Math.atan2(y,x)*180/Math.PI+90+360)%360;
if(dmode==="h")clkSet(Math.round(a2/30)%12||12,cs.m,cs.p,false);else clkSet(cs.h,Math.round(a2/6)%60,cs.p,false)}
sv.addEventListener("pointerdown",function(e){drag=true;$("clk-card").classList.add("drag");sv.setPointerCapture(e.pointerId);dialAt(e);e.preventDefault()});
sv.addEventListener("pointermove",function(e){if(drag)dialAt(e)});
function dend(){if(!drag)return;drag=false;$("clk-card").classList.remove("drag");if(dmode==="h")setMode("m")}
sv.addEventListener("pointerup",dend);sv.addEventListener("pointercancel",dend);
[].forEach.call(document.querySelectorAll("#clk-seg button"),function(b){b.addEventListener("click",function(){setMode(b.dataset.m)})});
$("clk-in").addEventListener("keydown",function(e){if(e.key==="Enter"){e.preventDefault();applyTyped()}});$("clk-in").addEventListener("change",applyTyped)})();
function openClock(){var v=$("b-time").value,h=6,m=0,p=1;if(/^\d{2}:\d{2}$/.test(v)){var H=+v.slice(0,2);m=+v.slice(3);p=H>=12?1:0;h=H%12||12}
ck.showModal();setMode("h");setTimeout(function(){clkSet(h,m,p,false)},60)}
$("b-clock").addEventListener("click",openClock);
$("clk-x").addEventListener("click",function(){ck.close()});ck.addEventListener("click",function(e){if(e.target===ck)ck.close()});
[].forEach.call(document.querySelectorAll("#clk-pre .chip"),function(c){c.addEventListener("click",function(){var t=c.dataset.t,H=+t.slice(0,2);clkSet(H%12||12,+t.slice(3),H>=12?1:0,true)})});
$("clk-set").addEventListener("click",function(){if($("clk-in").value&&document.activeElement===$("clk-in"))applyTyped();var h24=(cs.h%12)+(cs.p?12:0);$("b-time").value=p2(h24)+":"+p2(cs.m);
$("b-clock-t").textContent=cs.h+":"+p2(cs.m)+" "+AMPM[cs.p]+" ("+(h24<17?"Day":"Night")+")";
var sl=$("b-slot"),want=h24<17?"Day":"Night";if(sl.value!=="Day and Night"){var o=[].filter.call(sl.options,function(x){return x.value===want&&!x.disabled})[0];if(o)sl.value=want}
var b=$("b-clock");b.classList.remove("ring");void b.offsetWidth;b.classList.add("ring");SFX.ding();ck.close()});
$("clk-clear").addEventListener("click",function(){$("b-time").value="";$("b-clock-t").textContent="Set time";ck.close()});

/* ---- personal assistant (rule based helper, no data leaves the page) ---- */
(function(){
var as=document.createElement("div");as.innerHTML='<button type="button" class="as-btn" id="as-btn" aria-label="Open the assistant" aria-expanded="false"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg><span>Ask me</span></button><div class="as" id="as" hidden role="dialog" aria-label="Shubham\'s assistant"><div class="as-h"><div><b>Shubham\'s assistant</b><small>AI helper. Answers can be wrong, so confirm details with Shubham.</small></div><button type="button" id="as-x" aria-label="Close">&times;</button></div><div class="as-log" id="as-log" aria-live="polite"></div><div class="as-chips" id="as-chips"></div><form class="as-f" id="as-f" autocomplete="off"><input id="as-i" placeholder="Ask about films, prices, dates..." aria-label="Ask the assistant"><button type="submit">Send</button></form></div>';
document.body.appendChild(as);
var log=$("as-log"),panel=$("as"),btn=$("as-btn"),started=false,WA="919284423297";

function go(id){var e=$(id);if(e){panel.hidden=true;btn.setAttribute("aria-expanded","false");e.scrollIntoView({behavior:"smooth",block:"start"})}}
function wa(t){return "https://api.whatsapp.com/send?phone="+window.SB_WA+"&text="+encodeURIComponent(t)}
function bubble(txt,who,acts){var d=document.createElement("div");d.className="as-m "+who;var p=document.createElement("div");p.className="as-t";p.textContent=txt;d.appendChild(p);
if(acts&&acts.length){var r=document.createElement("div");r.className="as-a";acts.forEach(function(a){var b=document.createElement("button");b.type="button";b.textContent=a[0];b.addEventListener("click",a[1]);r.appendChild(b)});d.appendChild(r)}
log.appendChild(d);log.scrollTop=log.scrollHeight;return d}
function say(txt,acts){var t=document.createElement("div");t.className="as-m bot typing";t.innerHTML="<div class='as-t'><i></i><i></i><i></i></div>";log.appendChild(t);log.scrollTop=log.scrollHeight;
setTimeout(function(){t.remove();bubble(txt,"bot",acts)},520)}
function openUrlA(u){if(window.openUrl)openUrl(u);else window.open(u,"_blank")}
function askWA(q){return["Ask Shubham on WhatsApp",function(){openUrlA(wa("Hi Shubham, "+q))}]}
function iso(d){return d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate())}
var MON=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
function mk(y,m,d){var x=new Date(y,m,d);return x.getFullYear()===y&&x.getMonth()===m&&x.getDate()===d?x:null}
function parseDate(t){t=t.toLowerCase();var n=new Date(),T=new Date(n.getFullYear(),n.getMonth(),n.getDate()),m,d,y,r;
if(/\btoday\b/.test(t))return T;if(/\btomorrow\b/.test(t)){T.setDate(T.getDate()+1);return T}
if(r=t.match(/(\d{4})-(\d{1,2})-(\d{1,2})/))return mk(+r[1],+r[2]-1,+r[3]);
if(r=t.match(/\b(\d{1,2})[\/.\-](\d{1,2})(?:[\/.\-](\d{2,4}))?\b/)){d=+r[1];m=+r[2]-1;y=r[3]?(+r[3]<100?2000+ +r[3]:+r[3]):0}
else if(r=t.match(new RegExp("\\b(\\d{1,2})(?:st|nd|rd|th)?\\s*(?:of\\s*)?("+MON.join("|")+")[a-z]*\\b(?:\\s*,?\\s*(\\d{4}))?"))){d=+r[1];m=MON.indexOf(r[2]);y=r[3]?+r[3]:0}
else if(r=t.match(new RegExp("\\b("+MON.join("|")+")[a-z]*\\s*(\\d{1,2})(?:st|nd|rd|th)?\\b(?:\\s*,?\\s*(\\d{4}))?"))){m=MON.indexOf(r[1]);d=+r[2];y=r[3]?+r[3]:0}
else return null;
if(!y){y=n.getFullYear();var c=mk(y,m,d);if(c&&c<T)y++}return mk(y,m,d)}
function nice(d){return d.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"long",year:"numeric"})}
function pick(d){var s=iso(d);$("b-date").value=s;$("b-date").dispatchEvent(new Event("change"));go("booking")}
function availFor(d){var T=new Date();T.setHours(0,0,0,0);
if(d<T){say(nice(d)+" has already passed. Tell me another date.");return}
var s=iso(d),mk=bm(s),live=BACKEND_URL?"This comes live from Shubham's calendar.":"Shubham confirms the final slot on WhatsApp.",acts=[];
if(mk===3){var f=[],x=new Date(d);for(var i=0;i<90&&f.length<3;i++){x.setDate(x.getDate()+1);if(!bm(iso(x)))f.push(new Date(x))}
say(nice(d)+((booked[s]|0)===3?" is fully booked (Day and Night). ":" is pending Shubham's confirmation for the whole day. ")+(f.length?"Nearest open dates: "+f.map(function(z){return z.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}).join(", ")+". ":"")+live,f.map(function(z){return[z.toLocaleDateString("en-IN",{day:"numeric",month:"short"}),function(){availFor(z)}]}));return}
var msg=mk===0?nice(d)+" is open for both Day and Night.":mk===1?nice(d)+": Day is booked, Night is available.":nice(d)+": Night is booked, Day is available.";
acts.push(["Pick this date",function(){pick(d)}]);acts.push(askWA("is "+nice(d)+" available for my shoot?"));say(msg+(pendM[s]?" Part of this is pending Shubham's confirmation.":"")+" "+live,acts)}
function mySummary(){var b=getBk();if(!b){say("I don't see a booking saved on this device. If you already booked, log in with your booking ref and WhatsApp number.",[["Customer login",function(){panel.hidden=true;openCust()}],["Book a shoot",function(){go("booking")}]]);return}
var n=b.pays?b.pays.length:0;say("Your booking "+b.ref+" is for "+b.d+(b.slot?" ("+b.slot+(b.tm?" from "+b.tm:"")+")":"")+". "+n+" payment"+(n===1?"":"s")+" sent so far.",[["Open my customer page",function(){panel.hidden=true;openCust()}],["Pay next installment",function(){panel.hidden=true;openPay(0,"s")}]])}
var R=[
[/\b(my booking|booking status|my ref|status of|login|log in|sign in|account)\b/,mySummary],
[/\b(pay|payment|advance|upi|qr|phonepe|phone pe|google ?pay|gpay|installment|instalment|balance|remaining|due|receipt|razorpay|card|netbanking|plan)\b/,function(){say("You pay on your customer page. Log in with your reference code and mobile number, choose your 1st, 2nd or 3rd payment, and you get a personal QR with the exact amount. Each QR is valid for 15 minutes. Payment plans: 50% + 25% + 25%, 50% + 30% + 20%, or 50% + 50% for one-day shoots. You choose the plan when you book, or Shubham decides.",[["Customer login",function(){panel.hidden=true;openCust()}],["Book a shoot",function(){go("booking")}]])}],
[/\b(how does it work|how do you work|how it works|process|steps|procedure|kaise|kase|kasa)\b/,function(){say("Pick a date on the calendar, give your city and venue, choose a payment plan and confirm. A free slot is booked at once and you get a reference code. Log in on the customer page with that code and your mobile number to pay. After the shoot, Shubham edits your film.",[["Open booking form",function(){go("booking")}],["Customer login",function(){panel.hidden=true;openCust()}]])}],
[/\b(delivery|deliver|delivered|turnaround|editing time|kitne din|kiti divas)\b/,function(){say("The delivery time depends on your shoot, so Shubham tells you after talking with you. The last payment is made on the delivery day.",[askWA("How long will delivery take for my shoot?")])}],
[/\b(price|prices|cost|charge|charges|rate|rates|package|packages|quote|how much|budget|fees?|cheap|kimat|kitna|kitne|kiti|bhav|paise|rupay|mehanga|sasta)\b/,function(){say("The price depends on the shoot type, the date and the time. Shubham shares a quote on WhatsApp. You can pick a package, choose what you want to know, and a pre-typed pricing message opens for you.",[["See packages",function(){go("packages")}],askWA("I would like a quote for my shoot.")])}],
[/\b(book|booking|reserve|slot|appointment|hire|karna|karaycha|karychay|bukking)\b/,function(){say("It takes a minute: 1) pick a green date on the calendar, 2) choose Day or Night (or set an exact time with the clock), 3) fill in your details and send. "+(BACKEND_URL?"Add your city and venue, then tap Book this slot. If the slot is free it is booked straight away, and if not your request goes to Shubham. Want to talk first? Tap Discuss with Shubham.":"Tap Discuss with Shubham to chat on WhatsApp."),[["Check dates",function(){go("availability")}],["Open booking form",function(){go("booking")}]])}],
[/\b(avail|available|free|vacant|busy|calendar|open on|tarikh|tarkhi|khali|kadhi)\b/,function(){say("Type a date and I'll check it for you, for example 25 December or 14/02. Or open the calendar.",[["Open calendar",function(){go("availability")}]])}],
[/\b(time|timing|clock|slot|slots|morning|evening|afternoon|hour|hours|day and night)\b/,function(){say("There are two slots: Day (9 am to 5 pm) and Night (5 pm to midnight), or Day and Night for a full day. You can also set an exact start time with the alarm-style clock in the booking form.",[["Set event time",function(){go("booking");setTimeout(function(){$("b-clock").click()},700)}]])}],
[/\b(film|films|video|videos|work|portfolio|sample|reel|highlight|watch)\b/,function(){say("You can watch Shubham's films in the film gallery, and see more in the Work section.",[["Open film gallery",function(){panel.hidden=true;$("open-gallery").click()}],["More films",function(){go("work")}]])}],
[/\b(photo|photos|picture|pictures|image|images|gallery)\b/,function(){say("The photo gallery has tabs for Pre-wedding, Portraits, Events and Highlights. Tap a photo to see it bigger.",[["Open photo gallery",function(){go("photos")}]])}],
[/\b(wedding|marriage|shaadi|pre ?wedding|birthday|festival|event|events|family|engagement|haldi|mehendi|sangeet|reception)\b/,function(){say("Shubham films weddings, pre-wedding shoots, birthdays, festivals and family events in a cinematic style. You can tell him the occasion in the booking form.",[["See packages",function(){go("packages")}],["Book a shoot",function(){go("booking")}]])}],
[/\b(contact|call|phone|number|whatsapp|insta|instagram|mail|email|reach|talk|speak)\b/,function(){say("You can WhatsApp or call Shubham on +91 92844 23297 (his main number). +91 96995 23297 is for calls only. You can also email bankarshubhan384@gmail.com or message @photowalashubham on Instagram.",[["WhatsApp Shubham",function(){openUrlA(wa("Hi Shubham, I saw your website."))}],["Instagram",function(){openUrlA("https://www.instagram.com/photowalashubham/")}],["Contact section",function(){go("contact")}]])}],
[/\b(camera|gimbal|gear|equipment|sony|dji|edit|editing|software|premiere|resolve|photoshop|lens|light|lights)\b/,function(){say("Shubham shoots on a Sony A7 IV with a DJI RS 4 Mini gimbal and a light setup. He edits in Premiere Pro, grades in DaVinci Resolve Studio and uses Photoshop.",[["See software and gear",function(){go("tools")}]])}],
[/\b(about you|about shubham|who are you|who is shubham|where are you|address|located|based|vaijapur|studio|map)\b/,function(){say("Shubham Bankar is a photographer and cinematographer based in Vaijapur, Chhatrapati Sambhajinagar, Maharashtra. He shoots weddings, pre-wedding shoots, birthdays, festivals and family events. His Instagram is @photowalashubham.",[["See the map",function(){go("about")}],["Instagram",function(){openUrlA("https://www.instagram.com/photowalashubham/")}],askWA("I would like to know more about you.")])}],
[/\b(where|location|city|travel|place|venue|pune|mumbai|nashik|aurangabad|sambhajinagar|maharashtra|outstation)\b/,function(){say("Shubham is based in Vaijapur, Chhatrapati Sambhajinagar. Tell him your city and venue on WhatsApp and he will confirm if he can travel there.",[askWA("my event is in ___ . Can you cover it?")])}],
[/\b(review|reviews|rating|rate us|feedback|testimonial)\b/,function(){say("After your shoot you can rate Shubham and write a review on the customer page. You can also see reviews on this site.",[["See reviews",function(){go("reviews")}],["Customer login",function(){panel.hidden=true;openCust()}]])}],
[/\b(delivery|deliver|how long|when will|turnaround|refund|cancel|cancellation|discount|offer)\b/,function(){say("I don't have a fixed answer for that, because it depends on your shoot. Shubham will tell you directly.",[askWA("I have a question about delivery, cancellation or offers for my shoot.")])}],
[/\b(thanks|thank you|thx|great|awesome|nice|bye|ok|okay)\b/,function(){say("You're welcome! Ask me anything else, or tap Book on WhatsApp to talk to Shubham.",[askWA("I saw your website.")])}],
[/\b(hi|hello|hey|namaste|namaskar|hii)\b/,function(){say("Hello! What are you looking for today?")}]];
var AIF=0,AI_ON=!!BACKEND_URL,hist=[],sid=Math.random().toString(36).slice(2,14);
function ruleReply(q){var l=q.toLowerCase(),best=0,bi=-1;for(var i=0;i<R.length;i++){var m=l.match(new RegExp(R[i][0].source,"g")),n=m?m.length:0;if(n>best){best=n;bi=i}}if(bi<0)return false;R[bi][1]();return true}
function ask2(t){bubble(t,"me");reply(t)}
function fallback(q){say("I could not match that to something I know. Tap one of these, or ask Shubham directly.",[["Prices",function(){ask2("what are your prices")}],["Check a date",function(){ask2("check availability")}],["How booking works",function(){ask2("how do I book")}],["Where are you based?",function(){ask2("where are you based")}],askWA("I have a question: "+q)])}
function ai(q,fb){var t=document.createElement("div");t.className="as-m bot typing";t.innerHTML="<div class='as-t'><i></i><i></i><i></i></div>";log.appendChild(t);log.scrollTop=log.scrollHeight;
postR({action:"ask",q:q,history:hist.slice(-6),sid:sid},function(j){t.remove();
if(j&&j.ok){hist.push({r:"user",t:q},{r:"model",t:j.answer});bubble(j.answer,"bot",[askWA(q)]);return}
if(j&&j.error==="noai"){AI_ON=false;if(!fb||!ruleReply(q))fallback(q);return}
if(j&&j.error==="limit"){say("I have answered a lot of questions today, so I need a break. Please ask Shubham directly.",[askWA(q)]);return}AIF++;if(AIF>=2)AI_ON=false;if(!ruleReply(q))fallback(q)},function(){t.remove();AIF++;if(AIF>=2)AI_ON=false;if(!ruleReply(q))fallback(q)})}
function reply(q){var w=q.trim().split(/\s+/).length,d=parseDate(q);
if(d&&(w<=6||/avail|free|open|book|busy|vacant/i.test(q))){availFor(d);return}
if(AI_ON&&w>=5){ai(q,true);return}
if(ruleReply(q))return;
if(AI_ON){ai(q,false);return}
fallback(q)}
function send(q){q=q.trim();if(!q)return;bubble(q,"me");reply(q)}
var QC=["Watch films","Prices","Check a date","Book a shoot","Payments","My booking"],QM={"Watch films":"show me your films","Prices":"what are your prices","Check a date":"check availability","Book a shoot":"how do I book","Payments":"how do payments work","My booking":"my booking"};
if(AI_ON)QC.push("Ask AI");
QC.forEach(function(c){var b=document.createElement("button");b.type="button";b.textContent=c;b.addEventListener("click",function(){bubble(c,"me");if(c==="Ask AI"){say("Sure. Type any question about Shubham's work, dates, prices or payments and I will answer in a few seconds.");$("as-i").focus({preventScroll:true});return}reply(QM[c])});$("as-chips").appendChild(b)});
function toggle(o){panel.hidden=!o;btn.setAttribute("aria-expanded",String(o));if(o&&!started){started=true;say("Hi, I'm Shubham's assistant. I can show films, check dates, explain prices and payments, or help you book. Ask me anything"+(AI_ON?", I answer custom questions in real time":"")+". What are you looking for?")}if(o)setTimeout(function(){$("as-i").focus({preventScroll:true})},300)}
var nud=document.createElement("div");nud.className="as-nudge";nud.textContent="Need help finding something? Ask me";nud.hidden=true;document.body.appendChild(nud);
setTimeout(function(){if(panel.hidden&&!sessionStorage.getItem("asn")){nud.hidden=false;sessionStorage.setItem("asn","1");setTimeout(function(){nud.hidden=true},7000)}},6000);
btn.addEventListener("click",function(){nud.hidden=true;toggle(panel.hidden)});

window.askAssistant=function(q){nud.hidden=true;toggle(true);setTimeout(function(){send(q)},700)};$("as-x").addEventListener("click",function(){toggle(false)});
$("as-f").addEventListener("submit",function(e){e.preventDefault();var i=$("as-i");send(i.value);i.value=""});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!panel.hidden)toggle(false)});
})();

[].forEach.call(document.querySelectorAll("#am-chips .chip"),function(c){c.addEventListener("click",function(){if(window.askAssistant)window.askAssistant(c.textContent)})});
$("faq-ai").addEventListener("submit",function(e){e.preventDefault();var q=$("faq-q").value.trim();if(!q)return;$("faq-q").value="";if(window.askAssistant)window.askAssistant(q)});
/* ---- software and equipment: tap a card to learn more ---- */
(function(){
var INFO={
"Adobe Photoshop":["A program for editing photos. Think of it as a digital darkroom.","I use it to fix colours, brighten faces, remove small distractions (like a stray wire or a bin in the background), smooth skin in a natural way, and design album pages and covers.","Your photos look clean, bright and natural, and your album looks neat and well designed."],
"Adobe Premiere Pro":["A video editing program. It is where your film is put together.","I place all the clips from your day in order, cut out the weak moments, and add music, titles and smooth transitions. Then I build the story from the first look to the last dance.","Your highlight film flows like a short movie instead of a pile of separate clips."],
"DaVinci Resolve Studio":["Professional software used in film studios for colour grading and finishing.","Colour grading means choosing the mood of the colours: warm and golden, soft and dreamy, or deep and cinematic. I also fix light that was too dark or too bright and clean up noise in low light.","Skin tones look natural and your film gets that big-screen look."],
"Sony A7 IV":["A full-frame mirrorless camera. Its large sensor collects more light than a normal camera.","Faces stay clear in dim halls and at night events. The fast eye-tracking focus keeps moving moments sharp, like a bride's entry or a baraat dance. It records sharp 4K video.","Clear photos and videos even in difficult light, and fewer missed moments."],
"DJI RS 4 Mini Gimbal":["A hand-held stabiliser for the camera. Small motors keep the camera steady while I move.","When I walk, turn or follow you, the camera glides smoothly instead of shaking. I use it for entries, walking shots and dance moments.","Smooth, floating, cinematic movement in your film."],
"S-Log3 Color Grading Workflow":["S-Log3 is a special way of recording where the camera keeps extra detail in the very bright and very dark parts of a scene.","The video looks flat and grey at first. Then I add colour and contrast while grading, so nothing is lost in bright windows or dark corners.","Rich colours, natural skin and a cinematic final look without burnt-out whites or crushed shadows."]};
var d=document.createElement("dialog");d.className="dlg";d.id="info";d.setAttribute("aria-label","More information");
d.innerHTML='<div class="dlg-h"><b id="info-t"></b><button type="button" class="gbtn" id="info-x">Close</button></div><div class="dlg-b" id="info-b"></div>';document.body.appendChild(d);
function row(h,t){var e=document.createElement("div");e.className="info-r";var a=document.createElement("b");a.textContent=h;var p=document.createElement("p");p.textContent=t;e.appendChild(a);e.appendChild(p);return e}
function open(name){var x=INFO[name];if(!x)return;document.getElementById("info-t").textContent=name;var b=document.getElementById("info-b");b.innerHTML="";
b.appendChild(row("What is it?",x[0]));b.appendChild(row("How I use it",x[1]));b.appendChild(row("What it means for you",x[2]));d.showModal()}
document.getElementById("info-x").addEventListener("click",function(){d.close()});d.addEventListener("click",function(e){if(e.target===d)d.close()});
[].forEach.call(document.querySelectorAll("#tools .sw li,#tools .eq li"),function(li){var n=li.querySelector("span")||li.querySelector("b");if(!n)return;var name=n.textContent.trim();if(!INFO[name])return;
li.tabIndex=0;li.setAttribute("role","button");li.setAttribute("aria-label","Learn more about "+name);li.classList.add("learn");
var hint=document.createElement("em");hint.className="learn-h";hint.textContent="Tap to learn more";li.querySelector("div").appendChild(hint);
li.addEventListener("click",function(){open(name)});li.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();open(name)}})})})();

/* ---- confirm before booking, and the "log in with your ref" pop-up ---- */
var PLANS={"shubham":"Shubham will decide","50-25-25":"3 payments: 50% + 25% + 25%","50-30-20":"3 payments: 50% + 30% + 20%","50-50":"2 payments: 50% + 50%"};
(function(){var cd=document.createElement("dialog");cd.className="dlg";cd.id="bconf";cd.setAttribute("aria-label","Confirm your booking");
cd.innerHTML='<div class="dlg-h"><b>Please confirm your booking</b><button type="button" class="gbtn" id="bconf-x">Close</button></div><div class="dlg-b" id="bconf-b"></div>';document.body.appendChild(cd);
var ad=document.createElement("dialog");ad.className="dlg";ad.id="after";ad.setAttribute("aria-label","Next step");
ad.innerHTML='<div class="dlg-h"><b id="after-t"></b><button type="button" class="gbtn" id="after-x">Close</button></div><div class="dlg-b" id="after-b" style="align-items:center;text-align:center"></div>';document.body.appendChild(ad);
function line(l,t){var b=document.createElement("b");b.textContent=l;var s=document.createElement("span");s.textContent=t;return[b,s]}
window.askConfirm=function(f,go){var b=document.getElementById("bconf-b");b.innerHTML="";
var g=document.createElement("div");g.className="conf-l";[["Name",f.name],["Date",f.date],["Time",f.slot+(f.time?" from "+f.time:"")],["Shoot",f.type],["Venue and city",f.location],["Payment plan",PLANS[f.plan||"shubham"]]].forEach(function(r){line(r[0],r[1]).forEach(function(e){g.appendChild(e)})});b.appendChild(g);
var p=document.createElement("p");p.className="mute-note";p.textContent="If this slot is free it is booked and confirmed right away. If it was just taken, your request goes to Shubham instead.";b.appendChild(p);
var r=document.createElement("div");r.style.cssText="display:flex;gap:10px;flex-wrap:wrap;justify-content:center";var y=document.createElement("button");y.type="button";y.className="btn";y.textContent="Yes, book this slot";var n=document.createElement("button");n.type="button";n.className="gbtn";n.textContent="Go back";
y.addEventListener("click",function(){cd.close();go()});n.addEventListener("click",function(){cd.close()});r.appendChild(y);r.appendChild(n);b.appendChild(r);SFX.ding();cd.showModal()};
document.getElementById("bconf-x").addEventListener("click",function(){cd.close()});
window.showAfter=function(j,f){var t=document.getElementById("after-t"),b=document.getElementById("after-b");b.innerHTML="";
t.textContent=j.auto?"Your slot is booked!":j.taken?"Request sent to Shubham":"Slot requested";
var p=document.createElement("p");p.textContent=j.taken?"That slot was already taken, so nothing was booked. Shubham has your request and will reply on WhatsApp. Your reference code is:":"Please keep your reference code safe:";b.appendChild(p);
var r=document.createElement("div");r.className="refbig";r.textContent=j.ref;b.appendChild(r);
var q=document.createElement("p");q.textContent="Please log in using your reference code and the mobile number you gave ("+f.phone+"), for the next steps like payment.";b.appendChild(q);
var row=document.createElement("div");row.style.cssText="display:flex;gap:10px;flex-wrap:wrap;justify-content:center";
var go=document.createElement("button");go.type="button";go.className="btn";go.textContent="Go to customer login";go.addEventListener("click",function(){ad.close();openCust(j.ref,f.phone)});
var cp=document.createElement("button");cp.type="button";cp.className="gbtn";cp.textContent="Copy reference code";cp.addEventListener("click",function(){try{navigator.clipboard.writeText(j.ref).then(function(){cp.textContent="Copied"})}catch(e){}});
row.appendChild(go);row.appendChild(cp);b.appendChild(row);if(j.auto||!j.taken)SFX.success();else SFX.warn();ad.showModal()};
document.getElementById("after-x").addEventListener("click",function(){ad.close()});
[cd,ad].forEach(function(d){d.addEventListener("click",function(e){if(e.target===d)d.close()})})})();
/* ---- theme and sound chips, idle refresh, visit counter ---- */
(function(){var TH=[["amber","Amber — Warm Ivory & Gold"],["red","Rose — Coral & Burgundy"],["teal","Teal — Deep Lagoon & Mint"],["ocean","Ocean — Electric Blue"],["lavender","Lavender — Soft Violet"],["forest","Forest — Sage Green"]];
function now(){return document.documentElement.dataset.theme||"amber"}
function buildTh(){var c=$("theme-chips");c.innerHTML="";TH.forEach(function(t){var b=document.createElement("button");b.type="button";b.className="chip";b.textContent=t[1];b.dataset.themeKey=t[0];b.setAttribute("aria-pressed",String(now()===t[0]));b.addEventListener("click",function(e){e.stopPropagation();if(window.sbSetTheme)window.sbSetTheme(t[0]);else{document.documentElement.dataset.theme=t[0];try{localStorage.setItem("sb_theme",t[0])}catch(e){}buildTh();if(window.sbRepaint)window.sbRepaint()}});c.appendChild(b)})}
function buildFx(){var c=$("fx-chips");c.innerHTML="";[[true,"On"],[false,"Off"]].forEach(function(t){var b=document.createElement("button");b.type="button";b.className="chip";b.textContent=t[1];b.setAttribute("aria-pressed",String(SFX.on()===t[0]));b.addEventListener("click",function(e){e.stopPropagation();SFX.set(t[0]);buildFx()});c.appendChild(b)})}
buildTh();buildFx();
var t,IDLE=120000;function reset(){clearTimeout(t);t=setTimeout(fire,IDLE)}
function fire(){var open=document.querySelector("dialog[open]"),typed=["b-name","b-phone","b-email","b-city","b-venue","b-note"].some(function(i){var e=$(i);return e&&e.value}),sound=[].some.call(document.querySelectorAll("video"),function(v){return!v.paused&&!v.muted});
if(open||typed||sound){if(BACKEND_URL&&typeof live==="function")live();reset();return}location.reload()}
["pointerdown","keydown","touchstart","scroll","mousemove"].forEach(function(e){window.addEventListener(e,reset,{passive:true})});reset();
if(BACKEND_URL){try{var id=localStorage.getItem("sb_vid");if(!id){id=Math.random().toString(36).slice(2,12)+Date.now().toString(36).slice(-4);localStorage.setItem("sb_vid",id)}var d=new Date().toISOString().slice(0,10);if(localStorage.getItem("sb_vd")!==d){localStorage.setItem("sb_vd",d);postR({action:"visit",vid:id},function(){},function(){})}}catch(e){}}})();
/* ---- custom payment QR + PDF downloads ---- */
/* Minimal QR code generator (byte mode, error correction M). Returns an array of rows of booleans. */
function qrMatrix(text){
var s=unescape(encodeURIComponent(text)),bytes=[],i,j,k;for(i=0;i<s.length;i++)bytes.push(s.charCodeAt(i));
var ECC=[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],
BLK=[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49];
function raw(v){var r=(16*v+128)*v+64;if(v>=2){var n=Math.floor(v/7)+2;r-=(25*n-10)*n-55;if(v>=7)r-=36}return r}
function dcw(v){return Math.floor(raw(v)/8)-ECC[v]*BLK[v]}
var ver;for(ver=1;ver<=40;ver++){if(4+(ver<10?8:16)+bytes.length*8<=dcw(ver)*8)break}
if(ver>40)throw new Error("QR text too long");
var bits=[];function put(v,n){for(var q=n-1;q>=0;q--)bits.push((v>>>q)&1)}
put(4,4);put(bytes.length,ver<10?8:16);bytes.forEach(function(b){put(b,8)});
var cap=dcw(ver)*8;put(0,Math.min(4,cap-bits.length));put(0,(8-bits.length%8)%8);
for(var pd=0xEC;bits.length<cap;pd^=0xEC^0x11)put(pd,8);
var data=[];for(i=0;i<bits.length;i+=8){var bt=0;for(k=0;k<8;k++)bt=bt<<1|bits[i+k];data.push(bt)}
function mul(x,y){var z=0;for(var q=7;q>=0;q--){z=(z<<1)^((z>>>7)*0x11D);z^=((y>>>q)&1)*x}return z}
function div(deg){var r=[];for(var q=0;q<deg;q++)r.push(0);r[deg-1]=1;var root=1;for(var a=0;a<deg;a++){for(var b=0;b<deg;b++){r[b]=mul(r[b],root);if(b+1<deg)r[b]^=r[b+1]}root=mul(root,2)}return r}
function rem(d,dv){var r=dv.map(function(){return 0});d.forEach(function(b){var f=b^r.shift();r.push(0);dv.forEach(function(c,q){r[q]^=mul(c,f)})});return r}
var nb=BLK[ver],el=ECC[ver],rc=Math.floor(raw(ver)/8),ns=nb-rc%nb,sl=Math.floor(rc/nb),dv=div(el),blocks=[],kk=0;
for(i=0;i<nb;i++){var dat=data.slice(kk,kk+sl-el+(i<ns?0:1));kk+=dat.length;var ec=rem(dat,dv);if(i<ns)dat.push(0);blocks.push(dat.concat(ec))}
var all=[];for(i=0;i<blocks[0].length;i++)for(j=0;j<blocks.length;j++)if(i!==sl-el||j>=ns)all.push(blocks[j][i]);
var size=ver*4+17,M=[],F=[];for(i=0;i<size;i++){M.push(new Array(size).fill(false));F.push(new Array(size).fill(false))}
function sf(x,y,d){if(x>=0&&x<size&&y>=0&&y<size){M[y][x]=d;F[y][x]=true}}
for(i=0;i<size;i++){sf(6,i,i%2===0);sf(i,6,i%2===0)}
function finder(x,y){for(var dy=-4;dy<=4;dy++)for(var dx=-4;dx<=4;dx++){var d=Math.max(Math.abs(dx),Math.abs(dy));sf(x+dx,y+dy,d!==2&&d!==4)}}
finder(3,3);finder(size-4,3);finder(3,size-4);
var pos=[];if(ver>1){var na=Math.floor(ver/7)+2,step=ver===32?26:Math.ceil((ver*4+4)/(na*2-2))*2;pos=[6];for(var p=size-7;pos.length<na;p-=step)pos.splice(1,0,p)}
for(i=0;i<pos.length;i++)for(j=0;j<pos.length;j++){if((i===0&&j===0)||(i===0&&j===pos.length-1)||(i===pos.length-1&&j===0))continue;for(var dy=-2;dy<=2;dy++)for(var dx=-2;dx<=2;dx++)sf(pos[i]+dx,pos[j]+dy,Math.max(Math.abs(dx),Math.abs(dy))!==1)}
function fmt(mask){var d=mask,r=d;for(var q=0;q<10;q++)r=(r<<1)^((r>>>9)*0x537);var b=(d<<10|r)^0x5412;function g(q){return((b>>>q)&1)!==0}
for(var q=0;q<=5;q++)sf(8,q,g(q));sf(8,7,g(6));sf(8,8,g(7));sf(7,8,g(8));for(q=9;q<15;q++)sf(14-q,8,g(q));
for(q=0;q<8;q++)sf(size-1-q,8,g(q));for(q=8;q<15;q++)sf(8,size-15+q,g(q));sf(8,size-8,true)}
fmt(0);
if(ver>=7){var r2=ver;for(i=0;i<12;i++)r2=(r2<<1)^((r2>>>11)*0x1F25);var vb=ver<<12|r2;for(i=0;i<18;i++){var bit=((vb>>>i)&1)!==0,a=size-11+i%3,b2=Math.floor(i/3);sf(a,b2,bit);sf(b2,a,bit)}}
i=0;for(var right=size-1;right>=1;right-=2){if(right===6)right=5;for(var vert=0;vert<size;vert++)for(j=0;j<2;j++){var x=right-j,up=((right+1)&2)===0,y=up?size-1-vert:vert;if(!F[y][x]&&i<all.length*8){M[y][x]=((all[i>>>3]>>>(7-(i&7)))&1)!==0;i++}}}
function mask(m){for(var y=0;y<size;y++)for(var x=0;x<size;x++){var inv;switch(m){case 0:inv=(x+y)%2===0;break;case 1:inv=y%2===0;break;case 2:inv=x%3===0;break;case 3:inv=(x+y)%3===0;break;case 4:inv=(Math.floor(x/3)+Math.floor(y/2))%2===0;break;case 5:inv=x*y%2+x*y%3===0;break;case 6:inv=(x*y%2+x*y%3)%2===0;break;default:inv=((x+y)%2+x*y%3)%2===0}if(!F[y][x]&&inv)M[y][x]=!M[y][x]}}
function pen(){var sc=0,y,x,run,c;
for(y=0;y<size;y++){run=1;for(x=1;x<size;x++){if(M[y][x]===M[y][x-1])run++;else{if(run>=5)sc+=run-2;run=1}}if(run>=5)sc+=run-2}
for(x=0;x<size;x++){run=1;for(y=1;y<size;y++){if(M[y][x]===M[y-1][x])run++;else{if(run>=5)sc+=run-2;run=1}}if(run>=5)sc+=run-2}
for(y=0;y<size-1;y++)for(x=0;x<size-1;x++){c=M[y][x];if(c===M[y][x+1]&&c===M[y+1][x]&&c===M[y+1][x+1])sc+=3}
var P1=[1,0,1,1,1,0,1,0,0,0,0],P2=[0,0,0,0,1,0,1,1,1,0,1];
function mt(get,n,len){var cnt=0;for(var s0=0;s0+11<=len;s0++){var a=true,b=true;for(var q=0;q<11;q++){var v=get(s0+q)?1:0;if(v!==P1[q])a=false;if(v!==P2[q])b=false}if(a)cnt++;if(b)cnt++}return cnt}
for(y=0;y<size;y++)sc+=40*mt(function(q){return M[y][q]},0,size);
for(x=0;x<size;x++)sc+=40*mt(function(q){return M[q][x]},0,size);
var dark=0;for(y=0;y<size;y++)for(x=0;x<size;x++)if(M[y][x])dark++;var kx=Math.ceil(Math.abs(dark*20-size*size*10)/(size*size))-1;sc+=Math.max(0,kx)*10;return sc}
var best=0,bs=1e9;for(var m=0;m<8;m++){mask(m);fmt(m);var ps=pen();if(ps<bs){bs=ps;best=m}mask(m)}
mask(best);fmt(best);return M}
function qrDataUrl(text,scale){var m=qrMatrix(text),n=m.length,s=scale||6,c=document.createElement("canvas");c.width=c.height=(n+8)*s;var x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.fillStyle="#000";
for(var y=0;y<n;y++)for(var q=0;q<n;q++)if(m[y][q])x.fillRect((q+4)*s,(y+4)*s,s,s);return c.toDataURL("image/png")}

function dlB64(b64,name){try{var bin=atob(b64),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);var url=URL.createObjectURL(new Blob([u],{type:"application/pdf"})),a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(url)},5000)}catch(e){}}
function getPdf(ref,phone,kind,n,btn){var t=btn.textContent;btn.disabled=true;btn.textContent="Preparing PDF...";getJ("?action=pdf&ref="+encodeURIComponent(ref)+"&phone="+encodeURIComponent(phone)+"&kind="+kind+"&n="+(n||0),function(j){btn.disabled=false;btn.textContent=t;if(j&&j.ok)dlB64(j.b64,j.name);else btn.textContent=(j&&j.error==="auth")?"Log in on the customer page to get the PDF":"PDF not available"},function(){btn.disabled=false;btn.textContent="Could not get the PDF"})}
openPay=function(){openCust()};
})();

;
/* Owner-editable content: loaded from the booking backend, cached for speed. If anything fails the page stays as written. */
(function(){var API="/api/booking",CK="sb_site_v1",$=function(i){return document.getElementById(i)},cur={main:"9284423297",second:"9699523297"};
var GR=[["#0F1E4A","#C2410C"],["#1B2A5E","#E8A317"],["#16324A","#D9A441"],["#2A1B4E","#E8563B"],["#10303F","#C9A227"],["#3B1B2E","#E8A317"]];
function ok(u){return typeof u==="string"&&/^https:\/\//i.test(u)}
function sz(u,w){
  if(typeof u!=="string")return u;
  try{
    var parsed=new URL(u,location.href),host=parsed.hostname.toLowerCase();
    var driveHost=/(^|\.)drive\.google\.com$/.test(host)||/(^|\.)docs\.google\.com$/.test(host);
    var id=parsed.searchParams.get("id")||"";
    var dm=parsed.pathname.match(/\/(?:file|document|presentation|spreadsheets|forms)\/d\/([^/?#]+)/)||parsed.pathname.match(/\/d\/([^/?#]+)/);
    if(dm)id=dm[1];
    if(driveHost&&id)return "https://drive.google.com/thumbnail?id="+encodeURIComponent(id)+"&sz=w"+w;
    var gm=parsed.href.match(/^https:\/\/lh3\.googleusercontent\.com\/d\/([^=?&#]+)(?:=w\d+)?(?:[?#].*)?$/i);
    if(gm)return "https://lh3.googleusercontent.com/d/"+gm[1]+"=w"+w;
  }catch(e){}
  return u;
}
function fm(n){return n.slice(0,5)+" "+n.slice(5)}
function txt(sel,v){var e=document.querySelector(sel);if(e&&v)e.textContent=v}
function rep(a,f,t){[a].concat([].slice.call(a.querySelectorAll("*"))).forEach(function(n){if(!n.children.length&&n.textContent.indexOf(f)>-1)n.textContent=n.textContent.replace(f,t)})}
function phones(p){if(!p||!/^\d{10}$/.test(p.main))return;var old=cur;window.SB_WA="91"+p.main;
document.querySelectorAll('a[href*="api.whatsapp.com/send?phone="]').forEach(function(a){a.href=a.href.replace(/phone=\d+/,"phone="+window.SB_WA)});
var sec=/^\d{10}$/.test(p.second)?p.second:"";
document.querySelectorAll('a[href^="tel:"]').forEach(function(a){var h=a.getAttribute("href"),isM=h.indexOf(old.main)>-1,isS=h.indexOf(old.second)>-1;
if(isM){a.href="tel:+91"+p.main;rep(a,fm(old.main),fm(p.main))}
else if(isS){if(!sec){a.hidden=true;return}a.hidden=false;a.href="tel:+91"+sec;rep(a,fm(old.second),fm(sec))}});
cur={main:p.main,second:sec||old.second}}
function photos(l){
  var g=$("ph-grid");if(!g||!Array.isArray(l)||!l.length)return;
  /* The 15 locally optimized photos are the site's curated default gallery.
     Only append photos that the owner actually added, not the old Unsplash demo set. */
  var ownerPhotos=l.filter(function(p){
    if(!p||!ok(p.url))return false;
    try{return new URL(p.url,location.href).hostname.toLowerCase()!=="images.unsplash.com"}catch(e){return true}
  });
  g.querySelectorAll('.ph[data-owner-photo="true"]').forEach(function(n){n.remove()});
  if(!ownerPhotos.length)return;
  ownerPhotos.forEach(function(p,n){
    var f=document.createElement("figure");f.className="ph";f.dataset.ownerPhoto="true";
    f.dataset.cat=p.cat||p.category||"Highlights";
    f.dataset.title=p.title||p.name||p.alt||p.caption||("Owner Photo "+String(n+1).padStart(2,"0"));
    f.dataset.full=sz(p.full||p.fullUrl||p.url,1800);
    f.style.aspectRatio="4/5";f.tabIndex=0;f.setAttribute("role","button");
    f.setAttribute("aria-label","Open photo: "+f.dataset.title);
    var i=document.createElement("img");i.referrerPolicy="no-referrer";i.alt=p.alt||f.dataset.title;i.loading="lazy";i.decoding="async";
    i.addEventListener("error",function(){f.classList.add("image-failed");i.dataset.failed="true";});
    i.addEventListener("load",function(){f.classList.remove("image-failed");i.removeAttribute("data-failed");var r=i.naturalWidth/i.naturalHeight;if(r)f.style.aspectRatio=Math.min(1.5,Math.max(.67,r));});
    i.src=sz(p.url,800);f.appendChild(i);g.appendChild(f);
  });
  var on=document.querySelector("#ph-tabs .chip[aria-pressed=true]");
  if(on&&on.textContent.trim()!=="All")on.click();
}function films(l){var w=document.querySelector("#work .grid");if(!w||!l||!l.length)return;w.textContent="";l.forEach(function(x,n){if(!ok(x.url))return;var g=GR[n%GR.length],a=document.createElement("a");a.className="card";a.href=x.url;a.target="_self";a.removeAttribute("rel");
var t=document.createElement("div");t.className="thumb";t.style.background="radial-gradient(ellipse at 80% 100%,rgba(255,200,120,.35),transparent 60%),linear-gradient(135deg,"+g[0]+","+g[1]+")";
var s=document.createElement("small");s.className="tg";s.textContent=x.tag||"Film";var b=document.createElement("b");b.className="tn";b.textContent=x.title;var p=document.createElement("div");p.className="play";var i=document.createElement("i");i.className="num";i.textContent=("0"+(n+1)).slice(-2);
t.append(s,b,p,i);var h=document.createElement("h3");h.textContent=x.title;var q=document.createElement("p");q.textContent="Tap to watch";a.append(t,h,q);w.appendChild(a)});
var gg=$("g-grid");if(gg){gg.textContent="";if($("gallery")&&!$("gallery").hidden)w.querySelectorAll(".card").forEach(function(c){gg.appendChild(c.cloneNode(true))})}}
function apply(s){if(!s)return;try{var h=s.hero||{};txt(".hero h1",h.title);txt(".hero>p",h.intro);txt("#film figcaption",h.caption);var v=document.querySelector("#film video");if(v&&ok(h.poster))v.poster=sz(h.poster,1600)}catch(e){}
try{var a=s.about||{},im=document.querySelector("#about .portrait img");if(im&&ok(a.photo))im.src=sz(a.photo,900);var d=document.querySelector("#about>div");if(d&&a.text){d.querySelectorAll("p").forEach(function(p){p.remove()});a.text.split(/\n\s*\n/).forEach(function(t){if(t.trim()){var p=document.createElement("p");p.textContent=t.trim();d.appendChild(p)}})}}catch(e){}
try{phones(s.phones)}catch(e){}try{photos(s.photos)}catch(e){}try{films(s.films)}catch(e){}
/* Owner visual-editor overrides. These are plain text, safe media URLs and CSS only. */
try{
  var d=s.design||{}, root=document.documentElement, validThemes=["amber","red","teal","ocean","lavender","forest"];
  if(validThemes.indexOf(d.theme)>=0){root.dataset.siteTheme=d.theme;var userTheme=false;try{userTheme=localStorage.getItem("sb_theme_user")==="1"}catch(e){}
    if(!userTheme){root.dataset.theme=d.theme;
      document.querySelectorAll("[data-header-theme]").forEach(function(b){b.setAttribute("aria-pressed",String(b.getAttribute("data-header-theme")===d.theme))});
      document.querySelectorAll("#theme-chips .chip[data-theme-key]").forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.themeKey===d.theme))});
    }
  }
  var cs=document.getElementById("sb-owner-custom-css");if(!cs){cs=document.createElement("style");cs.id="sb-owner-custom-css";document.head.appendChild(cs)}cs.textContent=typeof d.customCss==="string"?d.customCss:"";
  if(d.siteTitle){document.title=String(d.siteTitle).slice(0,120)}
  if(d.siteDescription){var md=document.querySelector('meta[name="description"]');if(!md){md=document.createElement("meta");md.name="description";document.head.appendChild(md)}md.content=String(d.siteDescription).slice(0,300)}
}catch(e){}
try{var sections=s.sections||{};Object.keys(sections).forEach(function(sel){try{var node=document.querySelector(sel);if(!node)return;if(sections[sel]===false)node.style.setProperty("display","none","important");else if(node.style.getPropertyValue("display")==="none")node.style.removeProperty("display")}catch(e){}})}catch(e){}
try{var cm=s.contentMap||{};Object.keys(cm).slice(0,100).forEach(function(sel){try{var node=document.querySelector(sel);if(node&&typeof cm[sel]==="string")node.textContent=cm[sel]}catch(e){}})}catch(e){}
try{var mm=s.mediaMap||{};Object.keys(mm).slice(0,60).forEach(function(sel){try{var node=document.querySelector(sel),u=mm[sel];if(!node||typeof u!=="string")return;if(node.tagName==="IMG")node.src=sz(u,1800);else if(node.tagName==="VIDEO"||node.tagName==="SOURCE"){node.src=u;if(node.tagName==="VIDEO")node.load()}}catch(e){}})}catch(e){}
try{var lm=s.linkMap||{};Object.keys(lm).slice(0,40).forEach(function(sel){try{var node=document.querySelector(sel);if(node&&node.tagName==="A"&&typeof lm[sel]==="string")node.href=lm[sel]}catch(e){}})}catch(e){}
}
var c0="";try{c0=localStorage.getItem(CK)||""}catch(e){}
if(c0){try{apply(JSON.parse(c0))}catch(e){}}
try{fetch(API+"?action=site").then(function(r){return r.json()}).then(function(j){if(!j||!j.ok||!j.site)return;var n=JSON.stringify(j.site);if(n===c0)return;try{localStorage.setItem(CK,n)}catch(e){}apply(j.site)}).catch(function(){})}catch(e){}
if("serviceWorker" in navigator)navigator.serviceWorker.register("/sw.js");
})();

;
/* photo loading: no-referrer (avoids hotlink blocks) + automatic retries, Drive photos fall back to the thumbnail address */
(function(){document.querySelectorAll(".ph img").forEach(function(i){i.referrerPolicy="no-referrer"});
document.addEventListener("error",function(e){var i=e.target;if(!i||i.tagName!=="IMG"||!i.closest||!i.closest(".ph"))return;var n=+i.dataset.rt||0;if(n>=3)return;i.dataset.rt=n+1;var u=i.src,m=/lh3\.googleusercontent\.com\/d\/([^=?&#\/]+)/.exec(u);
setTimeout(function(){i.style.display="";i.referrerPolicy="no-referrer";if(m&&n===0)i.src="https://drive.google.com/thumbnail?id="+m[1]+"&sz=w800";else i.src=u.replace(/([?&])rt=\d+&?/,"$1").replace(/[?&]$/,"")+(u.indexOf("?")>-1?"&":"?")+"rt="+Date.now()},700*(n+1))},true)})();

;
/* Header palette toggles share the same persisted theme as the existing settings panel. */
(function(){
  var root=document.documentElement;
  var themes=['amber','red','teal','ocean','lavender','forest'];
  function paint(theme,userAction){
    if(theme==='light')theme='amber';
    if(theme==='dark'||theme==='midnight')theme='amber';
    if(themes.indexOf(theme)<0)theme='amber';
    root.dataset.theme=theme;
    try{localStorage.setItem('sb_theme',theme);if(userAction)localStorage.setItem('sb_theme_user','1')}catch(e){}
    document.querySelectorAll('[data-header-theme]').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-header-theme')===theme))});
    document.querySelectorAll('#theme-chips .chip[data-theme-key]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.themeKey===theme))});
    if(window.sbRepaint)window.sbRepaint();
  }
  window.sbSetTheme=paint;
  document.querySelectorAll('[data-header-theme]').forEach(function(b){b.addEventListener('click',function(){paint(b.getAttribute('data-header-theme'),true)})});
  paint(root.dataset.theme||'amber',false);
})();

;
(function(){
  var section=document.getElementById('work');
  if(!section)return;
  var viewport=section.querySelector('.film-carousel-viewport');
  var track=section.querySelector('[data-film-track]');
  var prev=section.querySelector('[data-film-prev]');
  var next=section.querySelector('[data-film-next]');
  var status=section.querySelector('[data-film-status]');
  if(!viewport||!track)return;
  var cards=[],active=0,suppressClick=false,pointerStart=null,dragDistance=0,raf=0;
  function currentCards(){return Array.prototype.slice.call(track.querySelectorAll(':scope > .card'));}
  function relativeOffset(i){
    var n=cards.length,d=(i-active)%n;
    if(d>n/2)d-=n;
    if(d< -n/2)d+=n;
    return d;
  }
  function render(){
    raf=0;var n=cards.length;
    if(!n){if(status)status.textContent='00 / 00';if(prev)prev.disabled=true;if(next)next.disabled=true;return;}
    active=((active%n)+n)%n;
    var width=viewport.clientWidth||window.innerWidth;
    var step=width<460?width*.32:(width<760?width*.27:Math.min(225,width*.21));
    cards.forEach(function(card,i){
      var d=relativeOffset(i),a=Math.abs(d);
      var scale=d===0?1:(a===1?.86:(a===2?.74:.64));
      var opacity=d===0?1:(a===1?.96:(a===2?.62:.24));
      var y=a===0?0:(a===1?16:(a===2?34:48));
      card.style.setProperty('--film-x',(d*step).toFixed(1)+'px');
      card.style.setProperty('--film-y',y+'px');
      card.style.setProperty('--film-scale',String(scale));
      card.style.setProperty('--film-opacity',String(opacity));
      card.style.setProperty('--film-blur',d===0?'0px':(a===1?'0.45px':(a===2?'0.95px':'1.2px')));
      card.style.setProperty('--film-z',String(100-a*10));
      card.classList.toggle('is-active',d===0);
      card.classList.toggle('is-hidden-slide',a>2);
      card.dataset.filmIndex=String(i);
      card.setAttribute('aria-label',(card.querySelector('h3')?card.querySelector('h3').textContent.trim():'Film')+', open film');
      if(a>2){card.setAttribute('aria-hidden','true');card.setAttribute('tabindex','-1');}
      else{card.removeAttribute('aria-hidden');card.removeAttribute('tabindex');}
    });
    if(status)status.textContent=String(active+1).padStart(2,'0')+' / '+String(n).padStart(2,'0');
    if(prev)prev.disabled=n<2;if(next)next.disabled=n<2;
  }
  function schedule(){if(!raf)raf=requestAnimationFrame(render);}
  function refreshCards(){
    var nextCards=currentCards();
    var changed=nextCards.length!==cards.length||nextCards.some(function(c,i){return c!==cards[i];});
    if(!changed)return;
    cards=nextCards;
    active=Math.floor(cards.length/2);
    render();
  }
  function go(delta){if(!cards.length)return;active=(active+delta+cards.length)%cards.length;render();}
  if(prev)prev.addEventListener('click',function(){go(-1)});
  if(next)next.addEventListener('click',function(){go(1)});
  viewport.addEventListener('keydown',function(e){
    if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}
    else if(e.key==='ArrowRight'){e.preventDefault();go(1)}
  });
  viewport.addEventListener('pointerdown',function(e){
    if(e.pointerType==='mouse'&&e.button!==0)return;
    pointerStart=e.clientX;dragDistance=0;
    try{viewport.setPointerCapture(e.pointerId)}catch(_){}
  },{passive:true});
  viewport.addEventListener('pointermove',function(e){if(pointerStart!==null)dragDistance=e.clientX-pointerStart;},{passive:true});
  function finishDrag(){
    if(pointerStart===null)return;
    var delta=dragDistance;pointerStart=null;dragDistance=0;
    if(Math.abs(delta)>42){go(delta<0?1:-1);suppressClick=true;window.setTimeout(function(){suppressClick=false},380);}
  }
  viewport.addEventListener('pointerup',finishDrag,{passive:true});
  viewport.addEventListener('pointercancel',function(){pointerStart=null;dragDistance=0},{passive:true});
  viewport.addEventListener('click',function(e){
    if(suppressClick){e.preventDefault();e.stopPropagation();suppressClick=false;}
  },true);
  if(window.MutationObserver){
    var observer=new MutationObserver(function(records){
      if(records.some(function(r){return r.type==='childList';}))refreshCards();
    });
    observer.observe(track,{childList:true});
  }
  if('ResizeObserver' in window){var ro=new ResizeObserver(schedule);ro.observe(viewport);}
  else window.addEventListener('resize',schedule,{passive:true});
  refreshCards();render();
})();

;
/* Replaced by the unified, theme-aware photo carousel controller at the end of this file. */

;
/* Replaced by the unified, theme-aware photo carousel controller at the end of this file. */

;
(function(){
  var dlg=document.getElementById('player');
  var frame=document.getElementById('pl-frame');
  var video=document.getElementById('pl-video');
  var openLink=document.getElementById('pl-open');
  var title=document.getElementById('pl-title');
  var errorBox=document.getElementById('pl-error');
  var closeButton=document.getElementById('pl-close');
  if(!dlg||!frame||!closeButton)return;
  function googleDriveId(raw){
    try{
      var u=new URL(raw,location.href),host=u.hostname.toLowerCase();
      if(!/(^|\.)drive\.google\.com$/.test(host)&&!/(^|\.)docs\.google\.com$/.test(host))return null;
      var m=u.pathname.match(/\/(?:file|document|presentation|spreadsheets|forms)\/d\/([^/?#]+)/)||u.pathname.match(/\/d\/([^/?#]+)/);
      var id=(m&&m[1])||u.searchParams.get('id');
      return id?decodeURIComponent(id):null;
    }catch(e){return null;}
  }
  function resetPlayer(){
    try{frame.src='about:blank';}catch(e){}
    if(video){try{video.pause();video.removeAttribute('src');video.load();}catch(e){}video.hidden=true;}
    frame.hidden=false;
    if(errorBox){errorBox.hidden=true;errorBox.textContent='';}
    if(openLink){openLink.hidden=true;openLink.removeAttribute('href');}
  }
  function launch(anchor, url){
    resetPlayer();
    var name=(anchor.querySelector('h3')||anchor.querySelector('.tn')||anchor).textContent.trim();
    if(title)title.textContent=name?'NOW PLAYING · '+name:'NOW PLAYING';
    var driveId=googleDriveId(url);
    var parsed;try{parsed=new URL(url,location.href);}catch(e){}
    var directVideo=parsed&&/\.(mp4|webm|ogv|m4v)(?:$|[?#])/i.test(parsed.pathname+parsed.search+parsed.hash);
    if(driveId){
      frame.hidden=false;
      frame.src='https://drive.google.com/file/d/'+encodeURIComponent(driveId)+'/preview';
    }else if(directVideo&&video){
      frame.hidden=true;video.hidden=false;video.src=url;video.play().catch(function(){});
    }else{
      frame.hidden=true;
      if(errorBox){errorBox.hidden=false;errorBox.textContent='This film link cannot be embedded. Please update the film URL to a Google Drive share link or a direct MP4/WebM video URL.';}
    }
    if(typeof dlg.showModal==='function'&&!dlg.open){try{dlg.showModal();}catch(e){dlg.setAttribute('open','');}}
    else if(!dlg.open)dlg.setAttribute('open','');
  }
  document.addEventListener('click',function(e){
    var anchor=e.target&&e.target.closest?e.target.closest('#work a.card, #gallery a.card, #g-grid a.card'):null;
    if(!anchor)return;
    var href=anchor.href||anchor.getAttribute('href')||'';
    var id=googleDriveId(href);
    var direct=/\.(mp4|webm|ogv|m4v)(?:$|[?#])/i.test(href);
    var maybeDrive=/drive\.google\.com|docs\.google\.com/i.test(href);
    if(!id&&!direct&&!maybeDrive)return;
    e.preventDefault();e.stopImmediatePropagation();
    launch(anchor,href);
  },true);
  function close(){resetPlayer();if(dlg.open&&typeof dlg.close==='function')dlg.close();else dlg.removeAttribute('open');}
  closeButton.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();close();});
  dlg.addEventListener('click',function(e){if(e.target===dlg)close();});
  dlg.addEventListener('close',resetPlayer);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&dlg.open)resetPlayer();});

  // Images supplied through site settings often use a Drive share-page URL, which is not an <img> URL.
  function bindPhoto(img){
    if(!img||img.dataset.pwImageBound==='1')return;
    img.dataset.pwImageBound='1';
    var card=img.closest('.ph');
    img.addEventListener('error',function(){if(card)card.classList.add('image-failed');});
    img.addEventListener('load',function(){if(card)card.classList.remove('image-failed');});
    if(img.complete&&img.naturalWidth===0&&card)card.classList.add('image-failed');
  }
  function bindPhotos(scope){(scope||document).querySelectorAll('#ph-grid .ph img').forEach(bindPhoto);}
  bindPhotos(document);
  if(window.MutationObserver&&document.getElementById('ph-grid')){
    var mo=new MutationObserver(function(records){records.forEach(function(r){r.addedNodes&&r.addedNodes.forEach(function(n){if(n.nodeType!==1)return;if(n.matches&&n.matches('.ph img'))bindPhoto(n);bindPhotos(n);});});});
    mo.observe(document.getElementById('ph-grid'),{childList:true,subtree:true});
  }
})();

;
(function(){
  'use strict';
  var section=document.getElementById('photos');
  var track=document.getElementById('ph-grid');
  var tabs=document.getElementById('ph-tabs');
  var prev=document.getElementById('ph-prev');
  var next=document.getElementById('ph-next');
  var current=document.getElementById('ph-current');
  var total=document.getElementById('ph-total');
  var note=document.getElementById('ph-auto-note');
  if(!section||!track||!prev||!next||!current||!total)return;

  var active=0, pointerStart=null, pointerDelta=0, dragging=false, suppressClickUntil=0;
  var idleTimer=0, autoTimer=0, sectionInView=false, renderPending=false;
  var prefersReduced=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var lowMotion=!!((window.matchMedia&&window.matchMedia('(pointer: coarse)').matches)||(navigator.connection&&navigator.connection.saveData));
  var IDLE_MS=10000, HOLD_MS=3000;
  function cards(){return Array.prototype.slice.call(track.querySelectorAll(':scope > .ph'));}
  function visibleCards(){return cards().filter(function(card){return !card.hidden;});}
  function modalOpen(){return !!document.querySelector('dialog[open]');}
  function modulo(n,m){return m?((n%m)+m)%m:0;}
  function signedDistance(i,n){var d=i-active;if(d>n/2)d-=n;if(d< -n/2)d+=n;return d;}
  function addCaption(card,index){
    var title=card.dataset.title||('Photo Story '+String(index+1).padStart(2,'0'));
    card.dataset.title=title;
    var cap=card.querySelector('.photo-card-caption');
    if(!cap){
      cap=document.createElement('figcaption');cap.className='photo-card-caption';
      var cat=document.createElement('span');cat.className='photo-card-category';cat.textContent=card.dataset.cat||'Photography';
      var heading=document.createElement('h3');heading.textContent=title;
      var label=document.createElement('small');label.textContent='VIEW PHOTO';
      cap.appendChild(cat);cap.appendChild(heading);cap.appendChild(label);card.appendChild(cap);
    }else{var h=cap.querySelector('h3');if(h)h.textContent=title;}
    card.setAttribute('aria-label','Open photo: '+title);
    card.setAttribute('role','button');
    if(!card.hasAttribute('tabindex'))card.setAttribute('tabindex','0');
  }
  function render(){
    renderPending=false;
    var all=cards(), list=visibleCards(), n=list.length;
    all.forEach(addCaption);
    if(!n){current.textContent='00';total.textContent='00';prev.disabled=true;next.disabled=true;return;}
    active=modulo(active,n);
    var width=track.clientWidth||window.innerWidth||1000;
    var step=width<430?Math.max(95,width*.245):(width<760?Math.max(130,width*.27):Math.min(286,width*.235));
    list.forEach(function(card,i){
      var d=signedDistance(i,n),a=Math.abs(d);
      var scale=d===0?1:(a===1?.855:(a===2?.72:.62));
      var opacity=d===0?1:(a===1?.96:(a===2?.58:0));
      var y=a===0?0:(a===1?11:(a===2?22:30));
      var rotate=d===0?0:(d<0?-1.6:1.6);
      card.style.setProperty('--photo-x',(d*step).toFixed(1)+'px');
      card.style.setProperty('--photo-y',y+'px');
      card.style.setProperty('--photo-scale',String(scale));
      card.style.setProperty('--photo-opacity',String(opacity));
      card.style.setProperty('--photo-blur',d===0?'0px':(a===1?'0.55px':(a===2?'1.0px':'1.25px')));
      card.style.setProperty('--photo-rotate',rotate+'deg');
      card.style.setProperty('--photo-z',String(100-a*10));
      card.classList.toggle('is-focused',d===0);
      card.classList.toggle('is-side',a===1);
      card.classList.toggle('is-far-slide',a>2);
      if(a>2){card.setAttribute('aria-hidden','true');card.setAttribute('tabindex','-1');}
      else{card.removeAttribute('aria-hidden');card.setAttribute('tabindex','0');}
    });
    all.filter(function(card){return card.hidden;}).forEach(function(card){card.classList.remove('is-focused','is-side','is-far-slide');card.removeAttribute('aria-hidden');card.style.setProperty('--photo-opacity','0');});
    current.textContent=String(active+1).padStart(2,'0');
    total.textContent=String(n).padStart(2,'0');
    prev.disabled=n<2;next.disabled=n<2;
  }
  function scheduleRender(){if(!renderPending){renderPending=true;window.requestAnimationFrame(render);}}
  function go(delta){var n=visibleCards().length;if(n<2)return;active=modulo(active+delta,n);render();resetIdle();}
  function clearTimers(){window.clearTimeout(idleTimer);window.clearInterval(autoTimer);idleTimer=0;autoTimer=0;if(note)note.setAttribute('data-playing','false');}
  function eligible(){return !lowMotion&&sectionInView&&!document.hidden&&!modalOpen()&&!prefersReduced&&visibleCards().length>1;}
  function startAuto(){if(!eligible()){clearTimers();return;}if(autoTimer)window.clearInterval(autoTimer);autoTimer=window.setInterval(function(){if(!eligible()){clearTimers();return;}active=modulo(active+1,visibleCards().length);render();if(note)note.setAttribute('data-playing','true');},HOLD_MS);if(note)note.setAttribute('data-playing','true');}
  function resetIdle(){clearTimers();if(!eligible())return;idleTimer=window.setTimeout(function(){idleTimer=0;if(!eligible())return;startAuto();},IDLE_MS);}
  prev.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();go(-1);});
  next.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();go(1);});
  track.addEventListener('keydown',function(e){
    if(e.key==='ArrowLeft'||e.key==='ArrowUp'){e.preventDefault();go(-1);}
    else if(e.key==='ArrowRight'||e.key==='ArrowDown'){e.preventDefault();go(1);}
  });
  track.addEventListener('pointerdown',function(e){
    if(e.pointerType==='mouse'&&e.button!==0)return;
    pointerStart=e.clientX;pointerDelta=0;dragging=false;
    try{track.setPointerCapture(e.pointerId);}catch(_){ }
    resetIdle();
  },{passive:true});
  track.addEventListener('pointermove',function(e){
    if(pointerStart===null)return;
    pointerDelta=e.clientX-pointerStart;
    if(Math.abs(pointerDelta)>7){dragging=true;track.classList.add('is-dragging');}
  },{passive:true});
  function endPointer(){
    if(pointerStart===null)return;
    var dx=pointerDelta,wasDragging=dragging;
    pointerStart=null;pointerDelta=0;dragging=false;track.classList.remove('is-dragging');
    if(wasDragging&&Math.abs(dx)>42){active=modulo(active+(dx<0?1:-1),visibleCards().length);render();suppressClickUntil=Date.now()+450;resetIdle();}
  }
  track.addEventListener('pointerup',endPointer,{passive:true});
  track.addEventListener('pointercancel',function(){pointerStart=null;pointerDelta=0;dragging=false;track.classList.remove('is-dragging');},{passive:true});
  track.addEventListener('click',function(e){if(Date.now()<suppressClickUntil){e.preventDefault();e.stopImmediatePropagation();suppressClickUntil=0;}},true);
  track.addEventListener('dragstart',function(e){e.preventDefault();});
  if(tabs)tabs.addEventListener('click',function(e){if(!e.target.closest('.chip'))return;active=0;window.setTimeout(function(){render();resetIdle();},0);});
  section.addEventListener('wheel',resetIdle,{passive:true});
  section.addEventListener('keydown',resetIdle,{passive:true});
  document.addEventListener('visibilitychange',function(){if(document.hidden)clearTimers();else resetIdle();});
  document.querySelectorAll('dialog').forEach(function(d){d.addEventListener('close',resetIdle);});
  if(window.IntersectionObserver){
    var io=new IntersectionObserver(function(entries){var entry=entries[0];sectionInView=!!(entry&&entry.isIntersecting&&entry.intersectionRatio>=.15);if(sectionInView)resetIdle();else clearTimers();},{threshold:[0,.15,.3]});
    io.observe(section);
  }else{sectionInView=true;resetIdle();}
  if(window.MutationObserver){
    var mo=new MutationObserver(function(records){var directChanged=records.some(function(r){return r.target===track&&(r.addedNodes.length||r.removedNodes.length);});if(directChanged){active=modulo(active,Math.max(1,visibleCards().length));scheduleRender();} });
    mo.observe(track,{childList:true,subtree:false});
    var filterObserver=new MutationObserver(function(){active=0;scheduleRender();resetIdle();});
    filterObserver.observe(track,{attributes:true,subtree:true,attributeFilter:['hidden']});
  }
  render();
  window.addEventListener('resize',scheduleRender,{passive:true});
  if(note)note.setAttribute('data-playing','false');
})();

;
(function(){
  'use strict';
  var root=document.documentElement;
  var palette={
    amber:{bg:'#F8F5EC',bg2:'#F0E3C7',ink:'#382819',mute:'#705D4E',gold:'#B2740A',line:'rgba(56,40,25,.16)',gb:'rgba(255,255,255,.54)',gl:'rgba(125,88,35,.18)',gh:'rgba(255,255,255,.84)',gs:'rgba(56,40,25,.18)',btnInk:'#201A18',a1:'rgba(231,165,38,.22)',a2:'rgba(240,197,108,.24)',a3:'rgba(125,44,16,.10)',accent:'#FFD279',panelBg:'rgba(255,248,236,.97)',panelInk:'#281E1A',panelMuted:'#6C5B50',panelLine:'rgba(255,255,255,.78)',actionBg:'#FFF8EC',actionInk:'#7D2C10'},
    red:{bg:'#FFF4EE',bg2:'#F8D7D6',ink:'#4C1D3D',mute:'#815566',gold:'#A33757',line:'rgba(76,29,61,.16)',gb:'rgba(255,255,255,.55)',gl:'rgba(163,55,87,.18)',gh:'rgba(255,255,255,.85)',gs:'rgba(76,29,61,.18)',btnInk:'#FFFFFF',a1:'rgba(220,88,109,.20)',a2:'rgba(251,149,144,.23)',a3:'rgba(76,29,61,.13)',accent:'#FFB0B0',panelBg:'rgba(255,244,240,.97)',panelInk:'#4C1D3D',panelMuted:'#7A4C5B',panelLine:'rgba(255,255,255,.86)',actionBg:'#FFF4F0',actionInk:'#4C1D3D'},
    teal:{bg:'#E2F4F0',bg2:'#C7E8E2',ink:'#04222B',mute:'#4B6D72',gold:'#1D8B94',line:'rgba(4,34,43,.16)',gb:'rgba(255,255,255,.52)',gl:'rgba(4,34,43,.14)',gh:'rgba(255,255,255,.92)',gs:'rgba(4,34,43,.18)',btnInk:'#FFFFFF',a1:'rgba(29,139,148,.20)',a2:'rgba(79,184,180,.19)',a3:'rgba(4,61,74,.13)',accent:'#9CE6DF',panelBg:'rgba(226,244,240,.97)',panelInk:'#04222B',panelMuted:'#42646A',panelLine:'rgba(226,244,240,.9)',actionBg:'#E2F4F0',actionInk:'#04222B'},
    ocean:{bg:'#F1F7FF',bg2:'#DCEBFF',ink:'#071A4A',mute:'#50658B',gold:'#1951FC',line:'rgba(3,25,91,.15)',gb:'rgba(255,255,255,.62)',gl:'rgba(3,25,91,.13)',gh:'rgba(255,255,255,.96)',gs:'rgba(3,25,91,.18)',btnInk:'#FFFFFF',a1:'rgba(25,81,252,.16)',a2:'rgba(120,177,252,.22)',a3:'rgba(3,25,91,.12)',accent:'#CBE9FD',panelBg:'rgba(239,246,255,.97)',panelInk:'#071A4A',panelMuted:'#405887',panelLine:'rgba(203,233,253,.9)',actionBg:'#CBE9FD',actionInk:'#03195B'},
    midnight:{bg:'#080D17',bg2:'#111A2C',ink:'#F4F0E7',mute:'#A7B0BF',gold:'#D8B875',line:'rgba(224,213,188,.17)',gb:'rgba(20,29,44,.78)',gl:'rgba(219,197,145,.18)',gh:'rgba(255,255,255,.09)',gs:'rgba(0,0,0,.42)',btnInk:'#101827',a1:'rgba(216,184,117,.14)',a2:'rgba(65,91,133,.18)',a3:'rgba(103,116,150,.11)',accent:'#E8D29D',panelBg:'rgba(17,26,44,.97)',panelInk:'#F4F0E7',panelMuted:'#B7C0CD',panelLine:'rgba(216,184,117,.28)',actionBg:'#D8B875',actionInk:'#101827'},
    lavender:{bg:'#F7F3FF',bg2:'#E7DFFF',ink:'#2D2149',mute:'#6F6487',gold:'#634A9B',line:'rgba(45,33,73,.15)',gb:'rgba(255,255,255,.58)',gl:'rgba(75,55,120,.14)',gh:'rgba(255,255,255,.96)',gs:'rgba(45,33,73,.16)',btnInk:'#FFFFFF',a1:'rgba(134,103,217,.18)',a2:'rgba(190,171,246,.20)',a3:'rgba(65,46,110,.10)',accent:'#E7DFFF',panelBg:'rgba(247,243,255,.97)',panelInk:'#2D2149',panelMuted:'#665A82',panelLine:'rgba(231,223,255,.9)',actionBg:'#F7F3FF',actionInk:'#2D2149'},
    forest:{bg:'#F3F7EF',bg2:'#DCE8D5',ink:'#173B2A',mute:'#5E7565',gold:'#2F6247',line:'rgba(23,59,42,.15)',gb:'rgba(255,255,255,.60)',gl:'rgba(23,59,42,.14)',gh:'rgba(255,255,255,.95)',gs:'rgba(23,59,42,.15)',btnInk:'#FFFFFF',a1:'rgba(60,121,84,.16)',a2:'rgba(169,200,158,.22)',a3:'rgba(23,59,42,.10)',accent:'#DCE8D5',panelBg:'rgba(243,247,239,.97)',panelInk:'#173B2A',panelMuted:'#536D5A',panelLine:'rgba(220,232,213,.9)',actionBg:'#F3F7EF',actionInk:'#173B2A'}
  };
  function themeName(){var t=root.dataset.theme||'amber';if(t==='midnight'||t==='dark'||!palette[t]){root.dataset.theme='amber';try{localStorage.setItem('sb_theme','amber')}catch(e){}return 'amber';}return t;}
  function set(name,value){root.style.setProperty(name,value,'important');}
  function apply(){
    // Stop the legacy 1.6s --gold transition from making palette text look unchanged after a click.
    root.style.setProperty('transition-duration','0s','important');
    var p=palette[themeName()];
    set('--bg',p.bg);set('--bg2',p.bg2);set('--ink',p.ink);set('--mute',p.mute);set('--gold',p.gold);
    set('--line',p.line);set('--gb',p.gb);set('--gl',p.gl);set('--gh',p.gh);set('--gs',p.gs);set('--btn-ink',p.btnInk);
    set('--a1',p.a1);set('--a2',p.a2);set('--a3',p.a3);
    set('--pw-accent-text',p.accent);set('--pw-panel-bg',p.panelBg);set('--pw-panel-ink',p.panelInk);set('--pw-panel-muted',p.panelMuted);set('--pw-panel-line',p.panelLine);set('--pw-action-bg',p.actionBg);set('--pw-action-ink',p.actionInk);
    // Apply directly to key hero elements as well: legacy hard-coded rules must not defeat the chosen palette.
    function els(selector,prop,value){document.querySelectorAll(selector).forEach(function(el){el.style.setProperty(prop,value,'important');});}
    els('header.hero.hero-stage.hero-reference-grid h1 em,header.hero.hero-stage.hero-reference-grid .hero-kicker,header.hero.hero-stage.hero-reference-grid .hero-secondary','color',p.accent);
    els('header.hero.hero-stage.hero-reference-grid .hero-kicker span','background-color',p.accent);
    els('header.hero.hero-stage.hero-reference-grid .hero-profile-panel','background-color',p.panelBg);
    els('header.hero.hero-stage.hero-reference-grid .hero-profile-panel','color',p.panelInk);
    els('header.hero.hero-stage.hero-reference-grid .hero-profile-panel','border-color',p.panelLine);
    els('header.hero.hero-stage.hero-reference-grid .profile-eyebrow,header.hero.hero-stage.hero-reference-grid .profile-intro h2 em,header.hero.hero-stage.hero-reference-grid .hero-note .hero-note-kicker,header.hero.hero-stage.hero-reference-grid .hero-note h2 em','color',p.gold);
    els('header.hero.hero-stage.hero-reference-grid .profile-intro h2,header.hero.hero-stage.hero-reference-grid .hero-note h2,header.hero.hero-stage.hero-reference-grid .profile-signature b,header.hero.hero-stage.hero-reference-grid .hero-spec b,header.hero.hero-stage.hero-reference-grid .hero-spec','color',p.panelInk);
    els('header.hero.hero-stage.hero-reference-grid .profile-status,header.hero.hero-stage.hero-reference-grid .profile-intro>p:last-child,header.hero.hero-stage.hero-reference-grid .hero-note>p:last-child,header.hero.hero-stage.hero-reference-grid .profile-signature small,header.hero.hero-stage.hero-reference-grid .hero-spec small','color',p.panelMuted);
    els('header.hero.hero-stage.hero-reference-grid .hero-note,header.hero.hero-stage.hero-reference-grid .hero-spec','background-color',p.panelBg);
    els('header.hero.hero-stage.hero-reference-grid .hero-note,header.hero.hero-stage.hero-reference-grid .hero-spec','border-color',p.panelLine);
    els('header.hero.hero-stage.hero-reference-grid .hero-primary,header.hero.hero-stage.hero-reference-grid .profile-cta','background-color',p.actionBg);
    els('header.hero.hero-stage.hero-reference-grid .hero-primary,header.hero.hero-stage.hero-reference-grid .profile-cta','color',p.actionInk);
    els('#about p,#contact p,.ft,.ft p,.ft a,#packages .pk p,#faq .fq p,#reviews p','color',p.mute);
    els('#about h2,#contact h2,#packages h2,#faq h2,#reviews h2,#photos h2,#work h2','color',p.ink);
  }
  // The legacy ambience/mood script also writes --gold. Wrap it so the selected site palette wins afterwards.
  if(typeof window.sbRepaint==='function'&&!window.sbRepaint.__photowalaThemeWrapped){
    var oldRepaint=window.sbRepaint;
    var wrappedRepaint=function(){var r=oldRepaint.apply(this,arguments);apply();return r;};
    wrappedRepaint.__photowalaThemeWrapped=true;window.sbRepaint=wrappedRepaint;
  }
  if(typeof window.sbSetTheme==='function'&&!window.sbSetTheme.__photowalaThemeWrapped){
    var oldSetTheme=window.sbSetTheme;
    var wrappedSetTheme=function(){var r=oldSetTheme.apply(this,arguments);apply();return r;};
    wrappedSetTheme.__photowalaThemeWrapped=true;window.sbSetTheme=wrappedSetTheme;
  }
  var queued=false;
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;apply();});}
  if(window.MutationObserver)new MutationObserver(schedule).observe(root,{attributes:true,attributeFilter:['data-theme']});
  document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-header-theme],#theme-chips [data-theme-key]')){schedule();setTimeout(apply,80);setTimeout(apply,350);}},true);
  apply();
})();

;
(function(){
  function init(){
    var reduced=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var selectors=['header.hero','#featured-film','#work','#photos','#packages','#availability','#booking','#tools','#about','#findme','#payment','#how','#contact'];
    var nodes=[];
    selectors.forEach(function(sel){document.querySelectorAll(sel).forEach(function(el){if(!nodes.includes(el)){el.classList.add('pw-motion-reveal');nodes.push(el);}})});
    if(reduced || !('IntersectionObserver' in window) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) || (navigator.connection&&navigator.connection.saveData)){nodes.forEach(function(el){el.classList.add('pw-motion-in')});return;}
    document.body.classList.add('pw-motion-enabled');
    var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('pw-motion-in');observer.unobserve(entry.target);}})},{threshold:.07,rootMargin:'0px 0px -5% 0px'});
    nodes.forEach(function(el){observer.observe(el)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
