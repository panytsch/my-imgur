import React from "react";
import axios from "axios";
import conf from "../Config";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

class PostPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			img: null
		};
	}
	componentWillMount() {
		this.id = this.props.match.params.id;
		this.fetchData();
	}
	fetchData() {
		axios
			.get(`https://api.imgur.com/3/image/${this.id}`, conf.options)
			.then(response => {
				this.setState(Object.assign(this.state, { img: response.data.data }));
			});
	}
	render() {
		let { img } = this.state;
		return (
			<div className="mui-container-fluid" style={{ marginTop: "2em" }}>
				{this.state.img ? (
					<div className="mui-row">
						<div className="mui-col-md-6 mui-col-md-offset-3">
							<Card>
								<img
									width="100%"
									src={img.link}
									alt={img.title}
									style={{
										maxHeight: img.height,
										maxWidth: img.width
									}}
								/>
								<CardBody>
									<CardTitle>{img.title}</CardTitle>
									<CardText>{`Views: ${img.views}`}</CardText>
								</CardBody>
							</Card>
						</div>
					</div>
				) : (
					<div>loading...</div>
				)}
			</div>
		);
	}
}

export default PostPage;
