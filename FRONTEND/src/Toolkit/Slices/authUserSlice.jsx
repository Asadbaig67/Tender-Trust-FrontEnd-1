import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  authUser: null,
  status: "idle",
  error: null,
  loginLoading: false,
  registerLoading: false,
};

// To Sign-Up User
export const signUpUser = createAsyncThunk(
  "authUser/signUpUser",
  async (signUpData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/contractor/register",
        signUpData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        return response.data; // You can adjust this based on your API response format
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      throw error;
    }
  }
);

// To Login User
export const loginUser = createAsyncThunk(
  "authUser/loginUser",
  async (loginData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/contractor/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.log("Bhai idhr aya hua hn main");
      throw error;
    }
  }
);

export const authUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.authUser = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  setLoginLoading: (state, action) => {
    state.loginLoading = action.payload;
  },
  setRegisterLoading: (state, action) => {
    state.registerLoading = action.payload;
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authUser = action.payload;
        state.loginLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.loginLoading = false;
        state.error = action.error.message;
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
        state.registerLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.registerLoading = false;
        // state.authUser = null;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.registerLoading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLoginLoading, setRegisterLoading, setStatus } =
  authUserSlice.actions;

export default authUserSlice.reducer;
