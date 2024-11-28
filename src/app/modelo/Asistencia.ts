import {Estadotencia} from "./Estadotencia";
import {Periodo} from "./Periodo";
import {Estudiante} from "./Estudiante";
import {Curso} from "./Curso";

export class Asistencia{

  idAsistencia: number;
  fecharegistro: string;
  estadotencia: Estadotencia;
  periodo: Periodo;
  estudiante: Estudiante;
  curso: Curso;

}
