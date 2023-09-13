import { styled } from 'styled-components';
import { useEffect } from 'react';
import useRequest from '../hooks/useRequest';
import GraphContainer from '../components/GraphContainer';
import Loading from '../loading/Loading';

const ChartPage = () => {
	const { isLoading, chartData } = useRequest();

	useEffect(() => {
		console.log(chartData);
	}, [chartData]);

	if (isLoading) return <Loading />;

	return (
		<Main>
			<h1>Chart</h1>
			<GraphContainer chartData={chartData} />
		</Main>
	);
};

const Main = styled.main`
	position: relative;
	h1 {
		display: block;
		font-size: 30px;
		text-align: center;
		margin-bottom: 30px;
	}
`;

export default ChartPage;
