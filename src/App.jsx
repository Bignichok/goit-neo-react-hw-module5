import { Routes, Route } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import MoviesPage from '@/pages/MoviesPage';
import MovieDetailsPage from '@/pages/MovieDetailsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MovieCast from '@/components/MovieCast';
import MovieReviews from '@/components/MovieReviews';
import Navigation from '@/components/Navigation';

const App = () => {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/movies" element={<MoviesPage />} />
				<Route path="/movies/:movieId" element={<MovieDetailsPage />}>
					<Route path="cast" element={<MovieCast />} />
					<Route path="reviews" element={<MovieReviews />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
};

export default App;
