$(document).ready(() => {
    // Global Flags
    validNewPost = false;

    // Handlers
    $(".new-post-input-field").on("input", checkNewPostData);
    //$(document).on("click", "#submit-post-button", handleSubmitPost);
    $("#postSubmition").submit(function(event){
        event.preventDefault();
        $.post('/posts', $(this).serialize().then(function(result){
            //$('/posts').append(DOMmanipulation(result))
        }))
    })
    // Handlers

    // This functions handles adding a new post button

    // function handleSubmitPost() {
    //     const postData = {
    //         body: $("textarea.new-post-input-field").val()
    //     };
    //     console.log(postData);
    // }
    
    // Functions

    // This function checks the user's inputted data
    function checkNewPostData() {
        const input = $(this).val();
        if (/([A-Z]|[a-z])/g.test(input)) validNewPost = true;
        else validNewPost = false;

        updateButton();
    }

    function updateButton() {
        if (validNewPost) $("#submit-post-button").removeAttr("disabled");
        else $("#submit-post-button").attr("disabled", "");
    }
})