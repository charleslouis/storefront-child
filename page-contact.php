<?php
/*
Template Name: Contact
*/

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'content', 'page' ); ?>
				
				<section class="map">
					<div id="map" style="width: 380px; height: 300px;"></div>		
				</section>			

				<?php
				/**
				 * @hooked storefront_display_comments - 10
				 */
				do_action( 'storefront_page_after' );
				?>

			<?php endwhile; // end of the loop. ?>

			<script type="text/javascript" src="//www.google.fr/jsapi"></script>
			<script type="text/javascript">
			    google.load("maps", "3.4", {
			    	other_params: "sensor=false&language=fr"
			    });
			</script>
			<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() ?>/js/vendors/jquery.googlemap.js"></script>
			
			<script type="text/javascript">
			  jQuery(function($) {

			    $("#map").width('100%');
			    $("#map").googleMap({
			      zoom: 12, // Initial zoom level (optional)
			      coords: [48.7977022, 2.4856310999999778], // Map center (optional)
			      type: "ROADMAP" // Map type (optional)
			    }			    	);
			    $("#map").addMarker({
			      coords: [48.7977022, 2.4856310999999778], // Map center (optional)
			    });
			  })
			</script>			

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
