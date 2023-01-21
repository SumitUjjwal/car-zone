

let baseUrl = 'http://localhost:8080'

let cartArr = JSON.parse(localStorage.getItem('cartItems')) || [];

let api = `${baseUrl}/product?q=`;
let searchVal = localStorage.getItem('searchVal') || null;
searchVal && fetchBySearch(searchVal)
async function fetchBySearch(val) {
    let toBesearch = api + val;
    let req = await fetch(toBesearch);
    let res = await req.json();
    renderData(res, val);

}
let product = document.querySelector(".right_section");

// ---------------------------------------------------------------
// console.log(seachValueFromHome)
// let cartArr = JSON.parse(localStorage.getItem('cartItems')) || [];
// fetchBySearch(seachValueFromHome)

// let api = "http://localhost:8080/product/";

// async function getProduct() {
//     await fetch("http://localhost:8080/product")
//         .then((res) => res.json())
//         .then((data) => {
//             console.log(data)
//             renderData(data)
//         })
// }

// getProduct()

// let product = document.querySelector(".right_section");

//-----------------------------------------------------------------------------------------------

function renderData(data) {
       product.innerHTML = data.map(item => {

              return `
        <div class="item_container">
            <div class="product_image">
                <img src="${item.img_src}" alt="">
            </div>
            <div class="product_details">
                <h4>
                    ${item.title}
                </h4>
                <div class="product_model_details">
                    <p>Model: <span>${item.model}</span></p>
                    <p>SKU: <span>${item['sku']}</span></p>
                </div>

                <div class="product_rating">
                    <div>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <span>(${item.reviews})</span>
                </div>
                <h5>${item.fulfillment}</h5>
                <div class="product_pickup_details">
                    <i class="fa-solid fa-truck-fast"></i>
                    <div>
                        <p>Pickup: <span>Ready in ${item.id} hour at Aiea</span></p>
                        <span>See all pickup location</span>
                    </div>
                </div>
                <div class="product_pickup_details">
                    <i class="fa-solid fa-store"></i>
                    <div id="shipping">
                        <p>This item is only available in certain markets.</p>
                        <span>Estimates for 96939</span>
                    </div>
                </div>
                <div class="product_checkbox">
                    <div>
                        <input type="checkbox" id="compare" name="compare" value="">
                        <label for="compare"> Compare</label><br>
                    </div>
                    <div>
                        <i class="fa-regular fa-bookmark"></i>
                        <span>Save</span>
                    </div>
                </div>
             </div>
            <div class="product_payment">
                <h1>$<span>${item.price}</span></h1>
                <div class="product_price_save">
                    <span>Save $${((item.prevPrice - item.price).toFixed(2))}</span>
                    <span>Was $${item.prevPrice}</span>
                </div>
                <h6>Free 6 months of warranty</h6>
                <span>$${(item.price/10).toFixed(2)} value</span>
                <button id="${item._id}"> <span><i class="fa-solid fa-cart-shopping"></i> </span> Add to Cart</button>
            </div>
        </div>
        `
       }).join("")
       let btnArr = document.querySelectorAll('.product_payment>button')
       btnArr.forEach(btn => {
              btn.addEventListener('click', (e) => {
                     e.target.innerText = 'Added in Cart';
                     cartArr.push(e.target.id)
                     localStorage.setItem('cartItem', JSON.stringify(cartArr))
              })
       });
}



// search functionality

let search = document.getElementById('searchBar');
let searchTerm = "";
search.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        localStorage.setItem('searchVal', searchTerm);
        console.log(searchTerm);
        // window.location.href = "./html/products.list.html";
        window.location.reload();
    }
    else {
        searchTerm += event.key;
    }

})

// sorting by price ascending
async function sort_asc() {
    await fetch(`${baseUrl}/product?q=${searchVal}&sort=asc`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            renderData(data)
        })
}

// sorting by price descending
async function sort_desc() {
    await fetch(`${baseUrl}/product?q=${searchVal}&sort=desc`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            renderData(data)
        })
}

// sorting by rating
async function sort_cr() {
    await fetch(`${baseUrl}/product?q=${searchVal}&sort=cr`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            renderData(data)
        })
}