import {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../pages/CartContext";
import { ERROR_CODES } from "./constants"
import { ApiError } from "./api"

export function useCommonHandler(initValue = {}) {
    const [values, setValues] = useState(() => ({ ...initValue }));
    const { setLoading, onSetAlert, setSysError } = useContext(CartContext);
    const navigate = useNavigate();

    // フォームの値を変更
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // エラーのメッセージを抽出
    const extractMessages = (errors) => {
        return Object.values(errors).flatMap((err) => {
            if (!err) return [];
            if (typeof err === "string") return [err];
            if (Array.isArray(err)) return err;
            return extractMessages(err); // 再帰処理
        });
    };

    // ローディング処理
    function loadingProcedure(func) {
        return async function(event) {
            setLoading(true);
            try {
                await func(event);
            } catch (e) {
                e instanceof ApiError ? handleApiError(e) :
                    handleGenericError(e);
            } finally {
                setLoading(false);
            }
        };
    }

    function handleApiError(e) {
        const statusCode = Number(e.status);
        const msgs = e.errors !== undefined ? extractMessages(e.errors) : [e.message];
        const msg = { message: msgs.join("\r\n") };

        if (isAuthError(statusCode)) {
            onSetAlert(msg);
            navigate("/login", { replace: true });
        } else if (isBusinessError(statusCode)) {
            onSetAlert(msg);
        } else {
            setSysError({ statusCode, ...msg });
            // navigate(Links.error, { replace: true });
        }
    }

    function handleGenericError(e) {
        console.error("Unhandled error:", e);

        const msg = { message: "An unexpected error occurred. Please try again later." };
        onSetAlert(msg);

        setSysError({ statusCode: 500, ...msg });
        // navigate(Links.error, { replace: true });
    }

    function isAuthError(statusCode) {
        return [
            ERROR_CODES.UNAUTHORIZED,
            ERROR_CODES.FORBIDDEN,
            ERROR_CODES.NOT_FOUND
        ].includes(statusCode);
    }

    function isBusinessError(statusCode) {
        return statusCode === ERROR_CODES.BUSINESS_ERROR;
    }

    return {
        values,
        setValues,
        handleChange,
        loadingProcedure,
    };
}
