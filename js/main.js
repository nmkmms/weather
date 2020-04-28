let curr_latitude, curr_longtitude;
let city;

function success(pos) {
    var crd = pos.coords;

    curr_latitude = crd.latitude;
    curr_longtitude = crd.longitude;
    console.log(curr_latitude);
    console.log(curr_longtitude);
};

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error);

jQuery(document).ready(function ($) {
    let weather_img;
    console.log(curr_latitude);
    console.log(curr_longtitude);
    $.getJSON("http://api.openweathermap.org/data/2.5/weather",
        {
            APPID: '75e828f2e97af9ff18fa7af9c61ab500',
            lat: curr_latitude,
            lon: curr_longtitude
        },
        function (response) {
            let weather = response.weather[0].description;
            if (weather == 'clear sky') {
                weather_img = 'clear_sky.png';
            } else if (weather == 'few clouds') {
                weather_img = 'few_clouds.png';
            } else if (weather == 'scattered clouds') {
                weather_img = 'scattered_clouds.png';
            } else if (weather == 'broken clouds') {
                weather_img = 'broken_clouds.png';
            } else if (weather == 'shower rain') {
                weather_img = 'shower_rain.png';
            } else if (weather == 'rain') {
                weather_img = 'crear_sky.png';
            } else if (weather == 'thunderstorm') {
                weather_img = 'thunderstorm.png';
            } else if (weather == 'snow') {
                weather_img = 'snow.png';
            } else if (weather == 'mist') {
                weather_img = 'mist.png';
            } else if (weather == 'overcast clouds') {
                weather_img = 'few_clouds.png';
            }
            city = response.name;
            console.log(response);
            $(".city-name").text('Weather in '+ city + ': ' + weather);
            $(".weather").append('<img src="img/'+ weather_img +'">');
        });
});
