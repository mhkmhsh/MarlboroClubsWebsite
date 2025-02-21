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

  //responsive breakpoints
  breakpoints:{
    0: {
    slidesPerView:1
  },

  620: {
    slidesPerView:2
  },
  1024: {
    slidesPerView:3
  },
  }

});


//hero section
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
let refreshInterval = setInterval(() => {
    next.click();
}, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})




//CALENDAR JSON STUFF
  document.addEventListener("DOMContentLoaded", function () {
    var calendar = document.getElementById("calendar-table");
    var gridTable = document.getElementById("table-body");
    var currentDate = new Date();
    var selectedDate = currentDate;
    var selectedDayBlock = null;
  
    var eventData = {
        "year": 2025,
        "days": [
            {"date": "2025-01-01", "day": "Wednesday", "tag": "New Year's Day", "highlight": "holiday"},
            {"date": "2025-02-14", "day": "Friday", "tag": "Valentine's Day, Club Day", "highlight": "yellow"},
            {"date": "2025-02-17", "day": "Monday", "tag": "Presidents' Day", "highlight": "holiday"},
            {"date": "2025-07-04", "day": "Friday", "tag": "Independence Day", "highlight": "holiday"}
        ]
    };

    function findEvent(dateStr) {
        return eventData.days.find(event => event.date === dateStr);
    }

    function createCalendar(date) {
        var startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        var monthTitle = document.getElementById("month-name");
        monthTitle.innerHTML = date.toLocaleString("en-US", { month: "long", year: "numeric" });

        gridTable.innerHTML = "";

        var newRow = document.createElement("div");
        newRow.className = "row";
        var currentRow = gridTable.appendChild(newRow);

        for (let i = 1; i < (startDate.getDay() || 7); i++) {
            let emptyDivCol = document.createElement("div");
            emptyDivCol.className = "col empty-day";
            currentRow.appendChild(emptyDivCol);
        }

        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        for (let i = 1; i <= lastDay; i++) {
            if (currentRow.children.length >= 7) {
                currentRow = gridTable.appendChild(document.createElement("div"));
                currentRow.className = "row";
            }

            let currentDay = document.createElement("div");
            currentDay.className = "col";
            let fullDateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

            let event = findEvent(fullDateStr);
            if (event) {
                currentDay.classList.add(event.highlight || "event-day");
                currentDay.title = event.tag;
            }

            currentDay.innerHTML = i;
            currentRow.appendChild(currentDay);
        }
    }

    createCalendar(currentDate);
});
