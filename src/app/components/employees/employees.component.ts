import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../shared/base-component/base-component.component';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
})
export class EmployeesComponent extends BaseComponent implements OnInit {

  selectedIndex = 0;
  currentUrl = '';

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.currentUrl = this.router.url;
    this.updateSelectedIndex();
  }

  onTabChanged(event: MatTabChangeEvent) {
    const tabName = event.tab.textLabel;
    this.router.navigate([`/office/${tabName}`]);

  }

  private updateSelectedIndex() {
    const subRoute = this.currentUrl.split('/').pop();

    switch (subRoute) {
      case 'all':
        this.selectedIndex = 0;
        break;
      case 'Riga':
        this.selectedIndex = 1;
        break;
      case 'Tallinn':
        this.selectedIndex = 2;
        break;
      case 'Vilnius':
        this.selectedIndex = 3;
        break;
      default:
        this.selectedIndex = 0;

        this.cd.detectChanges();
    }
  }

  goAddEmployee(path: string) {
    this.router.navigate([`${path}`])
  }

}
