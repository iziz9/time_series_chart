# 시계열 차트 페이지
프리온보딩 4주차에 진행한 시계열 차트 구현 과제입니다.

기간 : 2023.09.10. ~ 2023.09.13

## 배포 링크

<a href='https://iziz9-time-series-chart.netlify.app/chart' target='_blank'>✨ 배포 링크</a>


## 설치 및 실행방법

```js
$ git clone https://github.com/iziz9/time_series_chart.git

$ cd time_series_chart

$ npm install

$ npm run dev
```

## 🛠️ 기술스택

![React](https://img.shields.io/badge/ReactJS-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
![styledComponents](https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white)
![Recharts](https://img.shields.io/badge/RECHARTS-1281CA?style=for-the-badge&logo=RECHARTS&logoColor=FFFFFF
)


## 🌳 프로젝트 구조

```js
📂 public/
└── data/
    └── mockData.json
📂 src/
├── api/
│   └── request.ts
├── components/
│   ├── CustomAreaDot.tsx
│   ├── CustomTooltip.tsx
│   ├── Filter.tsx
│   ├── GraphContainer.tsx
│   └── Loading.tsx
├── constants/
│   ├── icon.tsx
│   └── styleConstants.ts
├── hooks/
│   └── useRequest.tsx
├── pages/
│   ├── ChartPage.tsx
│   └── ErrorPage.tsx
├── utils/
│   └── transformData.ts
├── app.tsx
├── globalStyles.ts
├── main.tsx
├── Router.tsx
└── types.ts
```

## 📜 요구사항

1. 시계열 차트 만들기
  - 주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트를 만들어주세요
  - 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들어주세요
  - Area 그래프의 기준값은 `value_area` 값을 이용해주세요
  - Bar 그래프의 기준값은 `value_bar` 값을 이용해주세요
  - 차트의 Y축에 대략적인 수치를 표현해주세요(예시 이미지 참고)
2. 호버 기능 구현
  - 특정 데이터 구역에 마우스 호버시 `id, value_area, value_bar` 데이터를 툴팁 형태로 제공해주세요
3. 필터링 기능 구현
  - 필터링 기능을 구현해주세요, 필터링은 특정 데이터 구역을 하이라이트 하는 방식으로 구현해주세요
  - 필터링 기능은 버튼 형태로 ID값(지역이름)을 이용해주세요
  - 필터링 시 버튼에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리를 해주세요
  - 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트해주세요


## 프로젝트 설명
> 프로젝트 폴더 내에 `.json` 형식의 목데이터를 저장하여 사용합니다.


### 📌 api 요청 관리 - 1

- 현재 프로젝트에는 요청 종류가 get 한가지로 제한되어있지만, 확장의 편리성을 높이기 위해 class 컴포넌트로 api요청을 관리합니다.

```js
// request.ts

class HttpClient {
	get() {
		return axiosFetch.get('/');
	}
}

const httpClient = new HttpClient();

export const requestGetChartData = () => {
	return httpClient.get();
};
```

### 📌 api 요청 관리 - 2

- `useRequest` 커스텀 훅을 이용해 데이터 fetching, 데이터 저장, 로딩 상태를 관리합니다. 

```js
// useRequest.tsx
export const useRequest = () => {
	const [chartData, setChartData] = useState<IChartDataItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const res = await requestGetChartData();

				if (res.status !== 200) {
					throw new Error();
				}

				const { response } = res.data;
				const transformedData = transformData(response);
				setChartData(transformedData);
			} catch (err) {
				alert(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return { chartData, isLoading };
};
```

```js
// useRequest hook 사용
const ChartPage = () => {
	const { isLoading, chartData } = useRequest();
	return (
    <GraphContainer chartData={chartData} isLoading={isLoading} />
  )
}
```

### 📌 차트 구성

- 컴포넌트 형태로 차트를 구성할 수 있는 라이브러리 중, 복합 차트를 지원하는 `recharts`를 사용했습니다.


### 📌 차트 필터링

- id값(지역명)으로 필터 버튼을 만들기 위해 `Set` 메서드를 사용해 api 응답 데이터에서 중복된 id를 제거합니다.
- 필터 버튼을 누르거나 그래프의 특정 구역을 클릭하면 같은 id값을 가진 데이터에 하이라이트 표시해줍니다.
- `area` 그래프는 `recharts`라이브러리에서 특정 구역 하이라이트 기능을 제공하지 않아 그래프에 옵셔널로 지정할 수 있는 dot을 커스텀해 구현했습니다.

```js
const Filter = ({ chartData, selectedDistrict, setSelectedDistrict }: IFilterProps) => {
	const idSet = new Set();
	chartData.map((item) => {
		idSet.add(item.id);
	});
	const chartIds = [...idSet];

	const resetFilter = () => {
		setSelectedDistrict('전체');
	};

	return (...);
};
```

### 📌 응답 데이터 가공

- api 응답 데이터는 객체 안의 객체 형태로 구성되어 있어 활용이 어려웠기 때문에 배열 형태로 가공해 사용했습니다.

```js
// utils/transformData.ts

export const transformData = (data: DataResponseType) => {
	return Object.entries(data).map(([time, data]) => ({
		time,
		...(data as IResponseItem),
	}));
};

```

### 📌 기타 개발환경 설정

- 자주 사용되는 css의 `color` 속성은 차트 라이브러리 컴포넌트에도 편리하게 적용하기 위해 객체로 저장해두고 import하여 사용했습니다.
- `globalStyles.ts` 에 스타일 변수로 지정하는 방법을 먼저 시도했으나, 컴포넌트 형태인 차트 라이브러리에는 사용할 수 없는 단점이 있어 개별 객체로 분리했습니다.

```js
// constants/styleConstants.ts
export const COLORS = {
	button: '#125644',
	bg: '#bedfec',
	bar: '#1a9ca3eb',
	barHightlight: '#17495eeb',
	area: '#c59d26',
	areaHightlight: '#b9db11ff',
	grid: '#f5f5f5',
	buttonHover: '#5d898a',
	border: '#c8c3c374',
};

// GraphContainer.tsx
const GraphContainer = ({ chartData, isLoading }: IGraphContainerProps) => {
  ...
  return (
    <Cell key={index} fill={item.id === selectedDistrict ? COLORS.barHightlight : COLORS.bar} />
  )
}

// Filter.tsx / styled component 사용 예 
const Button = styled.button`
	width: 100px;
	height: 30px;
	background-color: ${COLORS.button};
	box-shadow: 3px 3px 3px ${COLORS.buttonHover};
	color: white;
`
```