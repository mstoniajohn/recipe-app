import { FaExclamationTriangle } from 'react-icons/fa';
import { useRouter } from 'next/router';

import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/404.module.css';
import { useEffect } from 'react';

export default function NotFoundPage() {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push('/');
		}, 4000);
	}, []);
	return (
		<Layout title="Page Not Found">
			<div className={styles.error}>
				<h1>
					<FaExclamationTriangle /> 404
				</h1>
				<h4>Sorry, there is nothing here</h4>
				<Link href="/">Go Back Home</Link>
			</div>
		</Layout>
	);
}
