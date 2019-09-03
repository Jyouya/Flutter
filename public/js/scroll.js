console.log("Scroll script loaded");

$(window).on('mousewheel', function(event){
    //code that will only fire on manual scroll input
    const delta = event.originalEvent.deltaY;
    if (delta > 0) {
        console.log("scrolling down");
    } else if (delta <= 0) {
        console.log("scrolling up");
    }
});