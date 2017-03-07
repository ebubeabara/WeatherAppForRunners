// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
import titleStyle from '../title/titleStyle';
import buttonStyle from '../recButton/buttonStyle';
import clothesTitleStyle from '../clothesTitle/clothesTitleStyle';
import clothesInfoStyle from '../clothesInfo/clothesInfoStyle';
import style_map_iphone from '../button2/style_map_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
// import the Title component
import Title from '../title';
//import the Button2 component
import Button2 from '../button2';
//import the Gym/Park title
import GymPark_Button from '../recButton';
//import the clothes Title component
import Clothes_Title from '../clothesTitle';
//import the clothes Info component
import Clothes_Info from '../clothesInfo';


export default class Iphone extends Component {
//var Iphone = React.createClass({

    
	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		
		// button display state
        this.state.showRecs = true;
	}
    
    
    
    
    

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/c78f1a13d2ca6971/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ 
            
            showRecs: false
        });
	}
    
    
    
    
    //call to a local jason file
    
    fetchLocalJsonData = () => {
			
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		// var url = "test.json";
		$.ajax({
			url: "../../assets/data/clothesRec.json",
			dataType: "json",
			success : this.parseLocalJson,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
        this.setState({ 
                showRecs: false
        });
    }
    
    
    

	// the main render method for the iphone component
	render() {
        
		// display all weather data
        // show title
		return (
            
			<div class={ style.container}>
                
                <div id={ titleStyle.recTitle}>
                        <Title/>
                </div>
            
                <div class={ buttonStyle.container }>

                        { this.state.showRecs ? <GymPark_Button class={buttonStyle.recButton }  clickFunction={ this.fetchLocalJsonData }/ > : null }

                </div>
            
                <div>
                    <h2>{this.state.showGymParkTitle}</h2>
            
                </div>
            
                <div class={clothesInfoStyle.clothes_info}>
                    <h3>some text to see whats happening</h3>
                </div>
            
                <div>
                
                        <h2>{this.state.showClothes}</h2>
                        <h3>{this.state.showValue}</h3>
                </div>
				
                <div class= { style_iphone.container }>
                        <Button/>
                   
                        <Button2/>
                </div>
            
            
            
			</div>
            
		);
	}
    
    
    /*<GymPark_Title clickFunction={ this.fetchLocalJsonData }/>
            
                    <h2>{this.state.percipval}</h2>*/
                        
    
    
    //setting the states
    parseLocalJson = (parsed_json) => {
		var great = parsed_json['great'];
		var dull = parsed_json['dull'];
		var percip = parsed_json['percip'];
        var gym = parsed_json['gym'];
        var park = parsed_json['park'];
        var clothes =parsed_json['clothes'];
        
        var showClothesInfo="";
        var gymParkTitle="";
        if(percip<=20){
            showClothesInfo=great;
            gymParkTitle=park;
        }else{
            showClothesInfo=dull;
            gymParkTitle=gym;
        }

		// set states for fields so they could be rendered later on
		this.setState({
			showValue: showClothesInfo,
            showGymParkTitle: gymParkTitle,
			percipval: percip,
            showClothes: clothes,
			
		});
		      
	}
    

	
}