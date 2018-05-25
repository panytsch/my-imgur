import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
const url = "https://api.imgur.com/3/gallery/hot/top/day/1?album_previews=true";
const settings = {
	headers: {
		authorization: "Client-ID d957cd89bbfd69b"
	}
};
class App extends Component {
	state = { data: [], perPage: 50, currentPage: 0 };
	componentWillMount() {
		axios
			.get(url, settings)
			.then(response => {
				let res = response.data.data;
				res = res.filter(i => {
					if (!i.privacy || i.privacy === "hidden") {
						return true;
					} else {
						return true;
					}
				});
				this.props.handleClick(res);
				// this.setState(this.state.data, response.data.data)
			})
			.catch(function(error) {
				console.log("Request failed", error);
			});
	}
	render() {
		const { datas } = this.props;
		console.log(datas[0]);
		return (
			<div>
				{datas[0] &&
					datas[0].map((i, key) => {
						if (key > this.state.perPage * (this.state.currentPage + 1)) {
							return;
						}
						return (
							<img
								src={(i.images && i.images[0].link) || i.link}
								height="200"
								key={key}
							/>
						);
					})}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	handleClick: data => {
		return dispatch({
			type: "CLICK",
			payload: data
		});
	}
});

const mapStateToProps = state => ({
	datas: state.reducer1
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
