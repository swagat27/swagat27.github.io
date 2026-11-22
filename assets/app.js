(function(){
var theme=localStorage.getItem('sb-theme');if(theme&&theme!=='classic')document.documentElement.setAttribute('data-theme',theme);
/* loader: types (hello on fresh load */
if(!sessionStorage.getItem('sb-loaded')){
var L=document.createElement('div');L.id='loader';document.body.appendChild(L);
var word='(hello',i=0;sessionStorage.setItem('sb-loaded','1');
var t=setInterval(function(){i++;L.textContent=word.slice(0,i);if(i>=word.length){clearInterval(t);setTimeout(function(){L.classList.add('done');setTimeout(function(){L.remove()},500)},260)}},85);
}else{var L2=document.createElement('div');L2.id='loader';L2.className='done';document.body.appendChild(L2);setTimeout(function(){L2.remove()},60)}
/* sound: on by default, WebAudio soft blips after first gesture */
var AC=null,soundOn=localStorage.getItem('sb-sound')!=='off';
var btn=document.createElement('button');btn.id='soundBtn';btn.type='button';btn.setAttribute('aria-label','Toggle sound');
function drawBtn(){btn.innerHTML=soundOn?'&#128266;':'&#128263;';btn.classList.toggle('off',!soundOn)}
drawBtn();document.body.appendChild(btn);
function ac(){if(!AC){try{AC=new (window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function blip(f){if(!soundOn||!ac())return;var o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f||520;g.gain.setValueAtTime(.06,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+.11);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+.12)}
btn.addEventListener('click',function(){soundOn=!soundOn;localStorage.setItem('sb-sound',soundOn?'on':'off');drawBtn();blip(700)});
document.addEventListener('pointerdown',function(){ac()}, {once:true});
document.querySelectorAll('a,button').forEach(function(el){el.addEventListener('click',function(){blip(460+Math.random()*160)})});
window.sbBlip=blip;
/* scroll reveals */
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.1,rootMargin:'0px 0px 120px 0px'});
document.querySelectorAll('.io').forEach(function(el){io.observe(el)});
/* theme dots */
document.querySelectorAll('.themes i').forEach(function(d){d.addEventListener('click',function(){
var t=d.getAttribute('data-t');document.querySelectorAll('.themes i').forEach(function(x){x.classList.remove('on')});d.classList.add('on');
if(t==='classic'){document.documentElement.removeAttribute('data-theme')}else{document.documentElement.setAttribute('data-theme',t)}
localStorage.setItem('sb-theme',t);blip(620)})});
})();
