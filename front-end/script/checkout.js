let baseUrl = "https://vast-rose-jellyfish-wrap.cyclic.app"
let img_src = sessionStorage.getItem("img_src");
let title = sessionStorage.getItem("title");

let item_details = document.getElementById("item_details");
let right_item_details = document.getElementById("right_item_details");
let right_checkout_price = document.getElementById("right_checkout_price");
let address_subm_btn = document.getElementById("address_subm");
let form = document.getElementById("add_form");
let saving = document.getElementById("saving");

let user_address = document.getElementById("userAddress");

// render products

async function cardItems(id) {
       let category = localStorage.getItem("searchVal");
       let request = await fetch(`${baseUrl}/product?_id=${id}`);
       let data = await request.json();
       return data;

}

let LSid = JSON.parse(localStorage.getItem('cartItem')) || [];

renderCards()
let lsPrice = 0;
function getAsCard(item) {
       console.log(item)
       console.log(item[0].img_src)

       let obj = {};


       let items = document.createElement('div');
       items.setAttribute("class", "items");
       items.setAttribute("id", "item_details");

       // 1st
       let item_detail = document.createElement('div');
       item_detail.setAttribute("class", "item_detail");

       let item_detail_image = document.createElement('img');
       item_detail_image.setAttribute("class", "item_detail_image");
       item_detail_image.src = item[0].img_src;

       let item_detail_title = document.createElement('p');
       item_detail_title.setAttribute("class", "item_detail_title");
       item_detail_title.innerText = item[0].title;

       item_detail.append(item_detail_image, item_detail_title);

       // 4th
       let item_price = document.createElement('div');
       item_price.setAttribute("class", "item_price");
       item_price.innerText = `$${item[0].price}`;
       lsPrice += item[0].price;



       items.append(item_detail, item_price)
       return items;

}
let itemArr = [];
async function renderCards() {
       let render_div = document.getElementById("render_cards");

       await LSid.forEach(id => {
              cardItems(id).then(data => {
                     render_div.append(getAsCard(data))
                     localStorage.setItem("combPrice", lsPrice)
              })
       })

}



// -----------------------------------------------------------------

// calculating price

let combPrice = JSON.parse(localStorage.getItem('combPrice'));
let tax = (((combPrice) / 100) * 18).toFixed(2);

let checkout_price = document.getElementById("checkout_price");
let checkout_tax = document.getElementById("checkout_tax");
let checkout_total = document.getElementById("checkout_total");

checkout_price.innerText = `$${combPrice.toFixed(2)}`;
// console.log(price)
checkout_tax.innerText = `$${tax}`;
checkout_total.innerText = `$${(+combPrice + +tax).toFixed(2)}`;
saving.innerText = `You're saving $${((combPrice * 1.5)-combPrice).toFixed(2)} on your order today!`;



if (JSON.parse(sessionStorage.getItem("user_details"))) {
       form.style.display = "none";
       user_address.style.display = "block";

       let userDetails = JSON.parse(sessionStorage.getItem("user_details"));
       user_address.innerHTML =
              `
              <p id="userName">${userDetails.firstName} ${userDetails.lastName}</p>
              <p id="address">${userDetails.address1}, ${userDetails.address2}</p>
              <p id="city">${userDetails.city}</p>
              <p id="state">${userDetails.state}</p>
              <p id="zip">${userDetails.zip}</p>
              <div><span><a href="#">Edit this address</a></span> | <span><a href="#" id="add_newAddress">Add a new address</a></span></div>
       `
       let new_address = document.getElementById("add_newAddress");

       new_address.addEventListener("click", () => {
              sessionStorage.clear();
              form.style.display = "block";
              user_address.style.display = "none";
       })

}


// adding event listener to address button

address_subm_btn.addEventListener("click", setData);

async function setData(event) {
       event.preventDefault();
       form.style.display = "none";
       user_address.style.display = "block";

       let firstName = document.getElementById("inputFirstName").value;
       let lastName = document.getElementById("inputLastName").value;
       let address1 = document.getElementById("inputAddress").value;
       let address2 = document.getElementById("inputAddress2").value;
       let city = document.getElementById("inputCity").value;
       let state = document.getElementById("inputState").value;
       let zip = document.getElementById("inputZip").value;

       let obj = {
              firstName,
              lastName,
              address1,
              address2,
              city,
              state,
              zip
       }

       sessionStorage.setItem("user_details", JSON.stringify(obj));

       let userDetails = JSON.parse(sessionStorage.getItem("user_details"));
       user_address.innerHTML =
              `
              <p id="userName">${userDetails.firstName} ${userDetails.lastName}</p>
              <p id="address">${userDetails.address1}, ${userDetails.address2}</p>
              <p id="city">${userDetails.city}</p>
              <p id="state">${userDetails.state}</p>
              <p id="zip">${userDetails.zip}</p>
              <div><span><a href="#">Edit this address</a></span> | <span><a href="#">Add a new address</a></span></div>
       `
       window.location.reload();
       let new_address = document.getElementById("add_newAddress");

       new_address.addEventListener("click", () => {

              sessionStorage.clear();
              form.style.display = "block";
              user_address.style.display = "none";
       })


}


