<?php 
	
add_action('wp_enqueue_scripts', 'ttrust_scripts');

function ttrust_scripts() {	
	wp_enqueue_script('fittext',  get_stylesheet_directory_uri().'/js/jquery.fittext.js', array('jquery'), '1.0', true);	
	wp_enqueue_script('monsieurcyclesjs',  get_stylesheet_directory_uri().'/js/monsieurcycles.js', array('jquery'), '1.0', true);	
	
}