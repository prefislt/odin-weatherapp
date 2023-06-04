import api from './api.js';
import handle from './handle.js';

const dom = (() => {

    document.querySelector("body").classList.add("flex", "flex-col", "h-[100dvh]", "items-center", "justify-center");

    document.querySelector("body").innerHTML = /*html*/`
    <div id="content" class="flex flex-col mt-6 items-center justify-center h-screen max-w-lg ">
        <p class="mb-4 text-transparent bg-clip-text bg-gradient-to-br font-extrabold text-2xl from-blue-300 to-blue-600"><span class="uppercase text-xs">mini</span> Weather App</p>
        <div id="inputs" class="flex flex-row gap-4">
            <div class="flex flex-row gap-0">
                <input type="text" placeholder="" id="locationInput" class="shadow appearance-none border-blue-500 border-2 border-r-0 rounded-l w-36 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
            <div id="locationWind" class="flex flex-row font-bold justify-center items-center text-xl">
                <div id="windDir" class="w-6 h-6">
                    <i class="absolute z-10 rotate-${json.current.wind_dir}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M13.06 3.283a1.5 1.5 0 0 0-2.12 0L5.281 8.939a1.5 1.5 0 0 0 2.122 2.122L10.5 7.965V19.5a1.5 1.5 0 0 0 3 0V7.965l3.096 3.096a1.5 1.5 0 1 0 2.122-2.122L13.06 3.283Z"/></g></svg>
                    </i>
                    <i class="absolute opacity-20 z-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.27,4.74a4.93,4.93,0,0,1,1.52,4.61,5.32,5.32,0,0,1-4.1,4.51,5.12,5.12,0,0,1-5.2-1.5,5.53,5.53,0,0,0,6.13-1.48A5.66,5.66,0,0,0,20.27,4.74ZM12.32,11.53a5.49,5.49,0,0,0-1.47-6.2A5.57,5.57,0,0,0,4.71,3.72,5.17,5.17,0,0,1,9.53,2.2,5.52,5.52,0,0,1,13.9,6.45,5.28,5.28,0,0,1,12.32,11.53ZM19.2,20.29a4.92,4.92,0,0,1-4.72,1.49,5.32,5.32,0,0,1-4.34-4.05A5.2,5.2,0,0,1,11.6,12.5a5.6,5.6,0,0,0,1.51,6.13A5.63,5.63,0,0,0,19.2,20.29ZM3.79,19.38A5.18,5.18,0,0,1,2.32,14a5.3,5.3,0,0,1,4.59-4,5,5,0,0,1,4.58,1.61,5.55,5.55,0,0,0-6.32,1.69A5.46,5.46,0,0,0,3.79,19.38ZM12.23,12a5.11,5.11,0,0,0,3.66-5,5.75,5.75,0,0,0-3.18-6,5,5,0,0,1,4.42,2.3,5.21,5.21,0,0,1,.24,5.92A5.4,5.4,0,0,1,12.23,12ZM11.76,12a5.18,5.18,0,0,0-3.68,5.09,5.58,5.58,0,0,0,3.19,5.79c-1,.35-2.9-.46-4-1.68A5.51,5.51,0,0,1,11.76,12ZM23,12.63a5.07,5.07,0,0,1-2.35,4.52,5.23,5.23,0,0,1-5.91.2,5.24,5.24,0,0,1-2.67-4.77,5.51,5.51,0,0,0,5.45,3.33A5.52,5.52,0,0,0,23,12.63ZM1,11.23a5,5,0,0,1,2.49-4.5,5.23,5.23,0,0,1,5.81-.06,5.3,5.3,0,0,1,2.61,4.74A5.56,5.56,0,0,0,6.56,8.06,5.71,5.71,0,0,0,1,11.23Z"><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
                    </i>
                </div>
                <span> ${windSpeed}</span>
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