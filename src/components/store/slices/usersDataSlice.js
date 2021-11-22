import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUnique } from "../../functions";

export const fetchUsersData = createAsyncThunk(
   'news/fetchUsersData',
   async function (items, { rejectWithValue }) {
      try {
         const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?count=${items}`)
         return response.data.users
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

const initialState = {
   usersData: [],
   countUsers: 6,
   loadingUsers: false,
   errorUsers: null,
}

const usersDataSlice = createSlice({
   name: 'fetchUsersData',
   initialState,
   reducers: {
      unionLoadedUsers(state, action) {
         state.usersData = getUnique([...state.usersData, ...action.payload], 'id');
      },
      loadMoreUsers(state, action) {
         state.countUsers = state.countUsers + action.payload;
      }
   },
   extraReducers: {
      [fetchUsersData.pending]: (state, action) => {
         state.loadingUsers = true;
      },
      [fetchUsersData.fulfilled]: (state, action) => {
         state.loadingUsers = false;
         state.usersData = action.payload;
      },
      [fetchUsersData.rejected]: (state, action) => {
         state.loadingUsers = false;
         state.errorUsers = action.payload;
      },
   }
});

export const { unionLoadedUsers, loadMoreUsers } = usersDataSlice.actions;

export default usersDataSlice.reducer;