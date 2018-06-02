import React from "react";
import axios from "axios";
import PostPageStyle from "./PostPageStyle";
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
				console.log(response.data.data);
				this.setState(Object.assign(this.state, { img: response.data.data }));
			});
	}
	render() {
		let { img } = this.state;
		return (
			<PostPageStyle>
				{this.state.img ? (
					<div>
						<div>
							<Card className="card">
								<img width="100%" src={img.link} alt={img.title} />
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
			</PostPageStyle>
		);
	}
}

export default PostPage;
