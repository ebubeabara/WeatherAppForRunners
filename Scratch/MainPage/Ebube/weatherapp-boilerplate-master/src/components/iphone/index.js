// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';

////
//importing days of the week button style sheet
import day1ButtonStyle from '../day1Button/day1ButtonStyle';
import style_day2Button from '../day2Button';
import style_day3Button from '../day3Button';
import style_day4Button from '../day4Button';
import style_day5Button from '../day5Button';
import style_day6Button from '../day6Button';
import style_day7Button from '../day7Button';
//importing days of the week button Component
import ButtonDay1 from '../day1Button';
import ButtonDay2 from '../day2Button';
import ButtonDay3 from '../day3Button';
import ButtonDay4 from '../day4Button';
import ButtonDay5 from '../day5Button';
import ButtonDay6 from '../day6Button';
import ButtonDay7 from '../day7Button';
////

export default class Iphone extends Component {
	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({
			display: true,
			dayOfWeekButtonDay1: false,
			dayOfWeekButtonDay2: false,
			dayOfWeekButtonDay3: false,
			dayOfWeekButtonDay4: false,
			dayOfWeekButtonDay5: false,
			dayOfWeekButtonDay6: false,
			dayOfWeekButtonDay7: false
		});


	}


	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		// display all weather data
		return (
			<div class={style.container}>
				<div class={style.header}>
					<div class={style.city}>{this.state.displayLocation}</div>
					<div class={style.button2_container}>
						<span>{ this.state.dayOfWeekButtonDay1 ? <ButtonDay1 clickFunction={ this.fetchCurrentWeatherData }/ > : null }</span>
						<span>{ this.state.dayOfWeekButtonDay2 ? <ButtonDay2 clickFunction={ this.fetchForecastDay2WeatherData }/ > : null }</span>
						<span>{ this.state.dayOfWeekButtonDay3 ? <ButtonDay3 clickFunction={ this.fetchForecastDay3WeatherData }/ > : null }</span>
						<span>{ this.state.dayOfWeekButtonDay4 ? <ButtonDay4 clickFunction={ this.fetchForecastDay4WeatherData }/ > : null }</span>
						<span>{ this.state.dayOfWeekButtonDay5 ? <ButtonDay5 clickFunction={ this.fetchForecastDay5WeatherData }/ > : null }</span>
						<span>{ this.state.dayOfWeekButtonDay6 ? <ButtonDay6 clickFunction={ this.fetchForecastDay6WeatherData }/ > : null }</span>
						<span>{ this.state.dayOfWeekButtonDay7 ? <ButtonDay7 clickFunction={ this.fetchForecastDay7WeatherData }/ > : null }</span>
					</div>
					<div class={style.days}>{this.state.day}</div>
					<div class={style.pt}>
						<div class={style.precipitation}>{this.state.displayPrecipitation_mm}</div>
						<div class={style.temperature}>{this.state.displayTemperature}</div>
					</div>
					<div class={style.conditionText}>{this.state.displayConditionText}</div>
					<div class={style.whf}>
						<div class={style.windSpeed}>{this.state.displayWindSpeed}</div>
						<div class={style.humidity}>{this.state.displayHumidity}</div>
						<div class={style.feelsLike}>{this.state.displayFeelsLike}</div>
					</div>


					<div>
						<div></div>
						<div></div>
					</div>
				</div>

				<div>
					<span></span>
				</div>

				<div class= { style_iphone.container }>
	 				{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchCurrentWeatherData }/ > : null }
		 		</div>
			</div>
		)
	}


	////CURRENT DAY
	// a call to fetch weather data via apixu
	fetchCurrentWeatherData = () =>
	{
		var url = "http://api.apixu.com/v1/forecast.json?key=195354be928a41dd879144555172002&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseCurrentWeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		this.setState({
			display: false,
			dayOfWeekButtonDay1: true,
			dayOfWeekButtonDay2: true,
			dayOfWeekButtonDay3: true,
			dayOfWeekButtonDay4: true,
			dayOfWeekButtonDay5: true,
			dayOfWeekButtonDay6: true,
			dayOfWeekButtonDay7: true
		});
	}

	parseCurrentWeatherDataResponse = (parsed_json) =>
	{
		var today = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay()];




		var location = parsed_json['location']['name'];
		var precipitation_mm = parsed_json['current']['precip_mm'];
		var conditionText = parsed_json['current']['condition']['text'];
		var conditionIcon = parsed_json['current']['condition']['icon'];
		var temperature = parsed_json['current']['temp_c'];
		var windSpeed = parsed_json['current']['wind_mph'];
		var humidity = parsed_json['current']['humidity'];
		var feelsLike = parsed_json['current']['feelslike_c'];
		var date = parsed_json['current']['last_updated'];
		var date_epoch = parsed_json['current']['last_updated_epoch'];

		var dd = date.substring(8,10);
		var mm = date.substring(5,7);
		var yyyy = date.substring(0,4);
		var ddmmyyyy = dd + "-" + mm + "-" + yyyy;

		this.setState({
			day: d + " " + ddmmyyyy,
			displayLocation: location,
			displayPrecipitation_mm: precipitation_mm,
			displayConditionText: conditionText,
			displayConditionIcon: conditionIcon,
			displayTemperature: temperature + " " + String.fromCharCode(176),
			displayWindSpeed: windSpeed,
			displayHumidity: humidity,
			displayFeelsLike: feelsLike + String.fromCharCode(176),
			//dayOfWeekButtonDay2: true
		});
	}


	////FORECAST DAY 2
	fetchForecastDay2WeatherData = () =>
	{
		var url = "http://api.apixu.com/v1/forecast.json?key=195354be928a41dd879144555172002&q=" + latitudeLongitude + "&days=7";
		console.log("I am Ebube");
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay2WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		this.setState({
			display: false,
			dayOfWeekButtonDay2: true
		});
	}

	parseForecastDay2WeatherDataResponse = (parsed_json) =>
	{
		var today = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay() + 1];

		var maxTemperature = parsed_json['forecast']['forecastday'][1]['day']['maxtemp_c'];
		var minTemperature = parsed_json['forecast']['forecastday'][1]['day']['mintemp_c'];
		var avgTemperature = parsed_json['forecast']['forecastday'][1]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][1]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][1]['day']['totalprecip_mm'];
		var precipitation_in = parsed_json['forecast']['forecastday'][1]['day']['totalprecip_in'];
		var avgHumidity = parsed_json['forecast']['forecastday'][1]['day']['avghumidity'];
		var conditionText = parsed_json['forecast']['forecastday'][1]['day']['condition']['text'];
		var conditionIcon = parsed_json['forecast']['forecastday'][1]['day']['condition']['icon'];
		var date = parsed_json['forecast']['forecastday'][1]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][1]['date_epoch'];

		var dd = date.substring(8,10);
		var mm = date.substring(5,7);
		var yyyy = date.substring(0,4);
		var ddmmyyyy = dd + "-" + mm + "-" + yyyy;

		this.setState({
			displayPrecipitation_mm: precipitation_mm,
			displayConditionText: conditionText,
			displayConditionIcon: conditionIcon,
			displayTemperature: avgTemperature + " " + String.fromCharCode(176),
			displayWindSpeed: maxWindSpeed,
			displayHumidity: avgHumidity,
			displayFeelsLike: "",
			day: d + " " + ddmmyyyy
		})
	}


	////FORECAST DAY 3
	fetchForecastDay3WeatherData = () =>
	{
		var url = "http://api.apixu.com/v1/forecast.json?key=195354be928a41dd879144555172002&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay3WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		this.setState({display: false});
	}

	parseForecastDay3WeatherDataResponse = (parsed_json) =>
	{
		var today = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay() + 2];

		var maxTemperature = parsed_json['forecast']['forecastday'][2]['day']['maxtemp_c'];
		var minTemperature = parsed_json['forecast']['forecastday'][2]['day']['mintemp_c'];
		var avgTemperature = parsed_json['forecast']['forecastday'][2]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][2]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][2]['day']['totalprecip_mm'];
		var precipitation_in = parsed_json['forecast']['forecastday'][2]['day']['totalprecip_in'];
		var avgHumidity = parsed_json['forecast']['forecastday'][2]['day']['avghumidity'];
		var conditionText = parsed_json['forecast']['forecastday'][2]['day']['condition']['text'];
		var conditionIcon = parsed_json['forecast']['forecastday'][2]['day']['condition']['icon'];
		var date = parsed_json['forecast']['forecastday'][2]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][2]['date_epoch'];

		var dd = date.substring(8,10);
		var mm = date.substring(5,7);
		var yyyy = date.substring(0,4);
		var ddmmyyyy = dd + "-" + mm + "-" + yyyy;

		this.setState({
			displayPrecipitation_mm: precipitation_mm,
			displayConditionText: conditionText,
			displayConditionIcon: conditionIcon,
			displayTemperature: avgTemperature + " " + String.fromCharCode(176),
			displayWindSpeed: maxWindSpeed,
			displayHumidity: avgHumidity,
			displayFeelsLike: "",
			day: d + " " + ddmmyyyy
		})
	}


	////FORECAST DAY 4
	fetchForecastDay4WeatherData = () =>
	{
		var url = "http://api.apixu.com/v1/forecast.json?key=195354be928a41dd879144555172002&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay4WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		this.setState({display: false});
	}

	parseForecastDay4WeatherDataResponse = (parsed_json) =>
	{
		var today = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay() + 3];

		var maxTemperature = parsed_json['forecast']['forecastday'][3]['day']['maxtemp_c'];
		var minTemperature = parsed_json['forecast']['forecastday'][3]['day']['mintemp_c'];
		var avgTemperature = parsed_json['forecast']['forecastday'][3]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][3]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][3]['day']['totalprecip_mm'];
		var precipitation_in = parsed_json['forecast']['forecastday'][3]['day']['totalprecip_in'];
		var avgHumidity = parsed_json['forecast']['forecastday'][3]['day']['avghumidity'];
		var conditionText = parsed_json['forecast']['forecastday'][3]['day']['condition']['text'];
		var conditionIcon = parsed_json['forecast']['forecastday'][3]['day']['condition']['icon'];
		var date = parsed_json['forecast']['forecastday'][3]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][3]['date_epoch'];

		var dd = date.substring(8,10);
		var mm = date.substring(5,7);
		var yyyy = date.substring(0,4);
		var ddmmyyyy = dd + "-" + mm + "-" + yyyy;

		this.setState({
			displayPrecipitation_mm: precipitation_mm,
			displayConditionText: conditionText,
			displayConditionIcon: conditionIcon,
			displayTemperature: avgTemperature + " " + String.fromCharCode(176),
			displayWindSpeed: maxWindSpeed,
			displayHumidity: avgHumidity,
			displayFeelsLike: "",
			day: d + " " + ddmmyyyy
		})
	}


	////FORECAST DAY 5
	fetchForecastDay5WeatherData = () =>
	{
		var url = "http://api.apixu.com/v1/forecast.json?key=195354be928a41dd879144555172002&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay5WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		this.setState({display: false});
	}

	parseForecastDay5WeatherDataResponse = (parsed_json) =>
	{
		var today = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay() + 4];

		var maxTemperature = parsed_json['forecast']['forecastday'][4]['day']['maxtemp_c'];
		var minTemperature = parsed_json['forecast']['forecastday'][4]['day']['mintemp_c'];
		var avgTemperature = parsed_json['forecast']['forecastday'][4]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][4]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][4]['day']['totalprecip_mm'];
		var precipitation_in = parsed_json['forecast']['forecastday'][4]['day']['totalprecip_in'];
		var avgHumidity = parsed_json['forecast']['forecastday'][4]['day']['avghumidity'];
		var conditionText = parsed_json['forecast']['forecastday'][4]['day']['condition']['text'];
		var conditionIcon = parsed_json['forecast']['forecastday'][4]['day']['condition']['icon'];
		var date = parsed_json['forecast']['forecastday'][4]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][4]['date_epoch'];

		var dd = date.substring(8,10);
		var mm = date.substring(5,7);
		var yyyy = date.substring(0,4);
		var ddmmyyyy = dd + "-" + mm + "-" + yyyy;

		this.setState({
			displayPrecipitation_mm: precipitation_mm,
			displayConditionText: conditionText,
			displayConditionIcon: conditionIcon,
			displayTemperature: avgTemperature + " " + String.fromCharCode(176),
			displayWindSpeed: maxWindSpeed,
			displayHumidity: avgHumidity,
			displayFeelsLike: "",
			day: d + " " + ddmmyyyy
		})
	}


	////FORECAST DAY 6
	fetchForecastDay6WeatherData = () =>
	{
		var url = "http://api.apixu.com/v1/forecast.json?key=195354be928a41dd879144555172002&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay6WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		this.setState({display: false});
	}

	parseForecastDay6WeatherDataResponse = (parsed_json) =>
	{
		var today = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay() + 5];

		var maxTemperature = parsed_json['forecast']['forecastday'][5]['day']['maxtemp_c'];
		var minTemperature = parsed_json['forecast']['forecastday'][5]['day']['mintemp_c'];
		var avgTemperature = parsed_json['forecast']['forecastday'][5]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][5]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][5]['day']['totalprecip_mm'];
		var precipitation_in = parsed_json['forecast']['forecastday'][5]['day']['totalprecip_in'];
		var avgHumidity = parsed_json['forecast']['forecastday'][5]['day']['avghumidity'];
		var conditionText = parsed_json['forecast']['forecastday'][5]['day']['condition']['text'];
		var conditionIcon = parsed_json['forecast']['forecastday'][5]['day']['condition']['icon'];
		var date = parsed_json['forecast']['forecastday'][5]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][5]['date_epoch'];

		var dd = date.substring(8,10);
		var mm = date.substring(5,7);
		var yyyy = date.substring(0,4);
		var ddmmyyyy = dd + "-" + mm + "-" + yyyy;

		this.setState({
			displayPrecipitation_mm: precipitation_mm,
			displayConditionText: conditionText,
			displayConditionIcon: conditionIcon,
			displayTemperature: avgTemperature + " " + String.fromCharCode(176),
			displayWindSpeed: maxWindSpeed,
			displayHumidity: avgHumidity,
			displayFeelsLike: "",
			day: d + " " + ddmmyyyy
		})
	}


	////FORECAST DAY 7
	fetchForecastDay7WeatherData = () =>
	{
		var url = "http://api.apixu.com/v1/forecast.json?key=195354be928a41dd879144555172002&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay7WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		this.setState({display: false});
	}

	parseForecastDay7WeatherDataResponse = (parsed_json) =>
	{
		var today = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay() + 6];


		var maxTemperature = parsed_json['forecast']['forecastday'][6]['day']['maxtemp_c'];
		var minTemperature = parsed_json['forecast']['forecastday'][6]['day']['mintemp_c'];
		var avgTemperature = parsed_json['forecast']['forecastday'][6]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][6]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][6]['day']['totalprecip_mm'];
		var precipitation_in = parsed_json['forecast']['forecastday'][6]['day']['totalprecip_in'];
		var avgHumidity = parsed_json['forecast']['forecastday'][6]['day']['avghumidity'];
		var conditionText = parsed_json['forecast']['forecastday'][6]['day']['condition']['text'];
		var conditionIcon = parsed_json['forecast']['forecastday'][6]['day']['condition']['icon'];
		var date = parsed_json['forecast']['forecastday'][6]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][6]['date_epoch'];

		var dd = date.substring(8,10);
		var mm = date.substring(5,7);
		var yyyy = date.substring(0,4);
		var ddmmyyyy = dd + "-" + mm + "-" + yyyy;

		this.setState({
			displayPrecipitation_mm: precipitation_mm,
			displayConditionText: conditionText,
			displayConditionIcon: conditionIcon,
			displayTemperature: avgTemperature + " " + String.fromCharCode(176),
			displayWindSpeed: maxWindSpeed,
			displayHumidity: avgHumidity,
			displayFeelsLike: "",
			day: d + " " + ddmmyyyy
		})
	}
}


/*
REQUEST CURRENT POSITION, BUT CONTINUE MONITORING POSITION
AND INVOKE CALLBACK WHEN THE USER'S POSITION CHANGES
*/
var lat;
var lon;
var latitudeLongitude;
var options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
};
navigator.geolocation.watchPosition(success, error, options);
function success(pos) {

	lat = pos.coords.latitude;
	lon = pos.coords.longitude;
	latitudeLongitude = lat + "," + lon;
	//latitudeLongitude = pos.coords.latitude + "," + pos.coords.longitude;
};
function error(err)
{
	console.warn(`ERROR(${err.code}): ${err.message}`);
};


/*
CALCULATE DISTANCE BETWEEN TWO POINTS USING LATITUDE AND LONGITUDE
*/
