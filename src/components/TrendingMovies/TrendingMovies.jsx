import { useEffect, useState } from 'react';

import api from '@/api/tmdbApi.js';
import MovieList from '@/components/MovieList';

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
				<MovieList movies={movies} />
			</ul>
		</div>
	);
};

export default TrendingMovies;
