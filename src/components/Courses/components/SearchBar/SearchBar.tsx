import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import Button from 'src/common/Button/Button';
import Input from 'src/common/Input/Input';
import { SearchBarProps } from './SearchBar.types';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
		onSearch(event.target.value.toLowerCase());
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSearch(query);
	};
	return (
		<>
			<form className={styles.searchBar} onSubmit={handleSubmit}>
				<Input
					labelText=''
					placeholderText='SEARCH'
					inputValue={query}
					handleChange={handleChange}
				/>
				<Button type='submit' buttonText='SEARCH' />
			</form>
		</>
	);
};

export default SearchBar;
