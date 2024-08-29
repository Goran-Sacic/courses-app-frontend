export interface Course {
	id?: string;
	title: string;
	description: string;
	creationDate?: string;
	duration: number;
	authors: string[];
}

export interface CoursesState {
	courses: Course[];
	status: 'idle' | 'pending' | 'succeeded' | 'failed';
	error: string | null;
}

export interface UpdateCourseResponse {
	successful: boolean;
	result: Course;
}
