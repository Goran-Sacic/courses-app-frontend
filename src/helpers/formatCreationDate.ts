const formatCreationDate = (stringDate: string): string => {
	const [day, month, year] = stringDate.split('/').map(Number);

	return `${day}.${month}.${year}`;
};

export default formatCreationDate;
