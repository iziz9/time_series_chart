export const transformData = (data: DataResponseType) => {
	return Object.entries(data).map(([time, data]) => ({
		time,
		...(data as IResponseItem),
	}));
};
