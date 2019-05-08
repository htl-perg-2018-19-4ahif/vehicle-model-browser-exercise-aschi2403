import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageEvent, MatPaginator } from '@angular/material';

interface IModel{
  id: number,
  year: number,
  make: string,
  model: string,
  hastDetails: number
}

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})


export class ModelsComponent implements OnInit {
  host = 'https://vehicle-data.azurewebsites.net';
  displayedColumns = ['year', 'make', 'model'];
  dataSource: IModel[];
  yearList: string[] = [];
  makeList: string[] = [];
  offset: number = 0;
  make: string;
  year: number;

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient){
  }

  ngOnInit() {
    this.loadVehicleList();
    this.loadYearList();
    this.loadMakeList();
  }

  //?offset=${this.offset}
  async loadVehicleList(){
    this.dataSource = (await this.http.get<IModel[]>(`${this.host}//api/models?make=${this.make || ''}&year=${this.year || ''}&offset=${this.offset || ''}`).toPromise());

    //this.dataSource = (await this.http.get<IModel[]>(`${this.host}/api/models`).toPromise());
    /*for(let i of this.dataSource){
      console.log(i.make);
    }*/
  }
  
  async loadYearList(){
    this.yearList = (await this.http.get<string[]>(`${this.host}/api/years`).toPromise());
    /*for(let year of this.yearList){
      console.log(year);
    }*/
  }

  async loadMakeList(){
    this.makeList = (await this.http.get<string[]>(`${this.host}/api/makes`).toPromise());
    /*for(let year of this.yearList){
      console.log(year);
    }*/
  }

  handlePaginatorChange(){
    this.offset = (this.paginator.pageIndex - 1) * 10;
    this.loadVehicleList();
  }

}
