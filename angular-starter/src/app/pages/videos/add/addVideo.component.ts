import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title, DomSanitizer } from "@angular/platform-browser";
import { Router,ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { AppConfig } from '../../../../constants/app-config';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var X2JS = require("x2js");


@Component({
  selector: 'app-product',
  templateUrl: './addVideo.component.html',
  styleUrls: ['./addVideo.component.scss']
})
export class AddVideoComponent implements OnInit{

  pObj:any={};
  datasend:any={};
  front_file: any;

  videos:any=[];
  websites:any=[];
  products:any=[];
  product:any=[];
  tagsList:any=[];
  brands:any=[];
  categories:any=[];
  productFamilies:any=[];
  taxes:any=[];
  img:any=[];
  AMAZONS3PARAM:any=[];
  // public file = "";
  public cropping_video_front: any;
  public cropping_video_front_format: any;
  front_video_selected: boolean = false;
  public base64video_front: any;

  public ShowFront_Saved: boolean = false;
  public ShowFront_Button: boolean = false;

  public ShowBack_Saved: boolean = false;
  public ShowBack_Button: boolean = false;

  public ShowSelfie_Saved: boolean = false;
  public ShowSelfie_Button: boolean = false;
  public post_video_selected: boolean = false;
  public payload_empty: boolean = true;

  public ctx: any;
  public canvas: any;
  public video: any;
  public angleInDegrees = 0;

  isNew :boolean = false;
  video_url :any=[];
  url :any=[];
  payload :any=[];
  public base64video: any;

  file :any=[];
  closeResult: string;
  video_label: string;
  video_link: string;
  product_id: number;


  constructor(private modalService: NgbModal, private toastService:NGXToastrService, private route : ActivatedRoute, private router : Router, private videoService: VideoService,
    private sanitizer: DomSanitizer){

  }
  ngOnInit () {
     this.getvideo();
     this.getProducts();
  }

  public getSantizeUrl(url: string) {
    let urlsafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return urlsafe;
  }

  getvideo(){
    const id = +this.route.snapshot.paramMap.get('id');

    id ? this.videoService.get(id)
    .subscribe(data => {
    this.pObj=data;

    }):this.isNew=true;
  }


  save(): void {


    if(this.isNew){
      this.videoService.add(this.pObj)
      .subscribe(result => {
        this.pObj=result;
        console.log(this.pObj)
        this.pObj && this.pObj.id //&& this.router.navigate(['tags/'])
        this.toastService.typeSuccessCustom("Success","Your video request is submitted for Admin's approval")
        // this.ts.success("Operation Performed Successfully");
      })
    }
      else {
        this.videoService.update(this.pObj).subscribe(aResult=>{
         alert("Updated Successfully")
        });
  }
      
      // this.location.back();
  }

  _payload(){
    if (this.payload_empty = true){
      this.datasend[this.video_url] = this.url;
      this.datasend[this.video_url +"Label"] = this.video_label;
      this.payload.push(this.datasend);
      this.payload_empty = false
    } else {
      this.datasend = this.payload[0]
      this.datasend[this.video_url] = this.url;
      this.datasend[this.video_url +"Label"] = this.video_label;
      this.payload_empty = false
    }
    console.log(this.payload);
  }

  clearform(){
    this.video_url = "";
    this.video_label = "";
    this.url = "";
    this.img = "";
  }

  save_data(){
    this.datasend["url"] = this.video_link;
    this.datasend['altTag'] = this.video_label;
    this.videoService.add(this.datasend)
    .subscribe(result => {
        this.pObj=result;
        console.log(this.pObj)
        this.pObj && this.pObj.id //&& this.router.navigate(['tags/'])
        if (this.pObj && this.pObj.id){
          this.toastService.typeSuccessCustom("Success","Your video request is submitted for Admin's approval")
          if (this.product_id !== null){
              this.videoService.getProductById(this.product_id).subscribe(data => {
              this.product = data;

              if(this.product['videos'] != undefined){
                this.product['videos'].push(this.pObj.id)
                this.product['videos'] = this.product['videos']
              } else{
                this.product['videos'] = [this.pObj.id]
              }
              
              this.videoService.updateProduct(this.product).subscribe(data => {
                this.toastService.typeSuccessCustom("Success","video associated with product.")
              });
            });
          }
        }
      });
  }

  attachToProduct(){
    console.log(this.product_id)
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

   getBase64(event) {
     let me = this;
     let file = event.target.files[0];
     this.file = file
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function () {
       me.base64video = reader.result;
     };
     reader.onerror = function (error) {
       console.log('Error: ', error);
     };
     this.post_video_selected = true;


  }

  front_val(event) {
    event.target.value = null;
  }

  // save_front() {
  //   var urlUpload = AppConfig.AMAZONS3_UPLOAD; // UPLOAD_KYC <- UPLOAD_KYC_PROXY
  //   this.videoService.getImageParams().subscribe(
  //     data => {
  //       this.AMAZONS3PARAM = data;
  //       this.AMAZONS3PARAM.key = this.AMAZONS3PARAM.key.replace("${filename}", this.file.name)
        
  //       // ------------------------ Video Upload Start ---------------------------
  //       this.videoService
  //         .API_FORM_POST_File(urlUpload, this.file, this.AMAZONS3PARAM)
  //         .subscribe(
  //           data => {
  //             this.url =  "http://foodservicedirect.com.s3.amazonaws.com/" + this.AMAZONS3PARAM.key
  //             // this.url = this.ConvertXMLtoJSON(data);
  //           },
  //           err => {
  //             console.log(err);
  //           }
  //         );
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // }

  getvideoinfo(value) {
    this.video_url = value
  }



  ConvertXMLtoJSON(data) {
    // var dataj = "<?xml version='1.0' encoding='UTF-8'?><PostResponse><Location>https://socialchain-prod.s3.amazonaws.com/media%2F2fab8272287043f68af86de5dd9e58de%2Ffeed%2FSampleVideo_1280x720_1mb.mp4</Location><Bucket>socialchain-prod</Bucket><Key>media/585d7febe63942f0b6c925a9cc12ed55/feed/ali.jpeg</Key><ETag>'de1c6b1e1342cb40b4d012984d77e187'</ETag></PostResponse>"
    var dataj = data.text();
    var x2js = new X2JS();
    var jsonj = x2js.xml2js(dataj);
    var videolocation = jsonj.PostResponse.Location;
    return videolocation;
  }



goTovideo(){
    this.router.navigate(['/videos']);

}


getvideos(){
  this.videoService.getAll().subscribe(data => {
    this.videos = data;

});
}

getProducts(){
  this.videoService.getAllProducts().subscribe(data => {
    this.products = data;

});
}

getCategories(){
  this.videoService.getAllCategories().subscribe(data => {
    this.categories = data;
});
}
getTags(){
  this.videoService.getAllTags().subscribe(data => {
    this.tagsList = data;
});
}
getBrands(){
  this.videoService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.videoService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

getProductFamilies(){
  this.videoService.getAllProductFamilies().subscribe(data => {
    this.productFamilies = data;
});
}

// getTaxes(){
//   this.videoService.getAllTaxes().subscribe(data => {
//     this.taxes = data['results'];
// });
// }

}
