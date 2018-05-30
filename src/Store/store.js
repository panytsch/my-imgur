import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
const init = {
  data: [],
  currentPage: 1
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

function reducer2(state = [], action) {
  switch (action.type) {
    case "CLICK_2":
      return [...state, action.text];
    default:
      return state;
  }
}

const reducers = combineReducers({ galerryList, reducer2 });

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
