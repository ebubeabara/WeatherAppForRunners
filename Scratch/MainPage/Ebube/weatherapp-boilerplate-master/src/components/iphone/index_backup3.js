// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
//import Location from '../button';





export default class Iphone extends Component {
	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		//var url = "http://api.wunderground.com/api/c78f1a13d2ca6971/conditions/q/UK/London.json";

		var fetchEbube = this.getEbube();
		console.log("fetchEbube: " + fetchEbube);


		//var url = "http://api.wunderground.com/api/0cb54acb69b0ecce/conditions/q/" + locatingEbube + ".json";
		var url = "http://api.wunderground.com/api/0cb54acb69b0ecce/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}


	fetchCurrentWeatherData = () =>
	{
		//var url = "http://api.apixu.com/v1/forecast.json?key=195354be928a41dd879144555172002&q=London&days=7";
		var url = "http://api.apixu.com/v1/forecast.json?key=195354be928a41dd879144555172002&q=" + latlon + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseCurrentWeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		this.setState({display: false});
	}


	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.currentLocation }</div>
					<div class={ style.conditions }>{ this.state.currentHumidity }</div>
					<div class={ style.conditions }>{ this.state.name }</div>
					<div class={ style.conditions }>{ latlon }</div>
					<div>{this.fetchCurrentWeatherData}</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchCurrentWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		var firstName = "I am Ebube";
		console.log("Hello World");

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			name: firstName,
			//loc: locEbube
		});
	}


	parseCurrentWeatherDataResponse = (parsed_json) =>
	{
		var location = parsed_json['location']['name'];
		var precipitation = parsed_json['current']['precip_in'];
		//var precipitationText = parsed_json['current']['condition']['text'];
		//var precipitationIcon = parsed_json['current']['condition']['icon'];
		var temperature = parsed_json['current']['temp_c'];
		var windSpeed = parsed_json['current']['wind_mph'];
		var humidity = parsed_json['current']['humidity'];
		var feelsLike = parsed_json['current']['feelslike_c'];

		this.setState({
			currentLocation: location,
			currentPrecipitation: precipitation,
			//currentPrecipitationText: precipitationText,
			//currentPrecipitationIcon: precipitationIcon,
			currentTemperature: temperature,
			currentWindSpeed: windSpeed,
			currentHumidity: humidity,
			currentFeelsLike: feelsLike
		});
	}



	success(pos) {
		latlon = pos.coords.latitude + "," + pos.coords.longitude;
		console.log("Ebube's Coordinate success : " + latlon);
		//return latlon;
	};


	getEbube()
	{
		var greeting ="Paris";
		console.log(greeting)
		return greeting;
	}

	getLocation()
	{
		if(navigator.geolocation)
		{
			//return navigator.geolocation.getCurrentPosition(success);
		}
		else
		{
			console.log("GeoLocation is not supported by this browser");
		}
	};

	getLatitudeLongitude(position)
	{
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var latlon = lat + "," + lon;
		console.log("Ebube's current coordinate: " + latlon);
		return latlon;
	}

}











function getEbubeAbara(pos)
{
	console.log("EbubeAbara: " + pos);
	return pos;
}

//2nd test for grolocation
// var options = {
// 	enableHighAccuracy: true,
// 	timeout: 5000,
// 	maximumAge: 0
// };



// function error(err) {
// 	console.warn(`ERROR(${err.code}): ${err.message}`);
// };

//var patrol = navigator.geolocation.getCurrentPosition(success);
var latlon;
//var coords = {lat:"", lon:""}

navigator.geolocation.getCurrentPosition(success);
function success(pos) {

	latlon = pos.coords.latitude + "," + pos.coords.longitude;
	console.log("Patrol1 : " + latlon);

	//getEbubeAbara(latlon);
	return latlon;

};
console.log("Patrol2: " + latlon);





/////APIXU DOCUMENTATION FOR GETTING API JSON data

// http = require('http');
// var apiKey = '195354be928a41dd879144555172002';
// var options = {
// 	host: 'api.apixu.com',
// 	port: 80,
// 	path: 'v1/curreent.json.key=' + apiKey + '&q=',
// 	method: 'GET'
// };
//
// errorHandler = function()
// {
// 	console.console.log('got some error');
// }
//
// url = forecastWeather(20500, 7, errorHandler);
//
// function currentWeather(query, callback)
// {
// 	options.path = '/v1/current.json?key=' + apiKey + '&q=' + query;
// 	http.request(options, function(res){
// 		res.setEncoding('utf8');
// 		res.on('data', function(chunk){
// 			console.log(chunk);
// 		});
// 		res.on('end', function(chunk){
//
// 		});
// 	}).on('error', function(err){
// 		console.error('Error with the request:', err.message);
// 		callback(err);
// 	}).end();
// }
//
// function forecastWeather(query, noOfDays, callback)
// {
// 	options.path = '/v1/forecast.json?key=' + apiKey + '&q=' + query + '&days=' + noOfDays;
// 	http.request(options, function(res){
// 		res.setEncoding('utf8');
// 		res.on('data', function(chunk){
// 			console.log(chunk);
// 		})
// 		res.on('end', function(err){
//
// 		});
// 	}).on('error', function(err){
// 		console.error('Error with the request:', err.message);
// 		callback(err);
// 	}).end();
// }
