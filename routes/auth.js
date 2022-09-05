/**
 * path: api/login
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/new", [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
],crearUsuario);

module.exports = router;
