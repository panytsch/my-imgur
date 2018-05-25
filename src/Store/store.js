import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

function reducer1(state = [], action) {
  switch (action.type) {
    case "CLICK":
      return [...state, action.payload];
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

const reducers = combineReducers({ reducer1, reducer2 });

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
