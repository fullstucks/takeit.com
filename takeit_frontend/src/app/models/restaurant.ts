import { Zones } from './tops';

export class Restaurant{
    id: number;
    img_paths: any[];
    nombre: string;
    descripcion: string;
    n_resenas: number;
    ubicacion: string;
    calificacion_prom: number;
    lat: number;
    lng: number;
    zona: any;
    tags:any[]
}