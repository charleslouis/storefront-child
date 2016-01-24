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
