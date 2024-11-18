import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import api from '@/api/tmdbApi.js';
import MovieList from '@/components/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [movies, setMovies] = useState([]);
	const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || '');
	const [loading, setLoading] = useState(false);

	const fetchMoviesByQuery = async query => {
		setLoading(true);
		try {
			const response = await api.get('/search/movie', { params: { query } });
			setMovies(response.data.results);
		} catch (error) {
			console.error('Error fetching movies:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const query = searchParams.get('query');

		if (query) {
			fetchMoviesByQuery(query);
		}
	}, [searchParams]);

	const handleSubmit = e => {
		e.preventDefault();
		if (searchQuery.length) {
			setSearchParams({ query: searchQuery });
		} else {
			setSearchParams({});
			setMovies([]);
		}
	};

	return (
		<div className={styles.page}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					name="searchQuery"
					placeholder="Search movie"
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
				<button type="submit">Search</button>
			</form>
			{loading ? <p>Loading...</p> : <MovieList movies={movies} />}
		</div>
	);
};

export default MoviesPage;
