import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacaoInterceptor } from './autenticacao.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    // Veja autenticação.interceptor.ts
    // multi: true habilita mais de um interceptor (em cadeia, sem ordem definida!)
    // Toda requisição passará pelos interceptors, no código deles que fazemos os tratamentos conforme a rota
    { provide: HTTP_INTERCEPTORS, useClass: AutenticacaoInterceptor, multi: true }
  ]
})
export class AutenticacaoModule { }
