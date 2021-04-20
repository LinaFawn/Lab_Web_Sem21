function addToLocalFavorites(id) {
    let favorites = getLocalFavorites()
    favorites.push(id)
    saveFavorites(favorites)
}

function removeFromLocalFavorites(id) {
    let favorites = getLocalFavorites().filter(value => value !== id)
    saveFavorites(favorites)
}

function getLocalFavorites() {
    if (localStorage.favorites === undefined || localStorage.favorites === "") return []
    return JSON.parse(localStorage.favorites)
}

function saveFavorites(favorites) {
    localStorage.favorites = JSON.stringify(favorites)
}
