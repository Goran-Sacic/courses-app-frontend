import React from 'react';
import logo from './EPAM_logo.svg.png';

const Logo: React.FC = () => {
	return (
		<>
			<img src={logo} alt='logo' width={50}></img>
		</>
	);
};

export default Logo;
