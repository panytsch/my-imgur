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
  componentWillMount() {
    window.removeEventListener("scroll", this.infinityScroll);
    this.fetchData();
  }
  componentDidMount() {
    window.addEventListener("scroll", this.infinityScroll);
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
  infinityScroll(e) {
    // infinity scroll
    let height = window.pageYOffset || document.documentElement.scrollTop;
    let condition =
      height + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight;
    console.log(condition);
  }
  render() {
    return (
      <div className={mainStyle}>
        {this.props.datas.map(
          i =>
            i.images &&
            i.images[0].type !== "video/mp4" && <Post post={i} key={i.id} />
        )}
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
