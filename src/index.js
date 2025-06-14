import "./styles.css";

const locationInput = document.getElementById("locationInput");
const fahrenheitBtn = document.getElementById("fahrenheit");
const celsiusBtn = document.getElementById("celsius");
const weatherBtn = document.getElementById("weatherButton");
const form = document.querySelector("form");
let unit = "fahrenheit";

async function getWeatherData(location, unit) {
    const img = document.querySelector("img");
    const conditions = document.querySelector(".conditions");
    const temp = document.querySelector(".temp");
    const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+ location + "?key=DB7GXJD6FSKZ3UFSG8E4HKK7B", {mode: "cors"})
    const weatherData = await response.json();
    let precipate = weatherData.currentConditions.preciptype;
    conditions.textContent = `Description: ${weatherData.description}`;
    if (unit === "fahrenheit") {
        temp.textContent = `Temperature in Fahrenheit: ${weatherData.currentConditions.temp}`;
    } else {
        let temperature = parseInt(weatherData.currentConditions.temp)
        temperature = (temperature - 32) * (5/9);
        temp.textContent = `Temperature in Celsius: ${Math.round(temperature * 10) / 10}`;
    }
    if (precipate == null) {
        precipate = "nothing";
    }
    fetch('https://api.giphy.com/v1/gifs/translate?api_key=V2jTsSqkbRj9JiBk8EQXy6uEL1hKnRnA&s=' + precipate, {mode: 'cors'})
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            img.src = response.data.images.fixed_height.url;
        })
}

fahrenheitBtn.addEventListener("click", () => {
    unit = "fahrenheit";
});

celsiusBtn.addEventListener("click", () => {
    unit = "celsius";
})

weatherBtn.addEventListener("click", () => {
    const location = locationInput.value.toLowerCase();
    getWeatherData(location, unit);
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
})
