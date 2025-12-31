import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import profileReducer from "./ProfileSlice";

export const store = configureStore({
  reducer: {
    // profileData: profileDatareducer,
    profiles: profileReducer,
    auth: authReducer,
  },
});
