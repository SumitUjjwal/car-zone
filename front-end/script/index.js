

// carousel
let slideIndex = 0;
showSlides();

function showSlides() {
       let i;
       let slides = document.getElementsByClassName("mySlides");
       for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";
       }
       slideIndex++;
       if (slideIndex > slides.length) { slideIndex = 1 }
       slides[slideIndex - 1].style.display = "block";
       setTimeout(showSlides, 4000);
}

// top-bottom carousel
//-------- Bottom carousel ----------
let leftBtn = document.querySelector('.bottom_carousel_prev_button');
let rightBtn = document.querySelector('.bottom_carousel_next_button');
let track = document.querySelector('.bottom_carousel_cards_track')
let card = document.querySelector('.bottom_carousel_card')
let cardWidth = card.getBoundingClientRect().width;
let slideIndexNext = 1;
let slideIndexPrev = 1;
function moveForward() {

       let moveVal = cardWidth * slideIndexNext;
       if (slideIndexNext >= 4) {
              moveVal = 0;
              slideIndexNext = 1;
       }
       track.style.transform = `translateX(-${moveVal}px)`
       slideIndexNext++;
}

rightBtn.addEventListener('click', (e) => {
       moveForward()
})

function moveBackward() {
       let moveVal = cardWidth * slideIndexPrev;
       if (slideIndexNext <= slideIndexPrev) {
              moveVal = 0;
       }
       track.style.transform = `translateX(${moveVal}px)`
       slideIndexPrev++;
}

leftBtn.addEventListener('click', (e) => {
       moveBackward()
})


// search functionality

let search = document.getElementById('searchBar');
let searchTerm = "";
search.addEventListener('keypress', (event) => {
       if (event.key === "Enter") {
              event.preventDefault();
              localStorage.setItem('searchVal', searchTerm);
              console.log(searchTerm);
              window.location.href = "./html/products.list.html";
       }
       else {
              searchTerm += event.key;
       }
})