import { Component,OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/shared/services/toastr.service';

declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './video-editing.component.html',
    styleUrls: ['./video-editing.component.scss']
})

export class VideoEditComponent {
    editing = {};
    rows = [];
    roles = [];
    products :any[];
    totalRecords:number;
    temp = [];
    closeResult: string;
    permission: string;
    perm: string;

    constructor(private toastService:NGXToastrService, private modalService: NgbModal, private videoService: VideoService, private router: Router) {
    }
    ngOnInit() {
        this.getUserRole();
        this.videoService.getAll().subscribe(data => {
            this.rows = data;
            this.temp = data;
            console.log(this.rows)
        });
    }

    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    titleCaseWord(word: string) {
        if (!word) return word;
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    // Editing content code
    updateValue(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.editing[rowIndex + '-' + cell] = false;
            this.videoService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.videoService.update(this.rows[rowIndex]).subscribe(data => {
                    this.videoService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
            // this.permission = "Update";
            // this.perm = "All";
            // let cellvalue = this.titleCaseWord(cell);
            // if(this.roles['video'].includes(this.perm) || this.roles['video'].includes(this.permission) ){
            //     this.videoService.getFieldPermissions(user.role).subscribe(data => {
            //         if(data[0].edit.includes(cellvalue)){
            //             this.editing[rowIndex + '-' + cell] = false;
            //             this.videoService.get(this.rows[rowIndex]['id']).subscribe(data => {
            //                 this.rows[rowIndex] = data;
            //                 this.rows[rowIndex][cell] = event.target.value;
            //                 this.videoService.update(this.rows[rowIndex]).subscribe(data => {
            //                     this.toastService.typeSuccessCustom("Success","Your tag request is submitted for Admin's approval")
            //                     this.videoService.getAll().subscribe(data => {
            //                         this.rows = data;
            //                     });
            //                 });
            //             });
            //         } else{
            //             alert("You don't have access to edit " + cellvalue +" field!");
            //         }
            //     });
            // } else {
            //     alert("You don't have access to edit video!");
            // }
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.videoService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.videoService.update(this.rows[rowIndex]).subscribe(data => {
                    this.videoService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
        }
    }    

    deletetag(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.editing[rowIndex + '-' + cell] = false;
            this.videoService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.videoService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                    // this.toastService.typeSuccessCustom("Success","Your video request is submitted for Admin's approval")
                    this.videoService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
            // this.permission = "Delete";
            // this.perm = "All";
            // if(this.roles['tags'].includes(this.perm) || this.roles['tags'].includes(this.permission)){
            //     this.editing[rowIndex + '-' + cell] = false;
            //     this.videoService.get(this.rows[rowIndex]['id']).subscribe(data => {
            //         this.rows[rowIndex] = data;
            //         this.rows[rowIndex][cell] = event.target.value;
            //         this.videoService.delete(this.rows[rowIndex]['id']).subscribe(data => {
            //             this.videoService.getAll().subscribe(data => {
            //                 this.rows = data;
            //             });
            //         });
            //     });
            // } else {
            //     alert("You don't have access to delete image!");
            // }
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.videoService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.videoService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                    this.toastService.typeSuccessCustom("Success","Your video request is submitted for Admin's approval")
                    this.videoService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
        }
    }

    addTag(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.router.navigate(['/videos/0']);
            
            // this.permission = "Create";
            // this.perm = "All";
            // if(this.roles['video'].includes(this.perm) || this.roles['video'].includes(this.permission)){
            //     this.router.navigate(['/video/0']);
            // } else {
            //     alert("You don't have access to add image!");
            // }
        } else {
            this.router.navigate(['/videos/0']);
        }
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
    
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
    
        // update the rows
        this.rows = temp;
    }

    getUserRole(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.videoService.getUserRole(user.user_id).subscribe(data => {
          this.roles = data['role'];
      });
    }

}