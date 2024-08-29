import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUserFromAPI } from 'src/services';

export const fetchCurrentUser = createAsyncThunk(
	'user/fetchCurrentUser',
	async () => {
		const user = await getCurrentUserFromAPI();
		return user;
	}
);
