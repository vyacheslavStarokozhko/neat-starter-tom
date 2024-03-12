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

        $('.script').each(function () {

            let text = $(this).text();
            let _text = text.replace('<p>','').replace('</p>','').replaceAll('&quot;','"').replaceAll('&gt;','>').replaceAll('&lt;','<')

            // let html = $(this).html(_text);
            let html = $.parseHTML(_text);
            console.log(html);


            $(this).text(decodeURI(html));
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


        $('li.has-submenu').hover(function (e){
            let $this = $(e.target);
            // $this.addClass('is-active');
            $this.closest('li.has-submenu').addClass('is-active');
            $this.find('> ul').addClass('is-active');
            $this.find('+ ul').addClass('is-active');
        },
            function (e){
                // let $this = $(e.target);

                $('ul.submenu').removeClass('is-active');
                $('li.has-submenu').removeClass('is-active');

            })




    })
})(jQuery);




