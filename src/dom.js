import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import api from './api.js';
import handle from './handle.js';

const dom = (() => {

    document.querySelector("body").classList.add("flex", "flex-col", "h-[100dvh]", "items-center", "justify-center");

    document.querySelector("body").innerHTML = /*html*/`
    <div id="content" class="flex flex-col mt-6 items-center justify-center h-screen max-w-lg ">
        <p class="mb-4 text-transparent bg-clip-text bg-gradient-to-br font-extrabold text-2xl from-blue-300 to-blue-600"><span class="uppercase text-xs">mini</span> Weather App</p>
        <div id="inputs" class="flex flex-row gap-4">
            <div class="flex flex-row gap-0">
                <input type="text" placeholder="Vilnius" id="locationInput" class="shadow appearance-none border-blue-500 border-2 border-r-0 rounded-l w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <button id="locationSubmit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-r shadow ease-in-out duration-100">OK</button>
            </div> 
            <div id="unitSelectors" class="flex flex-row">
                <button id="selectC" class="bg-blue-300 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded-l ease-in-out duration-100">°C</button>
                <button id="selectF" class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ease-in-out duration-100">°F</button>
            </div>
        </div>
        <div id="output" class="flex flex-col items-center m-4 p-6 w-full border rounded shadow ease-in-out duration-500">
            
        </div>
    </div>
    `;

    handle.enterInput();
    handle.unitSelect();

    document.querySelector("#locationSubmit").addEventListener("click", async () => {
        let location = document.querySelector("#locationInput").value;

        if (!location) {
            api.getWeatherData(localStorage.getItem("location"));
        } else {
            api.getWeatherData(location);
        }

    })

    function markUnit() {
        if (localStorage.getItem("unit") === "C") {
            document.querySelector("#selectC").classList.add("underline", "bg-blue-500");
            document.querySelector("#selectC").classList.remove("bg-blue-300");

            document.querySelector("#selectF").classList.remove("underline", "bg-blue-500");
            document.querySelector("#selectF").classList.add("bg-blue-300");
        } else {
            document.querySelector("#selectF").classList.add("underline", "bg-blue-500");
            document.querySelector("#selectF").classList.remove("bg-blue-300");

            document.querySelector("#selectC").classList.remove("underline", "bg-blue-500");
            document.querySelector("#selectC").classList.add("bg-blue-300");
        }
    }

    function renderData(json, unit) {

        let temp, windSpeed;

        if (unit === "C") {
            temp = `${json.current.temp_c} °C`;
            windSpeed = `${json.current.wind_kph} km/h`;
        } else {
            temp = `${json.current.temp_f} °F`;
            windSpeed = `${json.current.wind_mph} mph`;
        }


        document.querySelector("#output").innerHTML = /*html*/`
            <div id="locationCondition" class="flex justify-center items-center w-16 aspect-square"><img id="locationConditionImg" src="${json.current.condition.icon}" alt="${json.current.condition.text}"></div>
            <div id="locationName" class="font-bold text-xl">${json.location.name}</div>
            <div id="locationRegion" class="font-semibold text-xs">${json.location.region}</div>
            <div id="locationTemp" class="font-bold text-6xl">${temp}</div>
            <div id="locationWind" class="font-bold text-xl"><i class="rotate-${json.current.wind_dir} fa-solid fa-arrow-up"></i> <i class='fas fa-wind'></i> ${windSpeed}</div>
        `;
    }

    function renderError(errorMsg) {
        document.querySelector("#output").innerHTML = /*html*/`
            <div id="errorAlert" class="mt-4 ease-in-out duration-200">
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span class="font-bold">Error! <span class="font-normal">${errorMsg}.</span></span>
                </div>
            </div>
        `
    }

    function displayLoading() {
        document.querySelector("#output").innerHTML = /*html*/`
            <div class="flex flex-col animate-pulse items-center">
                <div id="locationCondition" class="bg-slate-200 aspect-square w-16 rounded-md mb-1"></div>
                <div id="locationName" class="bg-slate-200 w-24 h-6 rounded-md mb-1"></div>
                <div id="locationRegion" class="bg-slate-200 w-32 h-3 rounded-md mb-1"></div>
                <div id="locationTemp" class="bg-slate-200 w-44 h-14 rounded-md mb-1"></div>
                <div id="locationWind" class="bg-slate-200 w-32 h-6 rounded-md"></div>
            </div>
        `;
        // document.querySelector("#output").appendChild = `<i class="fas fa-circle-notch fa-spin"></i>`;
    }

    function showWeatherData(json) {
        if (!json.statusText) {
            renderData(json, localStorage.getItem("unit"));
        } else {
            renderError(json.statusText);
        }
    }

    return {
        renderData,
        renderError,
        displayLoading,
        showWeatherData,
        markUnit
    }
})();

export default dom;