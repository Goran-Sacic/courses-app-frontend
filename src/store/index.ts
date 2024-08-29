import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { setUser } from './user/userSlice';

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
});

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

if (token && user) {
	store.dispatch(
		setUser({ name: user.name, email: user.email, isAuth: true, token: token })
	);
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
