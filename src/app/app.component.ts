import { Component } from '@angular/core';

export enum Pages {
  Sale = 1,
  Products = 2
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Cash Register';

  public Page = Pages.Sale;

  public GetPages() {
    return [Pages.Sale, Pages.Products];
  }

  public GetPageName(page: Pages) {
    if (page == Pages.Sale) return 'Sale';
    if (page == Pages.Products) return 'Products';
    return '';
  }

  public Debug(event: any) {
    console.log(event);
  }
}
