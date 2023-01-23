let baseUrl = "https://vast-rose-jellyfish-wrap.cyclic.app";

let register = document.getElementById("submitBtn").addEventListener("click", userRegistration);


async function userRegistration(event) {
       event.preventDefault();
       let firstName = document.getElementById("firstName").value;
       let lastName = document.getElementById("lastName").value;
       let location = document.getElementById("location").value;
       let zipCode = document.getElementById("zipCode").value;
       let phone = document.getElementById("phone").value;
       let email = document.getElementById("email").value;
       let password = document.getElementById("pass").value;
       let confirmPassword = document.getElementById("cPass").value;

       let userObj = {
              firstName, lastName, location, zipCode, phone, email, password, confirmPassword
       };

       if(password == confirmPassword){
              let register_request = await fetch(`${baseUrl}/user/register`, {
                     method: "POST",
                     headers: {
                            "Content-Type": "application/json",
                     },
                     body: JSON.stringify(userObj)
              }).then((res) => res.json())
                     .then((data) => {
                            console.log(data);
                            alert(data.msg);
                            window.location.href = "./signin.html";
                     })
       }
       else{
              alert("Password mismatch");
       }
}

