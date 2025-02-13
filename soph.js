// --------- Responsive Navbar Active Animation ---------
function updateNavbarSelector() {
  const activeItem = $('#navbarSupportedContent').find('.active');
  const itemHeight = activeItem.innerHeight();
  const itemWidth = activeItem.innerWidth();
  const itemPosition = activeItem.position();

  $(".hori-selector").css({
    "top": `${itemPosition.top}px`,
    "left": `${itemPosition.left}px`,
    "height": `${itemHeight}px`,
    "width": `${itemWidth}px`
  });
}

$(document).ready(function () {
  setTimeout(updateNavbarSelector);
});

// Update active item position on window resize
$(window).on('resize', function () {
  setTimeout(updateNavbarSelector, 500);
});

// Toggle navbar collapse on mobile
$(".navbar-toggler").click(function () {
  $(".navbar-collapse").slideToggle(300);
  setTimeout(updateNavbarSelector);
});

// --------- Add Active Class on Page Load ---------
$(document).ready(function () {
  const path = window.location.pathname.split("/").pop() || 'index.html';
  const target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
  target.parent().addClass('active');
});

// --------- Scroll Animation for Menu ---------
$(window).scroll(function () {
  const scrollTop = $(window).scrollTop();
  $(".menu").css("transform", `translate(-50%, calc(-50% + ${scrollTop / 3}px))`);
});

// --------- Swiper Carousel ---------
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,
  autoplay: {
    delay: 3000,  // 3 seconds
    disableOnInteraction: false, // Keep autoplay running even after user interaction
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    620: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

// --------- Modal Gallery ---------
let activeSlide = 1;
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel .item');
const itemCount = items.length;

function updateModalSlider() {
  // Reset previous active items and transitions
  const itemOldActive = document.querySelector('.carousel .item.active');
  if (itemOldActive) itemOldActive.classList.remove('active');
  
  const itemOldOther_1 = document.querySelector('.carousel .item.other_1');
  if (itemOldOther_1) itemOldOther_1.classList.remove('other_1');
  
  const itemOldOther_2 = document.querySelector('.carousel .item.other_2');
  if (itemOldOther_2) itemOldOther_2.classList.remove('other_2');
  
  // Set new active items
  const other_1 = activeSlide - 1 < 0 ? itemCount - 1 : activeSlide - 1;
  const other_2 = activeSlide + 1 >= itemCount ? 0 : activeSlide + 1;

  items[activeSlide].classList.add('active');
  items[other_1].classList.add('other_1');
  items[other_2].classList.add('other_2');

  // Reset image animations
  items.forEach(item => {
    const img = item.querySelector('.image img');
    const caption = item.querySelector('.image figcaption');
    img.style.animation = 'none';
    caption.style.animation = 'none';
    void item.offsetWidth;  // Trigger reflow
    img.style.animation = '';
    caption.style.animation = '';
  });

  // Reset autoplay after each manual change
  clearInterval(autoPlay);
  autoPlay = setInterval(nextSlide, 5000);
}

// Next slide
function nextSlide() {
  carousel.classList.remove('prev');
  carousel.classList.add('next');
  activeSlide = (activeSlide + 1) % itemCount;
  updateModalSlider();
}

// Previous slide
function prevSlide() {
  carousel.classList.remove('next');
  carousel.classList.add('prev');
  activeSlide = activeSlide - 1 < 0 ? itemCount - 1 : activeSlide - 1;
  updateModalSlider();
}

// Set up event listeners for next/prev buttons
document.getElementById('next').onclick = nextSlide;
document.getElementById('prev').onclick = prevSlide;

// Autoplay every 5 seconds
let autoPlay = setInterval(nextSlide, 5000);


