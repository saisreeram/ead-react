import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import axios from 'axios';
import { Panel, PanelHeader } from './../../components/panel/panel.jsx';
import 'react-table/react-table.css';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import SweetAlert from 'react-bootstrap-sweetalert';

class UsersRequestTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			"regUsers": [],
		}
		this.defaultSorted = [
			{
				id: "timstamp",
				desc: true
			}
		];
		this.tableColumns = [
			{
				Header: 'Information',
				columns: [
					{
						Header: 'Name',
						accessor: 'name',
					},
					{
						Header: 'Date Of Birth',
						accessor: 'dob',
					},
					{
						Header: 'Phone Number',
						accessor: 'phone_no',
					},
				]
			},
			{
				Header: "Identity Details",
				columns: [
					{
						Header: "User Name",
						accessor: "user_name"
					},
					{
						Header: "Email",
						accessor: "email"
					},
					{
						Header: "Aadhar Num",
						accessor: "aadhar_num"
					}
				]
			},
			{
				Header: 'Address Details',
				columns: [
					{
						Header: "City",
						accessor: "city"
					},
					{
						Header: "Pin-Code",
						accessor: "pincode"
					},
				]
			},
			{
				Header: 'Portal',
				columns: [
					{
						Header: "Accept",
						accessor: "user_name",
						Cell: row => (
							<span>
								<button type="button" className="btn btn-primary" onClick={() => {this.acceptUser(row.row.user_name)}}>Accept</button>
							</span>
						)
					},
					{
						Header: "Reject",
						accessor: "user_name",
						Cell: row => (
							<span>
								<button type="button" className="btn btn-danger" onClick={() => {this.rejectUser(row.row.user_name)}}>Reject</button>
							</span>
						)
					}
				]
			},
		]
	}

	acceptUser(user_name) {
		console.log(user_name);
		const base_url = "https://1ss6x6o5ij.execute-api.us-east-1.amazonaws.com/test";
		var payload = {
			"user_name": user_name,
			"accept": 1
		}
		axios.post(base_url, payload,
			{
				'Access-Control-Allow-Origin': '*',
			}
		)
		.then(response => {
			if (response.data.result === "updated")
				console.log("done");
			else
				console.log("not done")
		});
	}

	rejectUser(user_name) {
		console.log(user_name);
		const base_url = "https://1ss6x6o5ij.execute-api.us-east-1.amazonaws.com/test";
		var payload = {
			"user_name": user_name,
			"accept": 0
		}
		axios.post(base_url, payload)
		.then(response => {
			if (response.data.result === "deleted")
				console.log("done");
			else
				console.log("not done")
		});
	}


	componentDidMount(){
		var apiBaseUrl = "https://0lqob3wfub.execute-api.us-east-1.amazonaws.com/test";
		axios.post(apiBaseUrl)
		.then(response => {
			console.log(response.data);
			this.setState({ regUsers: response.data.users });
		});
	};

	render() {
		return (
			<div>
				<Panel>
					<PanelHeader>
						Registered Employees Whose verification is pending
					</PanelHeader>
					<ReactTable filterable data={this.state.regUsers} columns={this.tableColumns} defaultPageSize={5} defaultSorted={this.defaultSorted} className="-highlight" />
				</Panel>
				{(this.state.cancel_transaction &&
					<SweetAlert danger showCancel
						confirmBtnText="Yes, delete it!"
						confirmBtnBsStyle="danger"
						cancelBtnBsStyle="default"
						title="Are you sure?"
						onConfirm={() => this.delete_transaction()}
						onCancel={() => this.setState({cancel_transaction: false})}
					>
						Are you sure you want to cancel transaction with payment id: <b>{this.state.pmnt_id}</b>.<br/>
						This action is irreversible.
					</SweetAlert>
				)}
			</div>
		)
	}
}

class TermsTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		this.defaultSorted = [
			{
				id: "dueDate",
				desc: false
			}
		];
		this.tableColumns = [
			{
				Header: "Information",
				columns: [
					{
						Header: "Student",
						accessor: "enrollNum"
					},
					{
						Header: "Term Name",
						accessor: "termName"
					},
					{
						Header: "Due Date",
						accessor: "dueDate",
					},
					{
						Header: "Session",
						accessor: "session"
					},
					{
						Header: "Due Total",
						accessor: "termTot",
					},
				]
			},
			{
				Header: 'Status',
				columns: [
					{
						Header: "Due Amount",
						accessor: "termDue"
					},
					{
						Header: "Payment",
						accessor: "isDone",
						Cell: row => (
							<span>
								<i className="fa fa-circle f-s-7 fa-fw m-r-10 pull-left m-t-5" style={{
									color: (row.value === true) ? '#00acac' : '#ff5b57',
									transition: 'all .3s ease'
								}}>
								</i> {
									(row.value === true) ? 'Paid' : 'Pending'
								}
							</span>
						)
					},
				]
			},
		]
	}
	
	render() {
		return (
			<div>
				<Panel>
					<PanelHeader>
						Payment's Done
					</PanelHeader>
					<ReactTable filterable data={this.state.terms_due} columns={this.tableColumns} defaultPageSize={10} defaultSorted={this.defaultSorted} className="-highlight" />
				</Panel>
			</div>
		)
	}
}

class StaffDashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			name: "",
			transactions: [],
			stdnt_terms: [],
		}
	}

	componentDidMount() {
		var email = localStorage.getItem("email");
		var name = localStorage.getItem("name");
		var phone_no = localStorage.getItem("phone_no");
		if (!(email && name && phone_no)){
			this.props.history.push("/user/login/");
		}
		else{
			this.setState({
				email: email,
				name: name,
				phone_no: phone_no
			});
		}
	}

	render() {
		return (
			<div>
				<ol className="breadcrumb float-xl-right">
					<li className="breadcrumb-item"><Link to="/">Home</Link></li>
					<li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
				</ol>
				<h1 className="page-header">{this.state.name} 's&nbsp;<small>&nbsp;dashboard</small></h1>
				<div className="row">
					<div className="col-xl-12">
						<UsersRequestTable tnsctn_details={this.state.transactions}/>
					</div>
					<div className="col-xl-12">
						<TermsTable term_details={this.state.stdnt_terms} />
					</div>
				</div>
			</div>
		)
	}
};

export default withRouter(StaffDashboard);