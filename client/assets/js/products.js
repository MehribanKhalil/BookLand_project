const recomendedBookSlider = document.querySelector(".recomendedCardSlider");
const basketCardsContainer = document.querySelector(".basket_cards");
const urlRecomendedBooks = "http://localhost:3000/recomendedBooks";

//initial declaration
let booksArr = [];
if (getLocalStorage("Books")) {
    booksArr=getLocalStorage("Books")
    // createCartElement()
}

//fetch data Recomended Books
async function getRecomendedBooks() {
  try {
    const response = await axios(urlRecomendedBooks);
    const data = response.data;
    //   console.log(data);
    createRecomendedCards(data);
  } catch (error) {
    console.log("Error: ", error);
  }
}

//CREATE RECOMMENDED CARDS
function createRecomendedCards(data) {
  data.forEach((book) => {
    const recomendedBook = document.createElement("div");
    recomendedBook.innerHTML = `
              <div class="book-card">
              <div class="img-book">
              <img
                  src=${book.image}
                  alt=""
              />
              </div>
              <div class="content-book">
              <h4 class="title"><a href="">${book.title}</a></h4>
              <div>
                  <span class="discountedPrice">$${findDiscountedPrice(
                    book.price,
                    book.discount
                  )}</span>
                  <span class="price">$${book.price}</span>
  
              </div>
              <div>
                   <button class='addBtn'><i class="fa-solid fa-cart-shopping"></i> Add To Cart</button>
              </div>
              </div>
             
          </div>
          `;

    const currentPrice = recomendedBook.querySelector(".discountedPrice");
    const orginalPrice = recomendedBook.querySelector(".price");
    const addBtn = recomendedBook.querySelector(".addBtn");

    if (book.discount > 0) {
      currentPrice.classList.add("currentPrice");
      orginalPrice.classList.add("prewPrice");
    } else {
      currentPrice.style.display = "none";
      orginalPrice.classList.add("currentPrice");
    }

    //add to cart
    addBtn.addEventListener("click", () => {
      //if the item is already in the array then return
      if (booksArr.find((x) => x.id === book.id)) {
        return;
      }

      booksArr.push({
        id: book.id,
        image: book.image,
        title: book.title,
        price: findDiscountedPrice(book.price, book.discount),
      });

      setLocalStorage("Books", booksArr);
       createCartElement()
      //   console.log(booksArr);
    });

    recomendedBook.classList.add("swiper-slide");
    recomendedBookSlider.appendChild(recomendedBook);
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
    
                        <div> <span>${item.price}</span></div>
    
                        <div class="d-flex align-items-center">
                            <button class="pb-1">-</button>
                            <span>0</span>
                            <button>+</button>
                        </div>
    
                    </div>
            
                    <div class="remove_item">
                        <i class="fa-solid fa-xmark itemRemoveBtn"></i>
                    </div>
            
                </div>
            `;
    
            const itemRemoveBtn = basketCard.querySelector('.itemRemoveBtn')
            itemRemoveBtn.addEventListener('click',(e)=>{
                e.preventDefault()
                booksArr=booksArr.filter(x=>x.id !==item.id)
                setLocalStorage('Books',booksArr)
                createCartElement()
            })
            basketCard.classList.add('basket_card')
            basketCardsContainer.appendChild(basketCard)
        });
    
      
    }


//FIND DISCOUNTED PRICE
function findDiscountedPrice(price, discount) {
  return Math.floor((price * (100 - discount)) / 100);
}

//Set local Storage
function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

//Get local Storage
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

getRecomendedBooks();
