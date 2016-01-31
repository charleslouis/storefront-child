<?php
/*
Template Name: Vélos d'occasion
*/

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php while ( have_posts() ) : the_post(); ?>

				<?php
				do_action( 'storefront_page_before' );
				?>


				<?php 
					get_template_part('templates/popup', 'container'); 
				?>

				<?php 
					// get_template_part( 'content', 'page' ); 
				?>
				


				<?php if (get_field('liste_de_velos')): ?>
										

					<?php 
						get_template_part('templates/filter', 'bikes'); 
					?>

					<?php 
						get_template_part('templates/loop', 'bikes'); 
					?>


				<?php endif; //get_sub_field ?>

				<?php 
					get_template_part('templates/call', 'action'); 
				?>	

				<?php
				/**
				 * @hooked storefront_display_comments - 10
				 */
				do_action( 'storefront_page_after' );
				?>

			<?php endwhile; // end of the loop. ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
