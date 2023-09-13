import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { COLORS } from '../constants/styleConstants';

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<Main>
			<div>존재하지 않는 페이지입니다.</div>
			<div>
				<button onClick={() => navigate('/chart', { replace: true })}>차트로 돌아가기</button>
			</div>
		</Main>
	);
};

const Main = styled.main`
	text-align: center;
	margin-top: 100px;
	font-size: 30px;

	button {
		background-color: ${COLORS.bar};
		padding: 10px 20px;
		margin-top: 50px;
		color: white;
		font-size: 18px;
		box-shadow: 5px 5px 5px ${COLORS.border};

		&:hover {
			background-color: ${COLORS.barHightlight};
		}
	}
`;

export default ErrorPage;
