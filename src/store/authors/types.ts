export interface Author {
	id: string;
	name: string;
}

export interface AuthorsState {
	authors: Author[];
	status: 'idle' | 'pending' | 'succeeded' | 'failed';
	error: string | null;
}
