import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-joke-details-modal',
  templateUrl: './joke-details-modal.component.html',
  styleUrls: ['./joke-details-modal.component.css']
})
export class JokeDetailsModalComponent{

  constructor(
    public dialogRef: MatDialogRef<JokeDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

}



