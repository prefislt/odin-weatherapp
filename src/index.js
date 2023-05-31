import _ from 'lodash';
import './main.css';

async function getWeatherData(location) {
    await fetch(`https://api.weatherapi.com/v1/current.json?key=ba0ede3c9ea645bbbee93446232105&q=${location}`)
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then(response => {
            showWeatherData(response);
        })
        .catch((e) => {
            showWeatherData(e);
        })
}

function showWeatherData(json) {

    console.log(json);

    if (!json.statusText) {
        document.querySelector("#output").innerHTML = /*html*/`
            <span class="font-bold text-xl">${json.location.name}</span>
            <span class="font-bold text-6xl">${json.current.temp_c} °C</span>
        `;
    } else {
        document.querySelector("#output").innerHTML = /*html*/`
            ${json.statusText}
        `;
    }
}

document.querySelector("body").innerHTML = /*html*/`
    <div class="flex mt-6 items-center flex-col h-screen" id="content">
        <div class="flex flex-row" id="inputs">
            <input class="shadow appearance-none border rounded w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="locationInput">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="locationSubmit">OK</button>
        </div>
        <div class="flex flex-col items-center m-4" id="output">
            No data
        </div>
        
    </div>
`;

getWeatherData("Vilnius")

document.querySelector("#locationSubmit").addEventListener("click", async () => {
    let location = document.querySelector("#locationInput").value;

    getWeatherData(location);
})