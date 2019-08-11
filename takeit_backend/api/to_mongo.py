from pymongo import MongoClient, DESCENDING

client = MongoClient("mongodb+srv://mglpg:vXMfQV1YMOR5CJtA@takeit-biilu.gcp.mongodb.net/test?retryWrites=true&w=majority")
db = client.takeidb

def insert_restaurante(data):
    db.restaurante.insert_one(data)

def get_restaurante_all():
    return db.restaurante.find({}, {'_id': False})
def get_restaurante(restaurante_id):
    return db.restaurante.find_one({'id': restaurante_id}, {'_id': False})

def get_restaurant_recomended(limit):
    return db.restaurante.find({}, {'_id': False}).sort([
                ("n_resenas", DESCENDING), 
                ("calificacion_prom", DESCENDING)
            ]).limit(limit)

def get_restaurant_by_tag(tag_id):
    return db.restaurante.find({'tags':{"$elemMatch":{"id": tag_id}}}, {'_id': False})

def get_restaurant_by_search_input(search_input, top):
    return db.restaurante.find({"$or":[
            {
                'nombre': {"$regex": search_input, '$options': 'i'}
            },
            {
                'descripcion': {"$regex": search_input, '$options': 'i'}
            },
            {
                'ubicacion': {"$regex": search_input, '$options': 'i'}
            }
        ]
    }, {'_id': False}).limit(int(top))


def add_photo_restaurant(id_restaurant, data):
    db.restaurante.update({"id": int(id_restaurant)},{"$push": { "img_paths": data }})