import { AnimaisService } from './../animais.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Animal } from '../animais';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {

  // $: convenção que indica Observable
  // !: sinaliza ao compilador que não quero inicializar (modo 'strict')
  animalId!: number;
  animal$!: Observable<Animal>;

  constructor(

    // ActivatedRoute: rota atual, usamos para pegar o parâmetro animalId
    private activatedRoute: ActivatedRoute,

    private service: AnimaisService,
    private router: Router) { }

  ngOnInit(): void {
    // exatamente o nome em animais-routing.module.ts
    this.animalId = this.activatedRoute.snapshot.params.animalId;
    this.animal$ = this.service.buscaPorId(this.animalId);
  }

  curtir() {
    this.service.curtir(this.animalId).subscribe(
      (curtida) => {
        if (curtida) {  // Devolve true se alterou
          // Recrio o Observable
          this.animal$ = this.service.buscaPorId(this.animalId);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  excluir() {
    this.service.excluiAnimal(this.animalId).subscribe(
      () => {
        this.router.navigate(['/animais']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
