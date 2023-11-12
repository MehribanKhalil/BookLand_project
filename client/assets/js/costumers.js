const customersSay=document.querySelector(".customersSay")
const urlCustomers = "http://localhost:3000/customers";

function creatCards(
  imageCust,
  custReview,
  customerName,
  custoerPosition,
  bookRating
) {
  const customerCard = document.createElement("div");

  customerCard.innerHTML = `
    <div class="swipper-container">
                <div class="customers-review row">
                  <div class="customers-img col-lg-4 col-md-3 col-6">
                    <img
                      src="${imageCust}"
                      alt=""
                    />
                  </div>
                  <div class="customers-info col-lg-8 col-md-9 col-12">
                    <p class="info">
                    ${custReview}
                    </p>
                    <div class="details">
                      <i class="fa-solid fa-quote-right"></i>
                      <div class="customers-name-position">
                        <h5 class="namer">${customerName}</h5>
                        <span class="possition"
                          >${custoerPosition}
                        </span>
                      </div>
                      <div class="raiting">
                        <ul class="raiting-star">
                          ${createStars(bookRating)}
                        </ul>
                        <span class="rate">${bookRating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
            customerCard.classList.add("swiper-slide");
            customersSay.append(customerCard)
}

function initializeSwiper() {
    var swiper = new Swiper(".specialSwiper", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
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
        },
      },
    });
  }
  

function getBooks() {
  axios
    .get(urlCustomers)
    .then((x) => {
      x.data.forEach((element) => {
        creatCards(
          element.image,
          element.review,
          element.name,
          element.position,
          element.rating
        );
      });
      initializeSwiper();
    //   console.log(x.data);
    })
    .catch((err) => console.log(err));
}

//Starts
function createStars(rating) {
  let starsHTML = '';
  for (let i = 0; i < 5; i++) {
      const starClass = i < rating ? 'fa-solid fa-star' : 'fa-regular fa-star';
      starsHTML += `<li><i class="${starClass} star"></i></li>`;
  }
  return starsHTML;
}



getBooks();
