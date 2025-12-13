import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  ProfileData: [
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

export const ProfileDataSlice = createSlice({
  name: "ProfileData",
  initialState,
  reducers: {
    addProfile: (state, action) => {
      const formData = {
        id: nanoid(),
        name: "Sarah Johnson",
        username: "sarahjdesigns",
        platform: "Instagram",
        profileLink: "https://instagram.com/sarahjdesigns",
        notes: "Graphic designer, met at conference 2023",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      };
      state.ProfileData.push(formData);
    },
    removeProfile: (state, action) => {
      state.ProfileData = state.ProfileData.filter((profile) => {
        return profile.id !== action.payload.id;
      });
    },
    updateProfile: (state, action) => {
      const { id, updatedData } = action.payload;

      const index = state.ProfileData.findIndex((profile) => profile.id === id);

      if (index !== -1) {
        state.ProfileData[index] = {
          ...state.ProfileData[index],
          ...updatedData,
        };
      }
    },
  },
});
