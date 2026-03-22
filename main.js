


window.addEventListener('load', function () {


  var puzzleSvg = document.getElementById('puzzle-svg');
  if (puzzleSvg) {
    puzzleSvg.classList.add('assembled');
  }

  revealInView();
});


function revealInView() {
  var reveals = document.querySelectorAll('.reveal');
  reveals.forEach(function (el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealInView);


function setLang(lang, btn) {
  document.querySelectorAll('.lang-btn').forEach(function (b) {
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
  var track      = document.getElementById('carouselTrack');
  var dots       = document.querySelectorAll('.carousel-dot');
  var hint       = document.getElementById('swipeHint');
  var peekPrev   = document.getElementById('peekPrev');
  var peekNext   = document.getElementById('peekNext');
  var total      = 3;
  var current    = 0;
  var startX     = 0;
  var interacted = false;

  var slides = [
    'images/app-screen-exercise.webp',
    'images/app-screen-feedback.webp',
    'images/app-screen-puzzle.webp'
  ];

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';

    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });

    if (peekPrev) peekPrev.querySelector('img').src = slides[(current - 1 + total) % total];
    if (peekNext) peekNext.querySelector('img').src = slides[(current + 1) % total];

    if (!interacted && hint) {
      interacted = true;
      hint.classList.add('hidden');
    }
  }

  window.carouselMove = function (dir) { goTo(current + dir); };
  window.carouselGo   = function (i)   { goTo(i); };

  var carousel = document.getElementById('appCarousel');
  if (carousel) {
    carousel.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
    }, { passive: true });
  }

  var timer = setInterval(function () {
    if (!interacted) goTo(current + 1);
  }, 4000);
}());