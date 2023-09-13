import { styled } from 'styled-components';
import { useState } from 'react';
import {
	ComposedChart,
	Area,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Cell,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import { COLORS } from '../constants/styleConstants';

const GraphContainer = ({ chartData }: { chartData: IChartDataItem[] }) => {
	const [selectedDistrict, setSelectedDistrict] = useState('');

	const idSet = new Set();
	chartData.map((item) => {
		idSet.add(item.id);
	});
	const chartIds = [...idSet];

	const resetFilter = () => {
		setSelectedDistrict('');
	};

	return (
		<Container>
			<FilterSection>
				<Button
					onClick={() => {
						resetFilter();
					}}
				>
					전체
				</Button>
				{chartIds.map((id) => (
					<Button key={id as string} onClick={() => setSelectedDistrict(id as string)}>
						{id as string}
					</Button>
				))}
			</FilterSection>
			{chartData && (
				<>
					<ChartSection>
						<ResponsiveContainer width="100%" height="100%">
							<ComposedChart
								width={500}
								height={400}
								data={chartData}
								margin={{
									top: 50,
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
								<Tooltip content={<CustomTooltip />} />
								<Legend />
								<Bar dataKey="value_bar" barSize={20} fill="#1a9ca3eb" yAxisId="left" />
								{chartData.map((entry, index) => (
									<Cell
										key={index}
										fill={entry.id === selectedDistrict ? COLORS.barHightlight : COLORS.bar}
									/>
								))}
								<Area
									type="monotone"
									dataKey="value_area"
									fill={COLORS.area}
									stroke={COLORS.area}
									yAxisId="right"
								/>
							</ComposedChart>
						</ResponsiveContainer>
					</ChartSection>
				</>
			)}
		</Container>
	);
};

const Container = styled.div`
	background-color: ${COLORS.bg};
	border-radius: 40px;
	padding: 10px;
`;
const FilterSection = styled.section`
	display: flex;
	gap: 15px;
	justify-content: center;
	margin-bottom: 20px;
`;
const ChartSection = styled.section`
	position: relative;
	width: 100%;
	height: 540px;

	tspan {
		font-size: 14px;
	}
`;
const Button = styled.button`
	width: 100px;
	height: 30px;
	background-color: ${COLORS.green};
	color: white;
`;

export default GraphContainer;
