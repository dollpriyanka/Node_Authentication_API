
window.onload = () => {
    console.log('Onhomepage');
    const token = window.localStorage.getItem("auth_token");
    fetch("http://localhost:3000/userInfo", {
        method: "GET",
        headers: {
            Authorization: token
        }
    })
        .then((response) => response.json())
        .then((response) => {
            const div = document.getElementById('root');
            div.innerHTML = `
           <p>
               Welcome ${response.result[0].Employee_name}
           </p>
           `
        }).catch(e => console.log(e))
}