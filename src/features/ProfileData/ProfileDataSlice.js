import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  profileData: [
    {
      id: "1",
      name: "Sarah Johnson",
      username: "sarahjdesigns",
      platform: "Instagram",
      profileLink: "https://instagram.com/sarahjdesigns",
      notes: "Graphic designer, met at conference 2023",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
  ],
};

export const profileDataSlice = createSlice({
  name: "profileData",
  initialState,
  reducers: {
    addProfile: (state, action) => {
      state.profileData.push({
        id: nanoid(),
        ...action.payload, // formData
      });
      console.log(state.profileData);
    },
    removeProfile: (state, action) => {
      state.profileData = state.profileData.filter((profile) => {
        return profile.id !== action.payload.id;
      });
    },
    updateProfile: (state, action) => {
      const { id, updatedData } = action.payload;

      const index = state.profileData.findIndex((profile) => profile.id === id);

      if (index !== -1) {
        state.profileData[index] = {
          ...state.profileData[index],
          ...updatedData,
        };
      }
    },
  },
});

export const { addProfile, removeProfile, updateProfile } =
  profileDataSlice.actions;

export default profileDataSlice.reducer;
