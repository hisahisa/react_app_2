import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge, Stack } from '@mui/material';
import { Outlet } from "react-router-dom";
import CartContext from './CartContext';
import LogoutIcon from "@mui/icons-material/Logout";

// Extract shared styles as constants
const appBarStyles = { justifyContent: 'space-between', height: 80 };
const linkStyles = { color: 'inherit', textDecoration: 'none' };
const userControlsStyles = { mr: 3, fontSize: "0.875rem" };

// Extract User Controls Component
const UserControls = ({ onLogout, username }) => (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mr: 3 }}>
        <Typography sx={userControlsStyles}>ユーザ名:{username}</Typography>
        <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
            ログアウト
        </Button>
    </Stack>
);

// Extract Cart Button Component
const CartButton = ({ cartCount }) => (
    <Button component={Link} to="cart" sx={{ color: 'inherit' }}>
        <Badge badgeContent={cartCount} color="secondary">
            <Typography variant="h6" sx={{ color: 'inherit' }}>
                カート
            </Typography>
        </Badge>
    </Button>
);

const Menu = () => {
    const { items: cartItems, handleLogout, userInfo } = useContext(CartContext);
    const username = userInfo?.username;
    return (
        <>
            <AppBar position="static">
                <Toolbar sx={appBarStyles}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="product"
                        sx={linkStyles}
                    >
                        タイトル
                    </Typography>
                    <UserControls onLogout={handleLogout} username={username} />
                    <CartButton cartCount={cartItems.length} />
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    );
};

export default Menu;
