import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/api/tmdbApi.js';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
	const { movieId } = useParams();
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				setLoading(true);
				const response = await api.get(`/movie/${movieId}/reviews`);
				setReviews(response.data.results);
			} catch (error) {
				console.error('Error fetching reviews:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchReviews();
	}, [movieId]);

	return (
		<div className={styles.reviews}>
			<h3>Movie Reviews</h3>
			{loading ? (
				<div>Loading...</div>
			) : (
				<ul>
					{reviews.length > 0 ? (
						reviews.map(({ author, content, id }) => (
							<li key={id} className={styles.reviewItem}>
								<p>
									<strong>{author}</strong>
								</p>
								<p>{content}</p>
							</li>
						))
					) : (
						<p>No reviews available for this movie.</p>
					)}
				</ul>
			)}
		</div>
	);
};

export default MovieReviews;
