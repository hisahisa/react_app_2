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
                        <Menu/>
                            <Routes>
                                <Route path="/" element={<Products />} />
                                <Route path="/cart" element={<Cart />} />
                            </Routes>
                </CartProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
