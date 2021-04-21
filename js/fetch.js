async function loadDataByUrl(url, callback, errorCallback) {
    res = await (await fetch(url)).json;
    if (res.status == 200){
        callback(json)
    } else{
        errorCallback()
    }

}
  /*  fetch(url)
        .then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    callback(json)
                })
            } else {
                errorCallback()
            }
        })
        .catch((err) => {
            errorCallback()
        })

   */