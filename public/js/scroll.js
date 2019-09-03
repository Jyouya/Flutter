console.log("Scroll script loaded");

$(window).on('mousewheel', function (event) {
    //code that will only fire on manual scroll input
    let delta = event.originalEvent.deltaY;
    if (delta > 0) {
        delta *= 0.25;
        $("main").scrollTop($("main").scrollTop() + delta);
    } else if (delta <= 0) {
        delta *= 0.25;
        $("main").scrollTop($("main").scrollTop() + delta);
    }

    // Detects offset 
    console.log($("main").scrollTop())
    if ($("main").scrollTop() >= 300 ) {
        $("#to-top").addClass("show");
        // console.log("Greater than 300!")
    } else {
        $("#to-top").removeClass("show");
    }
});

// Prevents default browser scrolling on the main div
$("main").on('mousewheel', function (event) {
    event.preventDefault();
});

// Adds a back to top button
const btn = $(`
    <a id="to-top" href="javascript:scrollToTop()" style="position: fixed; top: 20px; left: calc(50% - 20px); width: 40px; height: 40px; border-radius: 20px; background-color: var(--bright-2); display: flex; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="11.502" height="11.502" viewBox="0 0 11.502 11.502">
        <path id="Union_5" data-name="Union 5" d="M.01,8.267v-.01H0V0H1.8V6.4H8V8.267Z" transform="translate(11.502 5.845) rotate(135)" fill="#fff"/>
        </svg>
    </a>
    `);
$(".posts").append(btn);

function scrollToTop() {
    console.log($("main").scrollTop(0));
    $("#to-top").removeClass("show");
}