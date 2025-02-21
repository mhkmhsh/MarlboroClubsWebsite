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


$(document).ready(function(){
    var current_fs, next_fs, previous_fs; // fieldsets
    var left, opacity, scale; // fieldset properties which we will animate
    var animating; // flag to prevent quick multi-click glitches

    // Show next fieldset
    $(".next").click(function(){
        if(animating) return false;
        animating = true;
        
        current_fs = $(this).parent();
        next_fs = $(this).parent().next();
        
        // Activate the next step on progress bar
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        
        // Show next fieldset
        next_fs.show(); 
        
        // Hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                // As the opacity of current_fs reduces to 0 - stored in "now"
                // 1. Scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                // 2. Bring next_fs from the right(50%)
                left = (now * 50) + "%";
                // 3. Increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'transform': 'scale('+scale+')', 'position': 'absolute'});
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide();
                animating = false;
            },
            easing: 'easeInOutBack'
        });
    });

    // Show previous fieldset
    $(".previous").click(function(){
        if(animating) return false;
        animating = true;
        
        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
        
        // Deactivate the current step on progress bar
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
        
        // Show previous fieldset
        previous_fs.show();
        
        // Hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                // As the opacity of current_fs reduces to 0 - stored in "now"
                // 1. Scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                // 2. Take current_fs to the right(50%) - from 0%
                left = ((1 - now) * 50) + "%";
                // 3. Increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'left': left});
                previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide();
                animating = false;
            },
            easing: 'easeInOutBack'
        });
    });

    // Submit button functionality (for demo purposes)
    $(".submit").click(function(){
        alert("Form Submitted!");
        return false; // Prevent form submission for now
    });
});


//Multi_step_form//


