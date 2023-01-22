// Nav
function openNav() {
       document.getElementById("mySidenav").style.width = "350px";
}

function closeNav() {
       document.getElementById("mySidenav").style.width = "0";
}


// -----------------------
let nav_signin = document.getElementById("nav_signin");
let nav_signin2 = document.getElementById("nav_signin2");
let nav_signup = document.getElementById("nav_signup");
let uname = localStorage.getItem("username");
let cartText = document.getElementById("cart_text");
let dropdown_content = document.getElementById("dropdown-content");
let cartValue = JSON.parse(localStorage.getItem("totalPrice"));

if(uname){
       nav_signin.innerText = uname;
       nav_signin.setAttribute("href", "#");
       nav_signin2.innerText = "My Account";
       nav_signin2.setAttribute("href", "./html/myAccount.html");
       nav_signup.innerText = "Log Out";
       nav_signup.setAttribute("href", "#");
}

if (uname) {
       nav_signup.addEventListener("click", function () {
              localStorage.clear();
              alert("User logged out")
              nav_signup.innerText = "Create Account";
              nav_signin.innerText = "Sign In";
              nav_signin2.innerText = "Sign In";
              window.location.reload();
       })
}



if(cartValue){
       console.log("cartValue", cartValue);
       cartText.innerText = cartValue;
}

function dropdown_menu(){
       dropdown_content.style.display = "block";
}
