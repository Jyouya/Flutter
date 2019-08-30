$("form").submit(function(event) {
    event.preventDefault()
    console.log($(this).serialize())
    $.post('/login', $(this).serialize() ).then( () => {
        window.location.href = "/";
    });
})