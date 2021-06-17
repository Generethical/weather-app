const request = require('request');

const forecast = (latitude,longtitude,callback)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longtitude+"&appid=eaca9f47341b0c3a198712dbe42b6821&units=metric"
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.cod==='400'){
                callback('Unable to find location',undefined)
        }else {
            callback(undefined,`It is currently ${body.main.temp}. Wind speed is ${body.wind.speed}`)
        }
    })
}

module.exports = forecast;