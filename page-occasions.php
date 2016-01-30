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

				<section id="product-detail-full">
					<a id="close">Fermer</a>
					<div id="product-detail-full-content"></div>
					<a href="#" id="previous-bike" class="button">Previous</a>
					<a href="#" id="next-bike" class="button">Next</a>
				</section>

				<?php 
					// get_template_part( 'content', 'page' ); 
				?>


				<?php if (get_field('liste_de_velos')): ?>

					<?php 
						$human_sizes = array("Toutes les tailles", "< 160 cm", "161 à 168 cm", "169 à 175 cm", "176 à 185 cm", "> 185 cm");
					?>

					<section>
						<h3>Sélectionnez votre taille : </h3>
						<ul id="size-filter" class="clearfix size-filter">
							<?php foreach ($human_sizes as $size) {
								$data_size_filter = urlencode($size);
								echo "<li data-size-filter=\"$data_size_filter\"><span class=\"label\">$size</span></li>";
							} ?>
						</ul>
					</section>

					<section id="products-list--occasion">

						<h1 class="products-list-title"><span><?php the_field('titre_de_la_selection') ?></span></h1>
						
						<?php $i=0; ?>
						
						<?php while (has_sub_field('liste_de_velos')): ?>
						
							<?php $fields = get_field('liste_de_velos'); ?>
														
							<?php 
								$imgArray = get_sub_field('photo_du_velo');
								$img = $imgArray['sizes']['medium'];
								$data_size = urlencode(get_sub_field('taille_du_cycliste'));
							?>
						
						<article 
							class="product product-occasion"
							data-postid="<?php echo $id ?>"
							data-fieldname="<?php echo "liste_de_velos" ?>"
							data-subfield="<?php echo $i ?>"
							data-url="<?php echo get_stylesheet_directory_uri() ?>"
							data-size="<?php echo $data_size ?>">
								
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
							</article>
							<?php $i++; ?>
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
