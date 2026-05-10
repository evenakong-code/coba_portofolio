
/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── MOBILE MENU ── */
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click',()=>{
  menuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-menu a').forEach(a=>{
  a.addEventListener('click',()=>{
    menuBtn.classList.remove('open');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

/* ── CURSOR GLOW ── */
const glow = document.getElementById('cursorGlow');
let mx=0,my=0,cx=0,cy=0;
window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function animCursor(){
  cx += (mx-cx)*.1; cy += (my-cy)*.1;
  glow.style.transform=`translate(${cx-150}px,${cy-150}px)`;
  requestAnimationFrame(animCursor);
})();

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold:.1});
revealEls.forEach(el=>ro.observe(el));

/* ── HERO TITLE STAGGER ── */
document.querySelectorAll('.hero-title').forEach(h=>{
  const words = h.innerHTML.split('<br>');
  h.innerHTML = words.map((w,i)=>
    `<span style="display:block;overflow:hidden;">
       <span style="display:block;animation:hero-word .8s ${.1+i*.15}s var(--ease) both">${w}</span>
     </span>`
  ).join('');
});

/* Inject hero word keyframe */
const style = document.createElement('style');
style.textContent=`
  @keyframes hero-word {
    from{transform:translateY(105%);opacity:0;}
    to{transform:translateY(0);opacity:1;}
  }
`;
document.head.appendChild(style);
