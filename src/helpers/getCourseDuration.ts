const getCourseDuration = (duration: number): string => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	const modifiedHours = hours.toString().padStart(2, '0');
	const modifiedMinutes = minutes.toString().padStart(2, '0');

	return `${modifiedHours}:${modifiedMinutes}`;
};

export default getCourseDuration;
