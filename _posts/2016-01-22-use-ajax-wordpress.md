---
layout: post
title:  "Use AJAX on Wordpress"
date:   2016-01-22 22:29:00
tags: tutorial
author: Marcel Badua
---

Let's start by creating the function.

{% highlight php startinline=true %}
add_action("wp_ajax_my_ajax_function", "my_ajax_function");
add_action("wp_ajax_nopriv_my_ajax_function", "my_ajax_function");

function my_ajax_function() {
  $message = $_POST['message'];
  echo $message;
}
{% endhighlight %}

Then we include our scripts

{% highlight php startinline=true %}
add_action( 'wp_enqueue_scripts', 'my_script_enqueue' );
function my_script_enqueue() {
   wp_register_script( "my-ajax-script", WP_PLUGIN_URL.'/my_ajax_plugin/my-ajax-script.js', array('jquery') );
   wp_localize_script( 'admin-ajax', 'myAjax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' )));        

   wp_enqueue_script( 'jquery' );
   wp_enqueue_script( 'my-ajax-script' );

}
{% endhighlight%}

Time to create your ajax script
{% highlight js %}
jQuery(document).on('change', '#text-ajax', function() {
  var value = jQuery(this).val();
  jQuery.ajax({
    type: 'post',
    url: myAjax.ajaxurl,
    data: {
      action: 'my_ajax_function',
      value : value
    },
    beforeSend: function() {
    },
    success: function(response) {
    }
  });
  return false;
})
{% endhighlight%}
