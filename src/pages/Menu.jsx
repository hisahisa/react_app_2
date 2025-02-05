import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Badge,
    Stack,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Box
} from '@mui/material';
import { Outlet } from "react-router-dom";
import CartContext from './CartContext';
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";

const appBarStyles = { justifyContent: 'space-between', height: 80 };
const linkStyles = { color: 'inherit', textDecoration: 'none' };
const menuItemStyles = {
    padding: "8px 16px",
    cursor: "pointer",
    '&:hover': {
        borderBottom: "2px solid",
    },
};
const overlayStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1
};

// UserControlsコンポーネント: プルダウンメニューを担当
const UserControls = ({ onLogout, username }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const buttonRef = useRef(null);

    const openMenu = () => setMenuOpen(true);
    const closeMenu = () => {
        setMenuOpen(false);
        buttonRef.current?.focus(); // optional chainingを使用
    };

    const overlayClickHandler = () => closeMenu();

    return (
        <>
            {menuOpen && <Box sx={overlayStyles} onClick={overlayClickHandler} />}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mr: 3 }}>
                <Typography
                    ref={buttonRef}
                    variant="h6"
                    sx={{ cursor: "pointer" }}
                    onClick={openMenu}
                    tabIndex={0} // キーボード対応
                >
                    ユーザ名: {username}
                </Typography>
                <Menu
                    open={menuOpen}
                    onClose={closeMenu}
                    anchorEl={buttonRef.current}
                    MenuListProps={{ onMouseLeave: closeMenu }}
                >
                    <MenuItem component={Link} to="purchase-history" sx={menuItemStyles}>
                        <ListItemIcon>
                            <HistoryIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="購入履歴" />
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            closeMenu();
                            onLogout();
                        }}
                        sx={menuItemStyles}
                    >
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="ログアウト" />
                    </MenuItem>
                </Menu>
            </Stack>
        </>
    );
};

// カートボタンコンポーネントをシンプル化
const CartButton = ({ cartCount }) => (
    <Button component={Link} to="cart" sx={{ color: 'inherit' }}>
        <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
        </Badge>
    </Button>
);

// Main MenuComponent
const MenuComponent = () => {
    const { items: cartItems, handleLogout, userInfo } = useContext(CartContext);
    const username = userInfo?.username || "ゲスト"; // デフォルト値を設定

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={appBarStyles}>
                    <Button component={Link} to="product" sx={linkStyles}>
                        <HomeIcon sx={{ mr: 1 }} />
                        <Typography variant="h6" sx={{ color: 'inherit' }}>
                            タイトル
                        </Typography>
                    </Button>
                    <UserControls onLogout={handleLogout} username={username} />
                    <CartButton cartCount={cartItems.length} />
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    );
};

export default MenuComponent;
