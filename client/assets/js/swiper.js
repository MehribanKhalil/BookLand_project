
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