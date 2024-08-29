import React, { useState } from 'react';
import Input from 'src/common/Input/Input';
import Button from 'src/common/Button/Button';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { LoginResponse } from './Login.types';
import { setUser } from 'src/store/user/userSlice';
import { useDispatch } from 'react-redux';
import { verifyLogin } from 'src/services';

const Login: React.FC = (): React.JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordErrorMessage, setPasswordErrorMessage] = useState<
		string | null
	>(null);
	const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
		null
	);
	const [error, setError] = useState<string | null>(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let isValid = true;

		// --------------------
		// Email validation
		// --------------------

		const emailCheck =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (!email.match(emailCheck)) {
			setEmailErrorMessage('Please enter a valid email address!');
			isValid = false;
		} else setEmailErrorMessage(null);

		// --------------------
		// Password validation
		// --------------------

		if (password.length < 6) {
			setPasswordErrorMessage('Password should be atleast 6 characters long.');
			isValid = false;
		} else setPasswordErrorMessage(null);

		if (!isValid) {
			return;
		}

		const loginCredentials = {
			email: email,
			password: password,
		};

		try {
			const response = (await verifyLogin(loginCredentials)) as LoginResponse;

			localStorage.setItem('token', response.result);
			/* localStorage.setItem('user', JSON.stringify(response.user)); */
			dispatch(
				setUser({
					isAuth: true,
					token: response.result,
				})
			);
			const token = localStorage.getItem('token');
			if (token) {
				navigate('/courses');
			}
			setEmail('');
			setPassword('');
		} catch (error) {
			if (!error?.response) {
				if (error.message === 'Network Error') {
					setError(`${error.message}`);
				} else setError('Something went wrong.');
			} else if (!error) {
				setEmailErrorMessage(null);
				setPasswordErrorMessage(null);
				setError(null);
			} else if (error.response.data.result === 'Invalid data.') {
				setError('Invalid data.');
			} else if (
				error.response.data.errors[0] ===
				`'email' should be a string and it should be an email`
			) {
				setEmailErrorMessage(
					'Please check your email (example: test@test.test).'
				);
			}
		}
	};

	const showEmailErrorBorder = emailErrorMessage ? styles.error : '';
	const showPasswordErrorBorder = passwordErrorMessage ? styles.error : '';

	return (
		<div className={styles.container}>
			<form onSubmit={handleFormSubmit} className={styles.form}>
				<h3>Login</h3>
				<div className={styles.inputContainer}>
					<div className={styles.inputSection}>
						<div className={showEmailErrorBorder}>
							<Input
								labelText='Email'
								placeholderText='Input text'
								inputValue={email}
								handleChange={handleEmailInput}
								type='email'
							/>
						</div>
						{emailErrorMessage && <p>{emailErrorMessage}</p>}
					</div>
					<div className={styles.inputSection}>
						<div className={showPasswordErrorBorder}>
							<Input
								labelText='Password'
								placeholderText='Input text'
								inputValue={password}
								handleChange={handlePasswordInput}
								type='password'
							/>
						</div>
						{passwordErrorMessage && <p>{passwordErrorMessage}</p>}
						{error && <p>{error}</p>}
					</div>
					<div className={styles.inputSection}>
						<Button buttonText='LOGIN' type='submit' />
					</div>
					<p className={styles.registration}>
						If you don't have an account, you may
						<Link to='/registration' className={styles.login}>
							Register
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
