<?php 

// We replace the  storefront_site_branding() function
// So that we can have a link and the logo
function storefront_site_branding() {	?>
	<a href="<?php echo bloginfo ( 'url' )?>" rel="home" class="site-branding">
		<h1 class="site-title"><?php bloginfo( 'name' ); ?></h1>
		<?php if ( '' != get_bloginfo( 'description' ) ) { ?>
			<p class="site-description"><?php echo bloginfo( 'description' ); ?></p>
		<?php } ?>
	</a> <?php
}