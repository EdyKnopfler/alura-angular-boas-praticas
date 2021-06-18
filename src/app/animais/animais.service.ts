import { environment } from './../../environments/environment';
import { TokenService } from './../autenticacao/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Animais, Animal } from './animais';
import { catchError, mapTo } from 'rxjs/operators';

const API = environment.apiURL;
const NOT_MODIFIED = 304;

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  listaDoUsuario(nomeUsuario: string): Observable<Animais> {
    return this.http.get<Animais>(`${API}/${nomeUsuario}/photos`);
  }

  buscaPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  // TADIIIIIIIIIIIIIIIIIM
  excluiAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  curtir(id: number): Observable<boolean> {
    return this.http.post(`${API}/photos/${id}/like`, {}, { observe: 'response' }).pipe(
      mapTo(true),  // se 200 OK
      catchError((err) => err.status === NOT_MODIFIED ? of(false) : throwError(err))
    );
  }

  upload(descricao: string, permiteComentarios: boolean, arquivo: File) {
    // FormData: objeto do JavaScript :)
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentarios ? 'true' : 'false');
    formData.append('imageFile', arquivo);

    // monitorando a requisição
    return this.http.post(`${API}/photos/upload`, formData, { observe: 'events', reportProgress: true });
  }

}
