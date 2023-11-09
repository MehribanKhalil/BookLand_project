// js counter
const counterContainer = document.getElementById("counter");
const counters = document.querySelectorAll(".counter_count");

let isActive = false;


function handleScroll() {
    if (
        scrollY > counterContainer.offsetTop - counterContainer.offsetHeight &&
        isActive === false
      ) {
        counters.forEach((counter) => {
          counter.textContent = 0;
          let count = 0;
    
          function increaseCount() {
            const target = parseInt(counter.getAttribute("data"));
    
            if (target > count) {
              count++;
              counter.textContent = count;
              setTimeout(increaseCount, 10);
            } else {
              counter.textContent = target;
            }
          }
    
          increaseCount();
          isActive = true;
        });

        window.removeEventListener("scroll", handleScroll);
    
      } else if (
        scrollY < counterContainer.offsetTop - counterContainer.offsetHeight ||
        (scrollY === 0 && isActive === true)
      ) {
        counters.forEach((counter) => {
          counter.textContent = 0;
        });
        isActive = false;
      }
}

window.addEventListener('scroll',handleScroll)


// // js counter
const experienceCounter=document.querySelector('.experience_counter')

//initial declaration
let countNum=0

const interval =setInterval(() => {
    countNum+=1;
    experienceCounter.textContent=countNum
    const target = parseInt(experienceCounter.getAttribute('countData'))
    //stop counter when count=50
    if (countNum===target) {
        clearInterval(interval)
    }
}, 100);

   
