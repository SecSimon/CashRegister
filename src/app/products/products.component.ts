import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService, ICategory, IDiscount, IProduct } from '../data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Output() public showSideNav = new EventEmitter();

  public selectedItem: ICategory | IProduct | IDiscount | null = null;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.dataService.Save();
  }

  public SetDiscount(val: any) {
    if (val > 100) val = 100;
    else if (val < 0) val = 0;
    (this.selectedItem as IDiscount).Percent = val;
  }

  public drop(event: CdkDragDrop<string[]>, selectedArray: any) {
    moveItemInArray(selectedArray, event.previousIndex, event.currentIndex);
  }

  public AddCategory() {
    const item = this.dataService.AddCategory();
    this.selectedItem = item;
  }

  public DeleteCategory(cat: ICategory) {
    this.dataService.DeleteCategory(cat);
    if (this.selectedItem == cat) this.selectedItem = null;
  }

  public AddProduct() {
    const item = this.dataService.AddProduct();
    this.selectedItem = item;
  }

  public DeleteProduct(prod: IProduct) {
    this.dataService.DeleteProduct(prod);
    if (this.selectedItem == prod) this.selectedItem = null;
  }

  public AddDiscount() {
    const item = this.dataService.AddDiscount();
    this.selectedItem = item;
  }

  public DeleteDiscount(dis: IDiscount) {
    this.dataService.DeleteDiscount(dis);
    if (this.selectedItem == dis) this.selectedItem = null;
  }

  public GetPossibleTriggers(prod: IProduct) {
    return this.dataService.Products.filter(x => x.Name != prod.Name);
  }
}
