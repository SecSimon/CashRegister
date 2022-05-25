import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface IBasketItem {
  Quanity: number;
  Name: string;
  Total: number;
}

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {

  public Basket: IBasketItem[] = [
    {
      Quanity: 1,
      Name: 'Käse 100g',
      Total: 2.90
    },
    {
      Quanity: 3,
      Name: 'Bratwurstsemmel',
      Total: 5
    },
    {
      Quanity: 1,
      Name: 'Steak',
      Total: 4.5
    }
  ];

  @Output() public showSideNav = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public DeleteItem(item: IBasketItem) {
    const index = this.Basket.indexOf(item);
    if (index >= 0) {
      this.Basket.splice(index, 1);
    }
  }

  public GetBasketTotal() {
    let sum = 0;
    this.Basket.forEach(x => sum += x.Total);
    return sum;
  }
}
