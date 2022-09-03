import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import configureStore from './core/store';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const store = configureStore();

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);