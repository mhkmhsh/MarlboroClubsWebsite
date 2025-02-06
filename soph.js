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

  //hero section
  const carousel = document.querySelector('#carouselExample');
  const captions = [
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Tellus mauris faucibus varius dictumst neque augue mus? Volutpat mattis nam vehicula adipiscing cursus conubia maximus varius ac',
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Tellus mauris faucibus varius dictumst neque augue mus? Volutpat mattis nam vehicula adipiscing cursus conubia maximus varius ac',
      'Lorem ipsum odor amet, consectetuer adipiscing elit. Tellus mauris faucibus varius dictumst neque augue mus? Volutpat mattis nam vehicula adipiscing cursus conubia maximus varius ac'
  ];
  
  carousel.addEventListener('slide.bs.carousel', function (event) {
      const index = event.to;
      const caption = document.querySelectorAll('.carousel-caption')[index];
  
      // Fade out all captions
      document.querySelectorAll('.carousel-caption').forEach((caption) => {
          caption.style.opacity = 0;
      });
  
      
      setTimeout(() => {
          caption.style.opacity = 1;
      }, 300); 
  });

  
  