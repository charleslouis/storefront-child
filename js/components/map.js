function initMap(mapId, zoom){

    google.load("maps", "3.4", {
    	other_params: "sensor=false&language=fr"
    });

	var location = jQuery(mapId).attr('data-coordinates')
	
	console.log('location');

    jQuery(mapId).googleMap({
      zoom: zoom, // Initial zoom level (optional)
      coords: [48.895651, 2.290569], // Map center (optional)
      type: "ROADMAP" // Map type (optional)
    });	
}