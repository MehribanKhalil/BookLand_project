const recomendedBookSlider = document.querySelector(".recomendedCardSlider");
const basketCardsContainer = document.querySelector(".basket_cards");
const specialCartContainer=document.querySelector(".specialCartContainer")
const cartItemCount=document.querySelector(".cartItemCount")
const subtotalPrice=document.querySelector(".subtotalPrice")
const saleCardsContainer=document.querySelector(".saleCardsContainer")

const urlRecomendedBooks = "http://localhost:3000/recomendedBooks";
const urlSpecialBooks ="http://localhost:3000/specialPrice"
const urlSaleBooks="http://localhost:3000/saleBooks"

//initial declaration
let booksArr = [];
if (getLocalStorage("Books")) {
    booksArr=getLocalStorage("Books")
    createCartElement()
}

// if (getLocalStorage("Books")) {
//     let lengthLocal = getLocalStorage("Books").length;
// cartItemCount.textContent = lengthLocal;
// }

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
  
//fetch data Special Books
  function getBookSpecial() {
      axios
        .get(urlSpecialBooks)
        .then((x) => {
          x.data.forEach((special) => {
              creatSpecialCards(special.id,special.image,special.title,special.janr,special.description,special.discount,special.price);
          });
        })
        .catch((err) => console.log(err));
}  

//fetch data Sale Books
function getSaleBooks() {
    axios
      .get(urlSaleBooks)
      .then((x) => {
        x.data.forEach((element) => {
            createSaleCards(element.id,element.image,element.title,element.janr,element.rating,element.price,element.discount);
        });
        console.log(x.data);
      })
      .catch((err) => console.log(err));
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
              <h4 class="title"><a href='/client/details.html?id=${book.id}'>${book.title}</a></h4>
              <div>
                  <span class="discountedPrice">$${findDiscountedPrice(
                    book.price,
                    book.discount
                  )}</span>
                  <span class="price">$${book.price}</span>
  
              </div>
              <div>
                   <button class='addBtn'><a><i class="fa-solid fa-cart-shopping"></i> Add To Cart</a></button>
              </div>
              </div>
             
          </div>
          `;

        //   console.log(recomendedBook.querySelector(".title"));

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
      const existingBook = booksArr.find((x) => x.id === book.id);
        if (existingBook) {
            existingBook.bookCount++;
        } else {
            booksArr.push({
                id: book.id,
                image: book.image,
                title: book.title,
                price: findDiscountedPrice(book.price, book.discount),
                bookCount:1,
            });
        }
        // console.log(booksArr);
      setLocalStorage("Books", booksArr);
       createCartElement()

       updateCartItemCount()


    });

    recomendedBook.classList.add("swiper-slide");
    recomendedBookSlider.appendChild(recomendedBook);
  });
}


// CREATE SPECIAL CARDS
function creatSpecialCards(id,imgageS,titleS,janrS,descriptionS,discountS,priceS) {
    const specialCard=document.createElement("div")
 
    specialCard.classList.add("swiper-slide")
    
    specialCard.innerHTML=`
 
 
   <div class="swiper-container">
     <div class="special-book-card">
       <div class="spesial-img">
         <img
           src="${imgageS}"
           alt=""
         />
       </div>
       <div class="special-info">
         <h4><a href='/client/details.html?id=${id}'>${titleS}</a></h4>
         <div class="special-category">
           <a href="">${janrS}</a>
         </div>
         <p>
         ${descriptionS}
         </p>
         <div class="book-card-footer">
           <a class="add-to-card specialAddBtn" href=""
             ><i class="fa-solid fa-cart-shopping"></i> Add To
             Cart</a
           >
           <div class="price-details">
             <span>$${findDiscountedPrice(priceS,discountS)}</span> <del>$${priceS}</del>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
 
 `
    const specialAddBtn=specialCard.querySelector(".specialAddBtn")
    specialAddBtn.addEventListener("click",(e)=>{
        e.preventDefault()

        const existingBook = booksArr.find((item) => item.id ===id);
        if (existingBook) {
            existingBook.bookCount++;
        } else {
            booksArr.push({
                id: id,
                image: imgageS,
                title: titleS,
                price: findDiscountedPrice(priceS,discountS),
                bookCount:1
              });
        }

          setLocalStorage("Books", booksArr);
          createCartElement()            
          updateCartItemCount()
           
    })

 specialCartContainer.append(specialCard)
 
}

// CREATE SALE CARDS
function createSaleCards(id, imageSale, titleSale, janrSale, ratingSale, priceSale, discountSale) {
    const saleCardSlide = document.createElement("div");
    saleCardSlide.classList.add("swiper-slide");
    saleCardSlide.innerHTML = `
        <div class="sale_card">
            <div class="imgbox">
                <img src="${imageSale}" alt="" />
            </div>
            <h5><a href='/client/details.html?id=${id}'>${titleSale}</a></h5>
            <ul>
                <li>
                    <a href="">${janrSale}</a>
                </li>
            </ul>
            <div class="rate-price">
                <div class="rate">
                    <i class="fa-solid fa-star"></i>
                    <span class="rating">${ratingSale}</span>
                </div>
                <div class="price">
                    <del>$${priceSale}</del>
                    <span class="pricing">$${discountSale}</span>
                </div>
            </div>
        </div>
    `;
    saleCardsContainer.append(saleCardSlide);
}



//Create Cart Elements
function createCartElement() {
    const localArr=getLocalStorage('Books')
    // console.log(localArr);
    basketCardsContainer.innerHTML=''
    localArr.forEach(item => {
        const basketCard = document.createElement("div");
        // console.log(item.count);
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
                // createCartElement()
                // updateCartItemCount();
                // getSubtotal()
                updateCartElements()
                let lengthLocal = getLocalStorage("Books").length;
                cartItemCount.textContent = lengthLocal;
            })
            basketCard.classList.add('basket_card')
            basketCardsContainer.appendChild(basketCard)
        });
    
      
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
        // console.log(booksArr);
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
        // console.log(setLocalStorage('Books', booksArr));
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

function updateCartElements() {
    createCartElement();
    updateCartItemCount();
    getSubtotal();
}

getRecomendedBooks();
getBookSpecial();
getSaleBooks(); 
updateCartElements()