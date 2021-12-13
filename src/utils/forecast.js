const request = require('postman-request');

const forecast = (latitude, longitude, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=d18f51658dcb1281a8cd046e91bc7b34&query=${latitude},${longitude}&units=f` ;

    request({url, json: true}, (error, { body } = {})=>{
        if(error){
            callback('Unable to connect to forecast services!', undefined);
        }
        else if(body.error){
            callback('Unable to find location. Try another search', undefined);
        }
        else{
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} out. It feels like ${body.current.feelslike}.`)
        }
    })
}

module.exports = forecast ;