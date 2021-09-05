const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => { //si este middleware pasa bien se llama al next

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();//para que siga con el siguiente middleware y si no con el controller
}

module.exports = {
    validarCampos
}