import React, { useContext, useState } from 'react';
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

// スタイルの設定
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 薄暗い背景色
    zIndex: 1  // メニューの下にオーバーレイが入らないように
};

// UserControlsコンポーネント: プルダウンメニューを担当
const UserControls = ({ onLogout, username }) => {
    const [anchorEl, setAnchorEl] = useState(null); // メニュー開閉の管理

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget); // メニューを開く
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // メニューを閉じる
    };

    const isMenuOpen = Boolean(anchorEl);

    return (
        <>
            {/* オーバーレイ */}
            {isMenuOpen && <Box sx={overlayStyles} onClick={handleMenuClose} />}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mr: 3, zIndex: 2 }}>
                <Typography
                    variant="h6"
                    sx={{ cursor: "pointer" }}
                    onMouseOver={handleMenuOpen} // ユーザー名にホバーでメニューオープン
                >
                    ユーザ名: {username}
                </Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    onMouseLeave={handleMenuClose} // メニュー外にカーソルが移動すると閉じる
                    MenuListProps={{
                        onMouseOver: e => e.stopPropagation(), // 子要素にホバーした時のバブリング防止
                    }}
                >
                    {/* 購入履歴アイコン付きメニュー */}
                    <MenuItem
                        component={Link}
                        to="purchase-history"
                        sx={menuItemStyles}
                    >
                        <ListItemIcon>
                            <HistoryIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="購入履歴" />
                    </MenuItem>
                    {/* ログアウトアイコン付きメニュー */}
                    <MenuItem
                        onClick={() => {
                            handleMenuClose();
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

// カートボタンコンポーネント: カートのアイコン付きボタン
const CartButton = ({ cartCount }) => (
    <Button component={Link} to="cart" sx={{ color: 'inherit', zIndex: 2 }}>
        <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon /> {/* カートのアイコン */}
        </Badge>
    </Button>
);

// メインの MenuComponent
const MenuComponent = () => {
    const { items: cartItems, handleLogout, userInfo } = useContext(CartContext);
    const username = userInfo?.username;

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={appBarStyles}>
                    {/* タイトル + ホームアイコン */}
                    <Button component={Link} to="product" sx={linkStyles}>
                        <HomeIcon sx={{ mr: 1 }} /> {/* ホームアイコン */}
                        <Typography variant="h6" sx={{ color: 'inherit' }}>
                            タイトル
                        </Typography>
                    </Button>

                    {/* ユーザー操作 (購入履歴・ログアウト) */}
                    <UserControls onLogout={handleLogout} username={username} />

                    {/* カートボタン */}
                    <CartButton cartCount={cartItems.length} />
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    );
};

export default MenuComponent;
