import React from 'react';
import { InputTypes } from './Input.types';
import styles from './Input.module.css';

const Input = ({
	labelText,
	placeholderText,
	inputValue,
	handleChange,
	type,
	required,
}: InputTypes): React.JSX.Element => {
	return (
		<label>
			{labelText}
			<input
				value={inputValue}
				onChange={handleChange}
				placeholder={placeholderText}
				className={styles.input}
				type={type}
				required={required}
			/>
		</label>
	);
};

export default Input;
