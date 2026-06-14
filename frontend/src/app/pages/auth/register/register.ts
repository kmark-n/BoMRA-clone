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
import { RegisterRequest } from '../../../models/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxTextBoxModule,
    DxButtonModule,
    DxToastModule,
    DxLoadIndicatorModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  isLoading    = false;
  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  formData: RegisterRequest = {
    email:                 '',
    password:              '',
    password_confirmation: ''
  };

  constructor(
    private authService: AuthService,
    private router:      Router,
    private cdr:         ChangeDetectorRef
  ) {}

  onRegister(): void {
    if (!this.formData.email ||
        !this.formData.password ||
        !this.formData.password_confirmation) {
      this.showToast('Please fill in all fields.', 'error');
      return;
    }

    if (this.formData.password !== this.formData.password_confirmation) {
      this.showToast('Passwords do not match.', 'error');
      return;
    }

    if (this.formData.password.length < 8) {
      this.showToast('Password must be at least 8 characters.', 'error');
      return;
    }

    this.isLoading = true;

    this.authService.register(this.formData).subscribe({
      next: () => {
        setTimeout(() => {
          this.isLoading = false;
          this.showToast(
            'Account created successfully! Please login.',
            'success'
          );
          this.cdr.detectChanges();
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        setTimeout(() => {
          this.isLoading = false;

          if (err.status === 422) {
            const errors = err.error.errors;
            const firstError = Object.values(errors)[0] as string[];
            this.showToast(firstError[0], 'error');
          } else {
            const msg = err.error?.message || 'Registration failed. Please try again.';
            this.showToast(msg, 'error');
          }
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