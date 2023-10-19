import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./Slices/counterSlice";
import { booleanSlice } from "./Slices/booleanSlice";
import { authUserSlice } from "./Slices/authUserSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    bool: booleanSlice.reducer,
    user: authUserSlice.reducer,
  },
});

export default store;
 