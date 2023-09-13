import { styled } from 'styled-components';
import useRequest from '../hooks/useRequest';
import GraphContainer from '../components/GraphContainer';

const ChartPage = () => {
	const { isLoading, chartData } = useRequest();

	return (
		<Main>
			<h1>Chart</h1>
			<GraphContainer chartData={chartData} isLoading={isLoading} />
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
