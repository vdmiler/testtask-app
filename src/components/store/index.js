import { configureStore } from "@reduxjs/toolkit";
import formDataReducer from "./slices/formDataSlice";
import usersDataReducer from "./slices/usersDataSlice";

export default configureStore({
   reducer: {
      formData: formDataReducer,
      usersData: usersDataReducer,
   },
})