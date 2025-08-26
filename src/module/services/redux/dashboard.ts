import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getDashboardData } from "../apis/dashboard";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboard: {
      isLoading: false,
      status: "",
      data: [],
    },
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardData.pending, (state) => {
        state.dashboard.status = "pending";
        state.dashboard.isLoading = true;
      })
      .addCase(getDashboardData.fulfilled, (state, { payload }: any) => {
        state.dashboard.status = "success";
        state.dashboard.data = payload;
        state.dashboard.isLoading = false;
      })
      .addCase(getDashboardData.rejected, (state, action: any) => {
        state.dashboard.status = "failed";
        state.dashboard.data = [];
        state.dashboard.isLoading = false;
        toast.error(
          action?.payload?.message
            ? action?.payload?.message
            : "Something went wrong!"
        );
      })
    }
});

// export const { addFile, removeFile } = dashboardSlice.actions;
export default dashboardSlice.reducer;
