import React, { useContext } from 'react';
import { Card, CardContent, Typography, Box, TextField, Button, Divider } from '@mui/material';
import CartContext from './CartContext';
import CartSum from "./CartSum";

const Cart = () => {
    const { items, addItems, delItems } = useContext(CartContext);

    return (
        <Box sx={{ margin: 2 }}>
            <Typography variant="h4" gutterBottom>
                カート一覧
            </Typography>
            <Divider />

            {items.map((item) => (
                <Card key={item.item_key} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h6">
                            商品名: {item.title}
                        </Typography>
                        <Typography>
                            税込: {item.price}円
                        </Typography>
                        <Box display="flex" mt={1}>
                            <TextField
                                type="number"
                                label="注文個数"
                                value={item.qty}
                                size="small"
                                InputProps={{ inputProps: { min: 1, max: 12 } }}
                                onChange={(event) => {
                                    const newValue = Number(event.target.value);
                                    addItems(item.item_key, item.title, item.price, newValue);
                                }}
                                sx={{ width: 80, marginTop: 1 }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => delItems(item.item_key)}
                            sx={{ marginTop: 1, marginBottom: 1 }}
                        >
                            注文削除
                        </Button>
                    </CardContent>
                </Card>
            ))}
            <CartSum />
        </Box>
    );
};

export default Cart;
