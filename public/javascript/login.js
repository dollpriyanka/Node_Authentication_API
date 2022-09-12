
const form = document.getElementById("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    if (password.value.length < 8) {
        document.getElementById("password_error").innerHTML = "Invalid Password";
        return
    }
    fetch("http://localhost:3000/login", {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify({
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

