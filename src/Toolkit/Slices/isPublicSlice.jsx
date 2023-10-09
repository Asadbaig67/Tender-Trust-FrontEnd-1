import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPublic: true,
};

export const isPublicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    setpublic: (state, action) => {
      state.isPublic = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setpublic } = isPublicSlice.actions;

export default isPublicSlice.reducer;
