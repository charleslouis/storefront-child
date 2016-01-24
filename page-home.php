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

				<?php if (get_field('liste_de_velos')): ?>
					<section>
					<h1 class="productt-lits-title"><span><?php the_field('titre_de_la_selection') ?></span></h1>
					<?php while (has_sub_field('liste_de_velos')): ?>
						<?php 
							$imgArray = get_sub_field('photo_du_velo');
							$img = $imgArray['sizes']['medium'];
						?>
						<article class="product">
							<h1><?php the_sub_field('nom_du_velo') ?></h1>
							<figure class="_1977">								
								<img class="product-thumnail" src="<?php echo($img); ?>" alt="<?php the_sub_field('nom_du_velo') ?>">
							</figure>
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
							<a href="#" class="button product_type_simple add_to_cart_button ajax_add_to_cart button-detail--product">Détails</a>
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
