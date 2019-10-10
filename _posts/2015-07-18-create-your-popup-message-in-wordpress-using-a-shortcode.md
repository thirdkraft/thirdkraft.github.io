---
layout: post
title:  "Create your popup message in Wordpress using a shortcode"
date:   2015-07-18 22:07:20
tags: tutorial
author: Marcel Badua
---
On this tutorial, we will create a shortcode with content, and use of `sessionStorage`.

On your `functions.php` create your popup function

{% highlight php startinline=true %}
function popup_function( $content = null ) {
}
{% endhighlight %}

Inside your function, add this html that will display your popup on your page

{% highlight html %}
<div class="popup-wrap">
    <div class="popup-content">
        <?php echo $content; // display content here ?>
    </div>
    <div class="close-popup">
        <a href="#">Close this message </a>
    </div>
</div>
{% endhighlight %}

Add this css to style your popup

{% highlight css %}
.popup-content {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0 , 0.85);
    z-index: 9999;
}
.popup-content.show{
    display: block;
}
.popup-content .popup-content{
    position: relative;
    background-color: #FFFFFF;
    width: 800px;
    min-height: 400px
    margin: 30px auto 0;
    color: #333;
}
.popup-content .close-popup {
    text-align: center;
}
.popup-content .close-popup a{
    color: #CCCCCC;
    font-size: 12px;
    text-decoration: none;
}
{% endhighlight %}

Finally, add this script to trigger you popup message.

{% highlight js %}
$(document).load(function() {
    var yetVisited = sessionStorage['visited'];
    if (!yetVisited) {
        $(".popup-content").addClass('show').prependTo("body");
        sessionStorage['visited'] = "yes";
    }
    $('.close-popup').click(function() {
        $('.popup-content').removeClass('show');
    });
});
{% endhighlight %}

The `sessionStorage` will tell if the visitor has already visited the page before. If the visitor had visited it before the popup will not show, until the next session.

In your `functions.php` - hook your popup function to `add_shortcode`.

{% highlight php startinline=true %}
add_shortcode( 'popup_message', 'popup_message_function' );
{% endhighlight %}

We can now add a shortcode to our post using `[popup_message] I'm a popup message [/popup_message]` adding all your content in between the shortcode.

{% highlight php startinline=true %}
    [popup_message] I'm a popup message [/popup_message]
{% endhighlight %}
