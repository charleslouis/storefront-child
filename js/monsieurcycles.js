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


    console.group('scrollPos');
    	console.log(scrollPos);
    	console.log(jQuery('#masthead')[0].scrollHeight);
    console.groupEnd();

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

  jQuery(document).ready(function(){

	if(!isMobile()) {
		jQuery(window).scroll(function() {	      
	       scrollBanner();	      
		});
	}
	jQuery("#homeBanner h2").fitText(1.7, { minFontSize: '24px', maxFontSize: '64px' });	
});
