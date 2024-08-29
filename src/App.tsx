import React, { useEffect } from 'react';
import styles from './App.module.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchCourses } from './store/courses/coursesSlice';
import { fetchAuthors } from './store/authors/authorsSlice';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CourseForm from './components/CourseForm/CourseForm';
/* import { fetchCurrentUser } from './store/user/userSlice'; */
import { fetchCurrentUser } from './store/user/thunk';

function MainContent() {
	const dispatch = useDispatch<AppDispatch>();
	const { courses, status: courseStatus } = useSelector(
		(state: RootState) => state.courses
	);
	const { authors, status: authorStatus } = useSelector(
		(state: RootState) => state.authors
	);

	useEffect(() => {
		if (courseStatus === 'idle') {
			dispatch(fetchCourses());
		}
	}, [dispatch, courseStatus]);

	useEffect(() => {
		if (authorStatus === 'idle') {
			dispatch(fetchAuthors());
		}
	}, [dispatch, authorStatus]);

	const token = localStorage.getItem('token');
	if (token) {
		useEffect(() => {
			dispatch(fetchCurrentUser());
		}, [dispatch]);
	}

	//

	return (
		<div className={styles.mainComponent}>
			{courses.length > 0 ? (
				<Courses courses={courses} authors={authors} />
			) : (
				<EmptyCourseList />
			)}
		</div>
	);
}

function App() {
	return (
		<>
			<div className={styles.app}>
				<Header />
			</div>
			<Routes>
				<Route path='/' element={<Navigate to='/courses' />}></Route>
				<Route
					path='/courses'
					element={
						<PrivateRoute>
							<MainContent />
						</PrivateRoute>
					}
				/>
				<Route
					path='/courses/add'
					element={
						<PrivateRoute requireAdmin={true}>
							<CourseForm />
						</PrivateRoute>
					}
				/>
				<Route
					path='/courses/:courseId'
					element={
						<PrivateRoute>
							<CourseInfo />
						</PrivateRoute>
					}
				/>
				<Route
					path='/courses/update/:courseId'
					element={
						<PrivateRoute requireAdmin={true}>
							<CourseForm />
						</PrivateRoute>
					}
				/>
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</>
	);
}

export default App;
