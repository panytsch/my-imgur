import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import MainList from "./Components/MainList";
import store from "./Store/store";
import PostPage from "./Components/PostPage";

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div style={{ font: "2vh Arial, sans-serif" }}>
				<Route exact path="/" component={MainList} />
				<Route path="/posts/:id" component={PostPage} />
			</div>
		</Router>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
