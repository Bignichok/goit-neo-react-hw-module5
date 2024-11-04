import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import api from '@/api/tmdbApi.js';

const MovieDetailsPage = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	console.log(movie);
	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const response = await api.get(`/movie/${movieId}`);
				setMovie(response.data);
			} catch (error) {
				console.error('Error fetching movie details:', error);
			}
		};

		fetchMovieDetails();
	}, [movieId]);

	if (!movie) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h1>{movie.title}</h1>
			<img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}></img>
			<p>{movie.overview}</p>
			<p>Release Date: {movie.release_date}</p>
			<Outlet />
		</div>
	);
};

export default MovieDetailsPage;
