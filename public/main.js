'use strict';

window.addEventListener('load', () => {
});

(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}());

function setLang(lang, btn) {
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
}

function ctaClick() {
  const existing = document.getElementById('cta-modal');
  if (existing) return;

  const overlay = document.createElement('div');
  overlay.id = 'cta-modal';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.2s ease;
  `;

  overlay.innerHTML = `
    <div style="
      background: #1A1E26;
      border: 1px solid #23272F;
      border-radius: 16px;
      padding: 40px 48px;
      max-width: 380px;
      width: 90%;
      text-align: center;
      transform: translateY(16px);
      transition: transform 0.25s ease;
      font-family: 'DM Sans', sans-serif;
    ">
      <div style="
        width: 48px;
        height: 48px;
        background: rgba(75,134,255,0.12);
        border: 1px solid rgba(75,134,255,0.25);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        font-size: 22px;
      ">🧩</div>
      <h3 style="
        font-family: 'Fraunces', serif;
        font-size: 24px;
        font-weight: 700;
        color: #F2F4FB;
        margin-bottom: 10px;
        letter-spacing: -0.5px;
      ">Coming soon</h3>
      <p style="
        color: #7A8099;
        font-size: 14px;
        font-weight: 300;
        line-height: 1.7;
        margin-bottom: 28px;
      ">GermanGenie is on its way. Check back soon to start learning German grammar, one piece at a time.</p>
      <button onclick="closeCtaModal()" style="
        background: #4B86FF;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 12px 28px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      ">Got it</button>
    </div>
  `;

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    overlay.querySelector('div').style.transform = 'translateY(0)';
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCtaModal();
  });

  document.addEventListener('keydown', handleEsc);
}

function handleEsc(e) {
  if (e.key === 'Escape') closeCtaModal();
}

function closeCtaModal() {
  const overlay = document.getElementById('cta-modal');
  if (!overlay) return;

  overlay.style.opacity = '0';
  overlay.querySelector('div').style.transform = 'translateY(16px)';

  setTimeout(() => {
    overlay.remove();
    document.removeEventListener('keydown', handleEsc);
  }, 220);
}

(function initCarousel() {
  const track    = document.getElementById('carouselTrack');
  const dots     = document.querySelectorAll('.carousel-dot');
  const hint     = document.getElementById('swipeHint');
  const peekPrev = document.getElementById('peekPrev');
  const peekNext = document.getElementById('peekNext');
  const total    = 3;
  let current    = 0;
  let startX     = 0;
  let interacted = false;
  let animating  = false;

  const slides = [
    'images/app-screen-exercise.webp',
    'images/app-screen-feedback.webp',
    'images/app-screen-puzzle.webp'
  ];

  const animatePeek = (peekEl, newSrc) => {
    if (!peekEl) return;
    const img = peekEl.querySelector('img');
    if (img.src.includes(newSrc)) return;

    peekEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    peekEl.style.opacity = '0';
    peekEl.style.transform = 'translateY(-50%) scale(0.75)';

    setTimeout(() => {
      img.src = newSrc;
      peekEl.style.opacity = '0.3';
      peekEl.style.transform = 'translateY(-50%) scale(0.85)';
    }, 200);
  };

  const updatePeek = index => {
    animatePeek(peekPrev, slides[(index - 1 + total) % total]);
    animatePeek(peekNext, slides[(index + 1) % total]);
  };

  const goTo = index => {
    if (animating) return;
    animating = true;

    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    updatePeek(current);

    setTimeout(() => { animating = false; }, 420);

    if (!interacted && hint) {
      interacted = true;
      hint.classList.add('hidden');
    }
  };

  window.carouselMove = dir => goTo(current + dir);
  window.carouselGo   = i   => goTo(i);

  const carousel = document.getElementById('appCarousel');
  if (carousel) {
    carousel.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
    }, { passive: true });
  }

  setInterval(() => { if (!interacted) goTo(current + 1); }, 4000);

  updatePeek(0);
}());