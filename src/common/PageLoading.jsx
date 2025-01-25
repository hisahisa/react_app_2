import { Backdrop, CircularProgress } from "@mui/material";
import CartContext from "../pages/CartContext";
import { useContext } from "react";

export default function PageLoading() {
    const { loading } = useContext(CartContext);
    return (
        <Backdrop open={loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
            <CircularProgress sx={{ color: "white"}} />
        </Backdrop>
    )
}
