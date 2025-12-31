import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/appwrite/auth";

// createUser
export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      // 1️⃣ Account create
      await authService.createAccount(email, password, name);

      // 2️⃣ Auto login (SESSION CREATE)
      const session = await authService.login(email, password);

      // 3️⃣ Get logged in user
      const user = await authService.getCurrentUser();

      return { user, session };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // 1️⃣ Create session
      const session = await authService.login(email, password);

      // 2️⃣ Get current user
      const user = await authService.getCurrentUser();

      return { session, user };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await authService.logout();
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Current User
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const user = await authService.getCurrentUser();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  session: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.session = action.payload.session;
      })

      .addCase(createUser.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload.session;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.session = null;
      })

      // Get Current User
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
