
// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//        showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//        showSlides(slideIndex = n);
// }

// function showSlides(n) {
//        let i;
//        let slides = document.getElementsByClassName("mySlides");
//        let dots = document.getElementsByClassName("dot");
//        if (n > slides.length) { slideIndex = 1 }
//        if (n < 1) { slideIndex = slides.length }
//        for (i = 0; i < slides.length; i++) {
//               slides[i].style.display = "none";
//        }
//        for (i = 0; i < dots.length; i++) {
//               dots[i].className = dots[i].className.replace(" active", "");
//        }
//        slides[slideIndex - 1].style.display = "block";
//        dots[slideIndex - 1].className += " active";
// }

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
       setTimeout(showSlides, 5000);
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
