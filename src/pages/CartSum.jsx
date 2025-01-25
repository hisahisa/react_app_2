import React, { useContext } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import CartContext from './CartContext';

const CartSum = () => {
    const { items } = useContext(CartContext);

    // 合計金額を計算
    const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <Box mt={3}>
            <Paper variant="outlined" sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
                <Typography variant="body1">
                  購入金額合計: {total}円
                </Typography>
            </Paper>
        </Box>
    );
};

export default CartSum;
