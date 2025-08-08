// Custom Cursor
const inner = document.getElementById('cursor-inner');
const outer = document.getElementById('cursor-outer');

window.addEventListener('pointermove', e => {
  inner.style.left = `${e.clientX}px`;
  inner.style.top = `${e.clientY}px`;
  outer.style.left = `${e.clientX}px`;
  outer.style.top = `${e.clientY}px`;
});

// Scale effect on hover Custom Cursor
document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    outer.style.transform = 'translate(-50%, -50%) scale(2)';
    
    outer.style.background = 'rgba(255,255,255,0.2)';
  });
  el.addEventListener('mouseleave', () => {
    outer.style.transform = 'translate(-50%, -50%) scale(1)';
    outer.style.background = 'transparent';
  });
});
let lastX = 0, lastY = 0, timeout;
window.addEventListener('pointermove', e => {
  if (!timeout) {
    timeout = setTimeout(() => {
      timeout = null;
      outer.style.left = `${e.clientX}px`;
      outer.style.top = `${e.clientY}px`;
    }, 50);
  }
});
// Mobile Menu Toggle
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
// Magnetic Cursor Effect
 const magneticBtns = document.querySelectorAll(".magnetic-btn");

  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });
  // Back to Top Button
  const backToTopButton = document.getElementById('backToTop');
  window.addEventListener("scroll", ()=>{
    if(window.scrollY > 300){
      backToTopButton.classList.toggle('hidden');
    }
  })
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

