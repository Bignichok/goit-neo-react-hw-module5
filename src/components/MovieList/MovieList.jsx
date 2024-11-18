import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
	const { pathname, search } = useLocation();

	if (!movies.length) {
		return null;
	}

	return (
		<ul className={styles.list}>
			{movies.map(movie => (
				<li key={movie.id} className={styles.listItem}>
					<Link to={`/movies/${movie.id}`} state={{ url: search ? pathname + search : pathname }}>
						{movie.title}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default MovieList;
