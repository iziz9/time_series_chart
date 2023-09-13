import { Payload } from 'recharts/types/component/DefaultTooltipContent';

export type DataResponseType = {
	[key: string]: IResponseItem;
};

export interface IResponseItem {
	id: string;
	value_area: number;
	value_bar: number;
}

export interface IChartDataItem {
	time: string;
	id: string;
	value_area: number;
	value_bar: number;
}

export interface IFilterProps {
	chartData: IChartDataItem[];
	setSelectedDistrict: React.Dispatch<React.SetStateAction<string>>;
}

export interface IGraphContainerProps {
	chartData: IChartDataItem[];
	isLoading: boolean;
}

export interface ICustomAreaDotProps {
	cx?: number;
	cy?: number;
	dotId: string;
	selectedDistrict: string;
	payload: { id: string };
}

export interface ICustomTooltipProps {
	active?: boolean;
	payload: Payload<string, string>[];
	setDotId: React.Dispatch<React.SetStateAction<string>>;
}

export interface IUseDebounceProps {
	area: {
		payload: {
			id: string;
		};
	};
	setDotId: React.Dispatch<React.SetStateAction<string>>;
}
