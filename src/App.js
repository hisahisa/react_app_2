import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Menu from './pages/Menu';
import './App.css';
import {CartProvider} from "./pages/CartContext";
import Notification from "./common/Notification";
import PageLoading from "./common/PageLoading";

function App() {
    return (
        <>
            <BrowserRouter>
                <CartProvider>
                    <PageLoading />
                    <Notification />
                        <Routes>
                            <Route path="/menu" element={<Menu />} >
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
