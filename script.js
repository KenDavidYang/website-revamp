document.addEventListener('DOMContentLoaded', function () {
  setupMenu();
  setupTitleSwash();
  setupMarqueeLightbox();
  setupListingForm();
  setupContactForm();
  setupCookieBanner();
});

// menu
function setupMenu() {
  var toggleBtn = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { navLinks.classList.remove('open'); });
  });
}

// underline draw-in on scroll
function setupTitleSwash() {
  var swashes = document.querySelectorAll('.title-swash');
  if (!swashes.length || !('IntersectionObserver' in window)) {
    swashes.forEach(function (s) { s.classList.add('drawn'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('drawn');
    });
  }, { threshold: 0.4 });
  swashes.forEach(function (s) { observer.observe(s); });
}

// carousel
function setupMarqueeLightbox() {
  var track = document.getElementById('marqueeTrack');
  if (!track) return;

  var uniqueImages = Array.prototype.slice.call(track.querySelectorAll('img[data-original]'));
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var current = 0;

  function open(index) {
    current = index;
    lightboxImg.src = uniqueImages[current].src;
    lightbox.classList.add('show');
  }
  function close() { lightbox.classList.remove('show'); }
  function show(delta) {
    current = (current + delta + uniqueImages.length) % uniqueImages.length;
    lightboxImg.src = uniqueImages[current].src;
  }

  track.querySelectorAll('img').forEach(function (img, i) {
    img.addEventListener('click', function () { open(i % uniqueImages.length); });
  });

  document.getElementById('lightboxClose').addEventListener('click', close);
  document.getElementById('lightboxPrev').addEventListener('click', function () { show(-1); });
  document.getElementById('lightboxNext').addEventListener('click', function () { show(1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(-1);
    if (e.key === 'ArrowRight') show(1);
  });
}

// dummy listing
function setupListingForm() {
  var form = document.getElementById('listingForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var result = document.getElementById('listingResult');
    result.textContent = 'Thanks! Call (206) 919-6886 and Marci will send matching homes directly.';
    result.classList.add('show');
  });
}

// email
function setupContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('cfName').value.trim();
    var email = document.getElementById('cfEmail').value.trim();
    var message = document.getElementById('cfMessage').value.trim();
    var result = document.getElementById('contactResult');

    if (!email || !message) {
      result.textContent = 'Please fill in your email and a short message.';
      result.classList.add('show');
      return;
    }

    var subject = encodeURIComponent('Website inquiry from ' + (name || 'a visitor'));
    var body = encodeURIComponent(message + '\n\n- ' + name + ' (' + email + ')');
    window.location.href = 'mailto:info@marcimetzger.com?subject=' + subject + '&body=' + body;

    result.textContent = 'Thanks! Your email app should open with the message ready to send.';
    result.classList.add('show');
    form.reset();
  });
}

// cookie banner
function setupCookieBanner() {
  var banner = document.getElementById('cookieBanner');
  var acceptBtn = document.getElementById('cookieAccept');
  if (!banner || !acceptBtn) return;

  if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(function () { banner.classList.add('show'); }, 800);
  }
  acceptBtn.addEventListener('click', function () {
    localStorage.setItem('cookiesAccepted', 'true');
    banner.classList.remove('show');
  });
}
