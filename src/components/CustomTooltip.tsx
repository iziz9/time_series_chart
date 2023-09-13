import { styled } from 'styled-components';
import { COLORS } from '../constants/styleConstants';
import { ICustomTooltipProps } from '../types';
import { useEffect } from 'react';

const CustomTooltip = ({ payload, active, setDotId }: ICustomTooltipProps) => {
	const [bar, area] = payload;

	useEffect(() => {
		area && setDotId(area.payload.id);
	}, [area, setDotId]);

	if (active && payload && payload.length) {
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
	}
};

const ToolTipContainer = styled.div`
	width: 180px;
	height: 90px;
	background-color: #ffffffdd;
	border: 1px solid ${COLORS.border};
	border-radius: 16px;
	box-shadow: 3px 3px 3px ${COLORS.border};
	padding: 10px;
	display: flex;
	flex-direction: column;
	text-align: center;

	.district {
		font-size: 18px;
		font-weight: 700;
		color: ${COLORS.button};
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
