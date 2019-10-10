---
layout: post
title:  "Author your own Wordpress Team Plugin"
date:   2015-07-21 19:09:20
tags: tutorial
author: Marcel Badua
---

When developing a website for a business company, sometimes there is a requirement for adding the company's team members on their page. Let's build a plugin that create custom post type for team, some extra custom fields and a shortcode for displaying. Follow this steps to create your own Wordpress Team plugin.

In your plugins folder, create a folder. For this purpose let's name it `my-team-plugin`. Create a new file `my-team-plugin.php`

First you have to define your plugin

{% highlight php startinline=true %}
/*
Plugin Name: My Team Plugin
Plugin URI: http://wordpress.org/
Description: Let's you add a team on your website
Author: Marcel Badua
Version: 0.5
Author URI: http://marcelbadua.com/
*/
{% endhighlight %}

Now let's declare a custom post type for your team members, lets name your post type 'Team'. We can use <a href="http://generatewp.com/post-type/">http://generatewp.com/post-type/</a> to generate our custom post type

{% highlight php startinline=true %}
// Register Custom Post Type
function team_post_type() {
  $labels = array(
  	'name'                => _x( 'Teams', 'Post Type General Name', 'text_domain' ),
  	'singular_name'       => _x( 'Team', 'Post Type Singular Name', 'text_domain' ),
  	'menu_name'           => __( 'Team', 'text_domain' ),
  	'name_admin_bar'      => __( 'Team', 'text_domain' ),
  );
  $args = array(
  	'label'               => __( 'team', 'text_domain' ),
  	'labels'              => $labels,
  	'public' 			  => true,
  	'has_archive'         => true,
  	'supports'            => array( 'title', 'editor', 'thumbnail' )
  );
  register_post_type( 'team', $args );
}
// Hook into the 'init' action
add_action( 'init', 'team_post_type', 0 );
{% endhighlight %}

To add extra custom meta fields, Let's use this awesome class written by <a href="https://en.bainternet.info/">Ohad Raz</a>. This will speed up things. There's a <a href="https://en.bainternet.info/how-i-add-a-wordpress-metabox/">tutorial</a> on how to use this class further.

Download this class from this <a href="https://en.bainternet.info/how-i-add-a-wordpress-metabox/">page.</a>

Include the main class file

{% highlight php startinline=true %}
require_once("meta-box-class/my-meta-box-class.php");
{% endhighlight %}

Setup your meta configuration

{% highlight php startinline=true %}
$prefix = 'my_team_';
$config = array(
    'id'             => 'my_team_meta',
    'title'          => 'Team Description',
    'pages'          => array('team'),
    'context'        => 'normal',
    'priority'       => 'high',
    'fields'         => array(),
    'local_images'   => false,
    'use_with_theme' => true
);
$meta =  new AT_Meta_Box($config);
{% endhighlight %}

The main reason for using this class is to add a repeating field for the team contact. This will allow us to add more contact details per team member.

Let's create the repeater block.

{% highlight php startinline=true %}
$meta->addRepeaterBlock($prefix.'contact_entry',array(
  'inline'   => true,
  'name'     => 'Contact Details',
  'fields'   => $repeater_fields,
  'sortable' => true
));
{% endhighlight %}

Then let's add the contact fields

{% highlight php startinline=true %}
$repeater_fields[] = $meta->addText($prefix.'contact_title',array('name'=> 'Contact Title '),true);
$repeater_fields[] = $meta->addText($prefix.'contact_value',array('name'=> 'Contact Value '),true);
{% endhighlight %}

Finally tell the class that it is done

{% highlight php startinline=true %}
$meta->Finish();
{% endhighlight %}

To display your team, let's create a shortcode that will loop your team custom post type.

{% highlight php startinline=true %}
function my_team_func() {
  $prefix = 'my_team_';
  $args = array( 'post_type' => 'team' );
  $the_query = new WP_Query( $args );
  while ( $the_query->have_posts() ) : $the_query->the_post();
    the_post_thumbnail('medium');
    the_title('<h3>;', '</h3>');
    the_content( );
    $contact_details = get_post_meta( get_the_ID(), $prefix.'contact_entry', true );
    if( ! empty( $contact_details ) ) {
      foreach ( $contact_details as $detail ) {
        echo  $detail[$prefix.'contact_title'];
        echo  $detail[$prefix.'contact_value'];
      }
    }
  endwhile;
  wp_reset_postdata();
}
add_shortcode( 'my_team', 'my_team_func');
{% endhighlight %}
Use this shortcode `[my_team]` in a page
You now have the base for your plugin. Go ahead and style you Team Plugin depending on your website's theme.
