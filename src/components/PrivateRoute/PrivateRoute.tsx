import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Navigate } from 'react-router-dom';
import { PrivateRouteProps } from './PrivateRoute.types';

const PrivateRoute = ({ children, requireAdmin }: PrivateRouteProps) => {
	const token = localStorage.getItem('token');
	const role = useSelector((state: RootState) => state.user.role);

	if (!token) {
		return <Navigate to='/login' />;
	}
	if (requireAdmin && role !== 'admin') {
		return <Navigate to='/courses' />;
	}
	return <>{children}</>;
};

export default PrivateRoute;
