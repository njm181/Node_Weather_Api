const { response, request } = require('express');
const ErrorResponse = require('../../models/ErrorResponse');
const PlaceResponse = require('../../models/PlaceResponse');
const PlaceService = require('../../services/PlaceService');

const postPlaceName = async (req, res = response) => {
    const { placeName } = req.body
    const placeService = new PlaceService();
    const placeCoordinatesResponse = await placeService.getCoordinatesByName(placeName);
    const placesRecord = await placeService.getPlaceRecord();
    if( placeCoordinatesResponse.status !== undefined){
        res.json({
            msj: 'Error Post desde el controller',
            place_name: placeName,
            error: placeCoordinatesResponse.status
        });    
    }else{
        const placeWeatherResponse = await placeService.getWeatherByCoordinates(placeCoordinatesResponse.lat, placeCoordinatesResponse.lng);
        res.json({
            msj: 'Post desde el controller',
            place_name: placeName,
            place: placeCoordinatesResponse,
            weather_place: placeWeatherResponse,
            places_record: placesRecord
        });    
    }
}


const getPlacesHistory = async (req, res = response) => {
    //buscar listado en la base de datos
}

module.exports = {
    postPlaceName
}