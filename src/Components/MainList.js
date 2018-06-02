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
			perPage: 11,
			page: 1
		};
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.infinityScroll.bind(this));
	}
	componentWillMount() {
		console.log(1);
		if (!this.props.datas.length) {
			this.fetchData();
		}
	}
	componentDidMount() {
		window.addEventListener("scroll", this.infinityScroll.bind(this));
	}

	fetchData() {
		let { page, section, sort, __window } = this.props.filters;
		axios
			.get(conf.url(page, section, sort, __window), conf.options)
			.then(response => {
				let res = response.data.data.filter(
					i =>
						i.images && i.images[0] && i.images[0].type !== "video/mp4" && true
				);
				this.props.fetchDataRedux(res);
			})
			.catch(function(error) {
				console.log("Request failed", error);
			});
	}
	componentWillReceiveProps(nextProps) {
		// console.log(nextProps.filters, this.props.filters);
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
			let reduxPage = filters.page + 1;
			if (this.state.page * this.state.perPage >= datas.length) {
				changeFilters(Object.assign(filters, { page: reduxPage }));
				this.fetchData();
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
				<Header />
				<div className={mainStyle}>
					{currentData.map(i => <Post post={i} key={i.id} />)}
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	fetchDataRedux: data => {
		return dispatch({
			type: "FETCH_DATA_SUCCESS",
			payload: data
		});
	},
	changeFilters: data => {
		return dispatch({
			type: "CHANGE_FILTER",
			filters: data
		});
	}
});

const mapStateToProps = state => ({
	datas: state.galerryList.data,
	filters: state.galeryFilters
});

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(MainList)
);
