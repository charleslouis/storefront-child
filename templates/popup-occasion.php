<?php
/*
Template Name: Ajax
*/
?>
<?php
	define('WP_USE_THEMES', false);
	require_once('../../../../wp-load.php');

    // $post = get_post($_GET['id']);
    $id = $_GET['id'];
    $fieldname = $_GET['fieldname'];
    $subfield = $_GET['subfield'];
    $id = intval($id);

	$fields = get_field($fieldname, $id);

	$imgArray = $fields[$subfield]['photo_du_velo'];
	$img = $imgArray['sizes']['medium'];
	$imgLarge = $imgArray['sizes']['large'];	
?>
<div>
	<figure class="_1977">
		<img class="thumbnail--product-occasion product-thumnail" src="<?php echo $imgLarge; ?>" alt="<?php echo $fields[$subfield]['nom_du_velo'] ?>">
	</figure>
	<ul class="product-details unstyled">
		<li><strong>Référence : </strong><?php echo $fields[$subfield]['reference'] ?></li>
		<li><strong>Marque : </strong><?php echo $fields[$subfield]['marque_du_velo'] ?></li>
		<li><strong>Prix : </strong><?php echo $fields[$subfield]['prix_du_velo'] ?>€</li>
		<li><strong>Dimension du cadre : </strong><?php echo $fields[$subfield]['taille_du_velo'] ?></li>
		<li><strong>Taille du cycliste : </strong><?php the_sub_field('taille_du_cycliste') ?></li>

		<?php if($fields[$subfield]['nombre_de_vitesses'] > 0): ?>
			<li>
				<strong>Nombre de Vitesses : </strong>
				<?php echo $fields[$subfield]['nombre_de_vitesses'] ?>
			</li>
		<?php else :?>
			<li><strong>Monovitesse</strong></li>
		<?php endif; ?>
	</ul>
	<h1>Le <span class="velo-name--modal"><?php echo $fields[$subfield]['nom_du_velo'] ?></span> vous intérresse ?</h1>
	<h2>Voici comment procéder :</h2>
	<ul>
		<li><h3>Retenez bien la référence suivante : <?php echo $fields[$subfield]['reference'] ?></h3></li>
		<li>
			<h4>Contactez-nous en passant par <a href="<?php echo bloginfo('url') ?>/contact">ici</a></h4>
		</li>		
		<li>
			<h4>Ou ecrivez-nous un mail à <a href="mailto:<?php the_field('mail', $id) ?>"><?php the_field('mail', $id) ?></a></h4>
		</li>
		<li>
			<h4>Vous pouvez également nous téléphonez-nous au <?php the_field('phone', $id) ?> </h4>
		</li>		
		<li>
			<h4>Ou nous rendre visite à notre <a href="<?php echo bloginfo('url') ?>/show-room">Show Room</a></h4>
		</li>				
	</ul>
</div>