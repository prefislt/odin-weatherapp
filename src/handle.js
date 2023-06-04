import api from './api.js';
import dom from './dom.js';

const handle = (() => {

    function startUp() {
        storage();
        dom.markUnit();
        api.getWeatherData(localStorage.getItem("location"));
    }

    function storage() {
        if (!localStorage.getItem("unit")) {
            localStorage.setItem("unit", "C");
        }

        if (!localStorage.getItem("location")) {
            localStorage.setItem("location", "Vilnius");
        }
    }

    function enterInput() {
        document.querySelector("#locationInput").addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                document.querySelector("#locationSubmit").click();
            }
        })
    }

    function unitSelect() {

        document.querySelector("#selectC").addEventListener("click", () => {
            if (localStorage.getItem("location") && localStorage.getItem("unit") !== "C") {
                localStorage.setItem("unit", "C");
                dom.markUnit();
                api.getWeatherData(localStorage.getItem("location"));
            }
        })

        document.querySelector("#selectF").addEventListener("click", () => {
            if (localStorage.getItem("location") && localStorage.getItem("unit") !== "F") {
                localStorage.setItem("unit", "F");
                dom.markUnit();
                api.getWeatherData(localStorage.getItem("location"));
            }
        })
    }

    return {
        enterInput,
        unitSelect,
        storage,
        startUp
    }

})();

export default handle;