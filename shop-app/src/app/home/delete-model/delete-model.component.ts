import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-model',
  templateUrl: './delete-model.component.html',
  styleUrls: ['./delete-model.component.css']
})
export class DeleteModelComponent implements OnInit {
 modelData= null;
  constructor() { }

  ngOnInit(): void {
    this.modelData= 'exampleModal';
  }

}
