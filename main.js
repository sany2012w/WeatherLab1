function buttonClick() {

    let cityName = document.getElementById("input").value;

    let request = new XMLHttpRequest();

    let requestText = "https://api.openweathermap.org/data/2.5/weather" +
        "?q=" + cityName +
        "&appid=7825ce4ffa896c5019e53087c858568a" +
        "&units=metric" +
        "&lang=en";
    request.open("GET", requestText);
    request.responseType = "json";

    request.send();
    request.onload = function () {
        if (request.status == 200) {
            let MyJson = GetSimpleJson(request.response);

            display(MyJson);
        }
    }
}

function display(MyJson) {
    let source = document.getElementById("weather").innerHTML;
    let template = Handlebars.compile(source);

    let html = template(MyJson);
    document.getElementById("weather-container").innerHTML = html;
}

function GetSimpleJson(response) {
    return {
        city: "Weather in " + response.name + " is ",
        main: response.weather[0].description,
        Temperature: "Temperature: " + response.main.temp,
        Pressure: "Pressure: " + response.main.pressure,
        Windspeed: "Wind speed: " + response.wind.speed,
        Humidity: "Humidity: " + response.main.humidity,
        Clouds: "Clouds: " + response.clouds.all,
        Visibility: "Visibility: " + response.visibility
    };
}