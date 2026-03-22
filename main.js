// main.js — Step 1: Basic functionality

// Puzzle animation
window.addEventListener('load', function () {
  var puzzleSvg = document.getElementById('puzzle-svg');
  if (puzzleSvg) {
    puzzleSvg.classList.add('assembled');
  }
});

// Scroll reveal — basic scroll event listener
window.addEventListener('scroll', function () {
  var reveals = document.querySelectorAll('.reveal');
  reveals.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('revealed');
    }
  });
});

// Run once on load in case elements are already in view
window.dispatchEvent(new Event('scroll'));

// Language toggle
function setLang(lang, btn) {
  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
}

// CTA handler
function ctaClick() {
  alert('Sign-up flow coming soon!');
}