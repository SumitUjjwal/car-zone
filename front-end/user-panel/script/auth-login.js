let baseUrl = "http://localhost:8080";

let login = document.getElementById("loginBtn").addEventListener("click", userLogin);
// let nav_signin = document.getElementById("nav_signin");
// let nav_signin2 = document.getElementById("nav_signin2");
// let nav_signup = document.getElementById("nav_signup");

async function userLogin(event) {
       event.preventDefault();
       let email = document.getElementById("email").value;
       let password = document.getElementById("pass").value;

       let userObj = {
              email, password
       };

       if(email == "admin@mail.com" && password == "admin123") {
              window.location.href = "../../admin-panel/index.html"
              localStorage.setItem("username", "Admin");
       }
       else{
              let register_request = await fetch(`${baseUrl}/user/login`, {
                     method: "POST",
                     headers: {
                            "Content-Type": "application/json",
                     },
                     body: JSON.stringify(userObj)
              }).then((res) => res.json())
                     .then((data) => {
                            console.log(data);
                            localStorage.setItem("token", data.token);
                            alert(data.msg);

                            localStorage.setItem("username", data.name);
                            console.log(data.name);
                            localStorage.setItem("userId", data.userId);
                            console.log(data.userId);
                            if (data.name) {
                                   window.location.href = "../index.html";
                            }
                     })
       }
}

// let uname = localStorage.getItem("username");

// if(uname){
//        nav_signin.innerText = uname;
//        nav_signin.setAttribute("href", "#");
//        nav_signin.innerText = "My Account";
//        nav_signup.innerText = "Log Out";
// }

// if(nav_login.innerText == "Log Out"){
//        nav_login.addEventListener("click", function(){
//               localStorage.clear();
//               alert("User logged out")
//               nav_signup.innerText = "Sign Up";
//               nav_login.innerText = "Log In";
//        })
// }