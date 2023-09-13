import { styled } from 'styled-components';
import { COLORS } from '../constants/styleConstants';
import { IFilterProps } from '../types';

const Filter = ({ chartData, selectedDistrict, setSelectedDistrict }: IFilterProps) => {
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
				className={selectedDistrict === '전체' ? 'selected' : ''}
				onClick={() => {
					resetFilter();
				}}
			>
				전체
			</Button>
			{chartIds.map((id) => (
				<Button
					key={id as string}
					onClick={() => setSelectedDistrict(id as string)}
					className={selectedDistrict === id ? 'selected' : ''}
				>
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
	box-shadow: 3px 3px 3px ${COLORS.buttonHover};
	color: white;

	&.selected {
		background-color: ${COLORS.buttonHover};
		box-shadow: 3px 3px 3px ${COLORS.button};
	}

	&:hover {
		background-color: ${COLORS.buttonHover};
	}
`;

export default Filter;
