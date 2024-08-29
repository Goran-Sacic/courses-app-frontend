export interface ButtonProps {
	buttonText: string;
	type?: 'button' | 'submit' | 'reset';
	handleClick?: () => void;
}
