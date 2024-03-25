import ReactDom from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './Context/ShopContext';

const app = ReactDom.createRoot(document.querySelector('#root'));
app.render(
    <BrowserRouter>
        <ShopContextProvider>
            <App/>
        </ShopContextProvider>
    </BrowserRouter>
);