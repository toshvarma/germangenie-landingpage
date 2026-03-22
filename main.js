


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