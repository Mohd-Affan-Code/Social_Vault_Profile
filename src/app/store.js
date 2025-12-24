import { configureStore } from "@reduxjs/toolkit";
import profileDatareducer from "../features/ProfileData/ProfileDataSlice";
import profileReducer from "../features/ProfileData/ProfileDataSlice";

export const store = configureStore({
  reducer: {
    profileData: profileDatareducer,
    profile: profileReducer,
  },
});
