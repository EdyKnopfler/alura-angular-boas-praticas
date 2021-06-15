import { MensagemModule } from './../components/mensagem/mensagem.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';

// Mòdulo: organização do código em uma aplicação Angular.
// Feature Module: módulo de funcionalidade

// ng generate module home --routing [-d]

// --routing: já cria o módulo de roteamento
// -d: dry run, apenas simula

// ng g component home: o Angular já cria o componente neste módulo :)

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NovoUsuarioComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,  // template-driven
    ReactiveFormsModule,  // reactive
    MensagemModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
