import { switchMap, take } from 'rxjs/operators';
import { UsuarioService } from './../../autenticacao/usuario/usuario.service';
import { AnimaisService } from './../animais.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Animais } from '../animais';

// Guarda Resolver: carrega alguma informação antes da rota ser resolvida
// Busamos os animais enquanto /animais inicia, não no ngOnInit
// Ver animais.routing.module.ts
// ng g resolver animais/lista-animais/lista-animais

@Injectable({
  providedIn: 'root'
})
export class ListaAnimaisResolver implements Resolve<Animais> {

  constructor(private animaisService: AnimaisService, private usuarioService: UsuarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Animais> {
    return this.usuarioService.retornaUsuario().pipe(
      switchMap((u) => this.animaisService.listaDoUsuario(u.name ?? '')),  // tipo Subject (não finaliza)
      take(1)  // tem fluxos que ficam "abertos", precisamos finalizá-lo.
    )
  }
}
