import api from './api.js';
import dom from './dom.js';

const handle = (() => {

    function storage() {
        if (!localStorage.getItem("unit")) {
            localStorage.setItem("unit", "C");
        }

        if (!localStorage.getItem("location")) {
            localStorage.setItem("location", "Vilnius");
            console.log("nustatyta Vilnius");
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
            localStorage.setItem("unit", "C");
            api.getWeatherData(localStorage.getItem("location"));
        })

        document.querySelector("#selectF").addEventListener("click", () => {
            localStorage.setItem("unit", "F");
            api.getWeatherData(localStorage.getItem("location"));
        })
    }

    return {
        enterInput,
        unitSelect,
        storage
    }

})();

export default handle;