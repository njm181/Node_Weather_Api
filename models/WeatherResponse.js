class WeatherResponse {
    constructor(description, tempMin, tempMax, mainTemp){
        this.description = description;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.mainTemp = mainTemp;
    }
}

module.exports = WeatherResponse