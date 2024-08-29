interface User {
	name: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export { AuthContextType };
