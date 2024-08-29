import React from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({ buttonText, type, handleClick }) => {
	return (
		<button className={styles.button} type={type} onClick={handleClick}>
			{buttonText}
		</button>
	);
};

export default Button;
