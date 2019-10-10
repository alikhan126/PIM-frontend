import { Component,OnInit } from '@angular/core';
import { ManufacturerService } from '../manufacturer.service';
import { Router } from '@angular/router';

declare var require: any;

@Component({
    selector: 'app-dt-basic',
    templateUrl: './manufacturerViews.component.html',
    styleUrls: ['./manufacturerViews.component.scss']
})

export class ManufacturerViewComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    temp = [];
    constructor(private manufacturerService: ManufacturerService, private router: Router) {
    }
    ngOnInit() {
        this.manufacturerService.getAll().subscribe(data => {
            this.rows = data;
            this.temp = data;
            console.log(this.rows)
        });
    }
    loadingIndicator: boolean = true;
    reorderable: boolean = true;

    // DataTable Content Titles
    columns = [
        { prop: 'name' },
    ];
    // constructor() {
    //     this.rows = data;
    //     setTimeout(() => { this.loadingIndicator = false; }, 1500);
    // }

    getRowHeight(row) {
      return row.height;
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
    
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
    
        // update the rows
        this.rows = temp;
    }
}
