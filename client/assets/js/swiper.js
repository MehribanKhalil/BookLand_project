
var swiper = new Swiper(".companies", {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    pagination: {
      clickable: true,
    },
    autoplay: {
    delay: 2500,
    disableOnInteraction: false,
      },
    loopedSlides: 4,
    breakpoints: {
      300: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
});


var swiper = new Swiper(".recomendedCard", {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true,
    pagination: {
      clickable: true,
    },
    autoplay: {
    delay: 2500,
    disableOnInteraction: false,
      },
    loopedSlides: 5,
    breakpoints: {
      300: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 30,
      }
    },
});

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
 
});

// special price js swiper
var swiper = new Swiper(".specialSwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    }
  },
});