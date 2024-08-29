import React, { useState, useEffect } from 'react';
import Button from 'src/common/Button/Button';
import Input from 'src/common/Input/Input';
import getCourseDuration from 'src/helpers/getCourseDuration';
import styles from './CourseForm.module.css';
import AuthorItem from './AuthorItem/AuthorItem';
import { Author, CourseFormProps } from './CourseForm.types';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/store';
import { fetchAuthors, addAuthor } from 'src/store/authors/authorsSlice';
import {
	addCourse,
	fetchCourseByID,
	updateCourse,
} from 'src/store/courses/coursesSlice';

const forbiddenSymbols = /[@#$%^&]/;

const CourseForm: React.FC<CourseFormProps> = () => {
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [duration, setDuration] = useState<string>('');
	const [calculatedDuration, setCalculatedDuration] = useState<string>('');
	const [authorName, setAuthorName] = useState<string>('');
	const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);
	const [authorNameError, setAuthorNameError] = useState<boolean>(false);
	const [titleError, setTitleError] = useState<boolean>(false);
	const [descriptionError, setDescriptionError] = useState<boolean>(false);
	const [durationError, setDurationError] = useState<boolean>(false);
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { courseId } = useParams();

	const { status: authorStatus } = useSelector(
		(state: RootState) => state.authors
	);

	useEffect(() => {
		if (authorStatus === 'idle') {
			dispatch(fetchAuthors());
		}
	}, [dispatch, authorStatus]);

	const allAuthors = useSelector((state: RootState) => state.authors.authors);

	const [authorsList, setAuthorsList] = useState(allAuthors);

	useEffect(() => {
		setAuthorsList(
			allAuthors.filter(
				(author) => !courseAuthors.some((a) => a.id === author.id)
			)
		);
	}, [allAuthors, courseAuthors]);

	useEffect(() => {
		if (courseId) {
			dispatch(fetchCourseByID(courseId)).then((action) => {
				if (fetchCourseByID.fulfilled.match(action)) {
					const fetchedCourse = action.payload;
					setTitle(fetchedCourse.result.title);
					setDescription(fetchedCourse.result.description);
					setDuration(fetchedCourse.result.duration.toString());
					const calculateDuration = getCourseDuration(
						fetchedCourse.result.duration
					);
					setCalculatedDuration(calculateDuration);
					setAuthorsList(
						allAuthors.filter(
							(author) => !fetchedCourse.result.authors.includes(author.id)
						)
					);
					setCourseAuthors(
						fetchedCourse.result.authors.map((authorId) => ({
							id: authorId,
							name:
								allAuthors.find((author) => author.id === authorId)?.name || '',
						}))
					);
				}
			});
		}
	}, [dispatch, courseId]);

	const handleTitleChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value;

		if (!forbiddenSymbols.test(value)) {
			setTitle(value);
		}
		setTitleError(value.trim().length < 2);
	};

	const handleDescriptionChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	): void => {
		const value = event.target.value;
		if (!forbiddenSymbols.test(value)) {
			setDescription(value);
			setDescriptionError(value.trim().length < 2);
		}
	};

	const handleDurationChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value;
		const filteredValue = value.replace(/[^0-9]/g, '');
		setDuration(filteredValue);
		setDurationError(
			filteredValue.trim() === '' || isNaN(Number(filteredValue))
		);
		const parsedDuration = parseInt(filteredValue, 10);
		if (!isNaN(parsedDuration)) {
			const calculateDuration = getCourseDuration(parsedDuration);
			setCalculatedDuration(calculateDuration);
		} else {
			setCalculatedDuration('');
		}
	};

	const handleAuthorName = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const value = event.target.value;
		if (!forbiddenSymbols.test(value)) {
			setAuthorName(value);
			setAuthorNameError(false);
		}
	};

	const token = useSelector((state: RootState) => state.user.token);

	const handleAddAuthor = (): void => {
		if (authorName.trim().length >= 2) {
			dispatch(addAuthor({ name: authorName.trim(), token }))
				.then(() => {
					setAuthorName('');
					setAuthorNameError(false);
					dispatch(fetchAuthors());
				})
				.catch((error) => {
					console.error('Failed to add author:', error);
				});
		} else {
			setAuthorNameError(true);
		}
	};

	const handleAddToCourseAuthors = (id: string, name: string): void => {
		const newCourseAuthor = {
			id: id,
			name: name,
		};
		setCourseAuthors([...courseAuthors, newCourseAuthor]);
		setAuthorsList(
			authorsList.filter((author) => author.id !== newCourseAuthor.id)
		);
	};

	const handleRemoveFromCourseAuthors = (id: string): void => {
		const modifiedCourseAuthors = courseAuthors.filter(
			(author) => author.id !== id
		);
		setCourseAuthors(modifiedCourseAuthors);
		const removedAuthor = allAuthors.find((author) => author.id === id);
		if (removedAuthor) {
			setAuthorsList([...authorsList, removedAuthor]);
		}
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		setFormSubmitted(true);

		setTitleError(title.trim().length < 2);
		setDescriptionError(description.trim().length < 2);
		setDurationError(duration.trim() === '' || isNaN(Number(duration)));

		if (
			title.trim().length < 2 ||
			description.trim().length < 2 ||
			duration.trim() === '' ||
			isNaN(Number(duration)) ||
			courseAuthors.length === 0
		) {
			return;
		}

		const courseData = {
			/* id: uuidv4(), */
			title: title.trim(),
			description: description.trim(),
			/* creationDate: new Date().toLocaleDateString('en-GB'), */
			duration: Number(duration.trim()),
			authors: courseAuthors.map((author) => author.id),
		};
		if (courseId) {
			dispatch(updateCourse({ courseId, course: courseData, token }))
				.then(() => {
					setSuccessMessage(
						'Course updated succesfully! Returning to main app component...'
					);
					navigate('/courses');
				})
				.catch((error) => {
					console.error('Failed to update course:', error);
				});
		} else {
			dispatch(addCourse({ course: courseData, token }))
				.then(() => {
					setSuccessMessage(
						'Course created successfully! Returning to main app component...'
					);
					navigate('/courses');
				})
				.catch((error) => {
					console.error('Failed to create course:', error);
				});
		}

		setTitle('');
		setDescription('');
		setDuration('');
		setAuthorName('');
		setCourseAuthors([]);
		setFormSubmitted(true);
		setSuccessMessage('');
		navigate('/courses');
	};

	const descriptionErrorStyle = descriptionError ? 'styles.error' : '';
	const durationErrorStyle = durationError ? 'styles.error' : '';
	const authorErrorStyle = authorNameError ? 'styles.error' : '';

	return (
		<div className={styles.courseFormContainer}>
			<h1>Course Edit/Create Page</h1>
			<div className={styles.courseForm}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<h3>Main info</h3>
					<div>
						<Input
							labelText='Title'
							placeholderText='Input title'
							inputValue={title}
							handleChange={handleTitleChange}
						/>
						{titleError && (
							<p className={styles.errorMessage}>
								Title is required (minimum of 2 characters).
							</p>
						)}
					</div>
					<div
						className={`${styles.descriptionInput} ${descriptionErrorStyle}`}
					>
						<textarea
							className={styles.textarea}
							placeholder='Input description'
							value={description}
							onChange={handleDescriptionChange}
						/>
						{descriptionError && (
							<p className={styles.errorMessage}>
								Description is required (minimum of 2 characters).
							</p>
						)}
					</div>
					<h3>Duration</h3>
					<div className={styles.durationAndAuthors}>
						<div className={durationErrorStyle}>
							<div className={styles.duration}>
								<Input
									labelText='Duration'
									placeholderText='Input duration in minutes'
									type='text'
									inputValue={duration}
									handleChange={handleDurationChange}
								/>
								<div className={styles.calculatedDuration}>
									{!calculatedDuration ? (
										<p className={styles.durationText}>
											<span className={styles.hours}>00:00</span> hours
										</p>
									) : (
										<p className={styles.durationText}>
											<span className={styles.hours}>{calculatedDuration}</span>{' '}
											hours
										</p>
									)}
								</div>
							</div>
							{durationError && (
								<p className={styles.errorMessage}>
									Duration is required and should be a number.
								</p>
							)}
						</div>
					</div>
					<h3>Authors</h3>
					<div className={styles.createAuthor}>
						<div className={authorErrorStyle}>
							<div className={styles.authors}>
								<Input
									labelText='Author Name'
									placeholderText='Input author name'
									inputValue={authorName}
									handleChange={handleAuthorName}
								/>
								<Button
									buttonText='CREATE AUTHOR'
									handleClick={handleAddAuthor}
									type='button'
								/>
							</div>
						</div>
					</div>
					{authorNameError && (
						<p className={styles.errorMessage}>
							Author name should be atleast 2 characters long.
						</p>
					)}
					<h4>Authors List</h4>
					<div className={styles.authorListsContainer}>
						<div>
							{authorsList.length === 0 ? (
								<p>You have no authors! Please create a new author first.</p>
							) : (
								<>
									<AuthorItem
										authorsList={authorsList}
										handleAddToCourseAuthors={handleAddToCourseAuthors}
									/>
								</>
							)}
						</div>
						<div className={styles.courseAuthorsList}>
							<h3>Course Authors</h3>
							<div className={styles.courseAuthors}>
								{courseAuthors.length > 0 ? (
									<AuthorItem
										authorsList={courseAuthors}
										handleRemoveFromAuthorsList={handleRemoveFromCourseAuthors}
									/>
								) : (
									<div>
										<p>List is empty.</p>
										{formSubmitted && courseAuthors.length === 0 && (
											<p className={styles.errorMessage}>
												At least one course author is required.
											</p>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
					<div className={styles.buttons}>
						<Button
							buttonText='CANCEL'
							type='button'
							handleClick={() => navigate(-1)}
						/>
						<Button
							buttonText={courseId ? 'UPDATE COURSE' : 'CREATE COURSE'}
							type='submit'
						/>
					</div>
				</form>
				<div className={styles.successMessage}>{successMessage}</div>
			</div>
		</div>
	);
};

export default CourseForm;
