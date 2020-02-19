import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/auth/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit {

    constructor(private router: Router,
        private route: ActivatedRoute,private authService:AuthService) { }
    //Variable Declaration
    currentPage: string = "About"
    user:any=[];


    ngOnInit() {
        this.getUser();    
    }

    showPage(page: string) {
        this.currentPage = page;
    }

    

    getUser(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.authService.getUser(user.user_id).subscribe(data => {
            this.user = data;
            console.log(this.user);
        });
    }

    changePassword(){
        this.router.navigate(['/auth/changepassword']);
    }

    goToProfile(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        let link = '/user/profile/' + user.user_id
        this.router.navigate([link]);

    }

}