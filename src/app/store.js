import { configureStore } from "@reduxjs/toolkit";
// import profileDatareducer from "../features/ProfileData/ProfileDataSlice";
// import profileReducer from "../features/ProfileData/ProfileDataSlice";

import profileReducer from "./ProfileSlice";

export const store = configureStore({
  reducer: {
    // profileData: profileDatareducer,
    profiles: profileReducer,
  },
});
