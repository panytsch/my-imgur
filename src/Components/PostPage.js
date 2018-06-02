import React from "react";
import axios from "axios";
import PostPageStyle from "./PostPageStyle";
import conf from "../Config";

class PostPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			img: null
		};
	}
	componentWillMount() {
		this.id = this.props.match.params.id;
		axios
			.get(`https://api.imgur.com/3/image/${this.id}`, conf.options)
			.then(response => {
				this.setState(Object.assign(this.state, { img: response.data.data }));
			});
	}
	render() {
		let { img } = this.state;
		return (
			<PostPageStyle>
				{this.state.img ? (
					<div>
						<img src={img.link} alt={img.title} />
					</div>
				) : (
					<div>loading...</div>
				)}
			</PostPageStyle>
		);
	}
}

export default PostPage;
