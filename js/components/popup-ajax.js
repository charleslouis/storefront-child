function popupVeloDetailsAjax(){
    jQuery('#product-detail-full').hide();
    
    jQuery('#close').click(function(event){
    	event.preventDefault()
    	jQuery('#product-detail-full').hide();
    });
    

 	jQuery('.product-occasion').click(function(){
 		var postid = jQuery(this).data('postid'),
 			fieldname = jQuery(this).data('fieldname'),
 			subfield = jQuery(this).data('subfield'),
 			baseUrl = jQuery(this).data('url');

 		console.log(subfield);

 		var url = baseUrl + '/templates/popup-occasion.php?id='+ postid + '&fieldname=' + fieldname + '&subfield=' + subfield;
 		
 		console.log(url);

		jQuery.ajax({
				url: url,
				success: function( data ) {
			    	jQuery('#product-detail-full-content').load(url);
			    	jQuery('#product-detail-full').fadeIn(200);
				}
			})
    });
}