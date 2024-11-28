import {Estudiante} from "./Estudiante";
import {Apoderado} from "./Apoderado";
import {Medio} from "./Medio";
import {Plan} from "./Plan";
import {Institucion} from "./Institucion";
import {Grupo} from "./Grupo";

export class Matricula {

  idMatricula: number;
  ieEstudio: string;
  escuelaPostula: string;
  antePatoPsico: string;
  antePoliJudi: string;
  declaracionJurada: string;
  direccion: string;
  familiarMilitarPolicial: string;
  fechaIncorporacion: string;
  lugarNatural: string;
  natacion: string;
  otros: string;
  peso: number;
  talla: number;
  estudiante: Estudiante;
  apoderado: Apoderado;
  medio: Medio;
  plan: Plan;
  institucion: Institucion;
  grupo: Grupo;
}
