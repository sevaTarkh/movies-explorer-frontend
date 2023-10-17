class Api{
    constructor(options){
        this._options = options;
        this._baseUrl = this._options.baseUrl
        this._headers = this._options.headers;
    }
    _getResJson(res){
        return res.ok ?
          res.json()
        :
          Promise.reject(res.status)
    }
    getUserInformationFromServer(token){
        return fetch(`${this._baseUrl}/users/me`,{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        })
      .then(this._getResJson)
    }
    editProfileInformation(data, token){
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email
        })
    })
    .then(this._getResJson)
    }
    saveMovie(movieInfo, token){
        return fetch(`${this._baseUrl}/movies`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              country: movieInfo.country,
              director: movieInfo.director,
              duration: movieInfo.duration,
              year: movieInfo.year,
              description: movieInfo.description,
              image:  'https://api.nomoreparties.co/' + movieInfo.image.url,
              trailerLink: movieInfo.trailerLink,
              thumbnail: 'https://api.nomoreparties.co/' + movieInfo.image.url,
              owner: movieInfo.owner,
              movieId: movieInfo.id,
              nameRU: movieInfo.nameRU,
              nameEN: movieInfo.nameEN,
            })
          })
          .then(this._getResJson)
    }
    getSavedMovies(token){
        return fetch(`${this._baseUrl}/movies`,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
          })
        .then(this._getResJson)
    }
    handleRemoveMovie(_id, token){
        return fetch(`${this._baseUrl}/movies/${_id}`,{
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        })
        .then(this._getResJson)
      }
}

const api = new Api({
    baseUrl: 'https://api.kino.nomoredomainsicu.ru', 
});

export default api;