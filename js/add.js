function addNewCityByName(name) {
    addNewCity(false, (callback, errorCallback) => {
        loadWeatherDataByName(name, callback, errorCallback)
    })
}

function addNewCityById(id) {
    addNewCity(true, (callback, errorCallback) => {
        loadWeatherDataById(id, callback, errorCallback)
    })
}

function addNewCity(fromStorage, loadFunc) {
    let favoritesList = document.getElementsByClassName("favWeather")[0]
    let element = createFavoriteCityElement(favoritesList)
    loadFunc(weather => {
        onCityLoaded(fromStorage, favoritesList, element, weather)
    }, function () {
        errorDuringLoadingFavorite(favoritesList, element)
    })
}