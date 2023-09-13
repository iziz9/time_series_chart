import { styled } from 'styled-components';
import { COLORS } from '../constants/styleConstants';
import { IFilterProps } from '../types';

const Filter = ({ chartData, setSelectedDistrict }: IFilterProps) => {
	const idSet = new Set();
	chartData.map((item) => {
		idSet.add(item.id);
	});
	const chartIds = [...idSet];

	const resetFilter = () => {
		setSelectedDistrict('전체');
	};

	return (
		<>
			<Button
				onClick={() => {
					resetFilter();
				}}
			>
				전체
			</Button>
			{chartIds.map((id) => (
				<Button key={id as string} onClick={() => setSelectedDistrict(id as string)}>
					{id as string}
				</Button>
			))}
		</>
	);
};

const Button = styled.button`
	width: 100px;
	height: 30px;
	background-color: ${COLORS.button};
	color: white;

	&:hover {
		background-color: ${COLORS.buttonHover};
	}
`;

export default Filter;
