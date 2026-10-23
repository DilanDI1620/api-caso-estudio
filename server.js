// JavaScript source code
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const usuariosRegistrados = [];

app.post('/registro', (req, res) => {
    const { usuario, contrasena } = req.body;
    if (!usuario || !contrasena) {
        return res.status(400).json({ mensaje: "Por favor envíe usuario y contraseña." });
    }
    usuariosRegistrados.push({ usuario, contrasena });
    res.status(201).json({ mensaje: "Usuario registrado correctamente." });
});

app.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;
    const usuarioValido = usuariosRegistrados.find(
        (user) => user.usuario === usuario && user.contrasena === contrasena
    );

    if (usuarioValido) {
        res.status(200).json({ mensaje: "Autenticación satisfactoria" });
    } else {
        res.status(401).json({ mensaje: "Error en la autenticación" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor API funcionando en el puerto ${PORT}`);
});