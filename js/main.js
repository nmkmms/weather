let curr_latitude, curr_longtitude;

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
    let background;
    let clothes;

    console.log(curr_latitude);
    console.log(curr_longtitude);

    // If didnt't get location:
    if (curr_latitude == undefined || curr_longtitude == undefined) {
        location.reload();
    }

    $.getJSON("http://api.openweathermap.org/data/2.5/weather",
        {
            APPID: '204a0a93e530a3844b34bc92782045e7',
            lat: curr_latitude,
            lon: curr_longtitude
        },
        function (response) {

            let weather = response.weather[0].description;
            let city = response.name;
            let temp = Math.round((response.main.temp - 273.15) * 10) / 10;
            let feels_like = Math.round((response.main.feels_like - 273.15) * 10) / 10;
            let humidity = response.main.humidity;
            let winter_speed = response.wind.speed;

            if (weather == 'clear sky') {
                weather_img = 'clear_sky.png';
                background = '/img/sun.jpg';
                if(temp > 20){
                    clothes = 'Take your sunglasses. You can wear t-shirt and shorts.';
                }
                else{
                    clothes = 'Take your sunglasses. Be careful with clothes for warm weather, there is not hot enough.';
                }
            } else if (weather == 'few clouds') {
                weather_img = 'few_clouds.png';
                background = '/img/cloudy.jpg';
                if(temp > 20){
                    clothes = 'You can wear t-shirt and shorts';
                }
                else{
                    clothes = 'Be careful with clothes for warm weather, there is not hot enough.';
                }
            } else if (weather == 'scattered clouds') {
                weather_img = 'scattered_clouds.png';
                background = '/img/cloudy.jpg';
                if(temp > 20 && humidity > 30){
                    clothes = 'You can wear t-shirt and shorts, but it may rain later.';
                }
                else{
                    clothes = 'Be careful with clothes for warm weather, there is not hot enough. It may rain later.';
                }
            } else if (weather == 'broken clouds') {
                weather_img = 'broken_clouds.png';
                background = '/img/cloudy.jpg';
                if(temp > 20 && humidity > 30){
                    clothes = 'You can wear t-shirt and shorts, but it may rain later.';
                }
                else{
                    clothes = 'Be careful with clothes for warm weather, there is not hot enough. It may rain later.';
                }
            } else if (weather == 'shower rain' || weather == 'light intensity drizzle'
                || weather == 'drizzle' || weather == 'heavy intensity drizzle'
                || weather == 'light intensity drizzle rain' || weather == 'drizzle rain'
                || weather == 'heavy intensity drizzle rain' || weather == 'shower rain and drizzle'
                || weather == 'heavy shower rain and drizzle' || weather == 'shower drizzle') {
                weather_img = 'shower_rain.png';
                background = '/img/rain.jpg';
                clothes = 'Take your umbrella.';
            } else if (weather == 'rain' || weather == 'light rain' || weather == 'moderate rain'
                || weather == 'heavy intensity rain' || weather == 'very heavy rain' || weather == 'extreme rain'
                || weather == 'freezing rain' || weather == 'light intensity shower rain'
                || weather == 'shower rain' || weather == 'heavy intensity shower rain'
                || weather == 'ragged shower rain') {
                weather_img = 'rain.png';
                background = '/img/rain.jpg';
                clothes = 'Take your umbrella.';
            } else if (weather == 'thunderstorm' || weather == 'thunderstorm with light rain'
                || weather == 'thunderstorm with rain' || weather == 'thunderstorm with heavy rain'
                || weather == 'light thunderstorm' || weather =='heavy thunderstorm'
                || weather == 'ragged thunderstorm' || weather == 'thunderstorm with light drizzle'
                || weather == 'thunderstorm with drizzle' || weather == 'thunderstorm with heavy drizzle') {
                weather_img = 'thunderstorm.png';
                background = '/img/thunderstorm.jpg';
                clothes = 'It may rain later.';
            } else if (weather == ' Snow' || weather == 'light snow' || weather == 'Heavy snow'
                || weather == 'Sleet' || weather == 'Light shower sleet' || weather == 'Shower sleet'
                || weather == 'Light rain and snow' || weather == 'Rain and snow'
                || weather == 'Light shower snow' || weather == 'Shower snow'
                || weather == 'Heavy shower snow') {
                weather_img = 'snow.png';
                background = '/img/snow.jpg';
                if (temp > -15) {
                    clothes = 'Take your mittens.';
                } else {
                    clothes = 'You have better stay home in order to not get freezed!'
                }
            } else if (weather == 'mist' || weather == 'Smoke' || weather == 'Haze'
                || weather == 'Dust' || weather == 'fog' || weather == 'sand'
                || weather == 'volcanic ash' || weather == 'squalls' || weather == 'tornado') {
                weather_img = 'mist.png';
                background = '/img/for.jpg';
                if (humidity > 80) {
                    clothes = 'Possible difficulties with long-range visibility. Do not drive without emergency!'
                } else if (humidity == 0) {
                    clothes = 'Take water with yourself, it might be dry.'
                } else {
                    clothes = 'Mystery weather...';
                }
            } else if (weather == 'overcast clouds') {
                weather_img = 'few_clouds.png';
                background = '/img/cloudy.jpg';
                if (temp > 20 && humidity > 30) {
                    clothes = 'You can wear t-shirt and shorts, but it may rain later.';
                } else {
                    clothes = 'Be careful with clothes for warm weather, there is not hot enough. It may rain later.';
                }
            }


            $(".city-name").text('Weather in '+ city + ': ' + weather);
            $(".weather").append('<img src="img/'+ weather_img +'">');
            $('body').css('background-image', "url(." + background + ")");
            $("#clothes").text(clothes);
            $("#temp").text( temp + "°C");
            $("#feels").text(feels_like + "°C");
            $("#humidity").text(humidity + "%");
            $("#wind").text(winter_speed + " meter(s)/sec");

            if (background != undefined) {
                $('body').css('background-image', "url(." + background + ")");
            }
        });
});
