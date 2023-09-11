import { useEffect, useState } from 'react';
import { httpClient } from '../api/request';

export const useRequest = () => {
	const [chartData, setChartData] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await httpClient.get();
				if (res.status === 200) return false;

				res.data && setChartData(res.data);
			} catch (err) {
				console.info(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return { chartData, isLoading };
};

export default useRequest;
