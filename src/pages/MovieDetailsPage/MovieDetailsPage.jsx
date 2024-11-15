import { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate, useLocation, Link } from 'react-router-dom';

import api from '@/api/tmdbApi.js';

const MovieDetailsPage = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

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

	const goBack = () => {
		navigate(location.state?.url || '/movies');
	};

	if (!movie) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<button onClick={goBack}>Go Back</button>
			<h1>{movie.title}</h1>
			<img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}></img>
			<p>{movie.overview}</p>
			<p>Release Date: {movie.release_date}</p>
			<div>
				<h2>Additional info</h2>
				<ul>
					<li>
						<Link to={`/movies/${movieId}/cast`}>cast</Link>
					</li>
					<li>
						<Link to={`/movies/${movieId}/reviews`}>reviews</Link>
					</li>
				</ul>
			</div>

			<Outlet />
		</div>
	);
};

export default MovieDetailsPage;
