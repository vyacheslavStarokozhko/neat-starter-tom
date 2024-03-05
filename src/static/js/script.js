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

        function InitAccordion() {
            $('.accordion-labels li:first-child .accordion-button,.accordion-contents .accordion-content:first-child').addClass('is-active');
            $('.accordion-button').click(Accordion);
        }

        function Accordion(event) {
            $(`.accordion-content, .accordion-button`).removeClass('is-active');

            let $this = $(event.target);
            let idx = $this.data('idx');

            $(`.accordion-content[data-idx=${idx}], .accordion-button[data-idx=${idx}]`).addClass('is-active');

        }

        InitAccordion()


    })
})(jQuery);




