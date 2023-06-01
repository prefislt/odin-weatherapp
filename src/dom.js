import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import api from './api.js';

const dom = (() => {

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

    document.querySelector("#locationSubmit").addEventListener("click", async () => {
        let location = document.querySelector("#locationInput").value;

        api.getWeatherData(location);
    })

    function renderData(json) {
        document.querySelector("#output").innerHTML = /*html*/`
            <div id="locationCondition"><img src="${json.current.condition.icon}" alt="${json.current.condition.text}"></div>
            <div id="locationName" class="font-bold text-xl">${json.location.name}</div>
            <div id="locationRegion" class="font-semibold text-xs">${json.location.region}</div>
            <div id="locationTemp" class="font-bold text-6xl">${json.current.temp_c} °C</div>
            <div id="locationWind" class="font-bold text-xl"><i class='fas fa-wind'></i> ${json.current.wind_kph} km/h</div>
        `
    }

    function errorData(errorMsg) {
        document.querySelector("#output").innerHTML = /*html*/`
                ${errorMsg}
        `;
    }

    function displayLoading() {
        document.querySelector("#output").innerHTML = `<i class="fas fa-circle-notch fa-spin"></i>`;
    }

    function showWeatherData(json) {
        if (!json.statusText) {
            renderData(json);
        } else {
            errorData(json.statusText);
        }
    }

    return {
        renderData,
        errorData,
        displayLoading,
        showWeatherData
    }
})();

export default dom;