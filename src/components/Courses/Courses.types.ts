export interface Course {
	id?: string;
	title: string;
	description: string;
	creationDate?: string;
	duration: number;
	authors: string[];
}

export interface Author {
	id?: string;
	name: string;
}

export interface CourseProps {
	courses?: Course[];
	addedCourses?: Course[];
	authors?: Author[];
	addedAuthors?: Author[];
}
