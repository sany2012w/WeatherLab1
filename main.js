function buttonClick() {

    request.onload = function () {
        if (request.status == 200) {
            let Source = document.getElementById("weather").innerHTML;
            let MyJson = GetSimpleJson(request.response);

            displayJson(Source, MyJson);
        }
        else {
            let Source = document.getElementById("error-message").innerHTML;
            let MyJson = GetErrorMessage(request.response);

            displayJson(Source, MyJson);
        }
    }
}

function displayJson(Source, MyJson) {
    let template = Handlebars.compile(Source);

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

function GetErrorMessage(response) {
  let message = {
    message: response.message,
  }
  return message;
}

function getWeather(cityName) {
    const requestText = "https://api.openweathermap.org/data/2.5/weather" +
        "?q=" + cityName +
        "&appid=7825ce4ffa896c5019e53087c858568a" +
        "&units=metric" +
        "&lang=en";
    return fetch(requestText);
}
window.onload = () => {
    const input = document.getElementById("input-onsubmit");
    input.addEventListener("submit", onSubmit);
}

function onSubmit(ev) {
    ev.preventDefault();
    const city = ev.currentTarget.elements.input.value;
    getWeather(city).then(response => {
            response.json().then(json => {
                if (response.ok) {
                    let Source = document.getElementById("weather").innerHTML;
                    let MyJson = GetSimpleJson(json);

                    displayJson(Source, MyJson);
                }else {
                    let Source = document.getElementById("error-message").innerHTML;
                    let MyJson = GetErrorMessage(json);
                    
                    displayJson(Source, MyJson);
                }
            })})
}

