import { Component } from '@angular/core';
import { DataService } from './data.service';

export enum Pages {
  Sale = 1,
  Receipts = 2,
  Products = 3
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kasse';

  public Page = Pages.Sale;

  constructor(public dataService: DataService) {}

  ngOnDestroy() {
    this.dataService.Save();
  }

  public GetPages() {
    return [Pages.Sale, Pages.Receipts, Pages.Products];
  }

  public GetPageName(page: Pages) {
    if (page == Pages.Sale) return 'Verkauf';
    if (page == Pages.Receipts) return 'Belege';
    if (page == Pages.Products) return 'Produkte';
    return '';
  }
}
