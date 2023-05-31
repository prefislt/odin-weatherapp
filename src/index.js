import _ from 'lodash';
import './main.css';

async function getWeatherData(location) {
    let weatherData = [];
    await fetch(`https://api.weatherapi.com/v1/current.json?key=ba0ede3c9ea645bbbee93446232105&q=${location}`)
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then(response => {
            console.log(response);
            weatherData[0] = response.location.name;
            weatherData[1] = response.location.localtime;
            weatherData[2] = response.current.temp_c;
        })
        .catch((e) => {
            weatherData[0] = "Klaida: " + e.statusText;
        })
    return weatherData;
}

document.querySelector("body").innerHTML = /*html*/`
    <div class="flex justify-center items-center flex-col h-screen" id="content">
        <div class="flex flex-row" id="inputs">
            <input class="shadow appearance-none border rounded w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="locationInput">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="locationSubmit">OK</button>
        </div>
        <div id="output">
            
        </div>
        
    </div>
`;

document.querySelector("#locationSubmit").addEventListener("click", async () => {
    let location = document.querySelector("#locationInput").value;

    let weather = await getWeatherData(location);

    if (weather.length > 1) {
        document.querySelector("#output").innerHTML = /*html*/`
            Šiuo metu mieste "${weather[0]}" yra ${weather[2]} °C
        `;
    } else {
        document.querySelector("#output").innerHTML = /*html*/`
            ${weather[0]}
        `;
    }


})