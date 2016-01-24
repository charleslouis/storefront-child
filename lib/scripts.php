<?php 
	
add_action('wp_enqueue_scripts', 'ttrust_scripts');

function ttrust_scripts() {	
	wp_enqueue_script('scripts',  get_stylesheet_directory_uri().'/js/scripts.js', array('jquery'), '1.0', true);
	
}