jQuery(document).ready(function($){

	if(!isMobile()) {
		jQuery(window).scroll(function() {	      
	       scrollBanner();	      
		});
	}
	
	jQuery('#homeBanner h2').fitText(1.7, { minFontSize: '24px', maxFontSize: '64px' });	

    jQuery('.product-thumnail').matchHeight();
    jQuery('.product').matchHeight();

 	filterBikes();
 	
 	initModalWrapper();
 	loadModalFromThumbnail();

	sortBikesByPrice('#products-list--occasion', 'article', 'data-price');

	createChildrenMap('#products-list--occasion', 'article');

});