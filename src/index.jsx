import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { apiService } from './services/ApiService';

// 앱 시작 시 useEffect들의 순서싸움을 잡아주는 용
// 토큰을 얻고 그다음 렌더링

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

const data = localStorage.getItem('accessToken');
const accessToken = JSON.parse(data);

apiService.setAccessToken(accessToken);

root.render((
  <BrowserRouter basename="/distribution-practice">
    <App />
  </BrowserRouter>
));
