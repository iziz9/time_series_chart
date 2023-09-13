/// <reference types="vite/client" />

type DataResponseType = {
	[key: string]: IResponseItem;
};

interface IResponseItem {
	id: string;
	value_area: number;
	value_bar: number;
}

interface IChartDataItem {
	time: string;
	id: string;
	value_area: number;
	value_bar: number;
}

interface IFilterProps {
	chartData: IChartDataItem[];
	setSelectedDistrict: React.Dispatch<React.SetStateAction<string>>;
}
