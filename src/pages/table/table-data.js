import React from 'react';
import namor from "namor";
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader } from './../../components/panel/panel.jsx';
import 'react-table/react-table.css';


const range = len => {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

const newPerson = () => {
	return {
		firstName: namor.generate({ words: 1, numbers: 0 }),
		lastName: namor.generate({ words: 1, numbers: 0 }),
		age: Math.floor(Math.random() * 30),
		visits: Math.floor(Math.random() * 100),
		progress: Math.floor(Math.random() * 100),
		
	};
};

function makeData(len = 5553) {
	return range(len).map(d => {
		return {
			...newPerson(),
		};
	});
}

class TableData extends React.Component {
	constructor(props) {
		super(props);
		this.state={
		data:[]
	}
		this.defaultSorted = [
			{
				id: "campid",
				desc: false
			}
		];

		this.tableColumns = [
					{
						Header: "orgname",
						accessor: "orgname"
					},
					
				
			
			
					{
						Header: "CampName",
						accessor: "campname"
					},
				
					{
						Header: "Email",
						accessor: "email"
					},
					
			
			

					{
						Header: "Date",
						accessor: "date"
					},
					
					
					
				
			
					{
						Header: "Location",
						accessor: "location"
					},
					
				
				{
						Header: "Phone_No",
						accessor: "phonenumber"
					},
					{
						Header: "Status",
						accessor: "status"
					},
			
			
			
		]

	}


	
	componentWillMount(){
		this.fetchData();
	}

		componentDidMount(){
			this.fetchData();
			console.log(this.state.data)

		}

		fetchData(){
				fetch('https://9lme4xn9ya.execute-api.us-east-1.amazonaws.com/viewcampall', {
					method: 'POST',
					  headers:{
						'Content-Type':'application/json',
						
					  }
				  })
				.then(response => response.json())
				.then(data => this.setState({ data: data.response,isLoading:false }))
				


		}

		loading(){
			this.data=this.state.data
			console.log(this.data)
		}



	
	render() {
		return (
			<div>
				
				<Panel>
					<PanelHeader>
						History of Camps
					</PanelHeader>
					{!this.state.isLoading?this.loading() :null}

					<ReactTable filterable data={this.data} columns={this.tableColumns} defaultPageSize={10} defaultSorted={this.defaultSorted} className="-highlight" />
					
				</Panel>
			</div>
		)
	}
}

export default TableData;