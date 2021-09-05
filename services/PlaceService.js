const { default: axios } = require("axios");
const PlaceResponse = require("../models/PlaceResponse");
const WeatherResponse = require("../models/WeatherResponse");
const Place = require('../models/PlaceDTO');//en mayuscula como los de arriba para poder crear instancias apartir de el
const ErrorResponse = require("../models/ErrorResponse");

class PlaceService {

    constructor(){
        //TODO: leer BD si existe
    }

    //getter
    get paramsMapBox(){
        return{
            'access_token': process.env.MAPBOX_KEY,
            'limit': 1,
            'language':'es'
        }
    }

    //obtener coordenadas
    async getCoordinatesByName(placeName = ''){
        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json`,
                params: this.paramsMapBox
            });

            const resp = await instance.get();

            if(resp.data.features[0] === undefined){
                const errorResponse = new ErrorResponse({
                    code: 400,
                    msg: "El lugar no pudo ser ubicado"
                })
                return errorResponse
            }

            const placeResponse = new PlaceResponse(
                    resp.data.features[0].place_name,
                    resp.data.features[0].center[0],
                    resp.data.features[0].center[1]
            );

            //guardo en la base de datos la busqueda
            return this.savePlace(placeResponse);

            //return placeResponse;

        }catch(error){ 
            return [];
        }
    }

    //getter
    get paramsOpenWeather(){
        return{
            appid: process.env.OPENWEATHER_KEY,
                lang: 'es',
                units:'metric'
        }
    }

    //obtener el clima a traves de las coordenadas
    async getWeatherByCoordinates(lat, lon){
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });

            const resp = await instance.get();

            const { weather, main } = resp.data;

            const weatherResponse = new WeatherResponse({
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            });

            return weatherResponse;

        }catch(error){ 
            console.log(error);
        }
    }

    //guardar en la base de datos el lugar completo
    async savePlace(placeResponse){
        const place = new Place({
            name: placeResponse.placeName,
            lon: placeResponse.lng,
            lat: placeResponse.lat});

        //Verificar si el name existe
        const existsName = await Place.findOne({name: placeResponse.placeName});
        if( existsName ){
            const errorResponse = new ErrorResponse({
                code: 400,
                msg: "El lugar ya fue consultado por eso no se vuelve a guardar"
            })
            return errorResponse
        }else{
            console.log('Objeto antes de guardar: '+place.name)

            await place.save();

            console.log('Place guardado en la base de datos: '+place);
            return placeResponse
        }

        
    }
}

module.exports = PlaceService