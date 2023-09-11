import { TableTooltip, useTooltip } from '@nivo/tooltip';
import AreaGraph from './AreaGraph';
import { useEffect } from 'react';
import { httpClient } from '../api/request';

const GraphContainer = () => {
	useEffect(() => {
		const abc = async () => {
			const res = await httpClient.get();
			console.log(res);
		};
		abc();
	}, []);

	// const tooltip = useTooltip();

	// // 분리?
	// function CustomTooltip({ id, barValue, areaValue }) {
	// 	return (
	// 		<TableTooltip
	// 			rows={[
	// 				['id', id],
	// 				['value_area', barValue],
	// 				['value_bar', areaValue],
	// 			]}
	// 		/>
	// 	);
	// }

	// function renderTip(e, idx) {
	// 	return tooltip.showTooltipFromEvent(<CustomTooltip barValue={data[idx].v} lineValue={data[idx].v1} />, e);
	// }

	return (
		<div>
			rfrr
			{/* <AreaGraph areaData={{}} /> */}
		</div>
	);
};

export default GraphContainer;
