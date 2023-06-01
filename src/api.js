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
                dom.showWeatherData(response);
            })
            .catch((e) => {
                dom.showWeatherData(e);
            })
    }

    return {
        getWeatherData
    }
})();

export default api;