
const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirm_password = document.getElementById("confirm_password");
    if (name.value.length < 2) {
        document.getElementById("name_error").innerText = "Invalid Username";
        return
    }
    if (password.value.length < 8) {
        document.getElementById("password_error").innerHTML = "Invalid Password";
        return
    }
    if (password.value != confirm_password.value) {
        document.getElementById("confirm_error").innerHTML = "Confirm password is not same";
    }
    fetch("http://localhost:3000/sign-up", {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify({
            employee_name: name.value,
            email: email.value,
            password: password.value
        })
    }).then(response => response.json())
        .then(response => {
            window.localStorage.setItem('auth_token', response.token)
            window.location.href = "http://localhost:3000/"
        })
        .catch(e => console.log(e))
})

