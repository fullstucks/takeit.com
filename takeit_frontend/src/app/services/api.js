const URL_ROOT = 'http://localhost:8000/'
const API_URL = 'api/'

const api = {
    login : URL_ROOT + API_URL+'auth/',
    user_info: URL_ROOT + API_URL+ 'auth/user/info/',
    signup : URL_ROOT + API_URL+'signup/',
    restaurante: URL_ROOT + API_URL+'restaurante/',
    restaurantes: URL_ROOT + API_URL+'restaurante/listas/',
    restaurantes_fav_or_owned: URL_ROOT + API_URL + 'restaurante/restaurantes_fav_or_owned/',
    zonas: URL_ROOT + API_URL+'zona/',
}

export default api