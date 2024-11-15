import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '@/api/tmdbApi.js';
import MovieList from '@/components/MovieList';

const MoviesPage = () => {
	const [movies, setMovies] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [loading, setLoading] = useState(false);

	const location = useLocation();
	const navigate = useNavigate();

	const fetchMoviesByQuery = async query => {
		setLoading(true);
		try {
			const response = await api.get('/search/movie', {
				params: { query },
			});
			setMovies(response.data.results);
		} catch (error) {
			console.error('Error fetching movies:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const initialQuery = params.get('query') || '';

		if (initialQuery.length) {
			setSearchQuery(initialQuery);
			fetchMoviesByQuery(initialQuery);
		}
	}, [location.search]);

	const handleSubmit = e => {
		e.preventDefault();
		if (searchQuery.length) {
			fetchMoviesByQuery(searchQuery);
			navigate(`?query=${encodeURIComponent(searchQuery)}`, { replace: true });
		} else {
			navigate('', { replace: true });
			setMovies([]);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
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
