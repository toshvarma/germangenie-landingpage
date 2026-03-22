'use strict';

window.addEventListener('load', function () {
  const puzzleSvg = document.getElementById('puzzle-svg');
  if (puzzleSvg) {
    puzzleSvg.classList.add('assembled');
  }
  revealInView();
});

function revealInView() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealInView);

function setLang(lang, btn) {
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
}

function ctaClick() {
  alert('Sign-up flow coming soon!');
}

(function () {
  const track     = document.getElementById('carouselTrack');
  const dots      = document.querySelectorAll('.carousel-dot');
  const hint      = document.getElementById('swipeHint');
  const peekPrev  = document.getElementById('peekPrev');
  const peekNext  = document.getElementById('peekNext');
  const total     = 3;
  let current     = 0;
  let startX      = 0;
  let interacted  = false;
  let animating   = false;

  const slides = [
    'images/app-screen-exercise.webp',
    'images/app-screen-feedback.webp',
    'images/app-screen-puzzle.webp'
  ];

  function animatePeek(peekEl, newSrc) {
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
  }

  function updatePeek(index) {
    const prevIndex = (index - 1 + total) % total;
    const nextIndex = (index + 1) % total;
    animatePeek(peekPrev, slides[prevIndex]);
    animatePeek(peekNext, slides[nextIndex]);
  }

  function goTo(index) {
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
  }

  window.carouselMove = (dir) => goTo(current + dir);
  window.carouselGo   = (i)   => goTo(i);

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

  setInterval(() => {
    if (!interacted) goTo(current + 1);
  }, 4000);

  updatePeek(0);
}());