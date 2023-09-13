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
import Filter from './Filter';
import Loading from '../loading/Loading';
import { IGraphContainerProps } from '../types';
import CustomAreaDot from './CustomAreaDot';

const GraphContainer = ({ chartData, isLoading }: IGraphContainerProps) => {
	const [selectedDistrict, setSelectedDistrict] = useState('전체');
	const [dotId, setDotId] = useState<string>('');

	return (
		<Container>
			<FilterSection>
				<Filter
					chartData={chartData}
					selectedDistrict={selectedDistrict}
					setSelectedDistrict={setSelectedDistrict}
				/>
			</FilterSection>
			{isLoading && <Loading />}
			{!chartData && <NoData>표시할 데이터가 없습니다.</NoData>}
			{chartData && (
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
							<CartesianGrid stroke={COLORS.grid} />
							<XAxis dataKey="time" scale="band" />
							<YAxis yAxisId="left" label={{ value: 'value_bar', offset: 30, angle: 0, position: 'top' }} />
							<YAxis
								yAxisId="right"
								orientation="right"
								label={{ value: 'value_area', offset: 30, angle: 0, position: 'top' }}
							/>
							<Tooltip content={<CustomTooltip payload={[]} setDotId={setDotId} />} />
							<Legend />
							<Bar
								dataKey="value_bar"
								barSize={20}
								fill={COLORS.bar}
								yAxisId="left"
								onClick={(barData) => {
									setSelectedDistrict(barData.id);
								}}
							>
								{chartData.map((item, index) => (
									<Cell key={index} fill={item.id === selectedDistrict ? COLORS.barHightlight : COLORS.bar} />
								))}
							</Bar>
							<Area
								type="monotone"
								dataKey="value_area"
								fill={COLORS.area}
								stroke={COLORS.area}
								yAxisId="right"
								onClick={() => setSelectedDistrict(dotId)}
								dot={<CustomAreaDot dotId={dotId} selectedDistrict={selectedDistrict} payload={{ id: '' }} />}
							/>
						</ComposedChart>
					</ResponsiveContainer>
				</ChartSection>
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
const NoData = styled.div`
	padding: 40px;
	text-align: center;
`;

export default GraphContainer;
