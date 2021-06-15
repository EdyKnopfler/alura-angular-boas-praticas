import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { senhasIguaisValidator } from './senhas-iguais.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  // Modelo para formulário reativo (ver home.module.ts)
  // o ! indica ao compilador indica que a variável pode ser nula (pois instanciamos no ngOnInit)
  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: NovoUsuarioService,
    private existeService: UsuarioExisteService
  ) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.minLength(4)]],
        // o último array é o de validações assíncronas (ver usuario-existe.service.ts)
        userName: ['', [Validators.required, minusculoValidator], [this.existeService.usuarioJaExiste()]],
        password: ['', [Validators.required, ]],
        confirmPassword: ['', [Validators.required, ]],
      },
      { validators: [senhasIguaisValidator] }
    );
  }

  cadastrar() {
    if (this.novoUsuarioForm.valid) {
      const novoUsuario: NovoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.service.cadastraNovoUsuario(novoUsuario).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['']);
        },
        (err) => {
          console.log(err);
        }
      );
    }

  }

}
