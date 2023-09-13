import { TooltipProps } from 'recharts';
import { styled } from 'styled-components';
import { COLORS } from '../constants/styleConstants';

const CustomTooltip = ({ payload, active }: TooltipProps<string, number>) => {
	const [bar, area] = payload;

	if (active && payload && payload.length)
		return (
			<ToolTipContainer>
				<p className="district">{bar.payload.id}</p>
				<div className="values">
					<div className="bar">
						<p className="name">{bar.name}</p>
						<p className="value">{bar.payload.value_bar}</p>
					</div>
					<div className="area">
						<p className="name">{area.name}</p>
						<p className="value">{area.payload.value_area}</p>
					</div>
				</div>
			</ToolTipContainer>
		);
};

const ToolTipContainer = styled.div`
	width: 200px;
	height: 100px;
	background-color: white;
	border: 1px solid #c8c3c374;
	border-radius: 16px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	text-align: center;

	.district {
		font-size: 18px;
		font-weight: 700;
		color: ${COLORS.green};
		margin-bottom: 18px;
	}

	.values {
		display: flex;
		justify-content: space-between;
	}

	.bar {
		display: flex;
		flex-direction: column;
		gap: 10px;
		color: ${COLORS.bar};
	}
	.area {
		display: flex;
		flex-direction: column;
		gap: 12px;
		color: ${COLORS.area};
	}
`;

export default CustomTooltip;
