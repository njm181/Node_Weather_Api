const { Schema, model } = require('mongoose');

//Modelo para la DB
const PlaceSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre del lugar es obligatorio'],
        unique: true
    },
    lat:{
        type: String,
        required: [true, 'Latitud del lugar es obligatoria']
    },
    lon:{
        type: String,
        required: [true, 'Longitud del lugar es obligatorio']
    }
    
});

module.exports = model('Place', PlaceSchema);

