import axios from 'axios';

const BASE_URL = '/data/mockData.json';

const axiosFetch = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
	withCredentials: true,
});

class HttpClient {
	get() {
		return axiosFetch.get('/');
	}
}

const httpClient = new HttpClient();

export const requestGetChartData = () => {
	return httpClient.get();
};
