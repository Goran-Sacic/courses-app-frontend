import axios from 'axios';

/* const URL = 'http://localhost:4000'; */
const URL = 'https://courses-app-backend-00tw.onrender.com';

export const fetchAuthorsFromAPI = async () => {
	try {
		const response = await axios.get(`${URL}/authors/all`);
		return response.data.result;
	} catch (error) {
		console.error('Failed to fetch authors: ', error.message);
		throw new Error('Failed to fetch authors');
	}
};

export const fetchCoursesFromAPI = async () => {
	try {
		const response = await axios.get(`${URL}/courses/all`);
		return response.data.result;
	} catch (error) {
		console.error('Failed to fetch courses.', error);
		throw new Error('Failed to fetch courses');
	}
};

export const addCourseToAPI = async ({ course }) => {
	try {
		const response = await axios.post(`${URL}/courses/add`, course);
		return response;
	} catch (error) {
		console.error('Failed to add course to API', error);
		throw new Error('Failed to add course');
	}
};

export const deleteCourseFromAPIService = async (id: string, token: string) => {
	try {
		const response = await axios.delete(`${URL}/courses/${id}`, {
			headers: { Authorization: `${token}` },
		});
		return response;
	} catch (error) {
		console.error('Failed to delete course', error);
		throw new Error('Failed to delete course');
	}
};

export const registerUser = async (newUser: {
	name: string;
	email: string;
	password: string;
}) => {
	const response = await axios.post(`${URL}/register`, newUser, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

export const verifyLogin = async (loginCredentials: {
	email: string;
	password: string;
}) => {
	const response = await axios.post(`${URL}/login`, loginCredentials, {
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return response.data;
};

export const getCurrentUserFromAPI = async () => {
	const token = localStorage.getItem('token');

	try {
		const response = await axios.get(`${URL}/users/me`, {
			headers: { Authorization: `${token}` },
		});

		return {
			isAuth: true,
			name: response.data.result.name,
			email: response.data.result.email,
			role: response.data.result.role,
			token: token,
		};
	} catch (error) {
		console.error(error);
	}
};

export const deleteOnLogout = async (token: string) => {
	try {
		await axios.delete(`${URL}/logout`, {
			headers: { Authorization: `${token}` },
		});
	} catch (error) {
		console.error(error);
	}
};

export const addAuthorToAPIService = async (
	author: { name: string },
	token: string
) => {
	try {
		const response = await axios.post(`${URL}/authors/add`, author, {
			headers: { Authorization: `${token}` },
		});
		return response.data.result;
	} catch (error) {
		console.error('Failed to add author to API', error);
		throw new Error('Failed to add author');
	}
};

export const addCourseToAPIService = async ({ course }, token: string) => {
	try {
		const response = await axios.post(`${URL}/courses/add`, course, {
			headers: { Authorization: `${token}` },
		});
		return response.data.result;
	} catch (error) {
		console.error('Failed to add course to API', error);
		throw new Error('Failed to add course');
	}
};

export const fetchCourseByIDFromAPI = async (courseId: string) => {
	try {
		const response = await axios.get(`${URL}/courses/${courseId}`);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch course from API', error);
		throw new Error('Failed to fetch course');
	}
};

export const updateCourseOnAPI = async ({ courseId, course, token }) => {
	// console.log('Šalje kurs: ', course);
	try {
		const response = await axios.put(`${URL}/courses/${courseId}`, course, {
			headers: {
				Authorization: `${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
