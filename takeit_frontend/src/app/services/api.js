const URL_ROOT = 'http://localhost:8000/'

const api = {
    login : URL_ROOT + 'api/auth/',
    signup : URL_ROOT + 'api/signup/',
    restaurante: URL_ROOT + 'api/restaurante/',
    restaurantes: URL_ROOT + 'api/restaurante/listas/',
    zonas: URL_ROOT + 'api/zona/',
    reservas: URL_ROOT + 'api/reserva/',
    horariosPlanificados: URL_ROOT + 'api/planificacion/'
}

export default api