let curr_latitude, curr_longtitude;
let city;
let temp;

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
    // let background;

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
                // background = '/img/broken_clouds.jpg';
            } else if (weather == 'shower rain' || weather == 'light intensity drizzle'
                || weather == 'drizzle' || weather == 'heavy intensity drizzle'
                || weather == 'light intensity drizzle rain' || weather == 'drizzle rain'
                || weather == 'heavy intensity drizzle rain' || weather == 'shower rain and drizzle'
                || weather == 'heavy shower rain and drizzle' || weather == 'shower drizzle') {
                weather_img = 'shower_rain.png';
            } else if (weather == 'rain' || weather == 'light rain' || weather == 'moderate rain'
                || weather == 'heavy intensity rain' || weather == 'very heavy rain' || weather == 'extreme rain'
                || weather == 'freezing rain' || weather == 'light intensity shower rain'
                || weather == 'shower rain' || weather == 'heavy intensity shower rain'
                || weather == 'ragged shower rain') {
                weather_img = 'crear_sky.png';
            } else if (weather == 'thunderstorm' || weather == 'thunderstorm with light rain'
                || weather == 'thunderstorm with rain' || weather == 'thunderstorm with heavy rain'
                || weather == 'light thunderstorm' || weather =='heavy thunderstorm'
                || weather == 'ragged thunderstorm' || weather == 'thunderstorm with light drizzle'
                || weather == 'thunderstorm with drizzle' || weather == 'thunderstorm with heavy drizzle') {
                weather_img = 'thunderstorm.png';
            } else if (weather == ' Snow' || weather == 'light snow' || weather == 'Heavy snow'
                || weather == 'Sleet' || weather == 'Light shower sleet' || weather == 'Shower sleet'
                || weather == 'Light rain and snow' || weather == 'Rain and snow'
                || weather == 'Light shower snow' || weather == 'Shower snow'
                || weather == 'Heavy shower snow') {
                weather_img = 'snow.png';
            } else if (weather == 'mist' || weather == 'Smoke' || weather == 'Haze'
                || weather == 'Dust' || weather == 'fog' || weather == 'sand'
                || weather == 'volcanic ash' || weather == 'squalls' || weather == 'tornado') {
                weather_img = 'mist.png';
            } else if (weather == 'overcast clouds') {
                weather_img = 'few_clouds.png';
                // background = '/img/partly_cloudy.gif';
            }

            console.log(response);


            city = response.name;
            temp = Math.round((response.main.temp - 273.15) * 10) / 10;
            feels_like = Math.round((response.main.feels_like - 273.15) * 10) / 10;
            humidity = response.main.humidity;

            $(".city-name").text('Weather in '+ city + ': ' + weather);
            $(".weather").append('<img src="img/'+ weather_img +'">');
            $("#temp").text( temp + "°C");
            $("#feels").text(feels_like + "°C");
            $("#humidity").text(humidity + "%");
            // document.body.style.backgroundImage = "url('" + background + "')";
        });
});
