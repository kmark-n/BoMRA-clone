import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DxGalleryModule,
  DxButtonModule
} from 'devextreme-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DxGalleryModule,
    DxButtonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

  // ── DROPDOWN ──────────────────────────────
  openDropdown: string | null = null;

  toggleDropdown(name: string) {
    this.openDropdown = this.openDropdown === name ? null : name;
  }

  closeDropdown() {
    this.openDropdown = null;
  }

  digitalServices = {
    registration: [
      { label: 'Stake Holder Form', route: '/stakeholder-form' },
    ],
    repositories: [
      { label: 'Registered Facilities', route: '/facilities' },
    ],
  };

  // ── SLIDER ────────────────────────────────
  slides = [
    { imageSrc: 'assets/images/slider1_bomra.png', alt: 'Slide 1' },
    { imageSrc: 'assets/images/slider1_bomra.png', alt: 'Slide 2' },
    { imageSrc: 'assets/images/slider1_bomra.png', alt: 'Slide 3' }
  ];

  // ── STAKEHOLDERS ──────────────────────────
  stakeholders = [
    { name: 'World Health Organization', logo: 'assets/images/WHO.png' },
    { name: 'Ministry of Health', logo: 'assets/images/HealthMinistry.jpg' },
    { name: 'Ministry of Agriculture', logo: 'assets/images/MADFS_BOTSWANA.png' }
  ];

  // ── QUICK LINKS ───────────────────────────
  quickLinks = [
    { label: 'Guidelines', route: '/guidelines' },
    { label: 'Surveys', route: '/surveys' },
    { label: 'Service Standards', route: '/service-standards' }
  ];
}