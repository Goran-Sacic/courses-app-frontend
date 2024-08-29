export interface Author {
	id: string;
	name: string;
}

export interface Course {
	id?: string;
	title: string;
	description: string;
	creationDate?: string;
	duration: string;
	authors: string[];
}

export interface CourseFormProps {
	handleAddCourse?: (course: Course, authors: Author[]) => void;
}
