import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '@/api/tmdbApi.js';

const TrendingMovies = ({ timeWindow = 'day' }) => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const fetchTrendingMovies = async () => {
			try {
				const response = await api.get(`/trending/movie/${timeWindow}`);
				setMovies(response.data.results);
			} catch (error) {
				console.error('Error fetching trending movies:', error);
			}
		};

		fetchTrendingMovies();
	}, [timeWindow]);

	return (
		<div>
			<h1>Trending Movies</h1>
			<ul>
				{movies.map(movie => (
					<li key={movie.id}>
						<Link to={`/movies/${movie.id}`}>{movie.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TrendingMovies;
