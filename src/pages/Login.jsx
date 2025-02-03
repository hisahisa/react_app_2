import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Api from "../common/api";
import { useCommonHandler } from "../common/LoadingProcedure";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { loadingProcedure } = useCommonHandler();

    // ログイン処理
    const handleLoginRequest = async () => {
        let body = { username, password };
        const response = await Api.post("login", body);
        if ("Login successful" === response.message) {
            navigate("/menu/product", { replace: true });
        }
    };

    const handleLogin = loadingProcedure(handleLoginRequest);

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
                >
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
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
