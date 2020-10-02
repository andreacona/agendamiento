import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  templateUrl: './modal-pop-up.component.html',
  styleUrls: ['./modal-pop-up.component.scss'],
})
export class ModalPopUpComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onClickNo(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
