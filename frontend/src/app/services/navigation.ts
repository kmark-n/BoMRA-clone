import { Injectable } from '@angular/core';

export interface NavItem {
  id: string;
  text: string;
  path?: string;
  icon?: string;
  expanded?: boolean;
  selected?: boolean;
  items?: NavItem[];
}

@Injectable({ providedIn: 'root' })
export class NavigationService {

  private items: NavItem[] = [
    {
      id: 'dashboard',
      text: 'Dashboard',
      path: '/dashboard',
      icon: 'home',
      selected: false
    },
    {
      id: 'product-registration-apps',
      text: 'Product Registration Applications',
      icon: 'folder',
      expanded: true,
      selected: false,
      items: [
        {
          id: 'product-registration',
          text: 'Product Registration Processes',
          path: '/dashboard/product-registration',
          icon: 'mediumiconslayout'
        },
        {
          id: 'medical-devices',
          text: 'Medical Devices Classification Tool',
          path: '/medical-devices',
          icon: 'mediumiconslayout'
        }
      ]
    },
    {
      id: 'batch-invoice',
      text: 'Batch Invoice Management',
      icon: 'folder',
      expanded: true,
      selected: false,
      items: [
        {
          id: 'invoice-batches',
          text: 'Batch Invoices',
          path: '/invoice-batches',
          icon: 'mediumiconslayout'
        }
      ]
    },
    {
      id: 'inspections-licenses',
      text: 'Inspections & Licensing',
      icon: 'folder',
      expanded: true,
      selected: false,
      items: [
        {
          id: 'premise-cert-licenses',
          text: 'Premise Certifications & Licenses',
          path: '/premise-cert-licenses',
          icon: 'mediumiconslayout'
        }
      ]
    }
  ];

  getNavItems(): NavItem[] {
    return this.items;
  }

  setSelectedByPath(url: string) {
    const mark = (items: NavItem[]) => {
      items.forEach(item => {
        item.selected = item.path ? url.startsWith(item.path) : false;
        if (item.items) mark(item.items);
      });
    };
    mark(this.items);
  }
}