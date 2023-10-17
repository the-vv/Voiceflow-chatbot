import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-create-facility',
  templateUrl: './create-facility.component.html',
  styleUrls: ['./create-facility.component.css']
})
export class CreateFacilityComponent implements OnInit {

  facName = '';
  instName  = '';

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    if (this.data.facData) {
      this.facName = this.data.facData.facility;
      this.instName = this.data.facData.name;
    }
  }

}
