import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  authUser: null,
  status: "idle",
  error: null,
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

      if (response.status === 201) {
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
      throw error;
    }
  }
);

export const authUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authUser = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authUser = action.payload;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authUserSlice.actions;

export default authUserSlice.reducer;
