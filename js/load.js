function loadWeatherDataByName(name, callback, errorCallback) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
    loadDataByUrl(url, callback, errorCallback)
}

function loadWeatherDataByPos(position, callback, errorCallback) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`
    loadDataByUrl(url, callback, errorCallback)
}

function loadWeatherDataById(id, callback, errorCallback) {
    let url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}`
    loadDataByUrl(url, callback, errorCallback)
}