import React from 'react';
import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';

const Nav = () => {
	return (
		<nav className={navStyles.nav}>
			<h1>SMELifestyle</h1>
			<ul className={navStyles.ul}>
				<li className={navStyles.li}>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/recipes">About</Link>
				</li>
				<li>
					<Link href="/studio">Studio</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
