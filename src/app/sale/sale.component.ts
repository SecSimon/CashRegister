import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplicationStateService } from '../application-state.service';
import { CountDialogComponent, ICountDialogData } from '../count-dialog/count-dialog.component';
import { DataService, IBasketItem, ICategory, IDiscount, IProduct } from '../data.service';
import { LocalStorageService, LocStorageKeys } from '../local-storage.service';
import { IPayDialogData, PayDialogComponent } from '../pay-dialog/pay-dialog.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  public Basket: IBasketItem[] = [];
  public get SelectedCategory(): ICategory {
    const catStr = this.locStorage.Get(LocStorageKeys.SelectedCategoryID);
    if (catStr) return this.dataService.Categories.find(x => x.ID == catStr);
    return null;
  }

  public set SelectedCategory(val: ICategory) {
    this.locStorage.Set(LocStorageKeys.SelectedCategoryID, val?.ID as string);
  }
  
  public get Products(): IProduct[] {
    if (!this.SelectedCategory) return [];
    return this.dataService.Products.filter(x => x.CategoryIDs.includes(this.SelectedCategory?.ID));
  }

  public LastPayment: IPayDialogData = null;

  @Output() public showSideNav = new EventEmitter();

  constructor(public dataService: DataService, public applicationState: ApplicationStateService, private locStorage: LocalStorageService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (!this.SelectedCategory && this.dataService.Categories.length > 0) this.SelectedCategory = this.dataService.Categories[0];
  }

  ngOnDestroy() {
    this.dataService.Save();
  }

  private isLongPress: boolean = false;
  private isLongPressTimer: NodeJS.Timeout = null;
  public AddItemToBasketMouseDown() {
    this.isLongPress = false;
    this.isLongPressTimer = setTimeout(() => {
      this.isLongPress = true;
    }, 500);
  }

  public AddItemToBasketMouseUp(item: IProduct | IDiscount) {
    clearTimeout(this.isLongPressTimer);

    const existing = this.Basket.find(x => x.Product == item || x.Discount == item);
    const addItem = (quantity: number) => {
      if (this.LastPayment) {
        this.LastPayment = null;
        this.Basket = [];
      }
      if (existing) {
        if (existing.Product) {
          existing.Quantity = quantity;
          existing.Total = existing.Quantity * existing.Product.Price;
        }
      }
      else {
        if (this.dataService.IsProduct(item)) this.Basket.push({ Quantity: quantity, Product: item, Total: item.Price * quantity });
        else if (this.dataService.IsDiscount(item) && this.Basket.filter(x => x.Discount).length == 0) this.Basket.push({ Quantity: 1, Discount: item, Total: 0 });
      }
    };

    if (this.isLongPress) {
      const data: ICountDialogData = { Name: item.Name, Quantity: existing ? existing.Quantity : 1 };
      this.dialog.open(CountDialogComponent, { hasBackdrop: false, data: data }).afterClosed().subscribe(res => {
        if (res) {
          addItem(data.Quantity);
        }
      });
    }
    else {
      addItem(existing ? existing.Quantity+1 : 1);
    }
  }

  public OnContextMenu(event: MouseEvent|PointerEvent, item: IProduct) {
    this.isLongPress = true;
    this.AddItemToBasketMouseUp(item);
    event.preventDefault();
  }

  public DeleteItem(item: IBasketItem) {
    const index = this.Basket.indexOf(item);
    if (index >= 0) {
      this.Basket.splice(index, 1);
    }
  }

  public ClearBasket() {
    this.Basket = [];
    this.LastPayment = null;
  }

  public GetBasketTotal() {
    let sum = 0;
    let discount = null;
    this.Basket.forEach(x => {
      if (x.Product) sum += x.Total;
      else if (x.Discount) discount = x.Discount.Percent;
    });
    
    if (discount) sum = (1-(discount/100))*sum;
    return sum;
  }

  public Pay() {
    if (this.Basket.length > 0) {
      const data: IPayDialogData = { Total: this.GetBasketTotal(), Cash: 0, Change: 0 };
      if (data.Total > 0) {
        this.dialog.open(PayDialogComponent, { hasBackdrop: false, data: data }).afterClosed().subscribe(res => {
          if (res) {
            this.dataService.AddOrder(this.Basket, data.Total);
            this.LastPayment = data;
          }
        });
      }
      else {
        this.dataService.AddOrder(this.Basket, data.Total);
        this.Basket = [];
      }
    }
  }

  public GetBasketSize() {
    return this.Basket.map(x => x.Quantity).reduce((total, x) => total + x, 0);
  }
}
