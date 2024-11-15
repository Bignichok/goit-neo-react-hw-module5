import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/api/tmdbApi.js';

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
				console.error('Error fetching movie details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchReviews();
	}, [movieId]);

	return (
		<div>
			<h3>Movie Reviews</h3>
			{loading ? (
				<div>loading...</div>
			) : (
				<ul>
					{reviews.length > 0 ? (
						reviews.map(({ author, content, id }) => {
							return (
								<li key={id}>
									<p>{author}</p>
									<p>{content}</p>
								</li>
							);
						})
					) : (
						<p>There is no reviews for this movie</p>
					)}
				</ul>
			)}
		</div>
	);
};

export default MovieReviews;
