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
  detailCardContainer.querySelector(".category a").textContent = thisProduct.janr;
  detailCardContainer.querySelector(".description").textContent = thisProduct.description;

}

getRecommendedBooks();
