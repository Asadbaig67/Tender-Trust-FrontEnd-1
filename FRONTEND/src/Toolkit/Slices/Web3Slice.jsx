import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  web3: null,
  contract: null,
  account: null,
};

export const Web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    setMetaMaskCred: (state, action) => {
      state.web3 = action.payload.web3;
      state.contract = action.payload.contract;
      state.account = action.payload.account;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMetaMaskCred } = Web3Slice.actions;

export default Web3Slice.reducer;
