import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  DxDrawerModule,
  DxScrollViewModule,
  DxTreeViewModule,
  DxButtonModule,
} from 'devextreme-angular';
import { NavigationService, NavItem } from '../../services/navigation';

export interface StatusCard {
  label: string;
  count: number;
  colorClass: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DxDrawerModule,
    DxScrollViewModule,
    DxTreeViewModule,
    DxButtonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  drawerOpen = true;
  navItems: NavItem[] = [];
  private routerSub!: Subscription;
  statusCards: StatusCard[] = [
    { label: 'DRAFTS',    count: 0, colorClass: 'card--drafts' },
    { label: 'ON GOING',  count: 0, colorClass: 'card--ongoing' },
    { label: 'QUERIED',   count: 0, colorClass: 'card--queried' },
    { label: 'APPROVED',  count: 0, colorClass: 'card--approved' },
    { label: 'REJECTED',  count: 0, colorClass: 'card--rejected' }
  ];

  constructor(
    private navigationService: NavigationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.navItems = this.navigationService.getNavItems();

    this.navigationService.setSelectedByPath(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.navigationService.setSelectedByPath(event.urlAfterRedirects);
        this.navItems = this.navigationService.getNavItems();
      });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  onNavItemClick(e: any) {
    const item: NavItem = e.itemData;
    if (item.path) {
      this.router.navigate([item.path]);
    }
  }

  onCardClick(card: StatusCard) {
    console.log('Selected status:', card.label);
  }

  get isDashboardRoute(): boolean {
    return this.router.url === '/dashboard' || this.router.url === '/#/dashboard';
  }
}