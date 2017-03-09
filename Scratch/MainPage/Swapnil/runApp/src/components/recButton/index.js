// import preact
import { h, render, Component } from 'preact';
import $ from 'jquery';
	
export default class GymPark_Button extends Component{
   
    constructor(props) {
        super(props);
    this.state.loc="";
    }
 
   
//this here works
    
    render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}	
		return (
			<div>
				<button class="recButton " onClick={clickFunction}>
					recommendation
				</button>
			</div>
		);
	}
}