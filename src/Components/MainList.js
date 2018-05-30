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
    this.infinityScroll.bind(this);
    this.state = {
      perPage: 40
    };
    this.currentKey = 0;
  }

  componentWillMount() {
    window.removeEventListener("scroll", this.infinityScroll);
    this.fetchData();
  }
  componentDidMount() {
    window.addEventListener("scroll", this.infinityScroll);
  }
  fetchData() {
    axios
      .get(conf.url(this.currentKey), conf.options)
      .then(response => {
        let res = response.data.data;
        this.props.fetchDataRedux(res);
        ++this.currentKey;
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

    // console.log("pageYOffset: ", window.pageYOffset); // current height
    // console.log("scrollTop: ", document.documentElement.scrollTop); // current height
    // console.log("clientHeight: ", document.documentElement.clientHeight); // height of window (actually document)
    // console.log("scrollHeight: ", document.documentElement.scrollHeight); // height of scroll area
    // console.log("-------------------------------"); // :) have fun
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
  currentPage: state.galerryList.currentPage
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(MainList)
);
