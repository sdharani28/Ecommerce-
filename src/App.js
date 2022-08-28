import logo from './logo.svg';
import './App.css';
import './Stylesheets/Layout.css';
import './Stylesheets/products.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProductInfo from './Pages/ProductInfo';
import Cart from './Pages/Cart';
import Orders from './Pages/Orders';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './redux/store';

import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' exact element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/register' exact element={<Register />} />
            <Route path='/productinfo/:productid' exact element={<ProtectedRoute><ProductInfo /></ProtectedRoute>} />
            <Route path='/cart' exact element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path='/orders' exact element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
