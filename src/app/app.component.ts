import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataService } from './data.service';
import { LocalStorageService, LocStorageKeys } from './local-storage.service';

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
export class AppComponent implements AfterViewInit {
  title = 'Kasse';

  public Page = Pages.Sale;

  constructor(public dataService: DataService, private locStorage: LocalStorageService, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route.queryParams.subscribe(params => {
          if (params['defaultconfig']) {
            setTimeout(() => {
              const catStr = this.locStorage.Get(LocStorageKeys.Categories);
              if (catStr == null || JSON.parse(catStr).length < 2) this.dataService.DefaultConfig();
            }, 1000);
          }
          if (params['category']) {
            setTimeout(() => {
              const catStr = this.locStorage.Get(LocStorageKeys.Categories);
              if (catStr) {
                const cats = JSON.parse(catStr) as [];
                const cat = cats.find(x => x['Name'] == params['category']);
                if (cat) {
                  this.locStorage.Set(LocStorageKeys.SelectedCategoryID, cat['ID'] as string);
                }
              }
              console.log('cat', catStr);
            }, 1500);
          }
        });
      }
    });
  }

  ngAfterViewInit(): void {
    document.body.classList.add('darkMode');
  }

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
