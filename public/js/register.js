$("form").submit(function(event){
    event.preventDefault();
    const newUser = $(this).serialize();
    $.ajax({
        url: "/api/users",
        method: "POST",
        data: newUser
    }).then(() => {
        window.location.href = "/"
    }).catch (err => {
        console.log(err);
        const errorData = err.responseJSON.msg;
        if (errorData.errors) { // If there are an array of errors,
            errorData.errors.forEach(error => {
                flashElement(error.path, error.message);
            })
        } else { // Must be password
            flashElement("password", "Invalid password!");
        }
    })
});

function flashElement(path, msg) {
    const inputElement = $(`input[name="${path}"]`);
    const inputLabel = $(`label[for="${path}"]`);
    inputElement.addClass("flash-input-class");
    inputLabel.text(msg);
    inputLabel.css("color", "var(--bright-1)");
    setTimeout(() => {
        inputElement.removeClass("flash-input-class");
    }, 1000);
}

$("input").on("click", function(event) {
    const input = $(this);
    const label = input.parent().children(`label[for="${input.attr("name")}"]`);
    console.log(input.parent().children(`label[for="${input.attr("name")}"]`));
    label.text(label.attr("data-text"));
    label.css("color", "unset");
})