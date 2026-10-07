// Add dynamic year and UI interactions
document.addEventListener('DOMContentLoaded',()=>{
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  // Reveal on scroll
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Parallax-like blob movement based on pointer
  const blobs=document.querySelectorAll('.gradient-blob');
  window.addEventListener('pointermove',e=>{
    const x=(e.clientX/window.innerWidth)-0.5;
    const y=(e.clientY/window.innerHeight)-0.5;
    blobs.forEach((b,i)=>{
      const depth=(i+1)*6;
      b.style.transform=`translate3d(${x*depth}px,${y*depth}px,0) scale(${1 + i*0.02})`;
    });
  });

  // Small floating tilt for cards on mousemove
  const floatables=document.querySelectorAll('[data-float]');
  document.addEventListener('mousemove',e=>{
    const cx=window.innerWidth/2, cy=window.innerHeight/2;
    floatables.forEach(el=>{
      const rX=(e.clientY-cy)/cy; const rY=(e.clientX-cx)/cx;
      el.style.transform=`rotateX(${rX*3}deg) rotateY(${rY*3}deg)`;
    });
  });

  // Testimonials slider
  const testimonials=document.querySelectorAll('.testimonial');
  let tIndex=0; let tTimer=null;
  const showTest=(idx)=>{
    testimonials.forEach(t=>t.classList.remove('active'));
    const cur=testimonials[idx]; if(cur) cur.classList.add('active');
    tIndex=idx;
  };
  const nextTest=()=> showTest((tIndex+1)%testimonials.length);
  const prevTest=()=> showTest((tIndex-1+testimonials.length)%testimonials.length);
  document.querySelectorAll('.t-nav.next').forEach(b=>b.addEventListener('click',()=>{ resetTimer(); nextTest(); }));
  document.querySelectorAll('.t-nav.prev').forEach(b=>b.addEventListener('click',()=>{ resetTimer(); prevTest(); }));
  const startTimer=()=>{ tTimer=setInterval(nextTest,5000); };
  const resetTimer=()=>{ clearInterval(tTimer); startTimer(); };
  if(testimonials.length) { showTest(0); startTimer(); }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item=btn.closest('.faq-item');
      if(!item) return;
      const open=item.classList.toggle('open');
      if(open){ item.querySelector('.faq-a').style.maxHeight = item.querySelector('.faq-a').scrollHeight + 'px'; }
      else { item.querySelector('.faq-a').style.maxHeight = null; }
    });
  });

  // Newsletter form - small interaction
  const nf=document.querySelector('.newsletter-form');
  if(nf) nf.addEventListener('submit',(e)=>{ e.preventDefault(); alert('Thanks — check your email for confirmation.'); nf.reset(); });
});
