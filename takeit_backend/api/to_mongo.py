from pymongo import MongoClient, DESCENDING
import ssl

client = MongoClient("mongodb://mglps:1controlXYZW@localhost")
db = client.takeitdb
print(db)

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


def delete_restaurant(restaurant_id):
    db.restaurante.delete_one({"id": restaurant_id})

def add_photo_restaurant(restaurant_id, data):
    db.restaurante.update({"id": int(restaurant_id)}, {"$push": { "img_paths": data }}) 