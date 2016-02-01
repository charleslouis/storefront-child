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
	subfield = parseInt(subfield);
	if(subfield === 0){
		subfieldPrev = numberOfArticles-1;		
	} else {
		subfieldPrev = subfield - 1;		
	}
	return subfieldPrev;
}


function setNextBike(subfield, numberOfArticles){
	
	var subfieldNext;
	subfield = parseInt(subfield);
	
	if(subfield === 0){
		subfieldNext = 1;		
	}
	else if (subfield === numberOfArticles-1) {		
		subfieldNext = 0;
	} else {
		subfieldNext = subfield + 1;		
	}
	return subfieldNext;
}


function loadModal(subfield){

	var url = setBaseUrl();
	url += subfield;

	var numberOfArticles = jQuery('#number-of-bikes').data('number-of-bikes');
	var numberOfDisplayedArticles = jQuery('#number-of-bikes').data('number-of-displayed-bikes');
	var dislayedBikesArray = jQuery('#number-of-bikes').data('displayed-bikes');
	var dislayedBikesArrayJson = [];
	// console.log(dislayedBikesArray.length);
	// var dislayedBikesArrayJson = JSON.parse(dislayedBikesArray);
	
	// for (var i = 0; i < dislayedBikesArray.length; i++) {
	// 	console.log(i);
	// };

for (var i = dislayedBikesArray.length - 1; i >= 0; i--) {
	if ( parseInt(dislayedBikesArray[i]) >= 0 ) {
		console.log(dislayedBikesArray[i]);
		dislayedBikesArrayJson = parseInt(dislayedBikesArray[i]);
	};	
};
		console.log(dislayedBikesArrayJson);

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
