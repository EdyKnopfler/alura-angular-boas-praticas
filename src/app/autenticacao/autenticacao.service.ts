import { UsuarioService } from './usuario/usuario.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private httpClient: HttpClient, private usuarioService: UsuarioService) { }

  // HttpResponse: não quero pegar somente o body, e sim a requuisição inteira
  // O token JWT vem no cabeçalho da resposta
  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.httpClient.post(
      'http://localhost:3000/user/login',
      {
        userName: usuario,
        password: senha
      },
      { observe: 'response' }  // faz o post() devolver o HttpResponse ao invés de apenas o corpo
    ).pipe(
      // tap: operador que efetua um efeito colateral sem alterar o "fluxo do Observable"
      // no caso: guardar o token antes de devolver o Observavle
      tap((res) => {
        const authToken = res.headers.get('x-access-token') ?? '';
        this.usuarioService.salvaToken(authToken);
      })
    );
  }
}
