import TrendingMovies from '@/components/TrendingMovies';
import styles from './HomePage.module.css';

const HomePage = () => {
	return (
		<div className={styles.home}>
			<TrendingMovies />
		</div>
	);
};

export default HomePage;
