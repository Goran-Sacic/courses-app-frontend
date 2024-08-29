/* import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, AuthContextType } from './AuthContext.types';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('result');
		const currentUser = localStorage.getItem('user');
		if (token) {
			try {
				setIsAuthenticated(true);
				setUser(JSON.parse(currentUser));
			} catch (error) {
				console.error('Error parsing user data from localStorage', error);
			}
		}
		if (currentUser) {
			try {
				setUser(JSON.parse(currentUser));
			} catch (error) {
				console.error('Error parsing user data from localStorage', error);
			}
		}
	}, []);

	if (isAuthenticated === null) {
		return <div>Loading...</div>;
	}

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
 */
