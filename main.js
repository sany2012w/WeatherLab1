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

        }
    }
}