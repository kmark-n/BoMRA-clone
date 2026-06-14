import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductApplication } from '../models/application';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAll(): Observable<ProductApplication[]> {
    return this.http.get<ProductApplication[]>(
      `${this.baseUrl}/applications`,
      { headers: this.authHeaders() }
    );
  }

  create(data: ProductApplication): Observable<ProductApplication> {
    return this.http.post<ProductApplication>(
      `${this.baseUrl}/applications`,
      data,
      { headers: this.authHeaders() }
    );
  }

  update(id: number, data: ProductApplication): Observable<ProductApplication> {
    return this.http.put<ProductApplication>(
      `${this.baseUrl}/applications/${id}`,
      data,
      { headers: this.authHeaders() }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/applications/${id}`,
      { headers: this.authHeaders() }
    );
  }
}