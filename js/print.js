//Заставка на загрузку данных
function loadingCity() {
    const loaderLocation = document.querySelector('.headerWeather');
    const loaderGrid = document.querySelector('.favWeather');
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';
    loaderLocation.style.display = 'grid';
    loaderGrid.style.display = 'grid';
}
function loading() {
    const loaderGrid = document.querySelector('.favList');
    const loader = document.querySelector('.loaderCity');
    loader.style.display = 'none';
    loaderGrid.style.display = 'grid';
}

function loadCurrentCity() {
    navigator.geolocation.getCurrentPosition(
        position => {
            loadWeatherDataByPos(position, onCurrentCityLoaded, errorDuringLoadingCurrent)
        },
        error => {
            loadWeatherDataByName("Saint Petersburg", onCurrentCityLoaded, errorDuringLoadingCurrent)
        }, {timeout: 5000}
    )

}

function errorDuringLoadingCurrent() {
    alert("Can't load city")
}

function onCurrentCityLoaded(weather) {
    console.log(weather)
    let curCel = document.getElementsByClassName("headerTemp")[0]
    let curCity = document.getElementsByClassName("headerCity")[0]
    let curImg = document.getElementsByClassName("headerImg")[0]
    let curWind = document.getElementById("hWind")
    let curCloudiness = document.getElementById("hCloudiness")
    let curPressure = document.getElementById("hPressure")
    let curHumidity = document.getElementById("hHumidity")
    let curCoordinates = document.getElementById("hCoordinates")

    curCel.textContent = `${Math.round((weather.main.temp - 273.15))}°C`
    curCity.textContent = weather.name
    curImg.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
    curWind.textContent = `${weather.wind.speed} m/s, ${windDegToText(weather.wind.deg)}`
    curCloudiness.textContent = `${weather.clouds.all} %`
    curPressure.textContent = `${weather.main.pressure} hpa`
    curHumidity.textContent = `${weather.main.humidity} %`
    curCoordinates.textContent = `[${weather.coord.lat}, ${weather.coord.lon}]`
}


function onCityLoaded(fromStorage, parent, element, weather) {
    let inStorage = getLocalFavorites().includes(weather.id)

    if (!inStorage || fromStorage) {
        fillCityElement(parent, element, weather)
        if (!inStorage) {
            addToLocalFavorites(weather.id)
        }
    } else {
        alert("This city already in favorite")
        parent.removeChild(element)
    }

}

function createFavoriteCityElement(parent) {
    let template = document.getElementById("temp")
    let newFav = template.content.cloneNode(true)
    let element = newFav.childNodes[1]
    parent.appendChild(element)
    return element
}

function errorDuringLoadingFavorite(parent, element) {
    parent.removeChild(element)
    alert("Can't load city")
}

function fillCityElement(parent, element, weather) {

    element.querySelector('.favCity').textContent = weather.name
    element.querySelector('.favImg').src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
    element.querySelector('.favTemperature').textContent = `${Math.round((weather.main.temp - 273.15))}°C`
    element.querySelector('.favButton').addEventListener("click", () => {
        parent.removeChild(element)
        removeFromLocalFavorites(weather.id)
    })
    element.querySelector('#favorites-wind').textContent = `${weather.wind.speed} m/s, ${windDegToText(weather.wind.deg)}`
    element.querySelector('#favorites-cloudiness').textContent = `${weather.clouds.all}%`
    element.querySelector('#favorites-pressure').textContent = `${weather.main.pressure} hpa`
    element.querySelector('#favorites-humidity').textContent = `${weather.main.humidity}%`
    element.querySelector('#favorites-coordinates').textContent = `[${weather.coord.lat}, ${weather.coord.lon}]`
}

function windDegToText(degree) {
    if (degree > 337.5) return 'Northerly'
    if (degree > 292.5) return 'North Westerly'
    if (degree > 247.5) return 'Westerly'
    if (degree > 202.5) return 'South Westerly'
    if (degree > 157.5) return 'Southerly'
    if (degree > 122.5) return 'South Easterly'
    if (degree > 67.5) return 'Easterly'
    if (degree > 22.5) return 'North Easterly'
    return 'Northerly'
}



