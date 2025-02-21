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
//multi_step_form//

$(document).ready(function() {
    var current_fs, next_fs, previous_fs; // Fieldsets
    var animating; // Flag to prevent multiple clicks

    // Show next fieldset when "Next" button is clicked
    $(".next").click(function() {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent(); // Current fieldset
        next_fs = $(this).parent().next(); // Next fieldset

        if (next_fs.length) {
            // Activate next step on progress bar
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            // Show next fieldset
            next_fs.show();

            // Animate the transition between fieldsets
            current_fs.animate({ opacity: 0 }, {
                step: function(now, mx) {
                    var scale = 1 - (1 - now) * 0.2; // Scale down the current fieldset
                    var left = (now * 50) + "%"; // Move the next fieldset in from the right
                    var opacity = 1 - now; // Fade out the current fieldset
                    current_fs.css({'transform': 'scale(' + scale + ')', 'position': 'absolute'});
                    next_fs.css({'left': left, 'opacity': opacity});
                },
                duration: 800,
                complete: function() {
                    current_fs.hide(); // Hide current fieldset
                    animating = false; // Allow further clicks
                    next_fs.css({'position': 'relative', 'left': '0', 'opacity': '1'}); // Reset position and opacity
                },
                easing: 'easeInOutBack' // Smooth transition
            });
        }
    });

    // Show previous fieldset when "Previous" button is clicked
    $(".previous").click(function() {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent(); // Current fieldset
        previous_fs = $(this).parent().prev(); // Previous fieldset

        if (previous_fs.length) {
            // Deactivate current step on progress bar
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

            // Show previous fieldset
            previous_fs.show();

            // Animate the transition between fieldsets
            current_fs.animate({ opacity: 0 }, {
                step: function(now, mx) {
                    var scale = 0.8 + (1 - now) * 0.2; // Scale previous fieldset up
                    var left = ((1 - now) * 50) + "%"; // Move current fieldset out to the right
                    var opacity = 1 - now; // Fade current fieldset
                    current_fs.css({'left': left});
                    previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
                },
                duration: 800,
                complete: function() {
                    current_fs.hide(); // Hide current fieldset
                    animating = false; // Allow further clicks
                    previous_fs.css({'position': 'relative', 'left': '0', 'opacity': '1'}); // Reset position and opacity
                },
                easing: 'easeInOutBack' // Smooth transition
            });
        }
    });

    // Prevent form submission for now and show alert (for demo purposes)
    $(".submit").click(function() {
        alert("Form Submitted!");
        return false; // Prevent form from actually submitting for now
    });
});

//Multi_step_form//


