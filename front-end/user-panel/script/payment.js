let payment_button = document.getElementById("payment_button");

payment_button.addEventListener("click", function () {
       alert("Order Placed Successfully");
       localStorage.removeItem("cartItem");
       localStorage.removeItem("combPrice");
       localStorage.removeItem("totalPrice");
})