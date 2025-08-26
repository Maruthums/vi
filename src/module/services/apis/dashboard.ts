import { createAsyncThunk } from "@reduxjs/toolkit";
// import API from "./network";

export const getDashboardData = createAsyncThunk(
  "dashboard/getDashboardData",
  async (_id: string, { rejectWithValue }) => {
    try {
    //   const response = await API.get(`/dashboard/${id}`);
    //   return response.data;

    return
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
