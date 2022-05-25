import { Injectable } from '@angular/core';

export enum LocStorageKeys {
  Orders = 'orders',
  Categories = 'categories',
  Products = 'products',
  Discounts = 'discounts',
  SelectedCategoryID = 'selectedCategoryID'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public Set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public Get(key: string) {
    return localStorage.getItem(key);
  }

  public Remove(key: string) {
    localStorage.removeItem(key);
  }

  public Clear() {
    localStorage.clear();
  }
}
