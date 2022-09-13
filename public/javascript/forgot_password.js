
const form = document.getElementById("forgot_password-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email");
    fetch("http://localhost:3000/forgot_password", {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify({
            email: email.value,
        })
    }).then(response => response.json())
        .then(response => {
            window.localStorage.setItem('token', response.token)
            window.location.href = "http://localhost:3000/reset"
        })
        .catch(e => console.log(e))
})


