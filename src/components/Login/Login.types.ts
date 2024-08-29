interface User {
	email: string;
	name: string;
}

interface AuthContextType {
	setUser: (user: User) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
}

interface LoginResponse {
	result: string;
	user: User;
}

export { User, AuthContextType, LoginResponse };
