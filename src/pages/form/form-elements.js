import React from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {PostData} from './../../services/PostData';
import Moment from 'react-moment';
import { Alert
} from 'reactstrap';

import {Button} from 'reactstrap'
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import DateTime from 'react-datetime';
import InputMask from 'react-input-mask';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import { UnControlled as CodeMirror } from 'react-codemirror2'
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class FormElements extends React.Component {
	constructor(props) {
		super(props);
		


		
		this.state = {
			orgname:'',
			description:'',
			place:'',
			phonenumber:'',
			date:'',
			time:'',
			campname:'',
			email:'',
			ref:'',
			pincode:'',
			redirectToReferrer: false,
			phone_error:null
		   };
	   
		   
	       	

		
		var maxYesterday = '';
		var minYesterday = DateTime.moment().subtract(1, 'day');
		
		this.minDateRange = (current) => {
			return current.isAfter( minYesterday );
				};
		this.maxDateRange = (current) => {
			return current.isAfter( maxYesterday );
		};
		this.minDateChange = (value) => {

			this.setState({date:value.toDate()});

			this.setState({
				maxDateDisabled: false
			});
			maxYesterday = value;
		};

		this.timeChange=(value)=>{
			console.log(value.toDate())
			this.setState({time:value.toDate()});
		}
		this.handleChange = (date) => {
			this.setState({
				startDate: date
			});
		}


			
 		
		this.codeMirrorOptions = {
			mode: 'application/xml',
			theme: 'material',
			lineNumbers: true,
			indentWithTabs: true,
			tabSize: 2,
			autoScroll: false
		}


			this.create = this.create.bind(this);
			this.onChange = this.onChange.bind(this);
			

	}


  


	create=()=>{
		if(this.state.orgname && this.state.description  && this.state.place && this.state.phonenumber && this.state.date  ){
			console.log('work')

		PostData('create',this.state).then((result) => {
			console.log('work')

			let responseJson = result;
		  
			if(responseJson){  
					
			  //popup verify email
			  // sessionStorage.setItem('userData',JSON.stringify(this.state));
			  this.setState({redirectToReferrer: true});
			}
			
			  
			
		   });
	}
}
	onChange(e){
		
		this.setState({[e.target.name]:e.target.value});

		if(e.target.name==='phonenumber')
   {
   var x = e.target.value;
   var y = x.toString();
   
   if (y.length!=10)
   {
    
     this.setState({phone_error:'invalid phone number'})
   }

   else{
    this.setState({phone_error:null})
   }
   }

	}

	render() {

		if (this.state.redirectToReferrer){
			return(<Redirect to ={'/table/data'}/>)
		  }
		  
		return (
						<Panel>
							<PanelHeader>
								Create Camp
							</PanelHeader>
							<PanelBody>
								<form  >
									<fieldset>

										
									
										<div className="form-group row m-b-15">
											<label className="col-md-3 col-form-label">Org name</label>
											<div className="col-md-7">
												<input type="text" className="form-control" placeholder="Org name"    name="orgname" onChange={this.onChange} />
											</div>
										</div>

										<div className="form-group row m-b-15">
											<label className="col-md-3 col-form-label">Email</label>
											<div className="col-md-7">
											<input type="email" className="form-control"  placeholder="Enter email" name="email" onChange={this.onChange} />

											</div>
										</div>

										
										<div className="form-group row m-b-15">
											<label className="col-md-3 col-form-label">Ref.NO:</label>
											<div className="col-md-7">
											<input type="number" className="form-control"  placeholder="Enter Ref.NO:" name="ref" onChange={this.onChange} />

											</div>
										</div>

										<div className="form-group row m-b-15">
											<label className="col-md-3 col-form-label">Camp Name</label>
											<div className="col-md-7">
											<input type="text" className="form-control" placeholder="Camp_Name"    name="campname" onChange={this.onChange} />
											</div>
										</div>


										<div className="form-group row m-b-15">
											<label className="col-md-3 col-form-label">Description</label>
											<div className="col-md-7">
											<textarea rows="4" cols="50"  className="form-control" placeholder="description"    name="description" onChange={this.onChange}/>
											</div>
										</div>

										<div className="form-group row m-b-15">
											<label className="col-md-3 col-form-label">Date</label>
											<div className="col-md-7">
											<DateTime  timeFormat={false} isValidDate={ this.minDateRange } inputProps={{ placeholder: 'Date' }} closeOnSelect={true} onChange={ this.minDateChange } />
											</div>
										</div>

										<div className="form-group row m-b-15">
											<label className="col-md-3 col-form-label">Start Time</label>
											<div className="col-md-7">
											<DateTime dateFormat={false} inputProps={{ placeholder: 'Time' }}   name="time" onChange={this.timeChange}  />
											</div>
										</div>


										<div className="form-group row m-b-15">
											<label className="col-md-3 col-form-label">Phone Number</label>
											<div className="col-md-7">
											{this.state.phone_error?<Alert color="danger">{this.state.phone_error}</Alert> : null}

											<input type="number"  className="form-control" placeholder="phonenumber"  name="phonenumber" onChange={this.onChange}  />
											</div>
										</div>


										<div className="form-group row m-b-15">
											<label className="col-md-3 col-form-label">Location</label>
											<div className="col-md-7">
											<input type="text" className="form-control" placeholder="Location"  name="place" onChange={this.onChange} />
											</div>
										</div>

										<div className="form-group row m-b-15">
											<label className="col-md-3 col-form-label">Pincode</label>
											<div className="col-md-7">
											<input type="text" className="form-control" placeholder="Pincode"  name="pincode" onChange={this.onChange} />
											</div>
										</div>


										<div className="form-group row">
											<div className="col-md-7 offset-md-3">
											<Button color="dark" block onClick={this.create}>
           Create 
            </Button>

 
											</div>
										</div>
									</fieldset>

								</form>

							</PanelBody>
							
						</Panel>
			
		)
	}
}

export default FormElements;