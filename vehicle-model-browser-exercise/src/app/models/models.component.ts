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

interface IFuel{
  id: number,
  description: string
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
  fuelList: IFuel[] = [];
  offset: number = 0;
  make: string;
  year: number;
  fuel: string;

  // MatPaginator Inputs
  length = 100
  pageSize = 10;
  pageSizeOptions: number[] = [5,10, 20,30,50,100];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient){
  }

  ngOnInit() {
    this.loadVehicleList();
    this.loadYearList();
    this.loadMakeList();
    this.loadFuelList();
    this.getVehicleCount();
  }

  //?offset=${this.offset}
  async loadVehicleList(){
    this.dataSource = (await this.http.get<IModel[]>(`${this.host}//api/models?make=${this.make || ''}&year=${this.year || ''}&offset=${this.offset || ''}&fetch=${this.pageSize}`).toPromise());

    //this.dataSource = (await this.http.get<IModel[]>(`${this.host}/api/models`).toPromise());
    /*for(let i of this.dataSource){
      console.log(i.make);
    }*/
    this.offset = 0;
  }


  //TODO: optimize performance, loads a very long time until results are shown, found no better option to get count from API
  async getVehicleCount(){
    let count:number = 0;
    let offset = 0;

    let vehicles = (await this.http.get<IModel[]>(`${this.host}//api/models?offset=${offset}`).toPromise());
     while(vehicles.length > 0){
      count += vehicles.length;
      offset += 10;
      vehicles = (await this.http.get<IModel[]>(`${this.host}//api/models?offset=${offset}`).toPromise());
     }
     this.length = count;
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

  async loadFuelList(){
    this.fuelList = (await this.http.get<IFuel[]>(`${this.host}/api/fuelTypes`).toPromise());
    /*for(let year of this.yearList){
      console.log(year);
    }*/
  }

  getPaginatorData(event){
    this.offset = (event.pageIndex) * 10;
    this.pageSize = event.pageSize;
    this.loadVehicleList();
  }
}
