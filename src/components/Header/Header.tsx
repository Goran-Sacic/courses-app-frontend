import React from 'react';
import styles from './Header.module.css';
import Logo from './components/Logo/Logo';
import Button from 'src/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from 'src/store/user/userSlice';
import { RootState } from 'src/store';
import { deleteOnLogout } from 'src/services';

const Header: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { name, isAuth, token, role } = useSelector(
		(state: RootState) => state.user
	);

	const handleButtonClick = async () => {
		localStorage.removeItem('token');
		/* localStorage.removeItem('user'); */
		dispatch(setUser({ name: '', email: '', isAuth: false, token: '' }));
		deleteOnLogout(token);
		navigate('/login');
	};

	return (
		<header className={styles.header}>
			<Logo />
			<div className={styles.nameAndButton}>
				<span className={styles.title}>
					{name ? `${name}` : role === 'admin' ? 'Admin' : ''}
				</span>
				{isAuth ? (
					<Button buttonText='LOGOUT' handleClick={handleButtonClick} />
				) : (
					''
				)}
			</div>
		</header>
	);
};

export default Header;
