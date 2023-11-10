const recomendedBookSlider=document.querySelector('.recomendedCardSlider')
const urlRecomendedBooks='http://localhost:3000/recomendedBooks'

//fetch data Recomended Books
async function getRecomendedBooks() {
    try {
    const response= await axios(urlRecomendedBooks)
    const data=response.data
    // console.log(data);
    createRecomendedCards(data)

    } catch (error) {
        console.log(error);
    }

}

getRecomendedBooks()

function createRecomendedCards(data) {
    data.forEach(book=> {
        const recomendedBook=document.createElement('div')
        recomendedBook.innerHTML=`
            <div class="book-card">
            <div class="img-book">
            <img
                src=${book.image}
                alt=""
            />
            </div>
            <div class="content-book">
            <h4 class="title"><a href="">${book.title}</a></h4>
            <span class="price">$${book.price}</span>
            <button 
                ><i class="fa-solid fa-cart-shopping"></i> Add To Cart</button>
            </div>
        </div>
        `
        recomendedBook.classList.add("swiper-slide")
        recomendedBookSlider.appendChild(recomendedBook)
    });

}



