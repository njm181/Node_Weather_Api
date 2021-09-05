const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../config/middlewares/validar-campos');
const { getCoordinates, postPlaceName } = require('../controllers/place.controller');
const router = Router();

//cambiar por Post, recibimos el nombre de la ciudad y el controller lo captura
router.post('/', [
    check('placeName', 'El nombre del lugar no es valido').isString(),//middleware
    check('placeName', 'El nombre del lugar no debe enviarse vacio').not().isEmpty(),
    validarCampos
], postPlaceName);




module.exports = router;