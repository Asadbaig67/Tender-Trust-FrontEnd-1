import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./Slices/counterSlice";
import { isPublicSlice } from "./Slices/isPublicSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    isPublic: isPublicSlice.reducer,
  },
});

export default store;
 