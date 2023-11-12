const recomendedBookSlider = document.querySelector(".recomendedCardSlider");
const basketCardsContainer = document.querySelector(".basket_cards");
const specialCartContainer=document.querySelector(".specialCartContainer")
const cartItemCount=document.querySelector(".cartItemCount")

const urlRecomendedBooks = "http://localhost:3000/recomendedBooks";
const urlSpecialBooks ="http://localhost:3000/specialPrice"


//initial declaration
let booksArr = [];
if (getLocalStorage("Books")) {
    booksArr=getLocalStorage("Books")
    createCartElement()
}

let lengthLocal = getLocalStorage("Books").length;
cartItemCount.textContent = lengthLocal;


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

//Deacrease Item Count
function decreaseCount(bookId) {
    const book = bascetArr.find(x => x.id === bookId)
    if (book) {
        book.count--
      if (book.count < 0) {
        book.count = 0
      }
      setLocalStorage('Books', booksArr)
      createCartElement()
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

      let lengthLocal = getLocalStorage("Books").length;
        cartItemCount.textContent = lengthLocal;
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
         <h4><a href="">${titleS}</a></h4>
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
        if (booksArr.find((item) => item.id === id)) {
            return;
          }

          booksArr.push({
            id: id,
            image: imgageS,
            title: titleS,
            price: findDiscountedPrice(priceS,discountS),
          });

          setLocalStorage("Books", booksArr);
            createCartElement()

            let lengthLocal = getLocalStorage("Books").length;
            cartItemCount.textContent = lengthLocal;        
    })

 specialCartContainer.append(specialCard)
 
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

                let lengthLocal = getLocalStorage("Books").length;
                cartItemCount.textContent = lengthLocal;
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
getBookSpecial();