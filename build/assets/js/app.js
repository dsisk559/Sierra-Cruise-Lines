// Select DOM Items
var menuBtn = document.querySelector(".menu-btn");
var menu = document.querySelector(".menu");
var menuNav = document.querySelector(".menu-nav");
var navItems = document.querySelectorAll(".nav-item");

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  menuBtn.classList.toggle("close");
  menu.classList.toggle("show");
  menuNav.classList.toggle("show");
  for (var i; i < navItems.length; i++) {
    navItems[i].classList.toggle('show');
  }
}

var prev = document.getElementById('prev'),
  next = document.getElementById('next'),
  wrap = document.getElementById('wrapper'),
  pages = document.getElementById('pages'),
  slides = document.getElementsByClassName('review');

var slidesPerPage = 2,
  moveUnit = 997,
  page = 0


window.addEventListener("resize", winSize);
prev.addEventListener("click", prevSlide);
next.addEventListener("click", nextSlide);


winSize();
createPageDots();
changePrevStatus();
changeNextStatus();

function winSize() {
  if (window.matchMedia("(max-width: 515px)").matches) {
    moveUnit = 250;
    slidesPerPage = 1;
    page = 0
    changePage();
  } else if (window.matchMedia("(max-width: 940px)").matches) {
    moveUnit = 429;
    slidesPerPage = 1;
    page = 0
    changePage();
  } else if (window.matchMedia("(max-width: 941px)").matches) {
    slidesPerPage = 2;
    page = 0
    changePage();

  } else if (window.matchMedia("(max-width: 1020px)").matches) {
    moveUnit = 840;
    slidesPerPage = 2;
    page = 0
    changePage();
  } else {
    slidesPerPage = 2;
  }
  createPageDots();
}

function createPageDots() {
  var numOfPages = slides.length / slidesPerPage;

  while (pages.lastChild) {
    pages.removeChild(pages.lastChild);
  }

  for (var i = 0; i < numOfPages; i++) {
    if (i == page) {
      var dot = document.createElement('div');
      dot.classList.add('page');
      dot.classList.add('current');
      pages.appendChild(dot);
    } else {
      var dot = document.createElement('div');
      dot.classList.add('page');
      pages.appendChild(dot);
    }
  }
}

function changePrevStatus() {
  if (page == 0) {
    prev.style.opacity = 0.5;
    prev.removeEventListener('click', prevSlide);
  } else if (page == 1) {
    prev.style.opacity = 1;
    prev.addEventListener('click', prevSlide)
  }
}

function changeNextStatus() {
  if (page == ((slides.length / slidesPerPage) - 2)) {
    next.style.opacity = 1;
    next.addEventListener('click', nextSlide);
  } else if (page == ((slides.length / slidesPerPage) - 1)) {
    next.style.opacity = .5;
    next.removeEventListener('click', nextSlide);
  }
}

function prevSlide() {
  page--
  if (page == 0) {
    changePrevStatus();
  }
  if (page == ((slides.length / slidesPerPage) - 2)) {
    changeNextStatus();
  }
  changePage();
}

function nextSlide() {
  page++
  if (page == 1) {
    changePrevStatus();
  }

  if (page == slides.length / slidesPerPage - 1) {
    changeNextStatus();
  }
  changePage();
};

function changePage() {
  var dots = document.getElementsByClassName('page');
  for (var i = 0; i < dots.length; i++) {
    if (i == page) {
      dots[i].classList.add('current');
    } else {
      if (dots[i].classList.contains('current')) {
        dots[i].classList.remove('current');
      }
    }
  }
  wrap.style.transform = 'translateX(-' + page * moveUnit + 'px)';
}