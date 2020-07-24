import React from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { PageSettings } from './../../config/page-settings.js';
import car from './../../assets/img/login-bg/login-bg-19.jpg';
import logo from './../../assets/img/logo/wellbe_logo.jpeg';
import backgroundImage from './../../assets/img/logo/background_3007.jpeg';

class Home extends React.Component {
	static contextType = PageSettings;

	componentDidMount() {
		this.context.handleSetPageSidebar(false);
	}

	componentWillUnmount() {
		this.context.handleSetPageSidebar(true);
	}

	divStyle = {
		height: '90vh',
		backgroundImage: `url(${backgroundImage})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
	};


	render() {
		return (<div style={this.divStyle}>
			<table style={{ width: '100%', paddingtop:'10vh'}}>
				<tr>
					<td colSpan='2' style={{textAlign: 'center', justifyItems: 'center' }}><p style={{height: '13vh'}}></p><img src={logo}></img></td>
				</tr>
				<tr style={{height: '30vh'}}><td style={{ width: '50%', textAlign : 'left'}}>
					<p style={{ fontSize: 22 , paddingLeft: '4vw'}}> Our Web and mobile application provide users with personalised content and also engages with public by helping facilitate medical camps and more through our WellBe community.</p>
					{/* <p style={{ fontSize: 22 , paddingLeft: '5vw'}}>You can view </p> */}
				</td><td></td></tr>
			</table>
		</div>

		)
	}
}

export default Home;