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

if(uname){
       nav_signin.innerText = uname;
       nav_signin.setAttribute("href", "#");
       nav_signin2.innerText = "My Account";
       nav_signup.innerText = "Log Out";
}

// if(nav_signup.innerText == "Log Out"){
//        nav_signup.addEventListener("click", function(){
//               localStorage.clear();
//               alert("User logged out")
//               nav_signup.innerText = "Sign Up";
//               nav_signup.innerText = "Log In";
//        })
// }

if (uname) {
       nav_signin.addEventListener("click", function () {
              localStorage.clear();
              alert("User logged out")
              nav_signup.innerText = "Create Account";
              nav_signin.innerText = "Sign In";
              nav_signin2.innerText = "Sign In";
              window.location.reload();
       })
}