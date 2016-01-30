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

				<section id="product-detail-full">
					<a id="close">Fermer</a>
					<div id="product-detail-full-content"></div>
					<a href="#" id="previous-bike" data-bikeindex="" class="button button-prev-next">Précèdent</a>
					<a href="#" id="next-bike" data-bikeindex="" class="button button-prev-next">Suivant</a>
				</section>

				<?php if (get_field('liste_de_velos')): ?>
					<section class="clearfix" id="products-list--occasion"
						data-postid="<?php echo $id ?>"
						data-fieldname="<?php echo "liste_de_velos" ?>"
						data-subfield="<?php echo $i ?>"
						data-url="<?php echo get_stylesheet_directory_uri() ?>">

						<h1 class="productt-lits-title"><span><?php the_field('titre_de_la_selection') ?></span></h1>
						
						<?php $i=0; ?>
						<?php $fields = get_field('liste_de_velos'); ?>
						
						<?php while (has_sub_field('liste_de_velos')): ?>
							<?php 
								$imgArray = get_sub_field('photo_du_velo');
								$img = $imgArray['sizes']['medium'];
								$imgLarge = $imgArray['sizes']['large'];
							?>
							<article 
								class="product product-occasion"
								data-postid="<?php echo $id ?>"
								data-fieldname="<?php echo "liste_de_velos" ?>"
								data-subfield="<?php echo $i ?>"
								data-url="<?php echo get_stylesheet_directory_uri() ?>">
								
								<h1><?php the_sub_field('nom_du_velo') ?></h1>
								
								<figure class="_1977">								
									<img class="thumbnail--product-occasion product-thumnail" src="<?php echo($img); ?>" alt="<?php the_sub_field('nom_du_velo') ?>">
								</figure>

								<ul class="unstyled product-details">
									<li><strong>Référence : </strong><?php the_sub_field('reference') ?></li>
									<li><strong>Marque : </strong><?php the_sub_field('marque_du_velo') ?></li>
									<li><strong>Prix : </strong><?php the_sub_field('prix_du_velo') ?>€</li>
									<li><strong>Dimension du cadre : </strong><?php the_sub_field('taille_du_velo') ?></li>
									<li><strong>Taille du cycliste : </strong><?php the_sub_field('taille_du_cycliste') ?></li>
								
									<?php if(get_sub_field('nombre_de_vitesses') > 0): ?>
										<li>
											<strong>Nombre de Vitesses : </strong>
											<?php echo get_sub_field('nombre_de_vitesses') ?>
										</li>
									<?php else :?>
										<li><strong>Monovitesse</strong></li>
									<?php endif; ?>
								
								</ul>
								<a href="#" class="button button-detail--product">Détails</a>
							</article>
							<?php $i++ ?>
						<?php endwhile //!has_sub_field?>
					</section>
				<?php endif; //get_sub_field ?>
			
				<section class="call-to-action--home">
					<h2><?php the_field('texte_occasions') ?></h2>
					<a href="<?php the_field('lien_occasions') ?>" class="button"><?php the_field('titre_bouton_occasions') ?></a>
				</section>

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
