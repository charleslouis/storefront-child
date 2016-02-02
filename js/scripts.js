/**
* jquery-match-height 0.7.0 by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function(factory) { // eslint-disable-line no-extra-semi
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function(){
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight.version = '0.7.0';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function(){
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert styles
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function(){
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function(throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // update heights on load and resize events
    $(window).bind('load', function(event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window).bind('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });

});

/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );

function isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
		(navigator.userAgent.match(/webOS/i)) ||
		(navigator.userAgent.match(/iPhone/i)) ||
		(navigator.userAgent.match(/iPod/i)) ||
		(navigator.userAgent.match(/iPad/i)) ||
		(navigator.userAgent.match(/BlackBerry/))
    );
}

// Calcualte the home banner parallax scrolling
function scrollBanner() {
//Get the scoll position of the page
scrollPos = jQuery(this).scrollTop();

//Scroll and fade out the banner text
// if (scrollPos > 20) {    
    jQuery('#bannerText').css({
      'margin-top' : -(scrollPos/3)+"px",
      'opacity' : 1-(scrollPos/300)
    });
// };

// Scroll the background of the banner

    jQuery('#homeBanner').css({
      'background-position' : 'center ' + (-scrollPos/30) +"px"
    });    
// if (scrollPos > 20) {    
// } else {
   //  jQuery('#homeBanner').css({
   //    'background-position' : 'center '
   //  });        
// }
}

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
function sortBikesByPrice(containerId, children, dataName){
	var bikes = jQuery(containerId),
		bikesli = bikes.children(children);

	bikesli.sort(function(a,b){
		var an = a.getAttribute(dataName),
			bn = b.getAttribute(dataName);

		if(an > bn) {
			return 1;
		}
		if(an < bn) {
			return -1;
		}
		return 0;
	});

	bikesli.detach().appendTo(bikes); 
}
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