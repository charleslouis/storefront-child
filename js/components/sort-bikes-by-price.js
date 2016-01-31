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