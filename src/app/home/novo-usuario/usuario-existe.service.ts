import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { switchMap, map, first } from 'rxjs/operators';

// Validação assíncrona

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(private novoUsuarioService: NovoUsuarioService) { }

  // Temos que devolver uma função (ver minusculo.validator.ts)
  // A ideia é dar a ela o acesso ao service injetado :)
  usuarioJaExiste() {
    return (control: AbstractControl) => {
      // A validação assíncrona devolve um Observable
      // pipe: encadeia operadores sobre Observables :)
      return control.valueChanges.pipe(
        // Rola um pouco de estudo sobre o RxJS...
        // switchMap: troca o observer do "fluxo" (?)
        // map: troca o resultado
        // first: "encerra o fluxo"?
        switchMap((nomeUsuario) => {
          console.log('consultando usuário');
          return this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario);
        }),
        map((existe) => {
          console.log('existe?', existe);
          return existe ? { existente: true } :  null;
        }),
        first()
      );
    };
  }

}
