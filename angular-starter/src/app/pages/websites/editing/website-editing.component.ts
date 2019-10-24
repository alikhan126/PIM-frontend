import { Component,OnInit } from '@angular/core';
import { WebsiteService} from '../websites.service';
import { Router } from '@angular/router';

declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './website-editing.component.html',
    styleUrls: ['./website-editing.component.scss']
})

export class WebsitesEditComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    temp = [];
    constructor(private websiteService: WebsiteService, private router: Router) {
    }
    ngOnInit() {
        this.websiteService.getAll().subscribe(data => {
            this.rows = data;
            this.temp = data;
            console.log(this.rows)
        });
    }

    // Editing content code
    updateValue(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.websiteService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.websiteService.update(this.rows[rowIndex]).subscribe(data => {
                this.websiteService.getAll().subscribe(data => {
                    this.rows = data;
                    console.log(this.rows)
                });
            });
        });
    }

    deleteWebsite(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.websiteService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            console.log("test", this.rows[rowIndex]['id'])
            this.rows[rowIndex][cell] = event.target.value;
            this.websiteService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                this.websiteService.getAll().subscribe(data => {
                    this.rows = data;
                    console.log(this.rows)
                });
            });
        });
    }

    addWebsite(){
        this.router.navigate(['/websites/0']);

    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
    
        const temp = this.temp.filter(function (d) {
            return d.url.toLowerCase().indexOf(val) !== -1 || !val;
        });
    
        // update the rows
        this.rows = temp;
    }
}