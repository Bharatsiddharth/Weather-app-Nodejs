const request = require('request');

const openWeatherMap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY: "8f84912eac9acd396d17df6788abfb7c"
}

const weatherData = (address, callback) => {
    const url = openWeatherMap.BASE_URL + encodeURIComponent(address) + "&APPID=" + openWeatherMap.SECRET_KEY;

    request({ url, json: true},(error, data) => {
        if(error){
            callback(true , "Unable to fetch data try again" + error);
        }
        callback(false, data?.body);
    })
};


module.exports = weatherData;