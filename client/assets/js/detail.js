let detailCardContainer = document.querySelector(".detail_container");



//fetch data Recommended Books
async function getRecommendedBooks() {
  try {
    const response = await axios("http://localhost:3000/recomendedBooks");
    const detailProducts = response.data;
    console.log(detailProducts);
    showDetail(detailProducts);
  } catch (error) {
    console.log("Error: ", error);
  }
}
 



function showDetail(detailProducts) {
  let detailCardContainer = document.querySelector(".detail_container");
  let productId = new URLSearchParams(window.location.search).get("id");

  let thisProduct = detailProducts.find((value) => {
    return value.id == productId;
  });

  if (!thisProduct) {
    window.location.href = "/";
  }

  detailCardContainer.querySelector(".imgbox img").src = thisProduct.image;

  detailCardContainer.querySelector(".textbox h2").textContent =
    thisProduct.title;
  detailCardContainer.querySelector(".category a").textContent =
    thisProduct.janr;
  detailCardContainer.querySelector(".description").textContent =
    thisProduct.description;
  if (thisProduct.discount > 0) {
    detailCardContainer.querySelector(".imgbox span").textContent =
      thisProduct.discount + "%";
    detailCardContainer.querySelector(".price del").textContent =
      "%" + thisProduct.price;

    detailCardContainer.querySelector(".price span").textContent =
      "$" + findDiscountedPrice(thisProduct.price, thisProduct.discount);
  } else {
    detailCardContainer.querySelector(".imgbox span").style.display = "none";
    detailCardContainer.querySelector(".price del").style.display = "none";
    detailCardContainer.querySelector(".price span").textContent =
      "$" + thisProduct.price;
  }
}


//FIND DISCOUNTED PRICE
function findDiscountedPrice(price, discount) {
  return Math.floor((price * (100 - discount)) / 100);
}

//Rate Starts
function createStars(rating) {
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
        const starClass = i < rating ? 'fa-solid fa-star' : 'fa-regular fa-star';
        starsHTML += `<li><i class="${starClass} star"></i></li>`;
    }
    return starsHTML;
  }


getRecommendedBooks();