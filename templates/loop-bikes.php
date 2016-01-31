<?php 
	if ( get_field('reference_page_occasions') ) {
		$occasion_post_id = get_field('reference_page_occasions');
		$is_page_occasions = false;
	} else {
		$occasion_post_id = $id;
		$is_page_occasions = true;
	}
 ?>

<?php if (get_field('liste_de_velos', $occasion_post_id)): ?>
	
	<h1 class="products-list-title"><span><?php the_field('titre_de_la_selection') ?></span></h1>

	<section class="clearfix" id="products-list--occasion"
		data-postid="<?php echo $occasion_post_id ?>"
		data-fieldname="<?php echo "liste_de_velos" ?>"
		data-url="<?php echo get_stylesheet_directory_uri() ?>">
		
		<?php $i=0; ?>
		
		<?php while (has_sub_field('liste_de_velos', $occasion_post_id)): ?>

			<?php $show_in_home = get_sub_field('show_in_home', $occasion_post_id); ?>
	
			<?php if ( !$is_page_occasions && !$show_in_home): ?>
				<?php $i++ ?>
				<?php continue; ?>
			<?php else : ?>

				<?php 
					$imgArray = get_sub_field('photo_du_velo', $occasion_post_id);
					$img = $imgArray['sizes']['medium'];
					$data_size = urlencode(get_sub_field('taille_du_cycliste', $occasion_post_id));
					$data_price = urlencode(get_sub_field('prix_du_velo', $occasion_post_id));
				?>
			
				<article 
					class="product product-occasion"
					data-subfield="<?php echo $i ?>"
					data-size="<?php echo $data_size ?>"
					data-price="<?php echo $data_price ?>">
					
					<h1><?php the_sub_field('nom_du_velo', $occasion_post_id) ?></h1>
				
					<figure class="_1977">								
						<img class="thumbnail--product-occasion product-thumnail" src="<?php echo($img); ?>" alt="<?php the_sub_field('nom_du_velo', $occasion_post_id) ?>">
					</figure>

					<ul class="unstyled product-details">
						<li><strong>Référence : </strong><?php the_sub_field('reference', $occasion_post_id) ?></li>
						<li><strong>Marque : </strong><?php the_sub_field('marque_du_velo', $occasion_post_id) ?></li>							
						<li><strong>Prix : </strong><?php the_sub_field('prix_du_velo', $occasion_post_id) ?>€ TTC</li>
						<li><strong>Dimension du cadre : </strong><?php the_sub_field('taille_du_velo', $occasion_post_id) ?></li>
						<li><strong>Taille du cycliste : </strong><?php the_sub_field('taille_du_cycliste', $occasion_post_id) ?></li>
						
						<?php if(get_sub_field('nombre_de_vitesses', $occasion_post_id) > 0): ?>
							<li>
								<strong>Nombre de Vitesses : </strong>
								<?php echo get_sub_field('nombre_de_vitesses', $occasion_post_id) ?>
							</li>
						<?php else :?>
							<li><strong>Monovitesse</strong></li>
						<?php endif; ?>
					</ul>
				</article>
			<?php endif; ?>

			<?php $i++; ?>
		<?php endwhile //!has_sub_field?>
		<i id="number-of-bikes" data-number-of-bikes="<?php echo $i ?>"></i>
	</section>
<?php endif; ?>