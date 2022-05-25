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

  public Log(event: any) {
    console.log(event);
  }
}
