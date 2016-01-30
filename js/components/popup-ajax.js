function setBaseUrl(){
	var bikeList = jQuery('#products-list--occasion');

	var postid = bikeList.data('postid'),
		fieldname = bikeList.data('fieldname'),
		baseUrl = bikeList.data('url');

	baseUrl += '/templates/popup-occasion.php?id='+ postid + '&fieldname=' + fieldname + '&subfield=';	
	return baseUrl;
}


function initModalWrapper(){
    jQuery('#product-detail-full').hide();
    
    jQuery('#close').live('click', function(event){
    	event.preventDefault()
    	jQuery('#product-detail-full').hide();
    });

	loadModalFromPrevNext('#previous-bike');
	loadModalFromPrevNext('#next-bike');
}


function setPreviousBike(subfield, numberOfArticles){
	var subfieldPrev;
	console.log(subfield);
	console.log(subfield === 0);
	subfield = parseInt(subfield);
	if(subfield === 0){
		subfieldPrev = numberOfArticles-1;
		console.log('subfield === 0');
	} else {
		subfieldPrev = subfield - 1;
		console.log('subfield != 0');
	}
	return subfieldPrev;
}


function setNextBike(subfield, numberOfArticles){
	var subfieldNext;

	console.log(subfield);
	console.log(subfield === 0);
	console.log(numberOfArticles);

	subfield = parseInt(subfield);
	
	if(subfield === 0){
		subfieldNext = 1;
		console.log('subfield === 0');
	}
	else if (subfield === numberOfArticles-1) {
		console.log('subfield === numberOfArticles');
		subfieldNext = 0;
	} else {
		subfieldNext = subfield + 1;
		console.log('subfield != numberOfArticles');
	}
	return subfieldNext;
}


function loadModal(subfield){


	var url = setBaseUrl();
	url += subfield;


	var numberOfArticles = jQuery('.product-occasion').length;
	
	// jQuery( document ).ajaxComplete(function() {
	// });

	jQuery.ajax({
		url: url,
		success: function( data ) {
			jQuery('#product-detail-full-content').empty().load(url);
	    	jQuery('#product-detail-full').fadeIn(300);
		}
	});

	var subfieldPrev = setPreviousBike(subfield, numberOfArticles);
	var subfieldNext = setNextBike(subfield, numberOfArticles);

    jQuery('#previous-bike').attr('data-bikeindex', subfieldPrev );
    jQuery('#next-bike').attr('data-bikeindex', subfieldNext);
}

function loadModalFromThumbnail(){
 	jQuery('.product-occasion').click(function(){
 		var subfield = jQuery(this).data('subfield');
 		loadModal(subfield);
 	});
}

function loadModalFromPrevNext(buttonId){
	jQuery(buttonId).live('click', function(event){
		event.preventDefault();
		var subfield = jQuery(this).attr('data-bikeindex');
		loadModal(subfield);
	});	
}
