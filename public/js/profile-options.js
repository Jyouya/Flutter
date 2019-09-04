console.log("Profile icons js loaded");

let userId = null;
let userData = null;

// Get the id flag from url 
let query = window.location.href;
if (query.includes("id=")) {
    userId = query.split("id=")[1];
    console.log(userId);
    userData = getUserInfo(userId);
} else {
    console.log("NO ID IN URL!");
    window.location.href = "/login";
}

function getUserInfo(id) {
    return $.get("/api/users/me", data => {
        console.log("ME data: ", data)
        userData = data;
        autofillForms();
    });
}

// Is called after getting user info
function autofillForms() {
    console.log(userData);
    $("#email-input").val(userData.email);
    $("#username-input").val(userData.username);
    $("#avatarImg-input").val(userData.avatarImg);
    $("#bannerImg-input").val(userData.bannerImg);
    $("#bio-input").val(userData.bio);
}


// Putting to api
$("form").submit(function(event) {
    event.preventDefault()
    let data = $(this).serialize();
    console.log("Information to put: ", data)
    // $.post('/login', $(this).serialize() ).then( () => {
    //     window.location.href = "/";
    // });
    $.ajax({
        url: '/api/users',
        method: "PUT",
        data: data,
        success: function(res) {
            console.log(res);
            if (res) {
                res.errors.forEach(item => {
                    console.log(item)
                    alert("ERROR: " + item.message)
                })
            } else {
                alert("Updated succesfully!");
                window.location.href = "/profile"
            }
        }
    })
})