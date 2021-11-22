import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersData } from "./usersDataSlice";

export const fetchFormData = createAsyncThunk(
   'news/fetchFormData',
   async function ({ values, getPositionIds, getToken, showModal }, { rejectWithValue, dispatch }) {
      const id = await getPositionIds();
      const token = await getToken();
      try {
         //Create formData
         let formData = new FormData();
         formData.append('position_id', id);
         for (let value in values) {
            formData.append(value, values[value]);
         }
         //Fetch Form Register New User
         const response = await axios({
            method: 'post',
            url: 'https://frontend-test-assignment-api.abz.agency/api/v1/users',
            data: formData,
            headers: {
               'Token': `${token}`
            }
         })
         showModal(true);
         dispatch(fetchUsersData(6));
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
);

const initialState = {
   formData: {},
   loadingForm: false,
   errorForm: null,
}

const formDataSlice = createSlice({
   name: 'formData',
   initialState,
   extraReducers: {
      [fetchFormData.pending]: (state, action) => {
         state.loadingForm = true;
      },
      [fetchFormData.fulfilled]: (state, action) => {
         state.loadingForm = false;
         state.formData = action.payload;
      },
      [fetchFormData.rejected]: (state, action) => {
         state.loadingForm = false;
         state.errorForm = action.payload;
      },
   }
});

export default formDataSlice.reducer;