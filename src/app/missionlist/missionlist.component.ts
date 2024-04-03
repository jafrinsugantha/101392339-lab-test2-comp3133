
// // import { Component, OnInit } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';

// // interface Launch {
// //   mission_name: string;
// //   launch_year: string;
// //   details: string;
// //   mission_patch_small: string;
// // }

// // @Component({
// //   selector: 'app-missionlist',
// //   templateUrl: './missionlist.component.html',
// //   styleUrls: ['./missionlist.component.css']
// // })
// // export class MissionlistComponent implements OnInit {
// //   missions: Launch[] = [];
// //   filteredMissions: Launch[] = [];
// //   selectedYear: string = '';

// //   constructor(private http: HttpClient) { }

// //   ngOnInit(): void {
// //     this.fetchMissions();
// //   }

// //   fetchMissions(): void {
// //     this.http.get<Launch[]>('https://api.spacexdata.com/v3/launches').subscribe(
// //       data => {
// //         this.missions = data;
// //         this.filteredMissions = [...this.missions]; // Initialize filteredMissions
// //       },
// //       error => {
// //         console.log('Error fetching launches:', error);
// //       }
// //     );
// //   }

// //   filterMissions(): void {
// //     if (this.selectedYear === '') {
// //       this.filteredMissions = [...this.missions]; // If selectedYear is empty, show all launches
// //     } else {
// //       this.filteredMissions = this.missions.filter(mission => mission.launch_year === this.selectedYear);
// //     }
// //   }
// // }

// import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// interface Launch {
//   mission_name: string;
//   launch_year: string;
//   details: string;
//   mission_patch_small: string;
// }

// @Component({
//   selector: 'app-missionlist',
//   templateUrl: './missionlist.component.html',
//   styleUrls: ['./missionlist.component.css']
// })
// export class MissionlistComponent implements OnInit {
//   missions: Launch[] = [];
//   filteredMissions: Launch[] = [];
//   selectedYear: string = '';

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     this.fetchMissions();
//   }

//   fetchMissions(): void {
//     this.http.get<Launch[]>('https://api.spacexdata.com/v3/launches').subscribe(
//       data => {
//         this.missions = data;
//         this.filteredMissions = [...this.missions]; // Initialize filteredMissions
//         this.applyFilter(); // Apply filter initially
//       },
//       error => {
//         console.log('Error fetching launches:', error);
//       }
//     );
//   }

//   applyFilter(): void {
//     if (this.selectedYear === '') {
//       this.filteredMissions = [...this.missions]; // If selectedYear is empty, show all launches
//     } else {
//       this.filteredMissions = this.missions.filter(mission => mission.launch_year === this.selectedYear);
//     }
//   }

//   onYearFilterChange(year: string): void {
//     this.selectedYear = year;
//     this.applyFilter();
//   }
// }

// @Component({
//   selector: 'app-missionfilter',
//   template: `
//     <select [(ngModel)]="selectedYear" (change)="filterMissions()">
//       <option value="">All Years</option>
//       <option *ngFor="let year of uniqueYears" [value]="year">{{ year }}</option>
//     </select>
//   `,
//   styleUrls: ['./missionfilter.component.css']
// })
// export class MissionfilterComponent implements OnInit {
//   selectedYear: string = '';
//   uniqueYears: string[] = [];

//   @Output() yearFilterChange: EventEmitter<string> = new EventEmitter();

//   constructor(private missionList: MissionlistComponent) { }

//   ngOnInit(): void {
//     this.getUniqueYears();
//   }

//   getUniqueYears(): void {
//     this.uniqueYears = Array.from(new Set(this.missionList.missions.map(mission => mission.launch_year)));
//   }

//   filterMissions(): void {
//     this.yearFilterChange.emit(this.selectedYear);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Launch {
  mission_name: string;
  launch_year: string;
  details: string;
  mission_patch_small: string;
}

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  missions: Launch[] = [];
  filteredMissions: Launch[] = [];
  selectedYear: string = '';
  uniqueYears: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchMissions();
  }

  fetchMissions(): void {
    this.http.get<Launch[]>('https://api.spacexdata.com/v3/launches').subscribe(
      data => {
        this.missions = data;
        this.filteredMissions = [...this.missions]; // Initialize filteredMissions
        this.getUniqueYears(); // Get unique years
      },
      error => {
        console.log('Error fetching launches:', error);
      }
    );
  }

  getUniqueYears(): void {
    this.uniqueYears = Array.from(new Set(this.missions.map(mission => mission.launch_year)));
  }

  applyFilter(): void {
    if (this.selectedYear === '') {
      this.filteredMissions = [...this.missions]; // If selectedYear is empty, show all launches
    } else {
      this.filteredMissions = this.missions.filter(mission => mission.launch_year === this.selectedYear);
    }
  }

  onYearFilterChange(year: string): void {
    this.selectedYear = year;
    this.applyFilter();
  }
}
