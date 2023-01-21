
let payment_button = document.getElementById("payment_button");


payment_button.addEventListener("click", async function (event) {
       let customerId = (localStorage.getItem("userId"));
       let productId = JSON.parse(localStorage.getItem("cartItem"));
       let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
       let status = "placed";

       let obj = {
              customerId,
              productId,
              totalPrice,
              status
       }

       console.log(obj);
       
       let request = fetch(`${baseUrl}/order/add`, {
              method: "POST",
              headers: {
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(obj)
       })

       alert("Order Placed Successfully");

       localStorage.removeItem("cartItem");
       localStorage.removeItem("combPrice");
       localStorage.removeItem("totalPrice");
})