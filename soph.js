$(document).ready(function () {
  // --------- Responsive Navbar Active Animation ---------
  function updateNavbarSelector() {
      const activeItem = $('#navbarSupportedContent .active');
      if (activeItem.length) {
          const { top, left } = activeItem.position();
          $(".hori-selector").css({
              top: `${top}px`,
              left: `${left}px`,
              height: `${activeItem.innerHeight()}px`,
              width: `${activeItem.innerWidth()}px`
          });
      }
  }
  setTimeout(updateNavbarSelector);

  $(window).on('resize', () => setTimeout(updateNavbarSelector, 500));

  $(".navbar-toggler").click(() => {
      $(".navbar-collapse").slideToggle(300);
      setTimeout(updateNavbarSelector);
  });

  // --------- Add Active Class on Page Load ---------
  const path = window.location.pathname.split("/").pop() || 'index.html';
  const target = $(`#navbarSupportedContent ul li a[href='${path}']`).parent();
  target.addClass('active');

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
      autoplay: { delay: 3000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: { 0: { slidesPerView: 1 }, 620: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
  });

  // --------- Modal Gallery Carousel ---------
  let activeSlide = 1;
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.carousel .item');
  const itemCount = items.length;

  function updateModalSlider() {
      items.forEach(item => item.classList.remove('active', 'other_1', 'other_2'));
      
      const other_1 = (activeSlide - 1 + itemCount) % itemCount;
      const other_2 = (activeSlide + 1) % itemCount;

      items[activeSlide].classList.add('active');
      items[other_1].classList.add('other_1');
      items[other_2].classList.add('other_2');

      clearInterval(autoPlay);
      autoPlay = setInterval(nextSlide, 5000);
  }

  function nextSlide() {
      activeSlide = (activeSlide + 1) % itemCount;
      updateModalSlider();
  }
  function prevSlide() {
      activeSlide = (activeSlide - 1 + itemCount) % itemCount;
      updateModalSlider();
  }

  document.getElementById('next').addEventListener('click', nextSlide);
  document.getElementById('prev').addEventListener('click', prevSlide);

  let autoPlay = setInterval(nextSlide, 5000);
});
