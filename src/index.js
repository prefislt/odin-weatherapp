import _ from 'lodash';
import './main.css';
import LoadingGif from './img/loading.gif';

async function getWeatherData(location) {
    displayLoading();
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
    if (!json.statusText) {
        renderData(json);
    } else {
        errorData(json.statusText);
    }
}

function renderData(json) {
    document.querySelector("#output").innerHTML = /*html*/`
        <div id="location" class="font-bold text-xl">${json.location.name}</div>
        <div id="temp" class="font-bold text-6xl">${json.current.temp_c} °C</div>
    `
}

function errorData(errorMsg) {
    document.querySelector("#output").innerHTML = /*html*/`
            ${errorMsg}
    `;
}

function displayLoading() {
    const loadingGif = new Image();
    loadingGif.src = LoadingGif;
    loadingGif.classList.add("w-24");

    document.querySelector("#output").innerHTML = "";
    document.querySelector("#output").appendChild(loadingGif);
}

document.querySelector("body").innerHTML = /*html*/`
    <div  id="content" class="flex mt-6 items-center flex-col h-full">
        <div  id="inputs" class="flex flex-row">
            <input type="text" id="locationInput" class="shadow appearance-none border rounded w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <button id="locationSubmit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">OK</button>
        </div>
        <div id="output" class="flex flex-col items-center m-4">
            
        </div>
        
    </div>
`;

getWeatherData("Vilnius")

document.querySelector("#locationSubmit").addEventListener("click", async () => {
    let location = document.querySelector("#locationInput").value;

    getWeatherData(location);
})

displayLoading();