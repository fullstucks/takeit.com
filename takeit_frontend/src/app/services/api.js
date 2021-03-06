const URL_ROOT = 'http://localhost:8000/'
//const URL_ROOT = '/'

const API_URL = 'api/'

const api = {
    login : URL_ROOT + API_URL+'auth/',
    user_info: URL_ROOT + API_URL+ 'auth/user/info/',
    signup : URL_ROOT + API_URL+'signup/',
    restaurante: URL_ROOT + API_URL+'restaurante/',
    restaurantes: URL_ROOT + API_URL+'restaurante/listas/',
    restaurantes_fav_or_owned: URL_ROOT + API_URL + 'restaurante/restaurantes_fav_or_owned/',
    planificacion: URL_ROOT + API_URL + 'planificacion/',
    zonas: URL_ROOT + API_URL+'zona/',
    zona_list: URL_ROOT + API_URL+'zona/list/',
    tag_list: URL_ROOT + API_URL + 'tag/list/',
    reservas: URL_ROOT + API_URL +'reserva/',
    reserva_list: URL_ROOT + API_URL +'reserva/list/' ,
    reservar: URL_ROOT + API_URL+ 'reserva/',
    reservar2: URL_ROOT+API_URL+ 'reservar/',
    horariosPlanificados: URL_ROOT + API_URL +  'planificacion/'
}

export default api