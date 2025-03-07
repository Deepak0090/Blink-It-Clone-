
document.addEventListener("DOMContentLoaded", function (){

  document.getElementById("loginform")?.addEventListener("submit", function(event){

    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("Password").value;
    const errorMessageElement = document.getElementById("error-message");

    fetch("http://localhost:8082/api/v1/auth/login", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email,password})
    })
    .then(response=>{
    if(!response.ok){
        return response.text().then(text=>{ throw new Error(text); });
    }
            return response.json();
    })
    .then(data => {
        if(data.token){
            localStorage.setItem("token", data.token);
            console.log("Login Successful!", data);
            alert("Login successful!");
            window.location.href="dashboard.html"; // redirect after the login 
        }
    })
    .catch(error=>{
        console.error("Error",error);
        if(errorMessageElement){
            errorMessageElement.innerText= error.message;
            errorMessageElement.style.display="block";
        }
    });
    
    });

    document.getElementById("signupForm")?.addEventListener("submit", function(event){
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone= document.getElementById("phone").value;
    const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;
        fetch("http://localhost:8082/api/v1/auth/signup",{

            method:"POST",
            headers: { "Content-Type":"application/json"},
            body:JSON.stringify({name,email,phone,password,role})

            })
            .then(response=>response.text())
            .then(data=>{
                console.log(data);
                alert(data);
                window.location.href="login.html";
            })
            .catch(error=>console.error("Error", error));
     });

       document.getElementById("resetForm")?.addEventListener("submit", function(event){
        event.preventDefault();
            const email = document.getElementById("email").value;
            const tempPassword = document.getElementById("tempPassword").value;
            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if(newPassword!=confirmPassword){
                alert("Passwords do not match! Please try again.")
                return;
            }

            fetch("http://localhost:8082/api/v1/auth/reset-password", {
                
                method:"POST",
                headers:{ "Content-Type": "application/json"},
                body:JSON.stringify({email,tempPassword,newPassword}) 
            })
            .then(response =>{
                if(!response.ok){
                    return response.text().then(text=>{ throw new Error(text);});
                }
                return response.text();
            })
            .then(data=>{
               
                    alert("Password reset successful! Please Login with your new password.");
                    window.location.href="login.html";
            })
            .catch(error=>{
                console.error("Error:", error);
                alert("Failed to reset password! please check your email and try again.");
            });
       });

    const searchInput = document.getElementById("searchInput");
    const placeholder = ["Search 'Chocolate'", "Search 'Biscuits'", "Search 'Milk'", "Search 'Chips'", "Search 'PaperRole'"];
    let index = 0;

    function changePlaceholder() {
        if (!searchInput) return; 

        searchInput.style.transition = "transform 0.3s ease, opacity 0.3s ease"; 
        searchInput.style.transform = "translateY(10px)"; // Move down slightly before transition
        searchInput.style.opacity = "0"; 

        setTimeout(() => {
            searchInput.placeholder = placeholder[index]; 
            searchInput.style.transform = "translateY(0px)"; 
            searchInput.style.opacity = "1"; // Fade in effect
        }, 300); // Smooth transition timing

        index = (index + 1) % placeholder.length; 
    }

    setInterval(changePlaceholder, 2000); 
    changePlaceholder();

    
});

document.addEventListener("DOMContentLoaded", function() {

    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const token = localStorage.getItem("token");
    if(token){
        loginBtn.style.display="none";
        logoutBtn.style.display="block";
    }else{
        loginBtn.style.display="block";
        logoutBtn.style.display="none";
    }
    if(logoutBtn){
    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem("token");
        alert("Logged out successfully!");
        window.location.href="dashboard.html";
    });
}

});



