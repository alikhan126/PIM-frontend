import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-verified-email-send-page',
    templateUrl: './verified-email-send-page.component.html',
    styleUrls: ['./verified-email-send-page.component.scss']
})

export class ThankyouEmailSendPageComponent {
    @ViewChild('f', {static: false}) forogtPasswordForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute) { }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
