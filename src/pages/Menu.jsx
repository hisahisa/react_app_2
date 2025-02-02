import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import { Outlet } from "react-router-dom";
import CartContext from './CartContext';

const Menu = () => {
    const { items } = useContext(CartContext);

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
