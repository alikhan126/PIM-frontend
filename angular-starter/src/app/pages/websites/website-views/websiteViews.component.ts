import { Component,OnInit } from '@angular/core';
import { WebsiteService } from '../websites.service';
import { Router } from '@angular/router';

declare var require: any;

@Component({
    selector: 'app-dt-basic',
    templateUrl: './websiteViews.component.html',
    styleUrls: ['./websiteViews.component.scss']
})

export class WebsitesViewComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    constructor(private websiteService: WebsiteService, private router: Router) {
    }
    ngOnInit() {
        this.websiteService.getAll().subscribe(data => {
            this.rows = data;
            console.log(this.rows)
        });
    }
    loadingIndicator: boolean = true;
    reorderable: boolean = true;

    // DataTable Content Titles
    columns = [
        { prop: 'url' },
        { prop: 'kind' },
    ];
    // constructor() {
    //     this.rows = data;
    //     setTimeout(() => { this.loadingIndicator = false; }, 1500);
    // }

    getRowHeight(row) {
      return row.height;
    }
}
