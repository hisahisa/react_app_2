import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge, Stack } from '@mui/material';
import { Outlet } from "react-router-dom";
import CartContext from './CartContext';
import LogoutIcon from "@mui/icons-material/Logout";

const Menu = () => {
    const { items, handleLogout } = useContext(CartContext);

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between', height: 80 }}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="product"
                        sx={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        タイトル
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems={"center"} sx={{ mr: 3}} >
                        <Typography sx={{ mr: 3, fontSize: "0.875rem" }}>ユーザ名:</Typography>
                        <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
                            ログアウト
                        </Button>
                    </Stack>
                    <Button component={Link} to="cart" sx={{ color: 'inherit' }}>
                        <Badge badgeContent={items.length} color="secondary">
                            <Typography variant="h6" sx={{ color: 'inherit' }}>
                                カート
                            </Typography>
                        </Badge>
                    </Button>
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    );
};

export default Menu;
