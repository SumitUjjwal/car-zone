let baseUrl = "https://vast-rose-jellyfish-wrap.cyclic.app";

// admin container
let login_div = document.querySelector("#login");
let admin_container = document.querySelector(".admin_container");

let dashboard = document.querySelector("#dashboard");
let dashboard_container = document.querySelector(".dashboard_container");
let login_form = document.querySelector("#login_form");
let products = document.querySelector("#products_wrapper");
let add_products = document.querySelector("#add_products");
let add_product = document.querySelector("#add_product");
let add_product_form = document.querySelector("#product_form>form");
let remove_product = document.querySelector(".products");
let get_products = document.querySelector("#get_products");
let get_products_by_category = document.getElementById("get_products");
let add_product_btn = document.querySelector("#add_product_btn");
let user_data_table = document.querySelector("#user_data_table");
let get_costumer = document.querySelector("#get_costumer");
let get_order = document.querySelector("#get_order");
let order_details_table = document.querySelector("#order_details_table");

// display add product form
add_product_btn.addEventListener("click", () => {
       add_product.style.display = "flex";
       add_product_btn.style.display = "none";
})

// diplay customer details
get_costumer.addEventListener("click", () => {
       user_data_table.style.display = "block";
       products.style.display = "none";
       order_details_table.style.display = "none";
})

// display products 
get_products_by_category.addEventListener("click", () => {
       user_data_table.style.display = "none";
       products.style.display = "block";
       order_details_table.style.display = "none";
})

// display orders
get_order.addEventListener("click", () => {
       order_details_table.style.display = "block";
       user_data_table.style.display = "none";
       products.style.display = "none";
})





// function for rendering data on DOM
show_data("all");

async function show_data(category) {
       let request;
       if (category == "all") {
              request = await fetch(`${baseUrl}/product/`);
       }
       else {
              request = await fetch(`${baseUrl}/product?q=${category}`);
       }
       let data = await request.json();
       console.log(data)

       products.innerHTML = "";
       let show_data = data.map((element) => {
              return `
              <div class="products">
                     <div> 
                            <img src="${element.img_src}" alt="" id="img-src">
                     </div>
                     <div>
                                   <input type="text" id="title" value="${element.title}" readonly>
                                   <div>
                                          <span>Model: </span><input type="text" id="model" value="${element.model}" readonly>
                                          <span>SKU-Value: </span><input type="text" id="sku" value="${element.sku}" readonly>
                                   </div>
                                   <span>$<input type="text" id="price" value="${element.price}" readonly></span>
                                   <input type="text" id="descr" value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet optio neque cumque vero ullam dolor quo ad nulla repellat. Ad odit reprehenderit accusamus optio cupiditate in inventore nesciunt vel error.">
                                   <div class="product_btns">
                                          <input type="text" class="yl_btn product_btn" id="${element._id}" value="Remove" readonly>
                                          <input type="text" class="yl_btn product_btn" id="${element._id}" value="Update" readonly>
                                   </div>
                            </div>
              </div>
              `
       });
       products.innerHTML = show_data.join(" ");
       let removeBtnArr = document.querySelectorAll('.product_btns>:nth-child(1)');
       let updateBtnArr = document.querySelectorAll('.product_btns>:nth-child(2)');

       removeBtnArr.forEach(btn => {
              btn.addEventListener('click', (e) => {
                     localStorage.setItem('deleteID', JSON.stringify(e.target.id))
                     handleDelete(e.target.id);
              })
       });

       for (let btn of updateBtnArr) {
              btn.addEventListener("click", async (event) => {
                     event.preventDefault();
                     let item_id = event.target.id;
                     let title_input = document.getElementById("title");
                     let model_input = document.getElementById("model");
                     let sku_input = document.getElementById("sku");
                     let price_input = document.getElementById("price");
                     let descr_input = document.getElementById("descr");

                     // let input_tag = event.path[2].children[0].children[0];
                     console.log(event.composedPath())
                     console.log(event.target.value)
                     if (event.target.value === "Update") {
                            event.target.value = "Save";
                            title_input.removeAttribute("readonly");
                            model_input.removeAttribute("readonly");
                            sku_input.removeAttribute("readonly");
                            price_input.removeAttribute("readonly");
                            descr_input.removeAttribute("readonly");
                            title_input.focus();
                     } else {
                            event.target.value = "Update";
                            title_input.readOnly = true;
                            model_input.readOnly = true;
                            sku_input.readOnly = true;
                            price_input.readOnly = true;
                            descr_input.readOnly = true;

                            let updated_obj = {
                                   title: title_input.value,
                                   model: model_input.value,
                                   sku: sku_input.value,
                                   price: price_input.value
                            }

                            console.log(item_id, updated_obj)
                            updateRequest(item_id, updated_obj);
                     }
              });
       }
}


async function updateRequest(id, obj) {
       try {

              let request = await fetch(`${baseUrl}/product/update/${id}`, {
                     method: "PATCH",
                     headers: {
                            "Content-Type": "application/json"
                     },
                     body: JSON.stringify(obj)
              })
              alert("Product Updated successfully");
              window.location.reload();
       }

       catch (error) {
              alert("You are not allowed to update it.");
       }
}


// Adding event listener to add product form
add_product.addEventListener("submit", post_product);

// function for adding product
async function post_product(event) {
       event.preventDefault();

       let title = document.getElementById("add_title").value;
       let model = document.getElementById("add_model").value;
       let sku = document.getElementById("add_sku").value;
       let price = document.getElementById("add_price").value;
       let image = document.getElementById("add_img").value;
       let cat = document.getElementById("add_cat").value;

       let obj = {
              title: title,
              model: model,
              sku: sku,
              price: price,
              img_src: image,
       }

       let request = fetch(`${baseUrl}/product/add`, {
              method: "POST",
              headers: {
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(obj)
       })

       alert("Product Added Successfully");
       add_product.style.display = "none"
       add_product_btn.style.display = "flex"
       window.location.reload();
}

// handling Delete Button
async function handleDelete(id) {

       let request = await fetch(`${baseUrl}/product/delete/${id}`, {
              method: "DELETE",
              headers: {
                     "Content-Type": "application/json"
              }
       })

       alert("Product Deleted Successfully");
       window.location.reload();

}

get_products_by_category.addEventListener("change", products_category);

async function products_category() {
       let select_value = get_products_by_category.value;
       console.log(select_value)
       show_data(select_value);
}


// get customers------------------------------------------------------------
// let baseUrl = "${baseUrl}";


function show_searched_data() {
       let input = document.getElementById("inputSearch").value;
       console.log(input);
       show_userdata(input);
}

// function for rendering data on DOM
async function show_userdata(query) {
       if (query) {
              let request = await fetch(`${baseUrl}/user?q=${query}`, {
                     method: "GET",
                     headers: {
                            "Content-Type": "application/json"
                     }
              });
              let data = await request.json();
              console.log(data);
              displayTable(data);
       }
       else {
              let request = await fetch(`${baseUrl}/user`, {
                     method: "GET",
                     headers: {
                            "Content-Type": "application/json",
                     }
              });
              let data = await request.json();
              console.log(data);
              displayTable(data);
       }
}

show_userdata();

function displayTable(detailsObj) {
       console.log(detailsObj[0]._id)
       document.querySelector("tbody").innerHTML = null;
       detailsObj.forEach(element => {
              let row = document.createElement("tr");

              let td0 = document.createElement("td");
              td0.innerText = element._id;

              let td1 = document.createElement("td");
              td1.innerText = element.firstName + " " + element.lastName;

              let td2 = document.createElement("td");
              td2.innerText = element.email;

              let td3 = document.createElement("td");
              td3.innerText = element.phone;

              let td4 = document.createElement("td");
              td4.innerText = element.location;

              let td5 = document.createElement("td");
              td5.innerText = element.zipCode;

              row.append(td0, td1, td2, td3, td4, td5);
              document.querySelector(".user_data_tbody").append(row);
       });
}