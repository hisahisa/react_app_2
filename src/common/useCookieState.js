import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";

const useCookieState = (key, initialValue) => {
    const [cookies, setCookie] = useCookies([key]);
    const [state, setState] = useState(() => {
        const savedValue = cookies[key];
        return savedValue !== undefined ? JSON.parse(JSON.stringify(savedValue)) : initialValue;
    });

    // 状態が変更されるたびにCookieに保存
    useEffect(() => {
        setCookie(key, JSON.stringify(state), {
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7日間有効（必要に応じて変更）
        });
    }, [key, state, setCookie]);

    return [state, setState];
};

export default useCookieState;
