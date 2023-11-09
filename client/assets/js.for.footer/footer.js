
const openAccordion=document.querySelector('.btn-footer-collapse')
const categoryAccordion=document.querySelector('.category-accordion')

openAccordion.addEventListener('click',(e)=>{
    e.preventDefault()
    openAccordion.classList.toggle("minusBtn") 
    categoryAccordion.classList.toggle("active")
})

