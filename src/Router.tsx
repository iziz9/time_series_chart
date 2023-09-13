import { Route, Routes } from 'react-router-dom';
import ChartPage from './pages/ChartPage';
import ErrorPage from './pages/ErrorPage';

const Router = () => {
	return (
		<Routes>
			<Route path="/chart" element={<ChartPage />} />
			<Route path="/*" element={<ErrorPage />} />
		</Routes>
	);
};

export default Router;
