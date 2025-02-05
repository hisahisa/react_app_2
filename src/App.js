import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Menu from './pages/Menu';
import Login from './pages/Login';
import './App.css';
import {CartProvider} from "./pages/CartContext";
import Notification from "./common/Notification";
import PageLoading from "./common/PageLoading";
import MenuComponent from "./pages/Menu";

function App() {
    return (
        <>
            <BrowserRouter>
                <CartProvider>
                    <PageLoading />
                    <Notification />
                        <Routes>
                            <Route index element={<Login />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/menu" element={<MenuComponent />} >
                                <Route index element={<Products />} />
                                <Route path="product" element={<Products />} />
                                <Route path="cart" element={<Cart />} />
                            </Route>
                        </Routes>
                </CartProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
