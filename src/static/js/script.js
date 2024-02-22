(function ($) {
    $(document).ready(function () {
        // var markdownit = require("markdown-it");

        // get element text
        var text = $('#footer-caption').text();
        // modify text
        text = text.replace('@year', new Date().getFullYear());
        // update element text
        $('#footer-caption').text(text);


        $('.markdown').each(function () {
            let text = $(this).text();
            let html = $(this).html(text);
            $(this).find('>*:first-child').unwrap();

        });


    })
})(jQuery);




