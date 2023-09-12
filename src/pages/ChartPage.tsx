import React from 'react';
import GraphContainer from '../graphs/GraphContainer';
import { styled } from 'styled-components';

const ChartPage = () => {
	return (
		<Main>
			<GraphContainer />
		</Main>
	);
};

const Main = styled.main`
	position: relative;
	width: 1024px;
	margin: 50px auto;
`;

export default ChartPage;
