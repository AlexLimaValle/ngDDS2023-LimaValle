import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente.model';

// const baseUrl = 'http://localhost:4200/api/cursos';
const baseUrl = 'http://localhost:8080/cursos';

@Injectable({
  providedIn: 'root'
})

export class DocenteService {

  constructor(private http: HttpClient) { } //el constructor se ejecuta cada vez que se usa la clase
  
  getAll(): Observable<Docente[]> {
    return this.http.get<Docente[]>(baseUrl); //petision get
  }
  get(id: any): Observable<Docente> {
    return this.http.get<Docente>(`${baseUrl}/${id}`);
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
  update(id: any, data: Docente): Observable<any> {
	//Conversione a form data
	const bodyData = {
		"id": id,
    	"nombre": data.nombre,
	};
    return this.http.put(`${baseUrl}`, bodyData, {responseType: 'text'});
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete/${id}`, {responseType: 'text'});
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(nombre: any): Observable<Docente> {
    return this.http.get<Docente>(`${baseUrl}?nombre=${nombre}`);
  }
}
