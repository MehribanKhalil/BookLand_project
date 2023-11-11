//navbar categroy dropdown
const btn = document.querySelector(".btn")
const category = document.querySelector(".category")

btn.addEventListener("click", function (e) {
    e.preventDefault()
    e.stopPropagation()
    category.classList.toggle("categoryActive")
})

window.addEventListener("click", function () {
    if (category.classList.contains("categoryActive")) {
        category.classList.remove("categoryActive")
    }
})



const btnmenu = document.querySelector(".btnmenu")

btnmenu.onclick = function () {
    btnmenu.classList.toggle("animation")
}

//navbar modal

let btnMenu = document.querySelector(".btnmenu")
let leftMdal = document.querySelector(".leftmodal")

btnMenu.addEventListener("click", function () {
    leftMdal.classList.toggle("modalactive")
})

//navbar accordion
let home = document.querySelector(".home")
let subModalHome = document.querySelector(".subhome")
let homeActive = document.querySelector(".home-active")
let homeDeactive = document.querySelector(".home-deactive")

home.addEventListener("click", function (e) {
    e.preventDefault()

    //for remove pages
    if (subPages.classList.contains("subpagesactive")) {
        subPages.classList.remove("subpagesactive")
    }
    if (pagesDeactive.classList.contains("displayNone")) {
        pagesDeactive.classList.remove("displayNone")
    }
    if (pagesActive.classList.contains("displayFlex")) {
        pagesActive.classList.remove("displayFlex")
    }
    //for remove shop
    if (subShop.classList.contains("subshopactive")) {
        subShop.classList.remove("subshopactive")
    }
    if (shopDeactive.classList.contains("displayNone")) {
        shopDeactive.classList.remove("displayNone")
    }
    if (shopActive.classList.contains("displayFlex")) {
        shopActive.classList.remove("displayFlex")
    }

    //for remove blog
    if (subBlog.classList.contains("subblogactive")) {
        subBlog.classList.remove("subblogactive")
    }
    if (blogDeactive.classList.contains("displayNone")) {
        blogDeactive.classList.remove("displayNone")
    }
    if (blogActive.classList.contains("displayFlex")) {
        blogActive.classList.remove("displayFlex")
    }

    subModalHome.classList.toggle("subhomeactive")
    homeDeactive.classList.toggle("displayFlex")
    homeActive.classList.toggle("displayNone")
})

let subPages = document.querySelector(".subpages")
let pages = document.querySelector(".pages")
let pagesDeactive = document.querySelector(".pages-active")
let pagesActive = document.querySelector(".pages-deactive")

pages.addEventListener("click", function (e) {
    e.preventDefault()
    //for remove home
    if (subModalHome.classList.contains("subhomeactive")) {
        subModalHome.classList.remove("subhomeactive")
    }
    if (homeDeactive.classList.contains("displayNone")) {
        homeDeactive.classList.remove("displayNone")
    }
    if (homeActive.classList.contains("displayFlex")) {
        homeActive.classList.remove("displayFlex")
    }
    //for remove shop
    if (subShop.classList.contains("subshopactive")) {
        subShop.classList.remove("subshopactive")
    }
    if (shopDeactive.classList.contains("displayNone")) {
        shopDeactive.classList.remove("displayNone")
    }
    if (shopActive.classList.contains("displayFlex")) {
        shopActive.classList.remove("displayFlex")
    }

    //for remove blog
    if (subBlog.classList.contains("subblogactive")) {
        subBlog.classList.remove("subblogactive")
    }
    if (blogDeactive.classList.contains("displayNone")) {
        blogDeactive.classList.remove("displayNone")
    }
    if (blogActive.classList.contains("displayFlex")) {
        blogActive.classList.remove("displayFlex")
    }

    pagesDeactive.classList.toggle("displayNone")
    pagesActive.classList.toggle("displayFlex")
    subPages.classList.toggle("subpagesactive")
})


let subShop = document.querySelector(".subshop")
let shop = document.querySelector(".shop")
let shopDeactive = document.querySelector(".shop-active")
let shopActive = document.querySelector(".shop-deactive")

shop.addEventListener("click", function (e) {
    e.preventDefault()

    //for remove home
    if (subModalHome.classList.contains("subhomeactive")) {
        subModalHome.classList.remove("subhomeactive")
    }
    if (homeDeactive.classList.contains("displayNone")) {
        homeDeactive.classList.remove("displayNone")
    }
    if (homeActive.classList.contains("displayFlex")) {
        homeActive.classList.remove("displayFlex")
    }
    //for remove pages
    if (subPages.classList.contains("subpagesactive")) {
        subPages.classList.remove("subpagesactive")
    }
    if (pagesDeactive.classList.contains("displayNone")) {
        pagesDeactive.classList.remove("displayNone")
    }
    if (pagesActive.classList.contains("displayFlex")) {
        pagesActive.classList.remove("displayFlex")
    }

    //for remove blog
    if (subBlog.classList.contains("subblogactive")) {
        subBlog.classList.remove("subblogactive")
    }
    if (blogDeactive.classList.contains("displayNone")) {
        blogDeactive.classList.remove("displayNone")
    }
    if (blogActive.classList.contains("displayFlex")) {
        blogActive.classList.remove("displayFlex")
    }

    shopDeactive.classList.toggle("displayNone")
    shopActive.classList.toggle("displayFlex")
    subShop.classList.toggle("subshopactive")
})


let subBlog = document.querySelector(".subblog")
let blog = document.querySelector(".blog")
let blogDeactive = document.querySelector(".blog-active")
let blogActive = document.querySelector(".blog-deactive")

blog.addEventListener("click", function (e) {
    e.preventDefault()
    //for remove home
    if (subModalHome.classList.contains("subhomeactive")) {
        subModalHome.classList.remove("subhomeactive")
    }
    if (homeDeactive.classList.contains("displayNone")) {
        homeDeactive.classList.remove("displayNone")
    }
    if (homeActive.classList.contains("displayFlex")) {
        homeActive.classList.remove("displayFlex")
    }
    //for remove pages
    if (subPages.classList.contains("subpagesactive")) {
        subPages.classList.remove("subpagesactive")
    }
    if (pagesDeactive.classList.contains("displayNone")) {
        pagesDeactive.classList.remove("displayNone")
    }
    if (pagesActive.classList.contains("displayFlex")) {
        pagesActive.classList.remove("displayFlex")
    }

    //for remove shop
    if (subShop.classList.contains("subshopactive")) {
        subShop.classList.remove("subshopactive")
    }
    if (shopDeactive.classList.contains("displayNone")) {
        shopDeactive.classList.remove("displayNone")
    }
    if (shopActive.classList.contains("displayFlex")) {
        shopActive.classList.remove("displayFlex")
    }

    blogDeactive.classList.toggle("displayNone")
    blogActive.classList.toggle("displayFlex")
    subBlog.classList.toggle("subblogactive")
})


//basket modal
const shoppingCart = document.querySelector(".shopping-cart")
const basket = document.querySelector(".basket")

shoppingCart.addEventListener("click", function (e) {
    e.preventDefault()
    basket.classList.toggle("basketactive")
})


// navin scroll etdikde gelmesi
let navScroll = document.querySelector(".nav-scroll")
navScroll.style.overflow = "hidden"

window.onscroll = function () {
    scrollFunction()
    backFunction()
};
function scrollFunction() {
    if (window.scrollY < 150) {
        navScroll.style.height = "0px"
        navScroll.style.top = "-80px"
        navScroll.style.overflow = "hidden"

    }
    else {
        navScroll.style.height = "80px"
        navScroll.style.top = "0px"
        navScroll.style.background = "#fff"
        navScroll.style.overflow = "visible"

    }
};

// // back scroll etdikde top sehifeye getmek ucun
const back = document.querySelector(".back")
back.style.transition = "0.5s"

function backFunction() {
    if (window.scrollY < 500) {
        back.style.opacity = "0";
    }
    else {
        back.style.opacity = "1";
    }
}


//swiper

var swiper = new Swiper(".saleBookSwiper", {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});