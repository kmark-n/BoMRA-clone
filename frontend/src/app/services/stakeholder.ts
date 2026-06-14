import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stakeholder } from '../models/stakeholder';

@Injectable({
  providedIn: 'root'
})
export class StakeholderService {

  private apiUrl = 'http://localhost:8000/api';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept':       'application/json'
  });

  constructor(private http: HttpClient) {}

  register(data: Stakeholder): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/stakeholders`,
      data,
      { headers: this.headers }
    );
  }

  getAll(): Observable<Stakeholder[]> {
    return this.http.get<Stakeholder[]>(
      `${this.apiUrl}/stakeholders`,
      { headers: this.headers }
    );
  }

  approve(id: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/stakeholders/${id}/approve`,
      {},
      { headers: this.headers }
    );
  }

  decline(id: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/stakeholders/${id}/decline`,
      {},
      { headers: this.headers }
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/stakeholders/${id}`,
      { headers: this.headers }
    );
  }

  verifyCode(code: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/stakeholders/verify-code`,
      { access_code: code },
      { headers: this.headers }
    );
  }
}