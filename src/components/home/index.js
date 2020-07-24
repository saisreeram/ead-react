import React from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { PageSettings } from './../../config/page-settings.js';
import car from './../../assets/img/login-bg/login-bg-19.jpg';
class Home extends React.Component {
	static contextType = PageSettings;

	componentDidMount() {
		this.context.handleSetPageSidebar(false);
	}

	componentWillUnmount() {
		this.context.handleSetPageSidebar(true);
	}
	
	render() {
		return ( <h1>home</h1>

					)
	}
}

export default Home;