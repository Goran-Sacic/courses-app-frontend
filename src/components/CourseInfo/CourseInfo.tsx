import React, { useEffect } from 'react';
import Button from 'src/common/Button/Button';
import styles from './CourseInfo.module.css';
import getCourseDuration from 'src/helpers/getCourseDuration';
import formatCreationDate from 'src/helpers/formatCreationDate';
import findAuthors from 'src/helpers/findAuthors';
import { useParams, Link } from 'react-router-dom';
import { RootState, AppDispatch } from 'src/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from 'src/store/courses/coursesSlice';
import { fetchAuthors } from 'src/store/authors/authorsSlice';
/* import { fetchCurrentUser } from 'src/store/user/userSlice'; */
import { fetchCurrentUser } from 'src/store/user/thunk';

const CourseInfo: React.FC = () => {
	const { courseId } = useParams();

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchAuthors());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [dispatch]);

	const courses = useSelector((state: RootState) => state.courses.courses);
	const authors = useSelector((state: RootState) => state.authors.authors);

	const selectedCourse = courses.find((course) => course.id === courseId);
	if (!selectedCourse) {
		return null;
	}

	const authorsToDisplay = findAuthors(selectedCourse.authors, authors).join(
		', '
	);
	const courseDuration = getCourseDuration(selectedCourse.duration);
	const creationDate = formatCreationDate(selectedCourse.creationDate);

	return (
		<div className={styles.courseInfoContainer}>
			<div className={styles.title}>
				<h2>{selectedCourse.title}</h2>
			</div>
			<div key={courseId} className={styles.courseInfo}>
				<div className={styles.containerAll}>
					<h3>Description:</h3>
					<div className={styles.card}>
						<div className={styles.description}>
							<p>{selectedCourse.description}</p>
						</div>
						<div className={styles.info}>
							<div className={styles.container}>
								<div className={styles.dataTitle}>ID:</div>
								<div className={styles.dataDisplay}>
									<div className={styles.overflow}>{courseId}</div>
								</div>
							</div>
							<div className={styles.container}>
								<div className={styles.dataTitle}>Duration:</div>
								<div className={styles.dataDisplay}>
									<span className={styles.duration}>{courseDuration}</span>
									hours
								</div>
							</div>
							<div className={styles.container}>
								<div className={styles.dataTitle}>Created:</div>
								<div className={styles.dataDisplay}>{creationDate}</div>
							</div>
							<div className={styles.container}>
								<div className={styles.dataTitle}>Authors:</div>
								<div className={styles.dataDisplay}>
									<div className={styles.overflow}>{authorsToDisplay}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.btn}>
				<Link to='/courses'>
					<Button buttonText='BACK' />
				</Link>
			</div>
		</div>
	);
};

export default CourseInfo;
