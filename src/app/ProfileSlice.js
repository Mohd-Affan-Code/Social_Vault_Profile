import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { databaseService } from "../services/appwrite/database";

/* ================= ASYNC THUNKS ================= */

// CREATE
export const createProfile = createAsyncThunk(
  "profiles/create",
  async (data, { rejectWithValue, getState }) => {
    try {
      const userId = getState().auth.user.$id;

      return await databaseService.createDocument(data, userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// READ (LIST)
export const fetchProfiles = createAsyncThunk(
  "profiles/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await databaseService.listDocuments();
      return res.rows; // 👈 tablesDB me rows aata hai
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// READ (SINGLE)
export const fetchProfileById = createAsyncThunk(
  "profiles/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await databaseService.getDocument(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// UPDATE
export const updateProfile = createAsyncThunk(
  "profiles/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await databaseService.updateDocument(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// DELETE
export const deleteProfile = createAsyncThunk(
  "profiles/delete",
  async (id, { rejectWithValue }) => {
    try {
      await databaseService.deleteDocument(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ================= SLICE ================= */

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
    selectedProfile: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSelectedProfile: (state) => {
      state.selectedProfile = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------- FETCH ALL ---------- */
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- CREATE ---------- */
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles.unshift(action.payload);
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- FETCH ONE ---------- */
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.selectedProfile = action.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateProfile.fulfilled, (state, action) => {
        const index = state.profiles.findIndex(
          (item) => item.rowId === action.payload.rowId
        );
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.profiles = state.profiles.filter(
          (item) => item.$id !== action.payload
        );
      });
  },
});

export const { clearSelectedProfile } = profileSlice.actions;
export default profileSlice.reducer;
