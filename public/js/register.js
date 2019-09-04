$("form").submit(function(event){
    event.preventDefault();
    const newUser = $(this).serialize();
    $.ajax({
        url: "/api/users",
        method: "POST",
        data: newUser
    }).then(() => {
        alert("Success");
        window.location.href = "/"
    }).catch (err => {
        console.log(err);
        const errorData = err.responseJSON.msg;
        if (errorData.errors) { // If there are an array of errors,
            errorData.errors.forEach(error => {
                const inputElement = $(`input[name="${error.path}"]`);
                const inputLabel = $(`label[for="${error.path}"]`);
                inputElement.addClass("flash-input-class");
                inputLabel.text(error.message);
                inputLabel.css("color", "var(--bright-1)");
                setTimeout(() => {
                    inputElement.removeClass("flash-input-class");
                }, 1000);
            })
        } else {
            console.log("Error: ", err.responseJSON.msg)
        }
    })
});

$("input").on("click", function(event) {
    const input = $(this);
    const label = input.parent().children(`label[for="${input.attr("name")}"]`);
    console.log(input.parent().children(`label[for="${input.attr("name")}"]`));
    label.text(label.attr("data-text"));
    label.css("color", "unset");
})