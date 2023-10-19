import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPublic: true,
  userProfile: false,
};

export const booleanSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    setpublic: (state, action) => {
      state.isPublic = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setpublic, setUserProfile } = booleanSlice.actions;

export default booleanSlice.reducer;
