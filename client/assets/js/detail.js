//deatils buttons
const descriptionBtn = document.querySelector(".description")
const reviewsBtn = document.querySelector(".reviews")

const descriptionSection = document.getElementById("description")
const reviewsSection = document.getElementById("reviews")

const descriptionLine = document.querySelector(".description-line")
const reviewsLine = document.querySelector(".review-line")

reviewsSection.style.display = "none"

descriptionLine.classList.add("width")

descriptionBtn.addEventListener("click",function (p) {
    p.preventDefault()
    descriptionSection.style.display = "flex"
    reviewsSection.style.display = "none"

    descriptionLine.classList.add("width")
    
    if (reviewsLine.classList.contains("width")) {
        reviewsLine.classList.remove("width")
    }

})
reviewsBtn.addEventListener("click",function (p) {
    p.preventDefault()

    descriptionSection.style.display = "none"
    reviewsSection.style.display = "flex"

    reviewsLine.classList.add("width")

    if (descriptionLine.classList.contains("width")) {
        descriptionLine.classList.remove("width")
    }
})