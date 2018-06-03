import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import axios from "axios";
import conf from "../Config";

function galerryList(
	state = {
		data: [],
		filters: {
			section: "hot",
			sort: "top",
			page: 1,
			__window: "day"
		}
	},
	action
) {
	switch (action.type) {
		case "FETCH_DATA_SUCCESS":
			let { page, section, sort, __window } = state.filters;
			axios
				.get(conf.url(page, section, sort, __window), conf.options)
				.then(response => {
					let res = response.data.data.filter(
						i =>
							i.images &&
							i.images[0] &&
							i.images[0].type !== "video/mp4" &&
							true
					);
					++state.filters.page;
					state.data = state.data.concat(res);
					return { ...state };
				})
				.catch(function(error) {
					console.log("Request failed", error);
				});
		case "CLEAR_DATA":
			state.data = [];
			return { ...state };
		case "CHANGE_FILTER":
			state.filters = Object.assign(state.filters, action.filters);
			return { ...state };
		default:
			return state;
	}
}
const reducers = combineReducers({ galerryList });

const store = createStore(
	reducers,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
