// Filter bikes second hand (occasions) by size

function filterBikes() {
	jQuery('#size-filter').find('li[data-size-filter="Toutes+les+tailles"]').addClass('active');
	var filter;

	if(getCurrentBikeFilterInUrl('bike-filter')){
		filter = getCurrentBikeFilterInUrl('bike-filter');
		filterHideShowBikes(filter, createChildrenMap('#products-list--occasion', 'article'));
		setCurrentButtonBikeFilter('#size-filter', 'li', 'active', 'size-filter', filter);
	}

	jQuery('#size-filter li').click(function(){
		filter = jQuery(this).data('size-filter');
		jQuery(this).addClass('active').siblings().removeClass('active');
		filterHideShowBikes(filter, createChildrenMap('#products-list--occasion', 'article'));

		// see http://stackoverflow.com/questions/2494213/changing-window-location-without-triggering-refresh
		window.history.replaceState( {} , 'title', updateQueryString('bike-filter', filter) );

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


function getCurrentBikeFilterInUrl(key){
	var value = location.search.split( key+'=' )[1];
	return value;
}

function setCurrentButtonBikeFilter(parent, button, currentClass, dataAttr, filter){
	jQuery(parent).find('li[data-'+ dataAttr +'="' + filter + '"]').each(function (i) {
		jQuery(this).addClass(currentClass).siblings().removeClass(currentClass);
	});
}
// setCurrentButtonBikeFilter('#size-filter', 'li', 'active', 'size-filter', filter);

function updateQueryString(key, value, url) {
// 
// see http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
// 
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}
