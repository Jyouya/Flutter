// Global flag for detecting if logged in
let loggedIn = true;

if (loggedIn) {
    $("#login-nav").css("display", "none");
    $("#logout-nav").css("display", "block");
} else {
    $("#logout-nav").css("display", "none");
    $("#login-nav").css("display", "BLOCK");
}

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

function handleLogin() {
    window.location.href = "/login";
}