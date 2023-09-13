import { COLORS } from '../constants/styleConstants';
import { ICustomAreaDotProps } from '../types';

const CustomAreaDot = ({ cx = 0, cy = 0, selectedDistrict, payload }: ICustomAreaDotProps) => {
	if (payload.id === selectedDistrict)
		return (
			<g className="recharts-layer recharts-area-dots">
				<circle
					r="3"
					fill={COLORS.areaHightlight}
					stroke={COLORS.areaHightlight}
					fillOpacity="0.6"
					width="844"
					height="423.0625"
					strokeWidth="2"
					cx={cx}
					cy={cy}
					className="recharts-dot recharts-area-dot"
				></circle>
			</g>
		);
};

export default CustomAreaDot;
