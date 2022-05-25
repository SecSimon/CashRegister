import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService, IProduct } from '../data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Output() public showSideNav = new EventEmitter();

  public selectedProduct: IProduct | null = null;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.dataService.Products, event.previousIndex, event.currentIndex);
  }
}
