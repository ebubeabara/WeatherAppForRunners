var latlon;

success(pos) {
	latlon = pos.coords.latitude + "," + pos.coords.longitude;
	console.log("Ebube's Coordinate : " + latlon);
	getEbubeAbara(latlon);
	return latlon;
	//added by ebube above

};


function getEbubeAbara(pos)
{
	console.log("EbubeAbara: " + pos);
	return pos;
}


//var patrol = navigator.geolocation.getCurrentPosition(success);
console.log(navigator.geolocation.getCurrentPosition(success));
