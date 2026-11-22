(function(){
var sweep=document.createElement('div');sweep.id='sweep';document.body.appendChild(sweep);
document.querySelectorAll('a[href]').forEach(function(a){
var href=a.getAttribute('href');
if(!href||href.charAt(0)==='#'||href.indexOf('mailto:')===0||href.indexOf('http')===0&&href.indexOf(location.host)===-1&&href.indexOf('swagat27.github.io')===-1)return;
if(href.indexOf('mail.google.com')===0)return;
a.addEventListener('click',function(e){
if(e.metaKey||e.ctrlKey||e.shiftKey)return;
e.preventDefault();sweep.classList.add('go');
setTimeout(function(){location.href=href},480);
});
});
var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.12});
document.querySelectorAll('.io').forEach(function(el){io.observe(el)});
})();
