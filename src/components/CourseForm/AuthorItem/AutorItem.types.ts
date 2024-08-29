interface Author {
	id?: string;
	name: string;
}

interface AuthorItemProps {
	authorsList: Author[];
	handleAddToCourseAuthors?: (id: string, name: string) => void;
	handleRemoveFromAuthorsList?: (id: string, name: string) => void;
}

export { AuthorItemProps };
