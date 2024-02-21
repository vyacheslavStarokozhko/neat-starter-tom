(function ($) {
    $(document).ready(function () {
        // get element text
        var text = $('#footer-caption').text();
        // modify text
        text = text.replace('@year',new Date().getFullYear());
        // update element text
        $('#footer-caption').text(text);


    })
})(jQuery);




