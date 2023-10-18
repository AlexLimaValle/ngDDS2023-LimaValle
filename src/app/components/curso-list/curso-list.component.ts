import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-curso-list',
  templateUrl: './curso-list.component.html',
  styleUrls: ['./curso-list.component.css']
})
export class CursoListComponent implements OnInit {
  cursos?: Curso[];
  currentElement: Curso = {};
  currentIndex = -1;
  title = '';

  constructor(private cursoService: CursoService) { }
  ngOnInit(): void { //se ejecuta una ves se crea el componente
    this.retrieveCursos();
  }
  
  retrieveCursos(): void {
    this.cursoService.getAll()
      .subscribe({
        next: (data) => {
          this.cursos = data;
          console.log(this.cursos);
        },
        error: (e) => console.error(e)
      });
  }
  
  refreshList(): void {
    this.retrieveCursos();
    this.currentElement = {};
    this.currentIndex = -1;
  }
  setActiveElement(element: Curso, index: number): void {
    this.currentElement = element;
    this.currentIndex = index;
  }
  removeAllElements(): void {
    this.cursoService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  searchTitle(): void {
    this.currentElement = <Curso>{};  //casting tipo Curso
    this.currentIndex = -1;
    if(this.title.length != 0){
      this.cursoService.findByTitle(this.title)
        .subscribe({
          next: (data) => {
            this.cursos = [data];
            console.log(this.cursos);
          },
          error: (e) => console.error(e)
        });
    }else{
        this.retrieveCursos();
    }
  }
}
