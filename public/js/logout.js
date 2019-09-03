function handleLogout() {
    logout().then(data => {
        console.log(data.msg);
        alert(data.msg);
        window.location.href = "/login";
    })
}

async function logout () {
    return $.post("/logout");
}