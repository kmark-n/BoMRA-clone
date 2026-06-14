import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { StakeholderFormComponent } from './pages/stakeholders-form/stakeholders-form';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import { ProductRegistrationComponent } from './pages/product-registration/product-registration.component';
import { authGuard } from './guards/auth';
import { AuthGuardService } from './shared/services';

export const routes: Routes = [
  // ── PUBLIC ROUTES ────────────────────────────────────────
  { path: '',                 component: HomeComponent },
  { path: 'home',             component: HomeComponent },
  { path: 'login',            component: LoginComponent },
  { path: 'register',         component: RegisterComponent },

  // ── PROTECTED ROUTES ─────────────────────────────────────
  {
    path: 'stakeholder-form',
    component: StakeholderFormComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'product-registration',
        component: ProductRegistrationComponent,
      }
    ]
  },

  // ── DASHBOARD WITH CHILDREN ───────────────────────────────
  { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'product-registration',
        component: ProductRegistrationComponent
      }
    ]
  }
];