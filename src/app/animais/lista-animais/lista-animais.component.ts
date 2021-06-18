import { switchMap } from 'rxjs/operators';
import { AnimaisService } from './../animais.service';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { Animais } from './../animais';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {

  animais!: Animais;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtendo dado do Resolver (ver lista-animais.resolver.ts e animais-routing.module.ts)
    this.route.params.subscribe((params) => {
      this.animais = this.route.snapshot.data['animais'];
    });
  }

}
