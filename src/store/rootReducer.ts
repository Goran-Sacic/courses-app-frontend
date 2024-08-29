import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import coursesReducer from './courses/coursesSlice';
import authorsReducer from './authors/authorsSlice';

const rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
});

export default rootReducer;
