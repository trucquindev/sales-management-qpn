import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import authorizedAxiosInstance from '@/untils/authorizeAxios';  // Ensure the path is correct for axios instance  

// 1. Define User data type  
interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone?: string;
  // Add other fields if needed  
}

// 2. Define User state type  
interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// 3. Initialize the initial state  
const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// 4. Create thunks (async actions) for login, registration, forgot password, get user ID, and update password  

// Login  
export const loginUserAPI = createAsyncThunk<
  User, // Return type  
  { email: string; password: string }, // Input type  
  { rejectValue: string } // Error return type  
>(
  'user/loginUserAPI',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.post('/api/Customer/login', data);
      if (response.data && response.data.id && response.data.name) {
        return response.data;
      } else {
        return rejectWithValue('Invalid response from server');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      return rejectWithValue(errorMessage);
    }
  }
);

// Register  
export const registerUserAPI = createAsyncThunk<
  User,
  { email: string; password: string; name: string },
  { rejectValue: string }
>(
  'user/registerUserAPI',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.post('/api/Customer', data);
      if (response.data && response.data.id && response.data.name) {
        return response.data;
      } else {
        return rejectWithValue('Invalid response from server');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      return rejectWithValue(errorMessage);
    }
  }
);

// Get User ID by Email  
export const getUserIdByEmailAPI = createAsyncThunk<
  string, // Return type (ID)  
  string, // Input type (email)  
  { rejectValue: string }
>(
  'user/getUserIdByEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get(`/api/Customer?id=${email}`);
      if (response.data && response.data.id) {
        return response.data.id;
      } else {
        return rejectWithValue('User not found');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      return rejectWithValue(errorMessage);
    }
  }
);

// Update Password  
export const updatePasswordAPI = createAsyncThunk<string, // Return type (message)  
  { id: string; password: string }, // Input type  
  { rejectValue: string }
>(
  'user/updatePassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.put(`/api/Customer/${data.id}`, {
        password: data.password,
      });
      if (response.data && response.data.message) {
        return response.data.message;
      } else {
        return rejectWithValue('Invalid response from server');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      return rejectWithValue(errorMessage);
    }
  }
);


// Forgot Password  
export const forgotPasswordAPI = createAsyncThunk<
  string, // Return type
  { name: string; email: string; password: string }, // Input type
  { rejectValue: string }
>(
  'user/forgotPasswordAPI',
  async (data, { rejectWithValue }) => {
    try {
      // Gửi PUT với body không chứa `id`
      const response = await authorizedAxiosInstance.put('/api/Customer', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.data && response.data.message) {
        return response.data.message;
      } else {
        return rejectWithValue('Invalid response from server');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      return rejectWithValue(errorMessage);
    }
  }
);

// 5. Create the user slice  
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser(state) {
      state.currentUser = null;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = false;
      localStorage.removeItem('persist:root');
      localStorage.removeItem('currentUser');
    },
  },
  extraReducers: (builder) => {
    // Handle login  
    builder.addCase(loginUserAPI.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUserAPI.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(loginUserAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Login failed';
      state.isAuthenticated = false;
    });

    // Handle registration  
    builder.addCase(registerUserAPI.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUserAPI.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(registerUserAPI.rejected, (state, action) => {state.isLoading = false;
      state.error = action.payload || 'Registration failed';
      state.isAuthenticated = false;
    });

    // Handle update user information (new section)
    builder.addCase(updateUserAPI.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUserAPI.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.currentUser = action.payload;  // Cập nhật thông tin người dùng mới
      state.error = null;
    });
    builder.addCase(updateUserAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Update failed';
    });

    // Handle forgot password  
    builder.addCase(forgotPasswordAPI.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(forgotPasswordAPI.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(forgotPasswordAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to send reset password link';
    });

    // Handle get user ID by email  
    builder.addCase(getUserIdByEmailAPI.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUserIdByEmailAPI.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getUserIdByEmailAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to get user ID';
    });

    // Handle update password  
    builder.addCase(updatePasswordAPI.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updatePasswordAPI.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(updatePasswordAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Failed to update password';
    });
  },
});

// 6. Selectors to get state from the store  
export const selectCurrentUser = (state: { user: UserState }): User | null => {
  return state.user.currentUser;
};

export const selectUserLoading = (state: { user: UserState }): boolean => {
  return state.user.isLoading;
};

export const selectUserError = (state: { user: UserState }): string | null => {
  return state.user.error;
};

export const selectIsAuthenticated = (state: { user: UserState }): boolean => {
  return state.user.isAuthenticated;
};

// 7. Export actions and reducer  
export const { logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
// 
export const updateUserAPI = createAsyncThunk<
  User,
  { name: string; email: string; phone: string; address: string },
  { rejectValue: string }
>(
'user/updateUserAPI',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.put(`/api/Customer`, data);
      if (response.data) {
        return response.data;
      } else {
        return rejectWithValue('Update failed');
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Something went wrong';
      return rejectWithValue(errorMessage);
    }
  });