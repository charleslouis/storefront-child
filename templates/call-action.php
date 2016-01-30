<?php if(get_field('display_call_to_action')): ?>

	<section class="call-to-action--page">
		<h2><?php the_field('texte_call_to_action') ?></h2>
		<a href="<?php the_field('lien_call_to_action') ?>" class="button button-primary"><?php the_field('texte_bouton_call_to_action') ?></a>
	</section>				

<?php endif; ?>