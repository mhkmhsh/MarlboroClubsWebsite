// ---------Responsive-navbar-active-animation-----------
function test() {
  var tabsNewAnim = $('#navbarSupportedContent');
  var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
  var activeItemNewAnim = tabsNewAnim.find('.active');
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    "top": itemPosNewAnimTop.top + "px",
    "left": itemPosNewAnimLeft.left + "px",
    "height": activeWidthNewAnimHeight + "px",
    "width": activeWidthNewAnimWidth + "px"
  });

  $("#navbarSupportedContent").on("click", "li", function (e) {
    $('#navbarSupportedContent ul li').removeClass("active");
    $(this).addClass('active');
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      "top": itemPosNewAnimTop.top + "px",
      "left": itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
  });
}

$(document).ready(function () {
  setTimeout(function () { test(); });
});

$(window).on('resize', function () {
  setTimeout(function () { test(); }, 500);
});

$(".navbar-toggler").click(function () {
  $(".navbar-collapse").slideToggle(300);
  setTimeout(function () { test(); });
});

// --------------add active class-on another-page move----------
jQuery(document).ready(function ($) {
  var path = window.location.pathname.split("/").pop();

  if (path == '') {
    path = 'index.html';
  }

  var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
  target.parent().addClass('active');
});

$(window).scroll(function () {
  var scrollTop = $(window).scrollTop();
  $(".menu").css("transform", "translate(-50%, calc(-50% + " + scrollTop / 3 + "px))");
});

// Image carousel functionality
var images = [{
  src: 'IMG/PORTDAY.png',
  alt: 'portfolio day',
  animation: {
    translateY: [-50, 0],
    scale: [1.2, 1]
  }
}, {
  src: 'img/SENNIGHT.png',
  alt: 'senior night',
  animation: {
    translateX: [-50, 0],
    scale: [1.2, 1]
  }
}, {
  src: 'img/TRIP.png',
  alt: 'field trip',
  animation: {
    translateX: [50, 0],
    scale: [1.2, 1]
  }
}];

function animate(n) {
  var img;
  var imageData = images[n];
  var imgs = document.querySelectorAll('.carousel-img');

  // Find if the image already exists in the carousel
  if (imgs) {
    img = [].slice.apply(imgs).filter(function (img) {
      return img.src == imageData.src;
    })[0];
  }

  // If image doesn't exist, create it
  if (!img) {
    img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.classList.add('carousel-img');  // Make sure it has the class
  }

  img.style.display = 'block';
  img.style.opacity = 0; // Initial opacity for fade-in effect

  document.querySelector('.carousel').appendChild(img); // Append the image to the carousel container

  var next = true;

  // Fade-in and animate the image
  Velocity(img, {
    opacity: [1, 0], // Fade effect
  }, {
    duration: 2000
  });

  // Handle the image's position and animation
  Velocity(img, imageData.animation, {
    queue: false,
    duration: 7000,
    progress: function (elements, complete) {
      // Transition to the next image when animation completes
      if (complete > 0.8 && next) {
        var nextN = (n === images.length - 1) ? 0 : (n + 1);
        animate(nextN);
        next = false;
      }
    }
  });
}

// Start animation with the first image
animate(0);
// CAR SWIPER STUFF FROM THEIR JS FILE
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 30,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1
    },
    620: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});

