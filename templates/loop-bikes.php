					<section class="clearfix" id="products-list--occasion"
						data-postid="<?php echo $id ?>"
						data-fieldname="<?php echo "liste_de_velos" ?>"
						data-url="<?php echo get_stylesheet_directory_uri() ?>">
						
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
							data-subfield="<?php echo $i ?>"
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