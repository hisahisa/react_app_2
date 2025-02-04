import React, { createContext, useState, useCallback, useMemo, useEffect } from "react";
import { useCookies } from "react-cookie";
import { SEVERITY } from "../common/constants";
import Api from "../common/api";
import {useNavigate} from "react-router-dom";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cookies, setCookie] = useCookies(["cartItems"]);
    const navigate = useNavigate();

    // Cookieから初期状態を復元
    const [items, setItems] = useState(() => {
        const savedItems = cookies.cartItems;
        return savedItems && savedItems.length > 0 ? JSON.parse(JSON.stringify(savedItems)) : [];
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        severity: SEVERITY.SUCCESS,
        message: "",
    });
    const [sysError, setSysError] = useState({
        statusCode: 404,
        message: "404 Not Found",
    });

    // itemsが変更されるたびにCookieに保存
    useEffect(() => {
        setCookie("cartItems", JSON.stringify(items), {
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7日間有効
        });
    }, [items, setCookie]);

    const addItems = useCallback((item_key, title, price, qty) => {
        setItems((prev) => {
            const itemExists = prev.some((item) => item.item_key === item_key);

            if (itemExists) {
                return prev.map((item) =>
                    item.item_key === item_key
                        ? { ...item, title, price, qty }
                        : item
                );
            }
            return [...prev, { item_key, title, price, qty }];
        });
    }, []);

    const delItems = useCallback((item_key) => {
        setItems((prev) => prev.filter((item) => item.item_key !== item_key));
    }, []);

    const onSetAlert = useCallback((
        { message = "", severity = SEVERITY.ERROR, open = true }) => {
        setAlert({ open, severity, message });
    }, []);

    // ログアウト処理
    const handleLogout = useCallback(async () => {
        setLoading(true);
        try {
            await Api.post("logout");
        } catch (e) {
        } finally {
            setLoading(false);
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    const values = useMemo(() => ({
        items,
        addItems,
        delItems,
        loading,
        setLoading,
        alert,
        onSetAlert,
        sysError,
        setSysError,
        handleLogout
    }), [items, loading, alert, sysError, addItems, delItems, onSetAlert, handleLogout]);

    return (
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
