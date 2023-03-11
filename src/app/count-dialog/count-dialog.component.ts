import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ICountDialogData {
  Name: string;
  Quantity: number;
}

@Component({
  selector: 'app-count-dialog',
  templateUrl: './count-dialog.component.html',
  styleUrls: ['./count-dialog.component.scss']
})
export class CountDialogComponent implements OnInit {
  private readonly startQuantity: number = 0;

  constructor(public dialogRef: MatDialogRef<CountDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ICountDialogData) { 
    if (data) this.startQuantity = data.Quantity;
  }

  ngOnInit(): void {
  }

  public Cancel() {
    this.data.Quantity = this.startQuantity;
  }
}
