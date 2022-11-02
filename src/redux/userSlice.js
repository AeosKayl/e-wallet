import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async () => {
  let response = await fetch("https://randomuser.me/api/");
  let data = await response.json();
  console.log(data);
  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  status: "",
  reducers: {
    //no actions needed
  },
  extraReducers: {
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "Data retrieved!";
    },
    [getUser.pending]: (state, action) => {
      state.status = "Please wait for data...";
    },
    [getUser.rejected]: (state, action) => {
      state.status = "Unable to get data.";
    },
  },
});

export default userSlice.reducer;
