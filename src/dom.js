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
        <div id="output" class="flex flex-col items-center m-4 ease-in-out duration-500">
            <div id="locationCondition"><img id="locationConditionImg" src="" alt=""></div>
            <div id="locationName" class="font-bold text-xl"></div>
            <div id="locationRegion" class="font-semibold text-xs"></div>
            <div id="locationTemp" class="font-bold text-6xl"></div>
            <div id="locationWind" class="font-bold text-xl"></div>
            <div id="errorAlert" class="mt-4 opacity-0 ease-in-out duration-200">
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span class="font-bold">Error! </span><span id="errorText"></span>
                </div>
            </div>
        </div>  
    </div>
    `;

    document.querySelector("#locationSubmit").addEventListener("click", async () => {
        let location = document.querySelector("#locationInput").value;

        api.getWeatherData(location);
    })

    function renderData(json) {
        document.querySelector("#errorAlert").classList.add("opacity-0"); // hide error alert if getting new data

        document.querySelector("#locationConditionImg").src = json.current.condition.icon;
        document.querySelector("#locationConditionImg").alt = json.current.condition.text;
        document.querySelector("#locationName").innerHTML = json.location.name;
        document.querySelector("#locationRegion").innerHTML = json.location.region;
        document.querySelector("#locationTemp").innerHTML = `${json.current.temp_c} °C`;
        document.querySelector("#locationWind").innerHTML = `<i class='fas fa-wind'></i> ${json.current.wind_kph} km/h`;
    }

    function errorData(errorMsg) {
        document.querySelector("#errorText").innerHTML = errorMsg;
        document.querySelector("#errorAlert").classList.remove("opacity-0");
    }

    function displayLoading() {
        document.querySelector("#output").classList.add("blur");
        // document.querySelector("#output").appendChild = `<i class="fas fa-circle-notch fa-spin"></i>`;
    }

    function removeLoading() {
        document.querySelector("#output").classList.remove("blur");
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
        showWeatherData,
        removeLoading
    }
})();

export default dom;