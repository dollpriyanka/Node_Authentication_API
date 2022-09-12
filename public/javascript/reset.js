const form = document.getElementById("Reset-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const password = document.getElementById("password");
    const token = window.localStorage.getItem("token");
    fetch("http://localhost:3000/reset_password", {
        headers: { 'Content-Type': 'application/json' },
        method: "PATCH",
        body: JSON.stringify({
            newpassword: password.value,
            token: token
        })
    }).then(response => response.json())
        .then(response => console.log(response))
        .catch(e => console.log(e))
})
