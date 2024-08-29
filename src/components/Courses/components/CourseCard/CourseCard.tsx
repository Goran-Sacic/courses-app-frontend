import React from 'react';
import styles from './CourseCard.module.css';
import getCourseDuration from 'src/helpers/getCourseDuration';
import formatCreationDate from 'src/helpers/formatCreationDate';
import Button from 'src/common/Button/Button';
import { CourseCardProps } from './CourseCard.types';
import findAuthors from '../../../../helpers/findAuthors';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	/* deleteCourseFromStore */
	deleteCourseFromAPI,
} from 'src/store/courses/coursesSlice';
import { AppDispatch, RootState } from 'src/store';

const CourseCard: React.FC<CourseCardProps> = ({ course, authors }) => {
	const authorsToDisplay = findAuthors(course.authors, authors).join(', ');

	const courseDuration = getCourseDuration(course.duration);
	const creationDate = formatCreationDate(course.creationDate);

	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const token = useSelector((state: RootState) => state.user.token);
	const handleDelete = () => {
		dispatch(deleteCourseFromAPI({ id: course.id, token }));
		/* dispatch(deleteCourseFromStore(course.id)); */
	};

	const role = useSelector((state: RootState) => state.user.role);

	return (
		<div key={course.id} className={styles.courseCard}>
			<div className={styles.h3}>
				<h3>{course.title}</h3>
				<div className={styles.card}>
					<div className={styles.description}>
						<p>{course.description}</p>
					</div>
					<div className={styles.info}>
						<div className={styles.container}>
							<div className={styles.dataTitle}>Authors: </div>
							<div className={styles.dataDisplay}>
								<div className={styles.overflow}>{authorsToDisplay}</div>
							</div>
						</div>
						<div className={styles.container}>
							<div className={styles.dataTitle}>Duration: </div>
							<div className={styles.dataDisplay}>{courseDuration} hours</div>
						</div>
						<div className={styles.container}>
							<div className={styles.dataTitle}>Created: </div>
							<div className={styles.dataDisplay}>{creationDate}</div>
						</div>

						<div className={styles.btn}>
							<Button
								buttonText='SHOW COURSE'
								handleClick={() => {
									navigate(`/courses/${course.id}`);
								}}
							/>
							{role && role === 'admin' && (
								<div className={styles.adminFunctions}>
									<div className={styles.delete}>
										<Button buttonText='' handleClick={handleDelete} />
									</div>
									<div className={styles.update}>
										<Button
											buttonText=''
											handleClick={() => {
												navigate(`/courses/update/${course.id}`);
											}}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
