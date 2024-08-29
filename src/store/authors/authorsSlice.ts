import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Author, AuthorsState } from './types';
import { fetchAuthorsFromAPI, addAuthorToAPIService } from '../../services';

const initialState: AuthorsState = {
	authors: [],
	status: 'idle',
	error: null,
};

export const fetchAuthors = createAsyncThunk<Author[], void>(
	'authors/fetchAuthors',
	async () => {
		return fetchAuthorsFromAPI();
	}
);

export const addAuthor = createAsyncThunk<
	Author,
	{ name: string; token: string }
>('authors/addAuthor', async ({ name, token }) => {
	const updatedAuthorsList = await addAuthorToAPIService({ name }, token);
	return updatedAuthorsList;
});

const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		/* addAuthor: (state, action: PayloadAction<Author>) => {
			state.authors.push(action.payload);
		}, */
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthors.pending, (state) => {
				if (state.status === 'idle') {
					state.status = 'pending';
				}
			})
			.addCase(fetchAuthors.fulfilled, (state, action) => {
				if (state.status === 'pending') {
					state.status = 'succeeded';
					state.authors = action.payload;
				}
			})
			.addCase(fetchAuthors.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Failed to fetch authors';
				console.error('Failed to fetch authors:', action.error.message);
			})
			.addCase(addAuthor.fulfilled, (state, action) => {
				state.authors.push(action.payload);
			});
	},
});

/* export const { addAuthor } = authorsSlice.actions; */

export default authorsSlice.reducer;
