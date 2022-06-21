import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

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
  getSugerencias(termino: string): Observable<Heroe[]>{ 
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`);
  }
}
