import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

export type NavItem = Readonly<{
  name: string;
  url: string;
}>;

@Component({
  selector: 'bsc-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainerComponent {
  navItems: Array<NavItem> = [
    {
      name: 'TUBS.INTRODUCTION',
      url: '/introduction',
    },
    {
      name: 'TUBS.NOTES',
      url: '/notes',
    },
    {
      name: 'TUBS.USERS',
      url: '/users',
    },
  ];

  private activeUrl = '';

  constructor(private router: Router) {}

  navigate(url: string): void {
    if (this.activeUrl !== url) {
      this.activeUrl = url;
      this.router.navigateByUrl(url);
    }
  }

  isActive(navItem: NavItem): boolean {
    return this.activeUrl.length > 0
      ? this.activeUrl === navItem.url
      : this.router.url.split('?')[0] === navItem.url;
  }
}
