import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService, IOrder } from '../data.service';

export interface IDaySummary {
  Date: number;
  Orders: IOrder[];
  Total: number;
}

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit {
  
  @Output() public showSideNav = new EventEmitter();

  public OrderSummary: IDaySummary[] = [];
  public Total: number = 0;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.initializeSummary();
  }

  ngOnDestroy() {
    this.dataService.Save();
  }

  public DeleteOrder(order: IOrder) {
    this.dataService.DeleteOrder(order);
    this.initializeSummary();
  }

  private initializeSummary() {
    this.OrderSummary = [];
    this.Total = 0;
    const orders = this.dataService.Orders;
    if (orders.length > 0) {
      let addSummary = (date: number, orders: IOrder[]) => {
        let sum = 0; 
        orders.forEach(x => sum += x.Total);
        orders.reverse();
        this.OrderSummary.push({ Date: date, Orders: orders, Total: sum });
      };

      let currentDay = new Date(orders[0].Date).toDateString();
      let currentOrders: IOrder[] = [orders[0]];
      for (let i = 1; i < orders.length; i++) {
        if (new Date(orders[i].Date).toDateString() == currentDay) {
          currentOrders.push(orders[i]);
        }
        else {
          addSummary(currentOrders[0].Date, currentOrders);
          currentDay = new Date(orders[i].Date).toDateString();
          currentOrders = [orders[i]];
        }
      }
      
      addSummary(currentOrders[0].Date, currentOrders);

      this.OrderSummary.forEach(x => this.Total += x.Total);
      this.OrderSummary.reverse();
    }
  }
}
