import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';
// import { getCurrentUserFromAPI } from 'src/services';
import { fetchCurrentUser } from './thunk';

const initialState: User = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.isAuth = action.payload.isAuth;
			state.token = action.payload.token;
			state.role = action.payload.role;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCurrentUser.pending, (state) => {
				state.name = '';
				state.email = '';
				state.isAuth = false;
				state.token = '';
				state.role = '';
			})
			.addCase(fetchCurrentUser.fulfilled, (state, action) => {
				state.name = action.payload.name;
				state.email = action.payload.email;
				state.isAuth = action.payload.isAuth;
				state.token = action.payload.token;
				state.role = action.payload.role;
			})
			.addCase(fetchCurrentUser.rejected, (state, action) => {
				console.error('Failed to fetch current user:', action.error.message);
			});
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
