import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectEvent } from '@progress/kendo-angular-layout';

export type NavItem = Readonly< {
  name: string,
  url: string,
}>;

@Component({
  selector: 'bsc-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContainerComponent implements OnInit {

  navItems: Array<NavItem> = [
    {
      name: 'TUBS.INTRODUCTION',
      url: '/introduction'
    },
    {
      name: 'TUBS.NOTES',
      url: '/notes'
    },
    {
      name: 'TUBS.USERS',
      url: '/users'
    },
  ];

  private activeUrl = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onTabSelect(event: SelectEvent): void {
    this.navigate(this.navItems[event.index].url);
  }

  navigate(url: string): void {
    if (this.activeUrl !== url) {
      this.activeUrl = url;
      this.router.navigateByUrl(url);
    }
  }

  isActive(navItem: NavItem): boolean {
    console.log(this.router.url);
    return (this.activeUrl.length > 0) ? this.activeUrl === navItem.url : this.router.url.split('?')[0] === navItem.url;
  }

}
