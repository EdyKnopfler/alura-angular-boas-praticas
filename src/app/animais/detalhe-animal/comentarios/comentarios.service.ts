import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comentarios, Comentario } from './comentarios';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) { }

  buscarComentarios(idAnimal: number): Observable<Comentarios> {
    return this.http.get<Comentarios>(`${API}/photos/${idAnimal}/comments`);
  }

  incluirComentario(idAnimal: number, commentText: string): Observable<Comentario> {
    return this.http.post<Comentario>(`${API}/photos/${idAnimal}/comments`, { commentText });
  }

}
