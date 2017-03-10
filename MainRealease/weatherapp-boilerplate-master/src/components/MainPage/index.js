// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
//import pages
import MapPage from '../MapPage';
import AdvicePage from '../AdvicePage';

//importing days of the week and page navigation button Components
import ButtonDay1 from '../day1Button';
import ButtonDay2 from '../day2Button';
import ButtonDay3 from '../day3Button';
import ButtonDay4 from '../day4Button';
import ButtonDay5 from '../day5Button';
import ButtonDay6 from '../day6Button';
import ButtonDay7 from '../day7Button';
import ButtonAdvicePage from '../icons/advicePageIcon';
import ButtonMapPage from '../icons/mapPageIcon';

//importing icon Components
import ButtonRunningMan from '../icons/runningManIcon';
import ButtonCloudy from '../icons/cloudyIcon';
import ButtonWindSpeed from '../icons/windSpeedIcon';
import ButtonFeelsLike from '../icons/feelsLikeIcon';
import ButtonFeelsLikeText from '../icons/feelsLikeTextIcon';
import ButtonHumidity from '../icons/humidityIcon';


export default class MainPage extends Component {
	// a constructor with initial set states
	constructor(props){
		super(props);
		// buttons and icons display state
		this.setState({
			display: true, dayOfWeekButtonDay1: false, dayOfWeekButtonDay2: false, dayOfWeekButtonDay3: false, dayOfWeekButtonDay4: false, dayOfWeekButtonDay5: false, dayOfWeekButtonDay6: false, dayOfWeekButtonDay7: false, windSpeedMainIcon: false, feelsLikeMainIcon: false, feelsLikeMainTextIcon: false, humidityMainIcon: false, runningManMainIcon: false, precipitationMainIcon: false, cloudyMainIcon: false, rainyMainIcon: false, sunnyMainIcon: false, advicePageMainIcon: false, mapPageMainIcon: false
		});
	}


	// the main render method for the mainPage component
	render() {
		// display all weather data on main page
		return (
			<div class={style.containerCloud}>
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
						<div class={style.temperature}>{this.state.displayTemperature}</div>
						<span class={style.runningManIcon}>{this.state.runningManMainIcon ? <ButtonRunningMan clickFunction={ this.doNothing }/> : null}</span>
					</div>
					<div>
						<span class={style.precipitation}>{this.state.displayPrecipitation_mm}</span>
						<span class={style.precipitationIcon}>{this.state.cloudyMainIcon ? <ButtonCloudy clickFunction={ this.doNothing }/> : null}</span>
					</div>
					<div class={style.conditionText}>{this.state.displayRecommendation}</div>
					<div class={style.wfhIcons}>
						<span class={style.windSpeedIcon}>{ this.state.windSpeedMainIcon ? <ButtonWindSpeed clickFunction={ this.doNothing }/> : null}</span>
						<span class={style.feelsLikeIcon}>{ this.state.feelsLikeMainIcon ? <ButtonFeelsLike clickFunction={ this.doNothing }/> : null}</span>
						<span class={style.humidityIcon}>{ this.state.humidityMainIcon ? <ButtonHumidity clickFunction={ this.doNothing }/> : null}</span>
					</div>
					<div class={style.wfh}>
						<div class={style.windSpeed}>{this.state.displayWindSpeed}</div>
						<div class={style.feelsLike}>{this.state.displayFeelsLike}</div>
						<div class={style.humidity}>{this.state.displayHumidity}</div>
					</div>
					<div class={style.wfhText}>
						<span class={style.windSpeedText}>{this.state.displayWindSpeedText}</span>
						<span class={style.feelsLikeText}>{ this.state.feelsLikeMainTextIcon ? <ButtonFeelsLikeText clickFunction={ this.doNothing }/> : null}</span>
						<span class={style.humidityText}>{this.state.displayHumidityText}</span>
					</div>
					<div class={style.pageNavButton}>
						<a href={'iphone/adv'}><span class={style.adviceButton}><ButtonAdvicePage/></span></a>
						<a href={'iphone/map'}><span class={style.mapButton}><ButtonMapPage/></span></a>
					</div>
				</div>
				<div class= { style_iphone.container }>
	 				{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchCurrentWeatherData }/ > : null }
		 		</div>
			</div>
		)
	}

	//no action Method for all icon Components
	doNothing = () =>{}

	// a method call to fetch CURRENT DAY weather data from apixu api
	fetchCurrentWeatherData = () =>
	{
		//uses apixu api and current geolocation of runner as getJSON url
		var url = "http://api.apixu.com/v1/forecast.json?key=18962dba91394d47b6b132528170903&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseCurrentWeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		// buttons and icons display state
		this.setState({
			display: false, dayOfWeekButtonDay1: true, dayOfWeekButtonDay2: true, dayOfWeekButtonDay3: true, dayOfWeekButtonDay4: true, dayOfWeekButtonDay5: true, dayOfWeekButtonDay6: true, dayOfWeekButtonDay7: true, runningManMainIcon: true, cloudyMainIcon: true, windSpeedMainIcon: true, feelsLikeMainIcon: true, feelsLikeMainTextIcon: true, humidityMainIcon: true, advicePageMainIcon: true, mapPageMainIcon: true
		});
	}

	//display current day weather data on render method
	parseCurrentWeatherDataResponse = (parsed_json) =>
	{
		//store weather data from api JSON file in variables
		var location = parsed_json['location']['name'];
		var precipitation_mm = parsed_json['current']['precip_mm'];
		var conditionText = (parsed_json['current']['condition']['text']).toLowerCase(); //coverts text to lower case for 'display recommendation if statement'
		var temperature = parsed_json['current']['temp_c'];
		var windSpeed = parsed_json['current']['wind_mph'];
		var humidity = parsed_json['current']['humidity'];
		var feelsLike = parsed_json['current']['feelslike_c'];
		var date = parsed_json['current']['last_updated'];
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[new Date().getUTCDay()]; //get todays date
		var ddmmyyyy = date.substring(8,10) + "-" + date.substring(5,7) + "-" + date.substring(0,4); //rearrange api date to UK format

		//if statements for displaying appropriate weather condition and suggestion for running locations
		if((conditionText.includes("sun"))|(conditionText.includes("clear"))|(conditionText.includes("shin"))|(conditionText.includes("dry")))
		{var conditionText = "Sunny day. Check out our park recommendations for running";}
		else if((conditionText.includes("rain"))|(conditionText.includes("drizzle"))|(conditionText.includes("storm"))|(conditionText.includes("wet"))|(conditionText.includes("shower")))
		{var conditionText = "Rainy day. Check out our indoor gym recommendations for running";}
		else if((conditionText.includes("snow")))
		{var conditionText = "Snowy day. Check out our indoor gym recommendations for running";}
		else
		{var conditionText = "Cloudy day. Check out our park recommendations for running";}

		//display data on render method for main page
		this.setState({
			day: d + " " + ddmmyyyy, displayLocation: location, displayPrecipitation_mm: precipitation_mm + "mm", displayRecommendation: conditionText, displayTemperature: temperature + String.fromCharCode(176), displayWindSpeed: windSpeed + " " + "mph", displayHumidity: humidity + " " + "%", displayFeelsLike: feelsLike + String.fromCharCode(176), displayWindSpeedText: "Wind speed", displayHumidityText: "Humidity", displayFeelsLikeText: "Feels like"
		});
	}


	// a method call to fetch FORECAST DAY 2 weather data from apixu api
	fetchForecastDay2WeatherData = () =>
	{
		//uses apixu api and current geolocation of runner as getJSON url
		var url = "http://api.apixu.com/v1/forecast.json?key=18962dba91394d47b6b132528170903&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay2WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		// hide display state for feelsLike temperature as forecast is not availble on api
		this.setState({
			display: false, feelsLikeMainIcon: false, feelsLikeMainTextIcon: false
		});
	}

	//display next days weather data on render method
	parseForecastDay2WeatherDataResponse = (parsed_json) =>
	{
		//store weather data from api JSON file in variables
		var avgTemperature = parsed_json['forecast']['forecastday'][1]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][1]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][1]['day']['totalprecip_mm'];
		var avgHumidity = parsed_json['forecast']['forecastday'][1]['day']['avghumidity'];
		var conditionText = (parsed_json['forecast']['forecastday'][1]['day']['condition']['text']).toLowerCase(); //coverts text to lower case for 'display recommendation if statement'
		var date = parsed_json['forecast']['forecastday'][1]['date'];
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[new Date().getUTCDay() + 1]; //get next day date
		var ddmmyyyy = date.substring(8,10) + "-" + date.substring(5,7) + "-" + date.substring(0,4); //rearrange api date to UK format

		if((conditionText.includes("sun"))|(conditionText.includes("clear"))|(conditionText.includes("shin"))|(conditionText.includes("dry")))
		{var conditionText = "Sunny day. Check out our park recommendations for running";}
		else if((conditionText.includes("rain"))|(conditionText.includes("drizzle"))|(conditionText.includes("storm"))|(conditionText.includes("wet"))|(conditionText.includes("shower")))
		{var conditionText = "Rainy day. Check out our indoor gym recommendations for running";}
		else if((conditionText.includes("snow")))
		{var conditionText = "Snowy day. Check out our indoor gym recommendations for running";}
		else
		{var conditionText = "Cloudy day. Check out our park recommendations for running";}

		this.setState({
			displayPrecipitation_mm: precipitation_mm + "mm", displayRecommendation: conditionText, displayTemperature: avgTemperature + String.fromCharCode(176), displayWindSpeed: maxWindSpeed + " " + "mph", displayHumidity: avgHumidity + " " + "%", displayFeelsLike: "", displayWindSpeedText: "Wind speed", displayHumidityText: "Humidity", displayFeelsLikeText: "Feels like", day: d + " " + ddmmyyyy
		});
	}


	// a method call to fetch FORECAST DAY 3 weather data from apixu api
	fetchForecastDay3WeatherData = () =>
	{
		//uses apixu api and current geolocation of runner as getJSON url
		var url = "http://api.apixu.com/v1/forecast.json?key=18962dba91394d47b6b132528170903&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay3WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		// hide display state for feelsLike temperature as forecast is not availble on api
		this.setState({
			display: false, feelsLikeMainIcon: false, feelsLikeMainTextIcon: false
		});
	}

	//display next 2 days weather data on render method
	parseForecastDay3WeatherDataResponse = (parsed_json) =>
	{
		//store weather data from api JSON file in variables
		var avgTemperature = parsed_json['forecast']['forecastday'][2]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][2]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][2]['day']['totalprecip_mm'];
		var avgHumidity = parsed_json['forecast']['forecastday'][2]['day']['avghumidity'];
		var conditionText = (parsed_json['forecast']['forecastday'][2]['day']['condition']['text']).toLowerCase(); //coverts text to lower case for 'display recommendation if statement'
		var date = parsed_json['forecast']['forecastday'][2]['date'];
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[new Date().getUTCDay() + 2]; //get next  2 days date
		var ddmmyyyy = date.substring(8,10) + "-" + date.substring(5,7) + "-" + date.substring(0,4); //rearrange api date to UK format

		if((conditionText.includes("sun"))|(conditionText.includes("clear"))|(conditionText.includes("shin"))|(conditionText.includes("dry")))
		{var conditionText = "Sunny day. Check out our park recommendations for running";}
		else if((conditionText.includes("rain"))|(conditionText.includes("drizzle"))|(conditionText.includes("storm"))|(conditionText.includes("wet"))|(conditionText.includes("shower")))
		{var conditionText = "Rainy day. Check out our indoor gym recommendations for running";}
		else if((conditionText.includes("snow")))
		{var conditionText = "Snowy day. Check out our indoor gym recommendations for running";}
		else
		{var conditionText = "Cloudy day. Check out our park recommendations for running";}

		this.setState({
			displayPrecipitation_mm: precipitation_mm + "mm", displayRecommendation: conditionText, displayTemperature: avgTemperature + String.fromCharCode(176), displayWindSpeed: maxWindSpeed + " " + "mph", displayHumidity: avgHumidity + " " + "%", displayFeelsLike: "", displayWindSpeedText: "Wind speed", displayHumidityText: "Humidity", displayFeelsLikeText: "Feels like", day: d + " " + ddmmyyyy
		});
	}


	// a method call to fetch FORECAST DAY 4 weather data from apixu api
	fetchForecastDay4WeatherData = () =>
	{
		//uses apixu api and current geolocation of runner as getJSON url
		var url = "http://api.apixu.com/v1/forecast.json?key=18962dba91394d47b6b132528170903&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay4WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		// hide display state for feelsLike temperature as forecast is not availble on api
		this.setState({
			display: false, feelsLikeMainIcon: false, feelsLikeMainTextIcon: false
		});
	}

	//display next 3 days weather data on render method
	parseForecastDay4WeatherDataResponse = (parsed_json) =>
	{
		//store weather data from api JSON file in variables
		var avgTemperature = parsed_json['forecast']['forecastday'][3]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][3]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][3]['day']['totalprecip_mm'];
		var avgHumidity = parsed_json['forecast']['forecastday'][3]['day']['avghumidity'];
		var conditionText = (parsed_json['forecast']['forecastday'][3]['day']['condition']['text']).toLowerCase(); //coverts text to lower case for 'display recommendation if statement'
		var date = parsed_json['forecast']['forecastday'][3]['date'];
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[new Date().getUTCDay() + 3]; //get next 3 days date
		var ddmmyyyy = date.substring(8,10) + "-" + date.substring(5,7) + "-" + date.substring(0,4); //rearrange api date to UK format

		if((conditionText.includes("sun"))|(conditionText.includes("clear"))|(conditionText.includes("shin"))|(conditionText.includes("dry")))
		{var conditionText = "Sunny day. Check out our park recommendations for running";}
		else if((conditionText.includes("rain"))|(conditionText.includes("drizzle"))|(conditionText.includes("storm"))|(conditionText.includes("wet"))|(conditionText.includes("shower")))
		{var conditionText = "Rainy day. Check out our indoor gym recommendations for running";}
		else if((conditionText.includes("snow")))
		{var conditionText = "Snowy day. Check out our indoor gym recommendations for running";}
		else
		{var conditionText = "Cloudy day. Check out our park recommendations for running";}

		this.setState({
			displayPrecipitation_mm: precipitation_mm + "mm", displayRecommendation: conditionText, displayTemperature: avgTemperature + String.fromCharCode(176), displayWindSpeed: maxWindSpeed + " " + "mph", displayHumidity: avgHumidity + " " + "%", displayFeelsLike: "", displayWindSpeedText: "Wind speed", displayHumidityText: "Humidity", displayFeelsLikeText: "Feels like", day: d + " " + ddmmyyyy
		});
	}


	// a method call to fetch FORECAST DAY 5 weather data from apixu api
	fetchForecastDay5WeatherData = () =>
	{
		//uses apixu api and current geolocation of runner as getJSON url
		var url = "http://api.apixu.com/v1/forecast.json?key=18962dba91394d47b6b132528170903&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay5WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		// hide display state for feelsLike temperature as forecast is not availble on api
		this.setState({
			display: false, feelsLikeMainIcon: false, feelsLikeMainTextIcon: false
		});
	}

	//display next 4 days weather data on render method
	parseForecastDay5WeatherDataResponse = (parsed_json) =>
	{
		//store weather data from api JSON file in variables
		var avgTemperature = parsed_json['forecast']['forecastday'][4]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][4]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][4]['day']['totalprecip_mm'];
		var avgHumidity = parsed_json['forecast']['forecastday'][4]['day']['avghumidity'];
		var conditionText = (parsed_json['forecast']['forecastday'][4]['day']['condition']['text']).toLowerCase(); //coverts text to lower case for 'display recommendation if statement'
		var date = parsed_json['forecast']['forecastday'][4]['date'];
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[new Date().getUTCDay() + 4]; //get next 4 days date
		var ddmmyyyy = date.substring(8,10) + "-" + date.substring(5,7) + "-" + date.substring(0,4); //rearrange api date to UK format

		if((conditionText.includes("sun"))|(conditionText.includes("clear"))|(conditionText.includes("shin"))|(conditionText.includes("dry")))
		{var conditionText = "Sunny day. Check out our park recommendations for running";}
		else if((conditionText.includes("rain"))|(conditionText.includes("drizzle"))|(conditionText.includes("storm"))|(conditionText.includes("wet"))|(conditionText.includes("shower")))
		{var conditionText = "Rainy day. Check out our indoor gym recommendations for running";}
		else if((conditionText.includes("snow")))
		{var conditionText = "Snowy day. Check out our indoor gym recommendations for running";}
		else
		{var conditionText = "Cloudy day. Check out our park recommendations for running";}

		this.setState({
			displayPrecipitation_mm: precipitation_mm + "mm", displayRecommendation: conditionText, displayTemperature: avgTemperature + String.fromCharCode(176), displayWindSpeed: maxWindSpeed + " " + "mph", displayHumidity: avgHumidity + " " + "%", displayFeelsLike: "", displayWindSpeedText: "Wind speed", displayHumidityText: "Humidity", displayFeelsLikeText: "Feels like", day: d + " " + ddmmyyyy
		})
	}


	// a method call to fetch FORECAST DAY 6 weather data from apixu api
	fetchForecastDay6WeatherData = () =>
	{
		//uses apixu api and current geolocation of runner as getJSON url
		var url = "http://api.apixu.com/v1/forecast.json?key=18962dba91394d47b6b132528170903&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay6WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		// hide display state for feelsLike temperature as forecast is not availble on api
		this.setState({
			display: false, feelsLikeMainIcon: false, feelsLikeMainTextIcon: false
		});
	}

	//display next 5 days weather data on render method
	parseForecastDay6WeatherDataResponse = (parsed_json) =>
	{
		//store weather data from api JSON file in variables
		var avgTemperature = parsed_json['forecast']['forecastday'][5]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][5]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][5]['day']['totalprecip_mm'];
		var avgHumidity = parsed_json['forecast']['forecastday'][5]['day']['avghumidity'];
		var conditionText = (parsed_json['forecast']['forecastday'][5]['day']['condition']['text']).toLowerCase(); //coverts text to lower case for 'display recommendation if statement'
		var date = parsed_json['forecast']['forecastday'][5]['date'];
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[new Date().getUTCDay() + 5]; //get next 5 days date
		var ddmmyyyy = date.substring(8,10) + "-" + date.substring(5,7) + "-" + date.substring(0,4); //rearrange api date to UK format

		if((conditionText.includes("sun"))|(conditionText.includes("clear"))|(conditionText.includes("shin"))|(conditionText.includes("dry")))
		{var conditionText = "Sunny day. Check out our park recommendations for running";}
		else if((conditionText.includes("rain"))|(conditionText.includes("drizzle"))|(conditionText.includes("storm"))|(conditionText.includes("wet"))|(conditionText.includes("shower")))
		{var conditionText = "Rainy day. Check out our indoor gym recommendations for running";}
		else if((conditionText.includes("snow")))
		{var conditionText = "Snowy day. Check out our indoor gym recommendations for running";}
		else
		{var conditionText = "Cloudy day. Check out our park recommendations for running";}

		this.setState({
			displayPrecipitation_mm: precipitation_mm + "mm", displayRecommendation: conditionText, displayTemperature: avgTemperature + String.fromCharCode(176), displayWindSpeed: maxWindSpeed + " " + "mph", displayHumidity: avgHumidity + " " + "%", displayFeelsLike: "", displayWindSpeedText: "Wind speed", displayHumidityText: "Humidity", displayFeelsLikeText: "Feels like", day: d + " " + ddmmyyyy
		});
	}


	// a method call to fetch FORECAST DAY 7 weather data from apixu api
	fetchForecastDay7WeatherData = () =>
	{
		//uses apixu api and current geolocation of runner as getJSON url
		var url = "http://api.apixu.com/v1/forecast.json?key=18962dba91394d47b6b132528170903&q=" + latitudeLongitude + "&days=7";
		$.ajax({
			url: url,
			dataType: "json",
			success: this.parseForecastDay7WeatherDataResponse,
			error: function(req, err){console.log("API call failed " + err);}
		})
		// hide display state for feelsLike temperature as forecast is not availble on api
		this.setState({
			display: false, feelsLikeMainIcon: false, feelsLikeMainTextIcon: false
		});
	}

	//display next 6 days weather data on render method
	parseForecastDay7WeatherDataResponse = (parsed_json) =>
	{
		//store weather data from api JSON file in variables
		var avgTemperature = parsed_json['forecast']['forecastday'][6]['day']['avgtemp_c'];
		var maxWindSpeed = parsed_json['forecast']['forecastday'][6]['day']['maxwind_mph'];
		var precipitation_mm = parsed_json['forecast']['forecastday'][6]['day']['totalprecip_mm'];
		var avgHumidity = parsed_json['forecast']['forecastday'][6]['day']['avghumidity'];
		var conditionText = (parsed_json['forecast']['forecastday'][6]['day']['condition']['text']).toLowerCase(); //coverts text to lower case for 'display recommendation if statement'
		var date = parsed_json['forecast']['forecastday'][6]['date'];
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = weekday[new Date().getUTCDay() + 6]; //get next 6 days date
		var ddmmyyyy = date.substring(8,10) + "-" + date.substring(5,7) + "-" + date.substring(0,4); //rearrange api date to UK format

		if((conditionText.includes("sun"))|(conditionText.includes("clear"))|(conditionText.includes("shin"))|(conditionText.includes("dry")))
		{var conditionText = "Sunny day. Check out our park recommendations for running";}
		else if((conditionText.includes("rain"))|(conditionText.includes("drizzle"))|(conditionText.includes("storm"))|(conditionText.includes("wet"))|(conditionText.includes("shower")))
		{var conditionText = "Rainy day. Check out our indoor gym recommendations for running";}
		else if((conditionText.includes("snow")))
		{var conditionText = "Snowy day. Check out our indoor gym recommendations for running";}
		else
		{var conditionText = "Cloudy day. Check out our park recommendations for running";}

		this.setState({
			displayPrecipitation_mm: precipitation_mm + "mm", displayRecommendation: conditionText, displayTemperature: avgTemperature + String.fromCharCode(176), displayWindSpeed: maxWindSpeed + " " + "mph", displayHumidity: avgHumidity + " " + "%", displayFeelsLike: "", displayWindSpeedText: "Wind speed", displayHumidityText: "Humidity", displayFeelsLikeText: "Feels like", day: d + " " + ddmmyyyy
		});
	}
}

/*
GEOLOCATION METHOD: REQUEST CURRENT POSITION, BUT CONTINUE MONITORING
POSITIONAND INVOKE CALLBACK WHEN THE USER'S POSITION CHANGES
*/
var latitudeLongitude;
var options = {enableHighAccuracy: true,timeout: 5000};
navigator.geolocation.watchPosition(success, error, options);
function error(err){console.warn(`ERROR(${err.code}): ${err.message}`);};
function success(pos){latitudeLongitude = pos.coords.latitude + "," + pos.coords.longitude;};
