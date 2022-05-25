import { Injectable } from '@angular/core';

export interface IProduct {
  Name: string;
  Price: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public Products: IProduct[] = [
    {
      Name: 'Bratwurstsemmel',
      Price: 2.9
    },
    {
      Name: 'Käse 100g',
      Price: 2
    }
  ];

  constructor() { }
}
