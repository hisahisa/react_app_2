import React, { createContext, useState, useCallback, useMemo } from 'react';
import { SEVERITY } from '../common/constants';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({
        open: false,
        severity: SEVERITY.SUCCESS,
        message: "",
    });
    const [sysError, setSysError] = useState({
        statusCode: 404,
        message: '404 Not Found',
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
    }, []);

    const delItems = useCallback((item_key) => {
        setItems((prev) => prev.filter((item) => item.item_key !== item_key));
    }, []);

    const onSetAlert = useCallback((
        { message = "", severity = SEVERITY.ERROR, open = true }) => {
        setAlert({ open, severity, message });
    }, []);

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
    }), [items, loading, alert, sysError]);

    return (
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
