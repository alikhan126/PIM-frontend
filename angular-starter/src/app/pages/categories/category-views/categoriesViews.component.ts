import { Component,OnInit } from '@angular/core';
import { CategoryService} from '../category.service';
import { Router } from '@angular/router';

declare var require: any;

@Component({
    selector: 'app-dt-basic',
    templateUrl: './categoriesViews.component.html',
    styleUrls: ['./categoriesViews.component.scss']
})

export class CategoryViewComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    constructor(private categoryService: CategoryService, private router: Router) {
    }
    ngOnInit() {
        this.categoryService.getAll().subscribe(data => {
            this.rows = data;
            console.log(this.rows)
        });
    }
    loadingIndicator: boolean = true;
    reorderable: boolean = true;

    // DataTable Content Titles
    columns = [
        { prop: 'name' },
        { prop: 'description' },
    ];
    // constructor() {
    //     this.rows = data;
    //     setTimeout(() => { this.loadingIndicator = false; }, 1500);
    // }

    getRowHeight(row) {
      return row.height;
    }
}
