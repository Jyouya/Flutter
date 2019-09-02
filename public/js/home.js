// Global Flags
let validNewPost = false;

let regex = sessionStorage.getItem('regex');

let regexPromise;

// Check if we have one in localstorage
if (!regex) {
    regexPromise = $.get('/api/regex');
    regexPromise.then((reg) => {
        sessionStorage.setItem('regex', reg);
        regex = new RegExp(reg);
    });
} else {
    regexPromise = new Promise(resolve => resolve());
    regex = new RegExp(regex);
}

// Run by default

// Listeners
$(".new-post-input-field").on("input", checkNewPostData);
$("#postSubmition").submit(function(event){
    event.preventDefault();
    $.post('/api/posts', $(this).serialize()).then(function(result){
        //$('/posts').append(DOMmanipulation(result))
        alert("(TEMP) Posted succesfully.");
        window.location.reload();
    });
});

// Page functions

// This handles when the user likes a post
function likePost(id) {
    console.log("Liking post ", id);
    // make a HTTP post to the likes table
}

// This handles when the user likes a post
function replyPost(id) {
    console.log("Replying to post ", id);
    // make a HTTP post to the likes table
}

// This function checks the user's inputted data
async function checkNewPostData() {
    await regexPromise;
    const input = $(this).val();
    if (regex.test(input)) validNewPost = true;
    else validNewPost = false;

    updateButton();
}

function updateButton() {
    if (validNewPost) $("#submit-post-button").removeAttr("disabled");
    else $("#submit-post-button").attr("disabled", "");
}