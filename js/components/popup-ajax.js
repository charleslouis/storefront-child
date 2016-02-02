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

	jQuery(document).keydown(function(e) {
	    if (e.keyCode == 27) {
	        jQuery('#product-detail-full').hide();
	    }
		if (e.keyCode == 39) {
	        jQuery('#next-bike').trigger('click');
	    }
		if (e.keyCode == 37) {
	        jQuery('#previous-bike').trigger('click');
	    }
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


function loadModal(subfieldIndex){

	var url = setBaseUrl();
	url += subfieldIndex;

	var numberOfArticles = jQuery('#number-of-bikes').data('number-of-bikes');
	var numberOfDisplayedArticles = jQuery('#number-of-bikes').data('number-of-displayed-bikes');
	var dislayedBikesArray = jQuery('#number-of-bikes').data('displayed-bikes');
	var dislayedBikesArrayJson = [];

	for (var i = dislayedBikesArray.length - 1; i >= 0; i--) {
		if ( parseInt(dislayedBikesArray[i]) >= 0 ) {
			dislayedBikesArrayJson.push(parseInt(dislayedBikesArray[i]));
		};	
	};

	jQuery.ajax({
		url: url,
		success: function( data ) {
			jQuery('#product-detail-full-content').empty().load(url);
	    	jQuery('#product-detail-full').fadeIn(300);
		}
	});

	// var subfieldPrev = setPreviousBike(subfieldIndex, numberOfArticles);
	// var subfieldNext = setNextBike(subfieldIndex, numberOfArticles);

 //    jQuery('#previous-bike').attr('data-bikeindex', subfieldPrev );
 //    jQuery('#next-bike').attr('data-bikeindex', subfieldNext);

}

function loadModalFromThumbnail(){
 	jQuery('.product-occasion').click(function(){
 		var subfieldIndex = jQuery(this).data('subfield');
 		loadModal(subfieldIndex);
 		setUpPrevNextIndexes('#products-list--occasion', '.product-occasion', subfieldIndex);
 	});
}

function loadModalFromPrevNext(buttonId){
	jQuery(buttonId).live('click', function(event){
		event.preventDefault();
		var subfieldIndex = jQuery(this).attr('data-bikeindex');
		loadModal(subfieldIndex);
		setUpPrevNextIndexes('#products-list--occasion', '.product-occasion', subfieldIndex);
	});	
}


function createChildrenMap(parent, children){
	var childrenList = jQuery(parent).find(children);
	var dislayedBikesArrayJson = [];

	setTimeout(function(){
		childrenList.each(function(){
			if (jQuery(this).is(":visible")) {
				dislayedBikesArrayJson.push(jQuery(this).data('subfield'));
			}
		});
		
		jQuery('#number-of-bikes').attr('data-number-of-displayed-bikes', dislayedBikesArrayJson.length);
		jQuery('#number-of-bikes').attr('data-displayed-bikes', dislayedBikesArrayJson);

	}, 500);
}


function getCurrentBikeInModal(subfieldIndex){
	var currentBikeElem = jQuery('.product-occasion').filter(function(){
		return jQuery(this).attr('data-subfield') == subfieldIndex
    });

    return currentBikeElem;
}


function setUpPrevNextIndexes(parent, children, subfieldIndex){

	var currentBikeElem = getCurrentBikeInModal(subfieldIndex);


	var firstBikeElem = jQuery(children).first();
	var firstBikeElemSubfieldIndex = firstBikeElem.attr('data-subfield');

	var lastBikeElem = jQuery(children).last();
	var lastBikeElemSubfieldIndex = lastBikeElem.attr('data-subfield');		

	var previousBikeElem = currentBikeElem[0].previousElementSibling;
	var previousBikeSubfieldIndex = jQuery(previousBikeElem).attr('data-subfield') || lastBikeElemSubfieldIndex;
	
	var nextBikeElem = currentBikeElem[0].nextElementSibling;
	var nextBikeSubfieldIndex = jQuery(nextBikeElem).attr('data-subfield') || firstBikeElemSubfieldIndex;
	
    jQuery('#previous-bike').attr('data-bikeindex', previousBikeSubfieldIndex );
    jQuery('#next-bike').attr('data-bikeindex', nextBikeSubfieldIndex);
}

