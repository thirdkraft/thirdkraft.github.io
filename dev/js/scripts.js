(function($)
{
    "use strict";

    $(window).stellar();

    var $window = $(window),
    $image = $('.jumbotron');
    $window.on('scroll', function() {
      var top = $window.scrollTop();

      if (top < 0 || top > 1500) { return; }
      $image
        .css('transform', 'translate3d(0px, '+top/3+'px, 0px)')
        .css('opacity', 1-Math.max(top/700, 0));
    });
    $window.trigger('scroll');
    
    $(window).scroll(function()
    {
        var scrollTop = $(this).scrollTop();
        $('*[data-element="scrollTrigger"]').each(function()
        {
            var topPosScroll = $(this).data('trigger');
            if (scrollTop > topPosScroll)
            {
                $(this).addClass('scrolled');
            }
            else
            {
                $(this).removeClass('scrolled');
            }
        });
    });
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        var screenHeight = $(window).height();
        $(window).scroll(function()
        {
            var scrollTop = $(this).scrollTop();
            $('*[data-element="animated"]').each(function()
            {
                var offset = 0;
                var element = $(this);
                var topPos = element.offset().top;
                var animation = element.data('animation');
                var delay = element.data('delay');
                var scrollPos = scrollTop + screenHeight - offset;
                if (topPos < scrollPos)
                {
                    setTimeout(function()
                    {
                        element.addClass(animation + ' animated');
                    }, delay);
                }
            });
        });
    }
})(jQuery);