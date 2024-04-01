import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Credentials } from '../interfaces/credentials';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  addCredentials(data: Credentials): Observable<Credentials> {
    return this._http.post<Credentials>(`${this.apiServerUrl}/credentials`, data);
  }

  getCredentials(): Observable<Credentials[]> {
    return this._http.get<Credentials[]>(`${this.apiServerUrl}/credentials`)
  }

  getByUser(userName: String): Observable<Credentials[]> {
    return this._http.get<Credentials[]>(`${this.apiServerUrl}/credentials?userName=${userName}`);
  }

  updateCredentials(id: number, data: Credentials): Observable<Credentials> {
    return this._http.put<Credentials>(`${this.apiServerUrl}/credentials/${id}`, data);
  }

  deleteCredentials(id: number): Observable<any> {
    return this._http.delete(`${this.apiServerUrl}/credentials/${id}`);
  }
}
