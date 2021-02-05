import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {User} from '../models/user';
import {ParkService} from '../service/park.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {FormControl} from "@angular/forms";

@Component({
  // selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ParkService]
})
export class HomeComponent implements OnInit {
  // @ts-ignore

  displayedColumns = [];
  fullNameFilter = new FormControl('');
  // = ['fullName', 'latLong', 'states', 'fees', 'designation' ];

  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filteredParks = {
    fullName: '',
    description: '',
    states: '',
    contacts: '',
    entranceFees: '',
    operatingHours: '',
    Addresses: '',
    designation: ''

  };


  constructor(private parkService: ParkService, ) {
  }

  async ngOnInit() {
    // this.loadAllUsers();
    await this.loadParkData();

    await this.fullNameFilter.valueChanges.subscribe( fullName => {
      this.filteredParks.fullName = fullName.toLowerCase();
      this.dataSource.filter = this.filteredParks;
    })

  }

  loadParkData() {
      this.parkService.getParksList().subscribe(data => {
        // this.parks = data;
        this.displayedColumns = Object.keys(data[0]);
        // @ts-ignore
        this.dataSource = new MatTableDataSource(data);
        // @ts-ignore
        this.dataSource.filterPredicate = this.createFilter();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = filter;
      return data.fullName.toLowerCase().indexOf(searchTerms.fullName) !== -1
        // && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        // && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
        // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    };
    return filterFunction;
  }

}
