import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies }) => {
	const { pathname, search } = useLocation();

	if (!movies.length) {
		return null;
	}
	console.log({ pathname, search });
	return (
		<ul>
			{movies.map(movie => (
				<li key={movie.id}>
					<Link to={`/movies/${movie.id}`} state={{ url: search ? pathname + search : pathname }}>
						{movie.title}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default MovieList;
