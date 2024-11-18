import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/api/tmdbApi.js';
import styles from './MovieCast.module.css';

const MovieCast = () => {
	const { movieId } = useParams();
	const [cast, setCast] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchMovieCast = async () => {
			try {
				setLoading(true);
				const response = await api.get(`/movie/${movieId}/credits`);
				setCast(response.data?.cast || []);
			} catch (error) {
				console.error('Error fetching movie details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchMovieCast();
	}, [movieId]);

	return (
		<div >
			<h3>Movie Cast</h3>
			{loading ? (
				<div>loading...</div>
			) : (
				<ul className={styles.cast}>
					{cast.length > 0 ? (
						cast.map(({ original_name, character, id, profile_path }) => {
							return (
								<li key={id} className={styles.castItem}>
									<img
										src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
										alt={original_name}
									/>
									<p>{original_name}</p>
									<p>{character}</p>
								</li>
							);
						})
					) : (
						<p>There is no cast info for this movie</p>
					)}
				</ul>
			)}
		</div>
	);
};

export default MovieCast;
