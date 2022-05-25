import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IPayDialogData {
  Total: number;
}

@Component({
  selector: 'app-pay-dialog',
  templateUrl: './pay-dialog.component.html',
  styleUrls: ['./pay-dialog.component.scss']
})
export class PayDialogComponent implements OnInit {

  public Cash: number = 0;

  constructor(public dialogRef: MatDialogRef<PayDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IPayDialogData) { }

  ngOnInit(): void {

  }
}
