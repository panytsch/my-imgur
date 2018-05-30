import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import conf from "./Config";

const inf = e => {
  // infinity scroll
  console.log("pageYOffset: ", window.pageYOffset); // current height
  console.log("scrollTop: ", document.documentElement.scrollTop); // current height
  console.log("clientHeight: ", document.documentElement.clientHeight); // height of window (actually document)
  console.log("scrollHeight: ", document.documentElement.scrollHeight); // height of scroll area
  console.log("-------------------------------"); // :) have fun
};
class App extends Component {
  state = { data: [], perPage: 50, currentPage: 0 };
  componentDidMount() {
    window.addEventListener("scroll", inf);
  }
  componentWillMount() {
    window.removeEventListener("scroll", inf);
    axios
      .get(conf.url(), conf.options)
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
