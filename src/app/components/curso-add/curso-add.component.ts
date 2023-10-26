import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { TemaService } from 'src/app/services/temas.service';
import { Docente } from '../../models/docente.model';
import { Tema } from 'src/app/models/tema.model';
import { Material } from 'src/app/models/material.model';
import { DocenteService } from '../../services/docente.service';



@Component({
  selector: 'app-curso-add',
  templateUrl: './curso-add.component.html',
  styleUrls: ['./curso-add.component.css']
})
export class CursoAddComponent implements OnInit {
  curso: Curso = <Curso>{
    nombre: '',
    fechaInicio: new Date(),
    idDocente: 1, //campo obligatorio
    tema: {
            id: 2 //campo obligatorio
        }
  };
  material?: Material[];
  docentes?:Docente[];
  temas?:Tema[];
  submitted = false;
  
  constructor(private cursoService: CursoService,private temaService:TemaService,private docenteService:DocenteService) { }
  ngOnInit(): void {
    this.getAllDocentes();
    this.getAllTemas();
  }

  
  getAllDocentes():void{
    this.docenteService.getAll()
    .subscribe({
      next:(data)=>{
        this.docentes = data;
        console.log(this.docentes);},
        error:(e)=>console.error(e)})}

  getAllTemas():void{
    this.temaService.getAll().
    subscribe({
      next:(data)=>{
        this.temas = data;
        console.log(this.temas);},
        error:(e)=>console.error(e)})};


  saveCurso(): void {
	const data = {
		"id": this.curso.id,
    	"nombre": this.curso.nombre,
    	"fechaInicio": this.curso.fechaInicio,
    	"idDocente": this.curso.idDocente ,
    	"tema": this.curso.tema
	};	
    this.cursoService.create(data)
      .subscribe({
        next: (res) => {
          this.submitted = true;
        },
        error: (e) =>
        {
        	console.error(e);
		} 
      });
  }
  newCurso(): void {
    this.submitted = false;
    this.curso = <Curso>{
    	nombre: '',
    	fechaInicio: new Date(),
    	idDocente: 1, //campo obligatorio
    	tema: {
            id: 2 //campo obligatorio
        }
    };
  }

}

