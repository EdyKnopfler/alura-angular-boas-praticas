import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// ng generate component home/login
// Módulo home já foi atualizado :)

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = '';
  senha: string = '';
  erro: boolean = false;

  constructor(private authService: AutenticacaoService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (!this.valido()) {
      this.erro = true;
      return;
    }
    this.authService.autenticar(this.usuario, this.senha).subscribe(
      () => {
        this.erro = false;
        this.router.navigate(['animais']);
      },
      (err) => {
        this.erro = true;
        console.log(err);
      }
    )
  }

  valido(): boolean {
    return this.usuario.trim() != '' && this.senha.trim() != '';
  }

}
