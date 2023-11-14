let detailCardContainer = document.querySelector(".detail_container");
const basketCardsContainer = document.querySelector(".basket_cards");
const cartItemCount=document.querySelector(".cartItemCount")
const subtotalPrice=document.querySelector(".subtotalPrice")
//initial declaration
let booksArr = [];
if (getLocalStorage("Books")) {
  booksArr = getLocalStorage("Books");
  createCartElement()
}

//fetch data Recommended Books
async function getRecommendedBooks() {
  try {
    const response = await axios("http://localhost:3000/recomendedBooks");
    const detailProducts = response.data;
    // console.log(detailProducts);
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
      "$" + thisProduct.price;

    detailCardContainer.querySelector(".price span").textContent =
      "$" + findDiscountedPrice(thisProduct.price, thisProduct.discount);
  } else {
    detailCardContainer.querySelector(".imgbox span").style.display = "none";
    detailCardContainer.querySelector(".price del").style.display = "none";
    detailCardContainer.querySelector(".price span").textContent =
      "$" + thisProduct.price;
  }

  const increaseDetail=detailCardContainer.querySelector(".addtocart");
  const decreaseDetail=detailCardContainer.querySelector(".addtocart");
  const countDetail=detailCardContainer.querySelector(".countDetail");

  // increaseDetail.addEventListener("click",(e)=>{
  //   e.preventDefault();
  //   decreaseCount(thisProduct.id);
  // })

  // decreaseDetail.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   decreaseCount(thisProduct.id);
        
  
  // });
  // getSubtotal()

  const detailAddBtn = detailCardContainer.querySelector(".addtocart");

  detailAddBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const existingBook = booksArr.find((item) => item.id === thisProduct.id);

    if (existingBook) {
      existingBook.bookCount++;
    } else {
      booksArr.push({
        id: thisProduct.id,
        image: thisProduct.image,
        title: thisProduct.title,
        price: findDiscountedPrice(thisProduct.price, thisProduct.discount),
        bookCount: 1,
      });
    }

    // console.log(booksArr);
    setLocalStorage("Books", booksArr);
    createCartElement()
    updateCartItemCount()

  });

}

//Create Cart Elements
function createCartElement() {
  const localArr=getLocalStorage('Books')
  basketCardsContainer.innerHTML=''
  localArr.forEach(item => {
      const basketCard = document.createElement("div");
      basketCard.innerHTML = `
              <div class="basket_card_content">
                  <div class="card_img">
                      <img src=${item.image} alt="">
                  </div>
          
                  <div class="basket_book_info">
  
                      <a href="#"><h5 class="book_name">${item.title}</h5></a>
  
                      <div> <span class="cart_item_price">$${item.price}</span></div>
  
                      <div class="d-flex align-items-center">
                          <button class="pb-1 decreaseBtn">-</button>
                          <span>${item.bookCount}</span>
                          <button class="increaseBtn">+</button>
                      </div>
  
                  </div>
          
                  <div class="remove_item">
                      <i class="fa-solid fa-xmark itemRemoveBtn"></i>
                  </div>
          
              </div>
          `;
          const decreaseBtn = basketCard.querySelector('.decreaseBtn');
          const increaseBtn = basketCard.querySelector('.increaseBtn');
  
          decreaseBtn.addEventListener('click', (e) => {
              e.preventDefault();
              decreaseCount(item.id);
                  
          });
  
          increaseBtn.addEventListener('click', (e) => {
              e.preventDefault();
              increaseCount(item.id);
          });

          getSubtotal()
          const itemRemoveBtn = basketCard.querySelector('.itemRemoveBtn')
          itemRemoveBtn.addEventListener('click',(e)=>{
              e.preventDefault()
              booksArr=booksArr.filter(x=>x.id !==item.id)
              setLocalStorage('Books',booksArr)
              updateCartElements()
              // let lengthLocal = getLocalStorage("Books").length;
              // cartItemCount.textContent = lengthLocal;
          })
          basketCard.classList.add('basket_card')
          basketCardsContainer.appendChild(basketCard)
      });
  
    
}


//FIND DISCOUNTED PRICE
function findDiscountedPrice(price, discount) {
  return Math.floor((price * (100 - discount)) / 100);
}

//total count of cart items
function calculateCartItemCount() {
  const localArr = getLocalStorage('Books');
  let totalCount = 0;

  if (localArr) {
      localArr.forEach(item => {
          totalCount += item.bookCount || 0;
      });
  }
  return totalCount;
}

function updateCartItemCount() {
  const itemCount = calculateCartItemCount();
  cartItemCount.textContent = itemCount;
}


//Deacrease Item Count
function decreaseCount(bookId) {
  const book = booksArr.find(x => x.id === bookId);
  if (book) {
      book.bookCount--;
      if (book.bookCount < 0) {
          book.bookCount = 0;
      }
      setLocalStorage('Books', booksArr);
      createCartElement();
      updateCartItemCount();
  }
}

//Increase  Item Count
function increaseCount(bookId) {
  const product = booksArr.find(x => x.id === bookId);
  if (product) {
      product.bookCount++;
      setLocalStorage('Books', booksArr);
      createCartElement();
      updateCartItemCount();
  }
}

// Get subtotal
function getSubtotal() {
  let totalSum = 0;
  if (getLocalStorage('Books')) {
      const localArr = getLocalStorage('Books');
  localArr.forEach(item => {
      // console.log(item);
      totalSum += item.price * item.bookCount;
  });
  }
  

  subtotalPrice.textContent ='$'+ Math.floor(totalSum);
}

//Rate Starts
function createStars(rating) {
  let starsHTML = "";
  for (let i = 0; i < 5; i++) {
    const starClass = i < rating ? "fa-solid fa-star" : "fa-regular fa-star";
    starsHTML += `<li><i class="${starClass} star"></i></li>`;
  }
  return starsHTML;
}

//Set local Storage
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//Get local Storage
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function updateCartElements() {
  createCartElement();
  updateCartItemCount();
  getSubtotal();
}

getRecommendedBooks();
updateCartElements()