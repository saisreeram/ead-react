import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup, CardColumns, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardSubtitle, CardHeader, CardFooter, Button, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Campaccept extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			sweetAlertSuccess: false,
			isLoading: true,
			data:[],
			campid:"",
			orgname:"",
			check:"",
		}
		this.codeMirrorOptions = {
			mode: 'application/xml',
			theme: 'material',
			lineNumbers: true,
			indentWithTabs: true,
			tabSize: 2,
			autoScroll: false
		}
		this.onChange = this.onChange.bind(this);

		this.toggleSweetAlert = this.toggleSweetAlert.bind(this);
		this.toggleModal = this.toggleModal.bind(this);

		

	}
	
	componentWillMount(){
		this.fetchData();
	}

		componentDidMount(){
			this.fetchData();

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





		delete=()=>{
			this.setState({ modalAlert: !this.state.modalAlert })
			fetch('	https://5zjewi7718.execute-api.us-east-1.amazonaws.com/deletecamp'
			, {
					method: 'POST',
					  headers:{
						'Content-Type':'application/json',
						
					  },
					  body: JSON.stringify({ campid:this.state.campid,orgname:this.state.orgname,reason:this.state.check })
				  })
				  .then(response => response.json())
				  .then(data => this.setState({ data: data.response,isLoading:false}))


		}		  
		
		onChange(e){
			console.log(e.target.value)
			this.setState({[e.target.name]:e.target.value});
			
		 
		   }

		toggleModal(campid,orgname) {this.setState({ modalAlert: !this.state.modalAlert ,campid:campid,orgname:orgname});

		}

		toggleSweetAlert(campid,orgname) {
			
					this.setState({ sweetAlertSuccess: !this.state.sweetAlertSuccess ,campid:campid,orgname:orgname});
					
			}
		

  
	render() {
		return (
	<div className="row">
			{!this.state.isLoading? this.state.data.map((item)=>(

					<div className="col-xl-4">
						<Card className="border-0">

							<CardBody>
								<CardText>

                                          <div class="row my-2">
                                            <div class="col ">Org_name</div>
                                            <div class="col">:</div>
                                            <div class="col ">{item.orgname} </div>
                                          </div>
										  
										  
										  <div class="row my-2">
                                            <div class="col ">Ref.No:</div>
                                            <div class="col">:</div>
                                            <div class="col ">{item.ref} </div>
                                          </div>
										  
										  <div class="row my-2">
                                            <div class="col ">Camp_Name</div>
                                            <div class="col">:</div>
                                            <div class="col ">{item.campname} </div>
                                          </div>
										  
										  <div class="row my-2">
                                            <div class="col ">Date</div>
                                            <div class="col">:</div>
                                            <div class="col ">{item.date} </div>
                                          </div>
										  
										  <div class="row my-2">
                                            <div class="col ">Location</div>
                                            <div class="col">:</div>
                                            <div class="col ">{item.location} </div>
                                          </div>
										  
										  <div class="row my-2">
                                            <div class="col ">Phonenumber</div>
                                            <div class="col">:</div>
                                            <div class="col ">{item.phonenumber} </div>
                                          </div>
												  
										  
										  </CardText>



										  <button onClick={() => this.toggleSweetAlert(item.campid,item.orgname)} className="btn btn-success">Accept</button>	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	&nbsp;&nbsp;
										  <button onClick={() => this.toggleModal(item.campid,item.orgname)} className="btn btn-danger">Reject</button>
										 

					</CardBody>
						</Card>
						<br></br><br></br><br></br>
					</div>											)) :<div className="fa-3x">	<i className="fas fa-sync fa-spin"></i>

</div>} <Modal isOpen={this.state.modalAlert} toggle={() => this.toggleModal('modalAlert')}>
          							<ModalBody>
									<div className="alert alert-danger m-b-0">
										<h5><i className="fa fa-info-circle"></i> Are you sure !!!</h5>
										
										<div className="form-group row m-b-15">
											<label className="col-md-3 col-form-label">Why do you want to delete</label>
											<div className="col-md-7">
											<textarea rows="4" cols="50"  className="form-control" placeholder=""   name="check" onChange={this.onChange}/>
											</div>
										</div>

									</div>

								</ModalBody>
								<ModalFooter>
									<button className="btn btn-white" onClick={() => this.toggleModal('modalAlert')}>Close</button>
									<button className="btn btn-danger" onClick={()=>this.delete()} >Action</button>
								</ModalFooter>
							</Modal>
					

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
						)}</div>


		)
	}
}

export default Campaccept;