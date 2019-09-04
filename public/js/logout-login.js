// Global flag for detecting if logged in.
// set the flag by detecting the get request

let loggedIn = null;

$.get("/check-login").then(data => {
    console.log("Retreived: ", data);
    if (data) loggedIn = true
    else loggedIn = false;
    console.log("Logged in? ", loggedIn);
    displayButtons();
});

function displayButtons() {
    if (loggedIn) {
        $("#login-nav").css("display", "none");
        $("#logout-nav").css("display", "block");
        $(".new-post-container").css("display", "flex");
    } else { // If not logged in
        $("#logout-nav").css("display", "none");
        $("#login-nav").css("display", "block");
    }
}

function handleLogout() {
    $.post("/logout").then(data => { window.location.href = "/login"; })
}

function handleLogin() { window.location.href = "/login"; }