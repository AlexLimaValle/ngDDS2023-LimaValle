import { Tema } from '../models/tema.model';
import { Docente } from "../models/docente.model";

export class Curso {
	id?: number;
	nombre?: string;	
	tema?: Tema;
	fechaInicio?: Date;
	idDocente?: Number;
}

