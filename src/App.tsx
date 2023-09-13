import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import GlobalStyles from './globalStyles.ts';

function App() {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<Router />
		</BrowserRouter>
	);
}

export default App;
