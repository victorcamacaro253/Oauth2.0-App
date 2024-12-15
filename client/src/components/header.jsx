// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Mi Aplicación
                    </Typography>
                    <Button color="inherit" component={Link} to="/">
                        Inicio
                    </Button>
                    <Button color="inherit" component={Link} to="/register">
                        Registrarse
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                        Iniciar Sesión
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;