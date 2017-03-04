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
import style_day1Button from '../day1Button';
import style_day2Button from '../day2Button';
import style_day3Button from '../day3Button';
import style_day4Button from '../day4Button';
import style_day5Button from '../day5Button';
import style_day6Button from '../day6Button';
import style_day7Button from '../day7Button';
//importing days of the week button Component
import day1Button from '../day1Button';
import day2Button from '../day2Button';
import day3Button from '../day3Button';
import day4Button from '../day4Button';
import day5Button from '../day5Button';
import day6Button from '../day6Button';
import day7Button from '../day7Button';
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
			dayOfWeekButtonDay1: true,
			dayOfWeekButtonDay2: false,
			dayOfWeekButtonDay3: true,
			dayOfWeekButtonDay4: true,
			dayOfWeekButtonDay5: true,
			dayOfWeekButtonDay6: true,
			dayOfWeekButtonDay7: true
		});

		// //days of week button display state
		// this.state.dayOfWeekButtonDay1 = true;
		// this.state.dayOfWeekButtonDay2 = true;
		// this.state.dayOfWeekButtonDay3 = true;
		// this.state.dayOfWeekButtonDay4 = true;
		// this.state.dayOfWeekButtonDay5 = true;
		// this.state.dayOfWeekButtonDay6 = true;
		// this.state.dayOfWeekButtonDay7 = true;


	}


	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		// display all weather data
		return (
			<div class={style.container}>
				<div class={style.header}>
					<div class={style.city}>{this.state.currentLocation}</div>
					<div>
						<div></div>

						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>

					<div class={style.pt}>
						<div class={style.precipitation}>{this.state.currentPrecipitation_in}</div>
						<div class={style.temperature}>{this.state.currentTemperature}</div>
					</div>
					<div class={style.conditionText}>{this.state.currentConditionText}</div>
					<div class={style.whf}>
						<div class={style.windSpeed}>{this.state.currentWindSpeed}</div>
						<div class={style.humidity}>{this.state.currentHumidity}</div>
						<div class={style.feelsLike}>{this.state.currentFeelsLike}</div>
					</div>


					<div class={style.pt}>
						<div class={style.precipitation}>{this.state.day2Precipitation_in}</div>
						<div class={style.temperature}>{this.state.day2AvgTemperature}</div>
					</div>
					<div class={style.conditionText}>{this.state.day2Date_epoch}</div>
					<div class={style.whf}>
						<div class={style.windSpeed}>{this.state.day2MaxWindSpeed}</div>
						<div class={style.humidity}>{this.state.day2AvgHumidity}</div>
					</div>


					<div>
						<div></div>
						<div></div>
					</div>
				</div>



 				{ this.state.dayOfWeekButtonDay2 ? <Button class={ style_iphone.button } clickFunction={ this.fetchForecastDay2WeatherData }/ > : null }



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
			dayOfWeekButtonDay2: true
		});
	}

	parseCurrentWeatherDataResponse = (parsed_json) =>
	{
		var today = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay()];

		var location = parsed_json['location']['name'];
		var precipitation_in = parsed_json['current']['precip_in'];
		var conditionText = parsed_json['current']['condition']['text'];
		var conditionIcon = parsed_json['current']['condition']['icon'];
		var temperature = parsed_json['current']['temp_c'];
		var windSpeed = parsed_json['current']['wind_mph'];
		var humidity = parsed_json['current']['humidity'];
		var feelsLike = parsed_json['current']['feelslike_c'];

		this.setState({
			day: d,
			currentLocation: location,
			currentPrecipitation_in: precipitation_in,
			currentConditionText: conditionText,
			currentConditionIcon: conditionIcon,
			currentTemperature: temperature + " " + String.fromCharCode(176),
			currentWindSpeed: windSpeed,
			currentHumidity: humidity,
			currentFeelsLike: feelsLike + String.fromCharCode(176),
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
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay() + 1];

		var maxTemperature = parsed_json['forecast']['forecastday'][1]['day']['maxtemp_c'];
		var minTemperature = parsed_json['forecast']['forecastday'][1]['day']['mintemp_c'];
		var avgTemperature = parsed_json['forecast']['forecastday'][1]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][1]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][1]['day']['totalprecip_mm'];
		var precipitation_in = parsed_json['forecast']['forecastday'][1]['day']['totalprecip_in'];
		var avgHumidity = parsed_json['forecast']['forecastday'][1]['day']['avghumidity'];
		var date = parsed_json['forecast']['forecastday'][1]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][1]['date_epoch'];
		console.log("Date_Epoch: " + date_epoch);
		console.log("I am Ebube");

		this.setState({
			day2: d,
			day2MaxTemperature: maxTemperature,
			day2MinTemperature: minTemperature,
			day2AvgTemperature: avgTemperature,
			day2MaxWindSpeed: maxWindSpeed,
			day2Precipitation_mm: precipitation_mm,
			day2Precipitation_in: precipitation_in,
			day2AvgHumidity: avgHumidity,
			day2Date: date,
			day2Date_epoch: date_epoch,
			//dayOfWeekButtonDay2: true
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
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay() + 2];

		var maxTemperature = parsed_json['forecast']['forecastday'][2]['day']['maxtemp_c'];
		var minTemperature = parsed_json['forecast']['forecastday'][2]['day']['mintemp_c'];
		var avgTemperature = parsed_json['forecast']['forecastday'][2]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][2]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][2]['day']['totalprecip_mm'];
		var precipitation_in = parsed_json['forecast']['forecastday'][2]['day']['totalprecip_in'];
		var avgHumidity = parsed_json['forecast']['forecastday'][2]['day']['avghumidity'];
		var date = parsed_json['forecast']['forecastday'][2]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][2]['date_epoch'];
		console.log("Date_Epoch: " + date_epoch);

		this.setState({
			day3: d,
			day3MaxTemperature: maxTemperature,
			day3MinTemperature: minTemperature,
			day3AvgTemperature: avgTemperature,
			day3MaxWindSpeed: maxWindSpeed,
			day3Precipitation_mm: precipitation_mm,
			day3Precipitation_in: precipitation_in,
			day3AvgHumidity: avgHumidity,
			day3Date: date,
			day3Date_epoch: date_epoch
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
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay() + 3];

		var maxTemperature = parsed_json['forecast']['forecastday'][3]['day']['maxtemp_c'];
		var minTemperature = parsed_json['forecast']['forecastday'][3]['day']['mintemp_c'];
		var avgTemperature = parsed_json['forecast']['forecastday'][3]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][3]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][3]['day']['totalprecip_mm'];
		var precipitation_in = parsed_json['forecast']['forecastday'][3]['day']['totalprecip_in'];
		var avgHumidity = parsed_json['forecast']['forecastday'][3]['day']['avghumidity'];
		var date = parsed_json['forecast']['forecastday'][3]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][3]['date_epoch'];
		console.log("Date_Epoch: " + date_epoch);

		this.setState({
			day4: d,
			day4MaxTemperature: maxTemperature,
			day4MinTemperature: minTemperature,
			day4AvgTemperature: avgTemperature,
			day4MaxWindSpeed: maxWindSpeed,
			day4Precipitation_mm: precipitation_mm,
			day4Precipitation_in: precipitation_in,
			day4AvgHumidity: avgHumidity,
			day4Date: date,
			day4Date_epoch: date_epoch
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
		var date = parsed_json['forecast']['forecastday'][4]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][4]['date_epoch'];
		console.log("Date_Epoch: " + date_epoch);

		this.setState({
			day5: d,
			day5MaxTemperature: maxTemperature,
			day5MinTemperature: minTemperature,
			day5AvgTemperature: avgTemperature,
			day5MaxWindSpeed: maxWindSpeed,
			day5Precipitation_mm: precipitation_mm,
			day5Precipitation_in: precipitation_in,
			day5AvgHumidity: avgHumidity,
			day5Date: date,
			day5Date_epoch: date_epoch
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
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay() + 5];

		var maxTemperature = parsed_json['forecast']['forecastday'][5]['day']['maxtemp_c'];
		var minTemperature = parsed_json['forecast']['forecastday'][5]['day']['mintemp_c'];
		var avgTemperature = parsed_json['forecast']['forecastday'][5]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][5]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][5]['day']['totalprecip_mm'];
		var precipitation_in = parsed_json['forecast']['forecastday'][5]['day']['totalprecip_in'];
		var avgHumidity = parsed_json['forecast']['forecastday'][5]['day']['avghumidity'];
		var date = parsed_json['forecast']['forecastday'][5]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][5]['date_epoch'];
		console.log("Date_Epoch: " + date_epoch);

		this.setState({
			day6: d,
			day6MaxTemperature: maxTemperature,
			day6MinTemperature: minTemperature,
			day6AvgTemperature: avgTemperature,
			day6MaxWindSpeed: maxWindSpeed,
			day6Precipitation_mm: precipitation_mm,
			day6Precipitation_in: precipitation_in,
			day6AvgHumidity: avgHumidity,
			day6Date: date,
			day6Date_epoch: date_epoch
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

	parseForecastDay3WeatherDataResponse = (parsed_json) =>
	{
		var today = new Date();
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[today.getUTCDay() + 6];

		var maxTemperature = parsed_json['forecast']['forecastday'][6]['day']['maxtemp_c'];
		var minTemperature = parsed_json['forecast']['forecastday'][6]['day']['mintemp_c'];
		var avgTemperature = parsed_json['forecast']['forecastday'][6]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][6]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][6]['day']['totalprecip_mm'];
		var precipitation_in = parsed_json['forecast']['forecastday'][6]['day']['totalprecip_in'];
		var avgHumidity = parsed_json['forecast']['forecastday'][6]['day']['avghumidity'];
		var date = parsed_json['forecast']['forecastday'][6]['date'];
		var date_epoch = parsed_json['forecast']['forecastday'][6]['date_epoch'];
		console.log("Date_Epoch: " + date_epoch);

		this.setState({
			day7: d,
			day7MaxTemperature: maxTemperature,
			day7MinTemperature: minTemperature,
			day7AvgTemperature: avgTemperature,
			day7MaxWindSpeed: maxWindSpeed,
			day7Precipitation_mm: precipitation_mm,
			day7Precipitation_in: precipitation_in,
			day7AvgHumidity: avgHumidity,
			day7Date: date,
			day7Date_epoch: date_epoch
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




// return (
// 	<div class={ style.container }>
// 		<div class={ style.header }>
// 			<div class={ style.city }>{ this.state.currentLocation }</div>
// 			<div class={ style.conditions }>{ this.state.currentTemperature }</div>
// 			<div class={ style.conditions }>{ this.state.name }</div>
// 			<div>{this.fetchCurrentWeatherData}</div>
// 			<span class={ tempStyles }>{ this.state.temp }</span>
// 		</div>
// 		<div class={ style.details }></div>
// 		<div class= { style_iphone.container }>
// 			{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchCurrentWeatherData }/ > : null }
// 		</div>
// 	</div>
// );
