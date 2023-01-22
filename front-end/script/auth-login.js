let baseUrl = "https://vast-rose-jellyfish-wrap.cyclic.app";

let login = document.getElementById("loginBtn").addEventListener("click", userLogin);

async function userLogin(event) {
       event.preventDefault();
       let email = document.getElementById("email").value;
       let password = document.getElementById("pass").value;

       let userObj = {
              email, password
       };

       if(email == "admin@mail.com" && password == "admin123") {
              window.location.href = "../admin-panel/admin_index.html";
              localStorage.setItem("name", "Admin");
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