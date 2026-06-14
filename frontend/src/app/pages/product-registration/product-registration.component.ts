import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDataGridModule,
  DxButtonModule,
  DxFormModule,
  DxPopupModule,
  DxToastModule,
  DxLoadIndicatorModule,
  DxDataGridComponent,
  DxTextBoxModule,
} from 'devextreme-angular';
import { ApplicationService } from '../../services/application';
import { ProductApplication } from '../../models/application';

@Component({
  selector: 'app-product-registration',
  standalone: true,
  imports: [
    CommonModule,
    DxDataGridModule,
    DxButtonModule,
    DxFormModule,
    DxPopupModule,
    DxToastModule,
    DxLoadIndicatorModule,
    DxTextBoxModule,
  ],
  templateUrl: './product-registration.component.html',
  styleUrls: ['./product-registration.component.scss'],
})
export class ProductRegistrationComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid!: DxDataGridComponent;

  applications: ProductApplication[] = [];
  isLoading = false;

  // ── INITIATE POPUP ──────────────────────────────
  initiateVisible = false;
  initiateForm: ProductApplication = {
    brand_name: '',
    atc_code: '',
    manufacturing_site: '',
  };
  isSaving = false;

  // ── EDIT POPUP ──────────────────────────────────
  editVisible = false;
  editForm: ProductApplication = {
    brand_name: '',
    atc_code: '',
    manufacturing_site: '',
  };

  // ── TOAST ───────────────────────────────────────
  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private appService: ApplicationService) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.isLoading = true;
    this.appService.getAll().subscribe({
      next: (data) => {
        this.applications = data;
        this.isLoading = false;
      },
      error: () => {
        this.showToast('Failed to load applications.', 'error');
        this.isLoading = false;
      },
    });
  }

  // ── INITIATE ────────────────────────────────────
  openInitiateForm() {
    this.initiateForm = { brand_name: '', atc_code: '', manufacturing_site: '' };
    this.initiateVisible = true;
  }

  saveApplication() {
    if (!this.initiateForm.brand_name || !this.initiateForm.atc_code || !this.initiateForm.manufacturing_site) {
      this.showToast('Please fill in all fields.', 'error');
      return;
    }
    this.isSaving = true;
    this.appService.create(this.initiateForm).subscribe({
      next: (saved) => {
        this.applications = [...this.applications, saved];
        this.initiateVisible = false;
        this.isSaving = false;
        this.showToast('Application saved successfully!', 'success');
      },
      error: () => {
        this.isSaving = false;
        this.showToast('Failed to save application.', 'error');
      },
    });
  }

  // ── EDIT ────────────────────────────────────────
  openEditForm(app: ProductApplication) {
    this.editForm = { ...app };
    this.editVisible = true;
  }

  updateApplication() {
    if (!this.editForm.brand_name || !this.editForm.atc_code || !this.editForm.manufacturing_site) {
      this.showToast('Please fill in all fields.', 'error');
      return;
    }
    this.isSaving = true;
    this.appService.update(this.editForm.id!, this.editForm).subscribe({
      next: (updated) => {
        this.applications = this.applications.map(a =>
          a.id === updated.id ? updated : a
        );
        this.editVisible = false;
        this.isSaving = false;
        this.showToast('Application updated successfully!', 'success');
      },
      error: () => {
        this.isSaving = false;
        this.showToast('Failed to update application.', 'error');
      },
    });
  }

  // ── DELETE ──────────────────────────────────────
  deleteApplication(app: ProductApplication) {
    if (!confirm(`Delete "${app.brand_name}"? This cannot be undone.`)) return;
    this.appService.delete(app.id!).subscribe({
      next: () => {
        this.applications = this.applications.filter(a => a.id !== app.id);
        this.showToast('Application deleted.', 'success');
      },
      error: () => {
        this.showToast('Failed to delete application.', 'error');
      },
    });
  }

  // ── TOAST ───────────────────────────────────────
  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
  }
}