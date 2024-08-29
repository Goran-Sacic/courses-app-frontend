import React, { useState } from 'react';
import Input from 'src/common/Input/Input';
import Button from 'src/common/Button/Button';
import styles from './Registration.module.css';
import { Link, useNavigate } from 'react-router-dom';
import {
	nameErrorMessage,
	passwordErrorMessage,
	emailErrorMessage,
	error,
} from './Registration.types';
import { registerUser } from 'src/services';

const Registration: React.FC = (): React.JSX.Element => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [passwordErrorMessage, setPasswordErrorMessage] =
		useState<passwordErrorMessage>(null);
	const [nameErrorMessage, setNameErrorMessage] =
		useState<nameErrorMessage>(null);
	const [emailErrorMessage, setEmailErrorMessage] =
		useState<emailErrorMessage>(null);
	const [error, setError] = useState<error>(null);

	const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const navigate = useNavigate();

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let isValid = true;

		// --------------------
		// Username validation
		// --------------------

		const usernameCheck = /^[0-9A-Za-z]{3,12}$/;
		if (!name.match(usernameCheck)) {
			setNameErrorMessage(
				'Username should be atleast 3 characters long (max 12) and contain only letters and numbers.'
			);
			isValid = false;
		} else setNameErrorMessage(null);

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

		const lowerCase = /[a-z]/g;
		const upperCase = /[A-Z]/g;
		const numbers = /[0-9]/g;
		const specialCharacters = /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/;

		if (password.length < 6) {
			setPasswordErrorMessage('Password should be atleast 6 characters long.');
			isValid = false;
		} else if (!password.match(lowerCase)) {
			setPasswordErrorMessage(
				'Pasword should contain atleast 1 lowercase letter.'
			);
			isValid = false;
		} else if (!password.match(upperCase)) {
			setPasswordErrorMessage(
				'Password should contain atleast 1 uppercase letter. '
			);
			isValid = false;
		} else if (!password.match(numbers)) {
			setPasswordErrorMessage('Password should contain atleast 1 number.');
			isValid = false;
		} else if (!password.match(specialCharacters)) {
			setPasswordErrorMessage(
				'Password should contain atleast one special character (for example: @).'
			);
			isValid = false;
		} else setPasswordErrorMessage(null);

		if (!isValid) {
			return;
		}

		const newUser = {
			name: name,
			email: email,
			password: password,
		};

		try {
			await registerUser(newUser);
			setName('');
			setEmail('');
			setPassword('');
			navigate('/login');
		} catch (error) {
			if (!error?.response) {
				if (error.message === 'Network Error') {
					setError(error.message);
				}
			} else if (
				error.response.data.errors[0] ===
				`'email' should be a string and it should be an email or email already exists`
			) {
				setEmailErrorMessage(
					'Please check your email (example email: test@test.test) or email already exists.'
				);
			} else {
				/* console.log(error); */
			}
		}
	};

	const showNameErrorBorder = nameErrorMessage ? styles.error : '';
	const showEmailErrorBorder = emailErrorMessage ? styles.error : '';
	const showPasswordErrorBorder = passwordErrorMessage ? styles.error : '';

	return (
		<div className={styles.container}>
			<form onSubmit={handleFormSubmit} className={styles.form}>
				<h3>Registration</h3>
				<div className={styles.inputContainer}>
					<div className={styles.inputSection}>
						<div className={showNameErrorBorder}>
							<Input
								labelText='Name'
								placeholderText='Input text'
								inputValue={name}
								handleChange={handleNameInput}
								type='text'
							/>
						</div>
						{nameErrorMessage && <p>{nameErrorMessage}</p>}
					</div>
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
						<Button buttonText='REGISTER' type='submit' />
					</div>
					<p>
						If you have an account, you may{' '}
						<Link to='/login' className={styles.login}>
							Login
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Registration;
