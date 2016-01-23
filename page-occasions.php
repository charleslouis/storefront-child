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

				<?php get_template_part( 'content', 'page' ); ?>


				<?php if (get_field('liste_de_velos')): ?>
					<section>
					<h1 class="productt-lits-title"><span><?php the_field('titre_de_la_selection') ?></span></h1>
					<?php while (has_sub_field('liste_de_velos')): ?>
						<?php 
							$imgArray = get_sub_field('photo_du_velo');
							$img = $imgArray['sizes']['medium'];
						?>
						<article class="product">
							<h4><?php the_sub_field('nom_du_velo') ?></h4>
							<img src="<?php echo($img); ?>" alt="<?php the_sub_field('nom_du_velo') ?>">
							<ul class="product-details">
								<li><strong>Référence : </strong><?php the_sub_field('reference') ?></li>
								<li><strong>Marque : </strong><?php the_sub_field('marque_du_velo') ?></li>							
								<li><strong>Prix : </strong><?php the_sub_field('prix_du_velo') ?>€</li>
								<li><strong>Taille : </strong><?php the_sub_field('taille_du_velo') ?></li>
								<?php if(get_sub_field('nombre_de_vitesses') > 0): ?>
									<li>
										<strong>Nombre de Vitesses : </strong>
										<?php echo get_sub_field('nombre_de_vitesses') ?>
									</li>
								<?php else :?>
									<li><strong>Monovitesse</strong></li>
								<?php endif; ?>
							</ul>
						</article>
					<?php endwhile //!has_sub_field?>
					</section>
				<?php endif; //get_sub_field ?>		
			
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
