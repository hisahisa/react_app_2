import React, { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { Divider, Box, Typography } from "@mui/material";
import CartContext from "./CartContext";
import { useCommonHandler } from "../common/LoadingProcedure";
import Api from "../common/api";

const Products = () => {
    const { loadingProcedure } = useCommonHandler();
    const [productList, setProductList] = useState([]);
    const { items } = useContext(CartContext);
    const i_key_list = items.map((p) => p.item_key);

    useEffect(() => {
        const fetchTaskStatus = loadingProcedure(async () => {
            const data = await Api.get("product-list");
            setProductList(data);
        });
        void fetchTaskStatus(null);
    }, []);

    return (
        <Box sx={{ margin: 2 }}>
            <Typography variant="h4" gutterBottom>
                技術書の一覧
            </Typography>
            <Divider />
            {productList.length > 0 ? (
                productList.map((product) => (
                    <ProductCard
                        key={product.item_key}
                        title={product.title}
                        price={product.price}
                        item_key={product.item_key}
                        dis_state={i_key_list.includes(product.item_key)}
                    />
                ))
            ) : (
                "No Data"
            )}
        </Box>
    );
};

export default Products;
