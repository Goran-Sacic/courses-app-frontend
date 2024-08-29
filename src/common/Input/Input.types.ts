export interface InputTypes {
	labelText: string;
	placeholderText: string;
	inputValue?: string | number;
	handleChange?: React.ChangeEventHandler<HTMLInputElement>;
	type?: string;
	required?: boolean;
}
