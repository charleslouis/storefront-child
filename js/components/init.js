
jQuery(document).ready(function(){

	if(!isMobile()) {
		jQuery(window).scroll(function() {	      
	       scrollBanner();	      
		});
	}
	
	jQuery("#homeBanner h2").fitText(1.7, { minFontSize: '24px', maxFontSize: '64px' });	

    jQuery('.product-thumnail').matchHeight();
    jQuery('.product').matchHeight();

    

    jQuery('#product-detail-full').hide();
    
    jQuery('#close').click(function(event){
    	event.preventDefault()
    	jQuery('#product-detail-full').hide();
    });
    

 	jQuery('.product').click(function(){
 		var postid = jQuery(this).data('postid'),
 			fieldname = jQuery(this).data('fieldname'),
 			subfield = jQuery(this).data('subfield'),
 			baseUrl = jQuery(this).data('url');

 		console.log(postid);
 		var url = baseUrl + '/templates/popup-occasion.php?id='+ postid + '&fieldname=' + fieldname + '&subfield=' + subfield;
		jQuery.ajax({
				url: url,
				success: function( data ) {
			    	jQuery('#product-detail-full-content').load(url);
			    	jQuery('#product-detail-full').fadeIn(800);
				}
			})
    });

});
