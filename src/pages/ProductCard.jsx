import React, { useContext } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CartContext from './CartContext';

const ProductCard = ({ title, price, item_key, dis_state }) => {
    const { addItems } = useContext(CartContext);

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {item_key}
                </Typography>
                <Typography variant="body1">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    税込{price}円
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addItems(item_key, title, price, 1)}
                    sx={{ marginTop: 1 }}
                    disabled={dis_state}
                >
                    {dis_state ? 'カート追加済' : 'カートに追加'}
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
