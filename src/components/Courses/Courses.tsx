import React, { useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import Button from 'src/common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './Courses.module.css';
import { CourseProps } from './Courses.types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getCurrentUserFromAPI } from 'src/services';

const Courses: React.FC<CourseProps> = () => {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState<string>('');

	const { courses } = useSelector((state: RootState) => state.courses);
	const { authors } = useSelector((state: RootState) => state.authors);

	const handleSearch = (query: string) => {
		setSearchQuery(query.toLowerCase());
	};

	const filteredCourses = courses.filter((course) => {
		const { id, title } = course;
		const lowercaseQuery = searchQuery.toLowerCase();
		return (
			id.toLowerCase().includes(lowercaseQuery) ||
			title.toLowerCase().includes(lowercaseQuery)
		);
	});

	getCurrentUserFromAPI();
	const role = useSelector((state: RootState) => state.user.role);

	return (
		<>
			<div className={styles.courses}>
				<div className={styles.searchBarAndButton}>
					<SearchBar onSearch={handleSearch} />
					{role === 'admin' && (
						<Button
							buttonText='ADD NEW COURSE'
							handleClick={() => navigate('/courses/add')}
						/>
					)}
				</div>

				{filteredCourses.length > 0 ? (
					filteredCourses.map((course) => (
						<CourseCard key={course.id} course={course} authors={authors} />
					))
				) : (
					<div>No courses found.</div>
				)}
			</div>
		</>
	);
};

export default Courses;
