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