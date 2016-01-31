<?php
/*
Template Name: Home
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
					
				<?php if (get_field('reference_page_occasions')): ?>
					<?php 
						get_template_part('templates/loop', 'bikes'); 
					?>
				<?php endif; //get_sub_field ?>
			
				<?php 
					get_template_part('templates/call', 'action'); 
				?>

				<?php if( get_field('services') ): ?>
					<section class="nos-services clearfix">
					<?php while( has_sub_field('services') ) :	?>
						
						<article class="columns service">
							<h3><?php the_sub_field('titre_du_service'); ?></h3>
							<?php the_sub_field('presentation_du_service'); ?>
						</article>
					
					<?php endwhile; ?>
					</section>
				<?php endif; ?>


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
