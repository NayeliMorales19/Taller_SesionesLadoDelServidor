const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use(session({
    secret: 'clave',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30 // 30 minutos
    }
}));

// Ruta de login
app.post('/login', (req, res) => {
    const { usuario, password } = req.body;

    if (usuario === 'Nayeli' && password === '1234') {
        req.session.usuario = usuario;

        res.json({
            mensaje: 'Sesión iniciada, Bienvenido ' + usuario
        });
    } else {
        res.json({
            mensaje: 'Usuario o contraseña incorrectos'
        });
    }
});

// Ruta de logout
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid', {
            path: '/'
        });

        res.json({
            mensaje: 'Sesión cerrada'
        });
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});