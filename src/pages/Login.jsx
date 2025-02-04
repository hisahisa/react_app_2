import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Api from "../common/api";
import { useCommonHandler } from "../common/LoadingProcedure";
import CartContext from "./CartContext";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { loadingProcedure } = useCommonHandler();
    const { onSetAlert } = useContext(CartContext);

    // ログイン処理
    const handleLoginRequest = async () => {
        const body = { username, password };
        const response = await Api.post("login", body);
        if ("Login successful" === response.message) {
            navigate("/menu/product", { replace: true });
        } else {
            onSetAlert('login failed.');
        }
    };

    const handleLogin = loadingProcedure(handleLoginRequest);

    // キーボードの入力イベント処理 (Enterキー対応)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // フォームのリロードを防ぐ
            void handleLogin(null);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 400 }}>
                <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
                    Login
                </Typography>

                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                    onKeyDown={handleKeyDown} // Enterキーの処理
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        autoComplete="username" // 修正された箇所 (キャメルケースに変更)
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        autoComplete="current-password" // 修正された箇所 (キャメルケースに変更)
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Login;
