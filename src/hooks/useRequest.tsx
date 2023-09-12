import { useEffect, useState } from 'react';
import { requestGetChartData } from '../api/request';
import { transformData } from '../utils/transformData';

export const useRequest = () => {
	const [chartData, setChartData] = useState<IChartDataItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await requestGetChartData();

				if (res.status !== 200) {
					throw new Error();
				}

				const { response } = res.data;
				const transformedData = transformData(response);
				setChartData(transformedData);
			} catch (err) {
				alert(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return { chartData, isLoading };
};

export default useRequest;
