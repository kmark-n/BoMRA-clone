import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  DxFormModule,
  DxButtonModule,
  DxLoadIndicatorModule,
  DxToastModule,
  DxFormComponent
} from 'devextreme-angular';
import { StakeholderService } from '../../services/stakeholder';
import { Stakeholder } from '../../models/stakeholder';

@Component({
  selector: 'app-stakeholder-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxButtonModule,
    DxLoadIndicatorModule,
    DxToastModule
  ],
  templateUrl: './stakeholders-form.html',
  styleUrl: './stakeholders-form.scss'
})
export class StakeholderFormComponent {
  @ViewChild('stakeholderForm') formRef!: DxFormComponent;

  isLoading    = false;
  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  formData: Stakeholder = {
    company_name:        '',
    registration_number: '',
    contact_person:      '',
    email:               '',
    phone:               '',
    physical_address:    '',
    product_category:    '',
    stakeholder_type:    '',
    notes:               ''
  };

  stakeholderTypes: string[] = [
    'Exporter',
    'Importer',
    'Manufacturer',
    'Distributor',
    'Retailer'
  ];

  productCategories: string[] = [
    'Human Medicine',
    'Animal Medicine',
    'Cosmetics',
    'Medical Device'
  ];

  constructor(
    private stakeholderService: StakeholderService,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(): void {
    // ✅ Validate form before submitting
    if (!this.formRef || !this.formRef.instance.validate().isValid) {
      this.showToast('Please correct all validation errors before submitting.', 'error');
      return;
    }

    this.isLoading = true;

    this.stakeholderService.register(this.formData).subscribe({
      next: (res) => {
        console.log('Response:', res);
        this.isLoading = false;
        this.cdr.detectChanges();
        this.showToast(
          'Application submitted successfully!',
          'success'
        );
        this.resetForm();
      },
      error: (err) => {
        console.error('Full error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();

        // ✅ Handle Laravel 422 validation errors
        if (err.status === 422) {
          const errors = err.error.errors;
          const firstError = Object.values(errors)[0] as string[];
          this.showToast(firstError[0], 'error');
        } else {
          const msg = err.error?.message || 'Submission failed. Please try again.';
          this.showToast(msg, 'error');
        }
      },
      complete: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  resetForm(): void {
    this.formData = {
      company_name:        '',
      registration_number: '',
      contact_person:      '',
      email:               '',
      phone:               '',
      physical_address:    '',
      product_category:    '',
      stakeholder_type:    '',
      notes:               ''
    };
    if (this.formRef) {
      this.formRef.instance.reset();
    }
  }

  showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType    = type;
    this.toastVisible = true;
  }
}