import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import conf from "../Config";
import Post from "./Post";
import { css } from "emotion";

const mainStyle = css({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
  flexWrap: "wrap"
});

class MainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 10,
      page: 1
    };
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.infinityScroll.bind(this));
  }
  componentWillMount() {
    this.fetchData();
  }
  componentDidMount() {
    console.log(this.state);
    window.addEventListener("scroll", this.infinityScroll.bind(this));
  }

  fetchData() {
    let { page, section, sort, __window } = this.props.filters;
    axios
      .get(conf.url(page, section, sort, __window), conf.options)
      .then(response => {
        let res = response.data.data;
        this.props.fetchDataRedux(res);
        console.log(res);
      })
      .catch(function(error) {
        console.log("Request failed", error);
      });
  }
  infinityScroll() {
    // infinity scroll
    let height = window.pageYOffset || document.documentElement.scrollTop;
    let condition =
      height + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight;
    console.log(this.state);
    if (condition) {
      let page = this.state.page + 1;
      this.setState(
        Object.assign(this.state, {
          page: page
        })
      );
    }
    console.log(condition);
  }
  render() {
    return (
      <div className={mainStyle}>
        {this.props.datas
          .slice(0, this.state.page * this.state.perPage)
          .map(i => <Post post={i} key={i.id} />)}
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
  }
});

const mapStateToProps = state => ({
  datas: state.galerryList.data,
  filters: state.galeryFilters
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(MainList)
);
