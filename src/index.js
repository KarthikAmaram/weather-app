async function getWeatherData() {
    const img = document.querySelector("img");
    const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/murghab?key=DB7GXJD6FSKZ3UFSG8E4HKK7B", {mode: "cors"})
    const weatherData = await response.json();
    let precipate = weatherData.currentConditions.preciptype;
    console.log(weatherData.currentConditions.temp);
    console.log(weatherData);
    if (precipate == null) {
        precipate = "boring";
    }
    fetch('https://api.giphy.com/v1/gifs/translate?api_key=V2jTsSqkbRj9JiBk8EQXy6uEL1hKnRnA&s=' + precipate, {mode: 'cors'})
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            img.src = response.data.images.original.url;
        })
}

getWeatherData();