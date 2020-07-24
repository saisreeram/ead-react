import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { PageSettings } from './../../config/page-settings.js';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

class Register extends React.Component {
	static contextType = PageSettings;
	
	constructor(props) {
		super(props);
		this.state={
			user_name: '',
			name: '',
			password: '',
			aadhar_num: '',
			date_of_birth: '',
			email: '',
			phone: '',
			lane1: '',
			lane2: '',
			area: '',
			landmark: '',
			city: '',
			district: '',
			state: '',
			pincode: '',
			usr_reg: false,
			usr_exist: false,
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.context.handleSetPageSidebar(false);
		
	}

	componentWillUnmount() {
		this.context.handleSetPageSidebar(true);
		
	}
	
	handleSubmit(event) {
		event.preventDefault();
		var payload={
			user_name: this.state.user_name,
			email: this.state.email,
			name: this.state.name,
			phone_no: this.state.phone,
			date_of_birth: this.state.date_of_birth,
			password: this.state.password,
			aadhar_no: this.state.aadhar_num,
			lane1: this.state.lane1,
			lane2: this.state.lane2,
			street: this.state.area,
			landmark: this.state.landmark,
			city: this.state.city,
			district: this.state.district,
			state: this.state.state,
			pincode: this.state.pincode
		}

		const aws_reg_emp = "https://ibfm0ndwei.execute-api.us-east-1.amazonaws.com/test";
		console.log(payload);

		axios.post(aws_reg_emp, payload)
		.then(resp => {
			console.log(resp);
			if(resp.data.status === 1){
				window.location = "/";
				this.setState({
					usr_reg: true
				});
			}
			else if(resp.data.status === 0){
				this.setState({
					usr_exist: true
				});
			}
		}).catch(error => {
			console.log(error);
		});
	}
  
	render() {
		return (
			<div className="register register-with-news-feed">
				<div className="news-feed">
					<div className="news-image" style={{ backgroundImage: 'url(/assets/img/login-bg/login-bg-9.jpg)' }}></div>
					<div className="news-caption">
						<h4 className="caption-title"><b>WellBE</b> Online Awareness Programme</h4>
						<p>
							By registering, you will involve yourself in a lot of activities including conducting awareness programmes, interacting with
							people in villages, conducting events and attending NGO organised camps.
						</p>
					</div>
				</div>
				<div className="right-content">
					<h1 className="register-header">
						Sign Up
						<small>Create your WellBE  Employee Account.</small>
					</h1>
					<div className="register-content">
						<form className="margin-bottom-0" onSubmit={this.handleSubmit}>
							<label className="control-label">Name <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="text" className="form-control" placeholder="Name" required 
									onChange = {(event) => this.setState({name:event.target.value})}/>
								</div>
							</div>
							<label className="control-label">Email <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="email" className="form-control" placeholder="Email address" required 
									onChange = {(event) => this.setState({email:event.target.value})}/>
								</div>
							</div>

							<label className="control-label">User Name <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="text" className="form-control" placeholder="User Name" required 
									onChange = {(event) => this.setState({user_name:event.target.value})}/>
								</div>
							</div>


							<label className="control-label">Password <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="password" className="form-control" placeholder="Password" required 
									onChange = {(event) => this.setState({password:event.target.value})}/>
								</div>
							</div>
							<label className="control-label">Phone Number <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="number" max={9999999999} min={1000000000} className="form-control" placeholder="Primary Contact Number" required 
									onChange = {(event) => this.setState({phone:event.target.value})}/>
								</div>
							</div>
							<label className="control-label">Date of Birth<span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<DateTime inputProps={{ placeholder: 'Date of Birth' }} closeOnSelect={true} />
								</div>
							</div>
							<label className="control-label">Aadhar Number <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="number" min={100000000000} max={9999999999999} className="form-control" placeholder="Aadhar number" required 
									onChange = {(event) => this.setState({aadhar_no:event.target.value})}/>
								</div>
							</div>
							<label className="control-label">Address Lane 1 <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="text" className="form-control" placeholder="Lane 1" required 
									onChange = {(event) => this.setState({lane1:event.target.value})}/>
								</div>
							</div>
							<label className="control-label">Address Lane 2 <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="text" className="form-control" placeholder="Lane 2" required 
									onChange = {(event) => this.setState({lane2:event.target.value})}/>
								</div>
							</div>
							<label className="control-label">Area <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="text" className="form-control" placeholder="Area" required 
									onChange = {(event) => this.setState({area:event.target.value})}/>
								</div>
							</div>
							<label className="control-label">Landmark <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="text" className="form-control" placeholder="Landmark" required 
									onChange = {(event) => this.setState({landmark:event.target.value})}/>
								</div>
							</div>
							<label className="control-label">City <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="text" className="form-control" placeholder="City" required 
									onChange = {(event) => this.setState({city:event.target.value})}/>
								</div>
							</div>
							<label className="control-label">District <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="text" className="form-control" placeholder="District" required 
									onChange = {(event) => this.setState({district:event.target.value})}/>
								</div>
							</div>
							<label className="control-label">State <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="text" className="form-control" placeholder="State" required 
									onChange = {(event) => this.setState({state:event.target.value})}/>
								</div>
							</div>
							<label className="control-label">Pin-Code <span className="text-danger">*</span></label>
							<div className="row m-b-15">
								<div className="col-md-12">
									<input type="number" max={999999} min={100000} className="form-control" placeholder="Pincode" required 
									onChange = {(event) => this.setState({pincode:event.target.value})}/>
								</div>
							</div>
							<div className="checkbox checkbox-css m-b-30">
								<div className="checkbox checkbox-css m-b-30">
									<input type="checkbox" id="agreement_checkbox" value="" />
									<label htmlFor="agreement_checkbox">
										By clicking Sign Up, you agree to our <Link to="/user/register-v3">Terms</Link> and that you have read our <Link to="/register">Data Policy</Link>, including our <Link to="/register">Cookie Use</Link>.
									</label>
								</div>
							</div>
							<div className="register-buttons">
								<button type="submit" className="btn btn-primary btn-block btn-lg">Sign Up</button>
							</div>
							<hr />
							<p className="text-center">
								&copy; WellBE All Right Reserved 2020
							</p>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(Register);