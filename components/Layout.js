import React from 'react';
import styles from '@/styles/Layout.module.css';
import Header from './Header';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Showcase from './Showcase';
const Layout = ({ title, keywords, description, children }) => {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header />
			{router.pathname === '/' && <Showcase />}
			<div className={styles.container}>
				<main className="page-content">{children}</main>
				<footer className={styles.footer}>
					<a
						href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					></a>
				</footer>
			</div>
		</>
	);
};
Layout.defaultProps = {
	title: 'SME Lifestyle',
	description: 'Coming soon',
	keywords: 'music, events',
};
export default Layout;
