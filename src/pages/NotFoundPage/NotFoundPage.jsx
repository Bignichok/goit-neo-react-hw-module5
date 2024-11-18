import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
	return (
		<div className={styles.notFound}>
			<h1>404</h1>
			<p>Page not found. Please check the URL or return to the homepage.</p>
		</div>
	);
};

export default NotFoundPage;
