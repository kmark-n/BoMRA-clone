import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept':       'application/json'
  });

  constructor(private http: HttpClient) {}

  // Register
  register(data: RegisterRequest): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      data,
      { headers: this.headers }
    );
  }

  // Login
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      data,
      { headers: this.headers }
    );
  }

  // Logout
  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  // Save token
  saveToken(token: string): void {
    localStorage.setItem('bomra_token', token);
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('bomra_token');
  }

  // Remove token
  removeToken(): void {
    localStorage.removeItem('bomra_token');
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Auth headers with token
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept':        'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
  }
}