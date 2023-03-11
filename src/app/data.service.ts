import { Injectable } from '@angular/core';
import { LocalStorageService, LocStorageKeys } from './local-storage.service';

import { saveAs } from 'file-saver';
import { v4 as uuidv4 } from 'uuid';

export interface ICategory {
  ID: string;
  Name: string;
}

export interface IProduct {
  Name: string;
  Price: number;
  CategoryIDs: string[];
}

export interface IDiscount {
  Name: string;
  Percent: number;
}

export interface IBasketItem {
  Quantity: number;
  Product?: IProduct;
  Discount?: IDiscount;
  Total: number;
}

export interface IOrder {
  Items: IBasketItem[];
  Total: number;
  Date: number;
}

export interface ISettingsFile {
  Categories: ICategory[];
  Products: IProduct[];
  Discounts: IDiscount[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public Categories: ICategory[] = [];
  public Products: IProduct[] = [];
  public Discounts: IDiscount[] = [];
  public Orders: IOrder[] = [];

  constructor(private locStorage: LocalStorageService) {
    const catStr = this.locStorage.Get(LocStorageKeys.Categories);
    if (catStr) this.Categories = JSON.parse(catStr);
    const prodStr = this.locStorage.Get(LocStorageKeys.Products);
    if (prodStr) this.Products = JSON.parse(prodStr);
    const disStr = this.locStorage.Get(LocStorageKeys.Discounts);
    if (disStr) this.Discounts = JSON.parse(disStr);
    const ordersStr = this.locStorage.Get(LocStorageKeys.Orders);
    if (ordersStr) this.Orders = JSON.parse(ordersStr);

    if (this.Categories.length == 0) {
      this.AddCategory();
      this.Products.forEach(x => {
        if (!x.CategoryIDs) x.CategoryIDs = [];
      })
    }

    if (!this.Categories[0].ID) this.Categories[0].ID = uuidv4();
  }

  public Save() {
    this.locStorage.Set(LocStorageKeys.Categories, JSON.stringify(this.Categories));
    this.locStorage.Set(LocStorageKeys.Products, JSON.stringify(this.Products));
    this.locStorage.Set(LocStorageKeys.Discounts, JSON.stringify(this.Discounts));
    this.locStorage.Set(LocStorageKeys.Orders, JSON.stringify(this.Orders));
  }

  public DownloadOrders() {
    const blob = new Blob([JSON.stringify(this.Orders, null, 2)], {type: 'text/plain;charset=utf-8'});
      let now = new Date();
      let date = [now.getFullYear(), now.getMonth()+1, now.getDate()];
      let time = [now.getHours(), now.getMinutes(), now.getSeconds()];
      let leading0 = (num: number, length: number = 2): string => {
        let val = num.toString();
        while(val.length < length) val = '0' + val;
        return val;
      };
      let name = ['Orders', ...['_', ...date.map(x => leading0(x)), '_', ...time.map(x => leading0(x)), '.'], 'json'];
      saveAs(blob, name.join(''));
  }

  public Export() {
    let data: ISettingsFile = {
      Categories: this.Categories,
      Products: this.Products, 
      Discounts: this.Discounts
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'text/plain;charset=utf-8'});
      let now = new Date();
      let date = [now.getFullYear(), now.getMonth()+1, now.getDate()];
      let time = [now.getHours(), now.getMinutes(), now.getSeconds()];
      let leading0 = (num: number, length: number = 2): string => {
        let val = num.toString();
        while(val.length < length) val = '0' + val;
        return val;
      };
      let name = ['Settings', ...['_', ...date.map(x => leading0(x)), '_', ...time.map(x => leading0(x)), '.'], 'json'];
      saveAs(blob, name.join(''));
  }

  public Import(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileRes = reader.result;
        const file = JSON.parse(fileRes.toString());
        if (file.Categories) this.Categories = file.Categories;
        if (file.Products) this.Products = file.Products;
        if (file.Discounts) this.Discounts = file.Discounts;

        this.Save();
        location.reload();
      };

      reader.readAsText(fileInput.target.files[0]);
    }
  }

  public AddOrder(items: IBasketItem[], total: number) {
    this.Orders.push({ Date: Date.now(), Items: items, Total: total });
    this.Save();
    return this.Orders[this.Orders.length-1];
  }

  public DeleteOrder(order: IOrder) {
    const index = this.Orders.indexOf(order);
    if (index >= 0) {
      this.Orders.splice(index, 1);
      this.Save();
    }
  }

  public AddCategory() {
    this.Categories.push({ ID: uuidv4(), Name: 'Kategorie' });
    this.Save();
    return this.Categories[this.Categories.length-1];
  }

  public DeleteCategory(cat: ICategory) {
    const index = this.Categories.indexOf(cat);
    if (index >= 0) {
      this.Categories.splice(index, 1);
      this.Save();
    }
  }

  public AddProduct() {
    this.Products.push({ Name: '', Price: 0 , CategoryIDs: []});
    this.Save();
    return this.Products[this.Products.length-1];
  }

  public DeleteProduct(product: IProduct) {
    const index = this.Products.indexOf(product);
    if (index >= 0) {
      this.Products.splice(index, 1);
      this.Save();
    }
  }

  public AddDiscount() {
    this.Discounts.push({ Name: '', Percent: 0 });
    this.Save();
    return this.Discounts[this.Discounts.length-1];
  }

  public DeleteDiscount(dis: IDiscount) {
    const index = this.Discounts.indexOf(dis);
    if (index >= 0) {
      this.Discounts.splice(index, 1);
      this.Save();
    }
  }

  public IsProduct(object: any): object is IProduct {
    return ('Name' in object && 'Price' in object);
  }

  public IsDiscount(object: any): object is IDiscount {
    return ('Name' in object && 'Percent' in object);
  }
}
