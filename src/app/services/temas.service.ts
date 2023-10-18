import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema.model';

const baseUrl = 'http://localhost:4200/api/temas'; 
/* probando en el postman
[
    {
        "id": 1,
        "nombre": "Programacion en C++",
        "duracion": 12
    },
    {
        "id": 2,
        "nombre": "Diseño de Sistemas",
        "duracion": 36
    },
    {
        "id": 3,
        "nombre": "Analisis matematico",
        "duracion": 45
    },
    {
        "id": 4,
        "nombre": "Python 3 - Nivel Intermedio",
        "duracion": 10
    },
    {
        "id": 5,
        "nombre": "PHP y MySQL Intermedio",
        "duracion": 9
    },
    {
        "id": 6,
        "nombre": "Data Engineering",
        "duracion": 8
    }
]

*/
//const baseUrl = 'http://localhost:8080/cursos';

@Injectable({
  providedIn: 'root'
})

export class TemaService {

  constructor(private http: HttpClient) { } //el constructor se ejecuta cada vez que se usa la clase
  
  getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(baseUrl); //petision get
  }
  get(id: any): Observable<Tema> {
    return this.http.get<Tema>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
	console.log(data);
	//Conversione a form data
	//const formData = new FormData();
	//formData.append('title', <string>data.title);
    //formData.append('status', <string>data.status);
	//formData.append('content', <string>data.content);
    return this.http.post(`${baseUrl}`, data, {responseType: 'text'});
  }
  update(id: any, data: Tema): Observable<any> {
	//Conversione a form data
	const bodyData = {
		"id": id,
    	"nombre": data.nombre,
    	"duracion":data.duracion
	};
    return this.http.put(`${baseUrl}`, bodyData, {responseType: 'text'});
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`, {responseType: 'text'});
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(nombre: any): Observable<Tema> {
    return this.http.get<Tema>(`${baseUrl}?nombre=${nombre}`);
  }
}
