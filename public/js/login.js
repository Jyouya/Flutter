$("form").submit(function(event) {
    event.preventDefault()
    $.post('/login', $(this).serialize() )
    .then( () => {
        window.location.href = "/";
    }).catch( data => {
        flashElement("email");
        flashElement("password");        
    });
})

function flashElement(name) {
    const element = $(`input[name="${name}"]`);
    element.addClass("flash-input-class");
    setTimeout(() => {
        element.removeClass("flash-input-class");
    }, 1000);
}