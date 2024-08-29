import React from 'react';
import Button from 'src/common/Button/Button';
import styles from './AuthorItem.module.css';
import { AuthorItemProps } from './AutorItem.types';

const AuthorItem: React.FC<AuthorItemProps> = ({
	authorsList,
	handleAddToCourseAuthors,
	handleRemoveFromAuthorsList,
}): React.JSX.Element => {
	return (
		<div className={styles.authorItem}>
			{authorsList.map((author) => (
				<li key={author.id} className={styles.authorContent}>
					{author.name}
					{handleAddToCourseAuthors && (
						<Button
							buttonText='+'
							handleClick={() =>
								handleAddToCourseAuthors(author.id, author.name)
							}
							type='button'
						/>
					)}
					{handleRemoveFromAuthorsList && (
						<Button
							buttonText='-'
							handleClick={() =>
								handleRemoveFromAuthorsList(author.id, author.name)
							}
							type='button'
						/>
					)}
				</li>
			))}
		</div>
	);
};

export default AuthorItem;
