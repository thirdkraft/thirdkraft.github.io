(function($) {
    "use strict";
    $('*[data-toggle="scrollTo"]').click(function(event) {
        var destination = $(this).attr('href');
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $(destination).offset().top
        }, 1000);
    });
    
    var toggleClicked = function(e) {
        if( e.target !== this ) {
           return;
        }
        var $target = $(e.target),
            state = $target.data('toggle'),
            href = $($target.attr('href'));
        if (state === 'on') {
            $target.data('toggle', 'off').removeClass('is-active');
            href.data('toggle', 'off').removeClass('is-active');
        } else {
            $target.data('toggle', 'on').addClass('is-active');
            href.data('toggle', 'on').addClass('is-active');
        }
    };
    $(document).on('click', '*[data-toggle]', toggleClicked);

    var toggleNavigation = function(e) {
        if( e.target !== this ) {
           return;
        }
        var $target = $('.c-hamburger'),
            state = $target.data('toggle'),
            href = $('#main-navigation');
        if (state === 'on') {
            $target.data('toggle', 'off').removeClass('is-active');
            href.data('toggle', 'off').removeClass('is-active');
        } else {
            $target.data('toggle', 'on').addClass('is-active');
            href.data('toggle', 'on').addClass('is-active');
        }
    };
    $(document).on('click', '#main-navigation a', toggleNavigation);



    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        
        $.stellar({});

        var $window = $(window),
            $image = $('.jumbotron');
        $window.on('scroll', function() {
            var top = $window.scrollTop();
            if (top < 0 || top > 1500) {
                return;
            }
            $image.css('transform', 'translate3d(0px, ' + top / 3 + 'px, 0px)').css('opacity', 1 - Math.max(top / 700, 0));
        });
        $window.trigger('scroll');
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();
            $('*[data-element="scrollTrigger"]').each(function() {
                var topPosScroll = $(this).data('trigger');
                if (scrollTop > topPosScroll) {
                    $(this).addClass('scrolled');
                } else {
                    $(this).removeClass('scrolled');
                }
            });
        });
        var screenHeight = $(window).height();
        $(window).scroll(function() {
            var scrollTop = $(this).scrollTop();
            $('*[data-element="animated"]').each(function() {
                var offset = 0;
                var element = $(this);
                var topPos = element.offset().top;
                var animation = element.data('animation');
                var delay = element.data('delay');
                var scrollPos = scrollTop + screenHeight - offset;
                if (topPos < scrollPos) {
                    setTimeout(function() {
                        element.addClass(animation + ' animated');
                    }, delay);
                }
            });
        });
    }
})(jQuery);