import React from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { PageSettings } from './../../config/page-settings.js';

class PageWithoutSidebar extends React.Component {
	static contextType = PageSettings;

	componentDidMount() {
		this.context.handleSetPageSidebar(false);
	}

	componentWillUnmount() {
		this.context.handleSetPageSidebar(true);
	}
	
	render() {
		return (
			<div>
				
				<p>
					<Link to="/page-option/with-footer" className="btn btn-success">
						<i className="fa fa-arrow-circle-left"></i> Back to previous page
					</Link>
				</p>
			</div>
		)
	}
}

export default PageWithoutSidebar;