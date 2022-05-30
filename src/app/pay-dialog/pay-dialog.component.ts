import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IPayDialogData {
  Total: number;
  Cash: number;
  Change: number;
}

@Component({
  selector: 'app-pay-dialog',
  templateUrl: './pay-dialog.component.html',
  styleUrls: ['./pay-dialog.component.scss']
})
export class PayDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PayDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IPayDialogData) { }

  ngOnInit(): void {
  }

  public CalcChange(): number {
    this.data.Change = this.data.Cash - this.data.Total;
    return this.data.Change;
  }

  public Close() {
    if (this.data.Cash == 0) this.data.Cash = this.data.Total;
  }
}
