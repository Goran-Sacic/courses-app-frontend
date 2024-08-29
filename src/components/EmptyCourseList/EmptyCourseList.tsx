import React from 'react';
import Button from 'src/common/Button/Button';
import styles from './EmptyCourseList.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getCurrentUserFromAPI } from 'src/services';

const EmptyCourseList: React.FC = () => {
	getCurrentUserFromAPI();
	const navigate = useNavigate();
	const role = useSelector((state: RootState) => state.user.role);

	if (role === 'admin') {
		return (
			<div className={styles.empty}>
				<h1 className={styles.title}>Course List is Empty</h1>
				<h3 className={styles.subtitle}>
					Please use "Add New Course" button to add your first course.
				</h3>
				<Button
					buttonText='ADD NEW COURSE'
					handleClick={() => navigate('/courses/add')}
				/>
			</div>
		);
	} else
		return (
			<div className={styles.empty}>
				<h1 className={styles.title}>Course List is Empty</h1>
				<h3 className={styles.subtitle}>
					You don't have permissions to create a course. Please log in as ADMIN
				</h3>
			</div>
		);
};

export default EmptyCourseList;
