const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const crearUsuario = async (req, res = response) => {
  const { email, password, nombre } = req.body;
  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo electrónico ya se encuentra ocupado",
      });
    }
    const usuario = new Usuario(req.body); // esto filtra y toma los valores que se definieron en el modelo, pero también se puede desestructurar

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
    return res.json({
      ok: true,
      msg: "Crear usuario!!!",
      usuario
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  crearUsuario,
};
