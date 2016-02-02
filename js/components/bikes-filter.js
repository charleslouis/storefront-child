// Filter bikes second hand (occasions) by size

function filterBikes() {
	jQuery('#size-filter').find('li[data-size-filter="Toutes+les+tailles"]').addClass('active');

	jQuery('#size-filter li').click(function(){
		var filter = jQuery(this).data('size-filter');
		jQuery(this).addClass('active').siblings().removeClass('active');
		filterHideShowBikes(filter, createChildrenMap('#products-list--occasion', 'article'));	

	});
}

//News filter function
function filterHideShowBikes(value) {
	var list = jQuery('#products-list--occasion .product-occasion');
	
	jQuery(list).fadeOut('fast');

	if (value == 'Toutes+les+tailles') {
		jQuery('#products-list--occasion').find('article').each(function (i) {
			jQuery(this).delay(200).slideDown('fast');
		});
	} else {
		//Notice this *=' <- This means that if the data-category contains multiple options, it will find them
		//Ex: data-category='Cat1, Cat2'
		jQuery('#products-list--occasion').find('article[data-size="' + value + '"]').each(function (i) {
			jQuery(this).delay(200).slideDown('fast');
		});
	}
}