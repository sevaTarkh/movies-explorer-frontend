class MoviesApi{
    constructor(options){
        this._options = options;
        this._baseUrl = this._options.baseUrl
        this._headers = this._options.headers;
    }
    _getResJson(res){
        if (res.ok){
          return res.json();
        } 
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    getMovies(){
        return fetch(`${this._baseUrl}`, {
            headers: this._headers,
        })
        .then(this._getResJson)
    }
}

const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
    },
})

export default moviesApi;