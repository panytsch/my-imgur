import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
const init = {
  data: []
};
function galerryList(state = init, action) {
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      state.data = state.data.concat(action.payload);
      return { ...state };
    default:
      return state;
  }
}

function galeryFilters(
  state = {
    section: "hot",
    sort: "top",
    page: 0,
    __window: "day"
  },
  action
) {
  switch (action.type) {
    case "CLICK_2":
      return [...state, action.text];
    default:
      return state;
  }
}

const reducers = combineReducers({ galerryList, galeryFilters });

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
