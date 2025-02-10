import React, { createContext, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCookieState from "../common/useCookieState";
import { USER_INFO_INIT, SEVERITY } from "../common/constants";
import Api from "../common/api";

const CartContext = createContext();

export function CartProvider({ children }) {
    const navigate = useNavigate();

    // Cookieと同期のステート
    const [items, setItems] = useCookieState("cartItems", []);
    const [userInfo, setUserInfo] = useCookieState("userInfo", USER_INFO_INIT);

    // ローカルステート（Cookieは使わない）
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
    }, [setItems]);

    const delItems = useCallback((item_key) => {
        setItems((prev) => prev.filter((item) => item.item_key !== item_key));
    }, [setItems]);

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
        handleLogout,
        userInfo,
        setUserInfo,
    }), [items, loading, alert, sysError, addItems, delItems,
        onSetAlert, handleLogout, userInfo, setUserInfo]);

    return (
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
