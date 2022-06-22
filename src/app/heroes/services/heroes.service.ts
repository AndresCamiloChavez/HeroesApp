import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.base_url;

  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(this.baseUrl+'/heroes');
  }
  getHeroeById(id: string): Observable<Heroe>{
    return this.http.get<Heroe>(this.baseUrl+'/heroes/'+id);
  }
  getSugerencias(termino: string){ 
    return this.http.get(`${this.baseUrl}/heroes?q=${termino}&_limit=6`).pipe(catchError(error => of([])));
  }
  agregarHeroe(heroe: Heroe): Observable<Heroe>{
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`,heroe);
  }
  actualizarHeroe(heroe: Heroe): Observable<Heroe>{
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`,heroe);
  }
}
