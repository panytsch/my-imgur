import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import conf from "../Config";
import Post from "./Post";
import Header from "./MainListHeader";
import { css } from "emotion";

const mainStyle = css({
	display: "flex",
	justifyContent: "space-around",
	alignItems: "stretch",
	flexWrap: "wrap",
	marginTop: "4em"
});

class MainList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			perPage: 40,
			page: 1
		};
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.infinityScroll.bind(this));
	}
	componentWillMount() {
		// this.filters = Object.assign({}, this.props.filters || {});
		if (!this.props.datas.length) {
			this.props.fetchDataRedux();
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}
	// componentWillReceiveProps(nextProps) {
	// 	if (JSON.stringify(this.filters) !== JSON.stringify(this.props.filters)) {
	// 		this.props.clearData();
	// 		this.fetchData();
	// 		this.filters = Object.assign({}, this.props.filters || {});
	// 	}
	// }
	componentDidMount() {
		window.addEventListener("scroll", this.infinityScroll.bind(this));
	}

	infinityScroll() {
		// infinity scroll
		let height = window.pageYOffset || document.documentElement.scrollTop;
		let condition =
			height + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight;
		if (condition) {
			let page = this.state.page + 1;
			this.setState(
				Object.assign(this.state, {
					page: page
				})
			);
			let { filters, changeFilters, datas } = this.props;
			if (this.state.page * this.state.perPage >= datas.length) {
				this.props.fetchDataRedux();
			}
		}
	}
	render() {
		// console.log(this.props.datas);
		let currentData =
			(this.props.datas &&
				this.props.datas.slice(0, this.state.page * this.state.perPage)) ||
			[];
		return (
			<div>
				<Header handleChange={this.props.changeFilters} />
				<div className={mainStyle}>
					{currentData.map(i => <Post post={i} key={i.id} />)}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	fetchDataRedux: () => {
		return dispatch({
			type: "FETCH_DATA_SUCCESS"
		});
	},
	changeFilters: data => {
		return dispatch({
			type: "CHANGE_FILTER",
			filters: data
		});
	},
	clearData: () => {
		return dispatch({
			type: "CLEAR_DATA"
		});
	}
});

const mapStateToProps = state => ({
	datas: state.galerryList.data,
	filters: state.galerryList.filters
});

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(MainList)
);
