import { Component, OnInit } from '@angular/core';
import { MdDialogRef} from '@angular/material';
@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.css']
})
export class FreeComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<FreeComponent>) { }

  ngOnInit() {
  }

}
