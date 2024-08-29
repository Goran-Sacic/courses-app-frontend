interface Author {
	id: string;
	name: string;
}

const findAuthors = (authorsToFind: string[], authors: Author[]): string[] => {
	const foundAuthors: string[] = [];
	for (let i = 0; i < authorsToFind.length; i++) {
		const author: Author | undefined = authors.find(
			(author: Author) => author.id === authorsToFind[i]
		);
		if (author) {
			foundAuthors.push(author.name);
		}
	}
	return foundAuthors;
};

export default findAuthors;
