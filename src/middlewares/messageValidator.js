const { check, validationResult, body } = require("express-validator");

module.exports={
    message: [
        body('name')
        .notEmpty()
        .withMessage('Ingresa tu nombre por favor')
        .isAlpha()
        .withMessage('El nombre no puede contener numeros')
        .isLength( {min:3, max:15} )
        .withMessage('El nombre debe tener entre 3 y 15 caracteres'),

        body('email')
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isEmail()
        .withMessage('El email es inválido'),
        
        body('message')
        .notEmpty()
        .withMessage('Este campo no puede estar vacio')
        .isLength({min:20})
        .withMessage('El mensaje debe contener al menos 20 caracteres')

    ]
}