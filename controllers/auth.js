const { response, json } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const e = require("express");

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

    // Generar JWT

    const token = await generarJWT(usuario.uid);

    return res.json({
      ok: true,
      msg: "Crear usuario!!!",
      usuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    console.log(email);
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe con ese correo",
      });
    }
    const mathPassword = bcrypt.compareSync(password, usuario.password);
    if (!mathPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario la contraseña es incorrecta",
      });
    }
    const token = await generarJWT(usuario._id);
    return res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con el administrador",
    });
  }
};
const renewToken = async (req, res = response) => {
  try {
    const usuario = await Usuario.findById(req.uid);
    console.log('valor del usuario', usuario);

    if(!usuario){
      return res.status(404).json({
        ok:false,
        msg: 'El usuario no existe'
      });
    }

    const token = await generarJWT();
    return res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Ocurrió un error por favor comuniquese con el administrador',
      });
    }
};
module.exports = {
  crearUsuario,
  loginUsuario,
  renewToken,
};
