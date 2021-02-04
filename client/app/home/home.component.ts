import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {User} from '../models/user';
import {ParkService} from '../service/park.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  // selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ParkService]
})
export class HomeComponent implements OnInit {
  // @ts-ignore
  currentUser: User;
  users = [];
  parks: any = [];

  displayedColumns = [];
  objectDataKeys = [];
  // = ['fullName', 'latLong', 'states', 'fees', 'designation' ];

  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private parkService: ParkService) { }

  ngOnInit(): void {
    // this.loadAllUsers();
    this.loadParkData();

  }

  loadParkData() {
      this.parkService.getParksList().subscribe(data => {
        // this.parks = data;
        console.log(data[0]);
        this.displayedColumns = Object.keys(data[0]);
        // @ts-ignore
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });
  }

}
