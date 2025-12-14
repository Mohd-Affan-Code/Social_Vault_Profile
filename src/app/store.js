import { configureStore } from "@reduxjs/toolkit";
import profileDatareducer from "../features/ProfileData/ProfileDataSlice";

export const store = configureStore({
  reducer: profileDatareducer,
});
