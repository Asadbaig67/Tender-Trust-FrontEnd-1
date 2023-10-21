import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { counterSlice } from "./Slices/counterSlice";
import { booleanSlice } from "./Slices/booleanSlice";
import { authUserSlice } from "./Slices/authUserSlice";
import { Web3Slice } from "./Slices/Web3Slice";

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  bool: booleanSlice.reducer,
  user: authUserSlice.reducer,
  web3: Web3Slice.reducer,
});


const persistConfig = {
  key: "root",
  storage, // This assumes you have configured storage correctly
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export default store;
export { persistor };
