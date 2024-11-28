import {Usuario} from "./Usuario";
import {Institucion} from "./Institucion";

export class Trabajador {

    idTrabajador: number;
    nombreCompleto: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    celular: string;
    correo: string;
    institucion: Institucion;
    usuario: string;

}
