import { Component,OnInit } from '@angular/core';
import { BrandService} from '../brands.service';
import { Router } from '@angular/router';

declare var require: any;

@Component({
    selector: 'app-dt-basic',
    templateUrl: './brandsViews.component.html',
    styleUrls: ['./brandsViews.component.scss']
})

export class BrandsViewComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    constructor(private brandService: BrandService, private router: Router) {
    }
    ngOnInit() {
        this.brandService.getAll().subscribe(data => {
            this.rows = data;
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
}
