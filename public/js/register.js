$("form").submit(function(event){
    event.preventDefault();
    const newUser = $(this).serialize();
    $.post("/api/users",newUser).then(data => {
        if (data.status === 1) {
            alert(data.msg);
            window.location.href = "/";
        }
    })
});