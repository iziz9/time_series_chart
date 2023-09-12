import { useEffect } from 'react';
import useRequest from '../hooks/useRequest';
import Loading from '../loading/Loading';
import { styled } from 'styled-components';
import {
	ComposedChart,
	Area,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	Scatter,
	ResponsiveContainer,
} from 'recharts';

const GraphContainer = () => {
	const { isLoading, chartData } = useRequest();

	useEffect(() => {
		console.log(chartData);
	}, [chartData]);

	if (isLoading) return <Loading />;

	return (
		<Container>
			{chartData && (
				<>
					<title>차트제목</title>
					<ChartSection>
						<ResponsiveContainer width="100%" height="100%">
							<ComposedChart
								width={500}
								height={400}
								data={chartData}
								margin={{
									top: 20,
									right: 20,
									bottom: 20,
									left: 20,
								}}
							>
								<CartesianGrid stroke="#f5f5f5" />
								<XAxis dataKey="time" scale="band" />
								<YAxis yAxisId="left" label={{ value: 'value_bar', offset: 30, angle: 0, position: 'top' }} />
								<YAxis
									yAxisId="right"
									orientation="right"
									label={{ value: 'value_area', offset: 30, angle: 0, position: 'top' }}
								/>
								<Tooltip />
								<Legend />
								<Bar dataKey="value_bar" barSize={20} fill="#1a9ca3eb" yAxisId="left" />
								<Area type="monotone" dataKey="value_area" fill="#c5ad26" stroke="#c5ad26" yAxisId="right" />
								{/* <Scatter dataKey="cnt" fill="red" /> */}
							</ComposedChart>
						</ResponsiveContainer>
					</ChartSection>
				</>
			)}
		</Container>
	);
};

const Container = styled.div`
	background-color: #a9d5e7;
	border-radius: 40px;
	padding: 10px;

	title {
		font-size: 30px;
		color: red;
	}
`;
const ChartSection = styled.section`
	position: relative;
	width: 100%;
	height: 600px;
`;

export default GraphContainer;
