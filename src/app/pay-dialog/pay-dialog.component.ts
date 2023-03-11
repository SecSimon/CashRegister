import { Component, ElementRef, Inject, OnInit } from '@angular/core';
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

  constructor(public dialogRef: MatDialogRef<PayDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IPayDialogData, private el: ElementRef) { }

  public colCount = 3;
  public ranges = [
    [5,10,15,20],
    [25,30,35,40],
    [45,50]
  ];

  ngOnInit(): void {
    const dialogWid = this.el.nativeElement.offsetWidth - 20;
    if (dialogWid > 0) {
      this.colCount = Math.floor(dialogWid/64) < 3 ? 3 : Math.floor(dialogWid/64);
      const vals = this.ranges.reduce((acc, val) => acc.concat(val), []);
      this.ranges = [];
      for (let i = 0; i <  vals.length; i+=this.colCount) {
        this.ranges.push(vals.slice(i, i+this.colCount));
      }
    } 
  }

  public CalcChange(): number {
    this.data.Change = this.data.Cash - this.data.Total;
    return this.data.Change;
  }

  public Close() {
    if (this.data.Cash == 0) this.data.Cash = this.data.Total;
  }
}
