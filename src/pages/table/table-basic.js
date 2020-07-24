import React from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import { UnControlled as CodeMirror } from 'react-codemirror2'
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class UIGeneral extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			sweetAlertSuccess: false,
			isLoading: true,
			data:[],
			campid:"",
			orgname:"",
		}
		this.codeMirrorOptions = {
			mode: 'application/xml',
			theme: 'material',
			lineNumbers: true,
			indentWithTabs: true,
			tabSize: 2,
			autoScroll: false
		}
		this.toggleSweetAlert = this.toggleSweetAlert.bind(this);
		
	}
	
	componentWillMount(){
		this.fetchData();
	}

		componentDidMount(){
			this.fetchData();
			console.log(this.state.data)

		}

		fetchData(){
				fetch('https://1lc573ctyg.execute-api.us-east-1.amazonaws.com/viewcamp', {
					method: 'POST',
					  headers:{
						'Content-Type':'application/json',
						
					  }
				  })
				.then(response => response.json())
				.then(data => this.setState({ data: data.response,isLoading:false }))
				


		}

		create=()=>{
			console.log(this.state.campid,this.state.orgname)
			
			fetch('https://k3wx95iode.execute-api.us-east-1.amazonaws.com/acceptcamp'
			, {
					method: 'POST',
					  headers:{
						'Content-Type':'application/json',
						
					  },
					  body: JSON.stringify({ campid:this.state.campid,orgname:this.state.orgname })
				  })
				  .then(response => response.json())
				  .then(data => this.setState({ data: data.response,isLoading:false ,sweetAlertSuccess:!this.state.sweetAlertSuccess}))


				  
			

		}



		toggleSweetAlert(campid,orgname) {
			
					this.setState({ sweetAlertSuccess: !this.state.sweetAlertSuccess ,campid:campid,orgname:orgname});
					
			}
		



	render() {



		return ( 

						
						<Panel>
							<PanelHeader>Responsive Table</PanelHeader>
							<PanelBody>
								<div className="table-responsive">
									<table className="table">
										<thead>
											<tr>
												<th className="text-nowrap">Org_Name</th>
												<th className="text-nowrap">Camp_Name</th>

												<th className="text-nowrap">Date </th>
												{/* <th className="text-nowrap">Time</th> */}
												<th className="text-nowrap">Location</th>
												<th className="text-nowrap">Phone_Number</th>

												<th className="text-nowrap">Accept</th>
												{/* <th className="text-nowrap">check</th> */}

											</tr>
										</thead>
										<tbody>
										{!this.state.isLoading? this.state.data.map((item)=>(
											<tr>
										<td>{item.orgname}</td>
										<td>{item.campname}</td>
										<td>{item.date}</td>

										{/* <td>{item.time}</td> */}
										<td>{item.location}</td>
										<td>{item.phonenumber}</td>
										{/* <td><input type="submit" className="button" value="accept"  onClick={()=>{this.create(item.campid,item.orgname)}} /></td> */}
										<td><button onClick={() => this.toggleSweetAlert(item.campid,item.orgname)} className="btn btn-success m-r-5">Accept</button>
</td>
											</tr>
											)) : null}	
										</tbody>
									</table>

									{(this.state.sweetAlertSuccess &&
							<SweetAlert success showCancel
								confirmBtnText="Continue"
								confirmBtnBsStyle="success"
								cancelBtnBsStyle="default"
								title="Are you sure?"
								onConfirm={() => this.create()}
								onCancel={() => this.toggleSweetAlert("","")}
							>
							</SweetAlert>
						)}
								</div>
							</PanelBody>
		
						</Panel>
						

		)
	}
}

export default UIGeneral;