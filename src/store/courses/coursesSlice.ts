import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Course, CoursesState, UpdateCourseResponse } from './types';
import {
	fetchCoursesFromAPI,
	deleteCourseFromAPIService,
	addCourseToAPIService,
	fetchCourseByIDFromAPI,
	updateCourseOnAPI,
} from '../../services';

const initialState: CoursesState = {
	courses: [],
	status: 'idle',
	error: null,
};

export const fetchCourses = createAsyncThunk<Course[], void>(
	'courses/fetchCourses',
	async () => {
		return fetchCoursesFromAPI();
	}
);

export const fetchCourseByID = createAsyncThunk(
	'courses/fetchCourseByID',
	async (courseId: string) => {
		return fetchCourseByIDFromAPI(courseId);
	}
);

export const deleteCourseFromAPI = createAsyncThunk<
	string,
	{ id: string; token: string }
>('courses/deleteCourseFromAPI', async ({ id, token }) => {
	await deleteCourseFromAPIService(id, token);
	return id;
});

export const addCourse = createAsyncThunk<
	Course,
	{ course: Course; token: string }
>('courses/addCourse', async ({ course, token }) => {
	const updatedCoursesList = await addCourseToAPIService({ course }, token);
	return updatedCoursesList;
});

export const updateCourse = createAsyncThunk<
	UpdateCourseResponse,
	{ courseId: string; course: Course; token: string }
>('courses/updateCourse', async ({ courseId, course, token }) => {
	return await updateCourseOnAPI({ courseId, course, token });
});

const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourses.pending, (state) => {
				if (state.status === 'idle') {
					state.status = 'pending';
				}
			})
			.addCase(fetchCourses.fulfilled, (state, action) => {
				if (state.status === 'pending') {
					state.status = 'succeeded';
					state.courses = action.payload;
				}
			})
			.addCase(fetchCourses.rejected, (state, action) => {
				if (state.status === 'pending') {
					state.status = 'failed';
					state.error = action.error.message ?? 'Failed to fetch courses';
					console.error('Failed to fetch courses:', action.error.message);
				}
			})
			.addCase(deleteCourseFromAPI.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(deleteCourseFromAPI.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const id = action.payload;
				state.courses = state.courses.filter((course) => course.id !== id);
			})
			.addCase(deleteCourseFromAPI.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Failed to delete course';
				console.error('Failed to delete course', action.error.message);
			})
			.addCase(addCourse.fulfilled, (state, action) => {
				state.courses.push(action.payload);
			})
			.addCase(updateCourse.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(
				updateCourse.fulfilled,
				(state, action: PayloadAction<UpdateCourseResponse>) => {
					state.status = 'succeeded';
					const updatedCourse = action.payload.result;
					const index = state.courses.findIndex(
						(course) => course.id === updatedCourse.id
					);
					if (index !== -1) {
						state.courses[index] = updatedCourse;
					} else {
						state.courses.push(updatedCourse);
					}
				}
			);
	},
});

/* export const { addCourse, deleteCourseFromStore } = coursesSlice.actions; */

export default coursesSlice.reducer;
