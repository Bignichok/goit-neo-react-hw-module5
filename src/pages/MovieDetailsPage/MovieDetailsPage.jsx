import { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import api from '@/api/tmdbApi.js';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				setLoading(true);
				const response = await api.get(`/movie/${movieId}`);
				setMovie(response.data);
			} catch (error) {
				setError('Error fetching movie details. Please try again later.');
				console.error('Error fetching movie details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchMovieDetails();
	}, [movieId]);

	const goBack = () => {
		navigate(location.state?.url || '/movies');
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div className={styles.details}>
			<button onClick={goBack}>Go Back</button>
			<h1>{movie.title}</h1>
			<img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.title} />
			<p>{movie.overview}</p>
			<p>Release Date: {movie.release_date}</p>

			<div className={styles.additionalInfo}>
				<h2>Additional Info</h2>
				<ul>
					<li>
						<Link to={`/movies/${movieId}/cast`} state={location.state}>
							Cast
						</Link>
					</li>
					<li>
						<Link to={`/movies/${movieId}/reviews`} state={location.state}>
							Reviews
						</Link>
					</li>
				</ul>
			</div>

			<Outlet />
		</div>
	);
};

export default MovieDetailsPage;
