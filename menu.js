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




//CALENDAR JSON STUFFdocument.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("DOMContentLoaded", function () {
    async function loadCalendar() {
        try {
            const response = await fetch("calendar.json");
            const data = await response.json(); // Contains { year: 2025, days: [...] }
  
            const calendar = document.getElementById("calendar");
            const header = document.getElementById("calendar-header");
            const date = new Date();
            const currentMonth = date.getMonth();
            const currentYear = date.getFullYear();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
            header.textContent = `${monthNames[currentMonth]} ${currentYear}`;
            calendar.innerHTML = "";
  
            // Create day headers (Sun - Sat)
            dayNames.forEach(day => {
                const dayHeader = document.createElement("div");
                dayHeader.classList.add("day-header");
                dayHeader.textContent = day;
                calendar.appendChild(dayHeader);
            });
  
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            for (let i = 0; i < firstDay; i++) {
                const emptyDiv = document.createElement("div");
                emptyDiv.classList.add("day", "empty");
                calendar.appendChild(emptyDiv);
            }
  
            // Loop through days in the month
            for (let i = 1; i <= daysInMonth; i++) {
                const dayDiv = document.createElement("div");
                dayDiv.classList.add("day");
                dayDiv.textContent = i;
  
                // Find events for the current day
                const matchingEvents = data.days.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate.getDate() === i && eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
                });
  
                // Apply styles based on event type
                matchingEvents.forEach(event => {
                    const eventDiv = document.createElement("div");
                    eventDiv.classList.add("event");
                    eventDiv.textContent = event.tag;
                    
                    // Apply color based on highlight type
                    if (event.highlight === "yellow") {
                        eventDiv.style.backgroundColor = "#ffeb3b"; // Club Days
                        eventDiv.style.color = "#000";
                    } else if (event.highlight === "holiday") {
                        eventDiv.style.backgroundColor = "#ff7043"; // Holidays
                        eventDiv.style.color = "#fff";
                        eventDiv.style.fontWeight = "bold";
                    } else if (event.highlight === "special") {
                        eventDiv.style.backgroundColor = "#4caf50"; // Special Days
                        eventDiv.style.color = "#fff";
                        eventDiv.style.fontWeight = "bold";
                    } else {
                        eventDiv.style.backgroundColor = "#ccc"; // Default style
                    }
  
                    eventDiv.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.3)";
                    dayDiv.appendChild(eventDiv);
                });
  
                calendar.appendChild(dayDiv);
            }
        } catch (error) {
            console.error("Error loading calendar data:", error);
        }
    }
  
    loadCalendar();
  });
  