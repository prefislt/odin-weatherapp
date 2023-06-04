import dom from './dom.js';

const api = (() => {
    const API_KEY = 'ba0ede3c9ea645bbbee93446232105';
    async function getWeatherData(location) {
        dom.displayLoading();
        await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`)
            .then(response => {
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
            .then(response => {
                localStorage.setItem("location", response.location.name);
                document.querySelector("#locationInput").setAttribute("placeholder", response.location.name);
                setTimeout(() => { dom.showWeatherData(response) }, 500); // simulate loading delay
            })
            .catch((e) => {
                setTimeout(() => { dom.showWeatherData(e) }, 500);
            })
    }

    return {
        getWeatherData
    }
})();

export default api;