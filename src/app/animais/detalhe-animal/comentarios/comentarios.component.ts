import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Comentarios } from './comentarios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  @Input() idAnimal!: number;
  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(private builder: FormBuilder, private service: ComentariosService) { }

  ngOnInit(): void {
    this.comentarios$ = this.service.buscarComentarios(this.idAnimal);
    this.comentarioForm = this.builder.group({
      comentario: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]]
    })
  }

  gravar() {
    if (this.comentarioForm.invalid) return;
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.service.incluirComentario(this.idAnimal, comentario).pipe(

      // switchMap: troca o fluxo (Observer)
      switchMap(() => this.service.buscarComentarios(this.idAnimal)),

      // tap: executa algo sem alterar
      tap(() => {
        this.comentarioForm.reset();
        alert('Comentário salvo!');
      })
    );  // .subscribe(...) vai trazer o último resultado
  }

}
