<?php 


//////////////////////////////////////////////////////////////
// Custom Post Types and Custom Taxonamies
/////////////////////////////////////////////////////////////

add_action( 'init', 'create_post_types_child' );

function create_post_types_child() {

	$labels = array(
		'name' => __( 'Vélo à la une' ),
		'singular_name' => __( 'velo_a_la_une' ),
		'add_new' => __( 'Add New' ),
		'add_new_item' => __( 'Add New Vélo à la une' ),
		'edit' => __( 'Edit' ),
		'edit_item' => __( 'Edit Vélo à la une' ),
		'new_item' => __( 'New Vélo à la une' ),
		'view' => __( 'View Vélo à la une' ),
		'view_item' => __( 'View Vélo à la une' ),
		'search_items' => __( 'Search Vélo à la une' ),
		'not_found' => __( 'No Vélo à la une found' ),
		'not_found_in_trash' => __( 'No Vélo à la une found in Trash' ),
		'parent' => __( 'Parent Vélo à la une' ),
	);
	
	$args = array(
		'labels' => $labels,
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => true,
		'query_var' => true,		
		'rewrite' => true,
		'capability_type' => 'post',
		'hierarchical' => false,
		'menu_position' => null,
		'supports' => array('title', 'editor', 'thumbnail', 'comments', 'revisions', 'excerpt')
	); 	
	
	register_post_type( 'velo_a_la_une' , $args );
	flush_rewrite_rules( false );


}
