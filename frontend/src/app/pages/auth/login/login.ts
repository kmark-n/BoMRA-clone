import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  DxTextBoxModule,
  DxButtonModule,
  DxToastModule,
  DxLoadIndicatorModule
} from 'devextreme-angular';
import { AuthService } from '../../../services/auth';
import { LoginRequest } from '../../../models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTextBoxModule,
    DxButtonModule,
    DxToastModule,
    DxLoadIndicatorModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  isLoading    = false;
  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  formData: LoginRequest = {
    email:    '',
    password: ''
  };

  constructor(
    private authService:  AuthService,
    private router:       Router,
    private cdr:          ChangeDetectorRef
  ) {}

  onLogin(): void {
  if (!this.formData.email || !this.formData.password) {
    this.showToast('Please fill in all fields.', 'error');
    return;
  }

  // ✅ Wrap in setTimeout
  setTimeout(() => {
    this.isLoading = true;
    this.cdr.detectChanges();
  });

  this.authService.login(this.formData).subscribe({
    next: (res) => {
      setTimeout(() => {
        this.isLoading = false;
        this.authService.saveToken(res.token);
        this.showToast('Login successful! Redirecting...', 'success');
        this.cdr.detectChanges();
      });
      setTimeout(() => this.router.navigate(['/dashboard']), 2000);
    },
    error: (err) => {
      setTimeout(() => {
        this.isLoading = false;
        const msg = err.error?.message || 'Invalid email or password.';
        this.showToast(msg, 'error');
        this.cdr.detectChanges();
      });
    }
  });
}

  showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType    = type;
    this.toastVisible = true;
  }
}
