import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth: Auth| undefined;
  get auth(){
    return {...this._auth};
  }
  private base_url = environment.base_url;
  constructor(private http: HttpClient) { }

    login(){
    return this.http.get<Auth>(`${this.base_url}/usuarios/1`).pipe(
      tap(resp => this._auth = resp )
    );
  }

  logout(){
    this._auth = undefined;
  }
}
