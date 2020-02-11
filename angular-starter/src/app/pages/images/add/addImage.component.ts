import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ImageService } from '../image.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { AppConfig } from '../../../../constants/app-config';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var X2JS = require("x2js");


@Component({
  selector: 'app-product',
  templateUrl: './addImage.component.html',
  styleUrls: ['./addImage.component.scss']
})
export class AddTagsComponent implements OnInit{

  pObj:any={};
  datasend:any={};
  front_file: any;

  images:any=[];
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
  public cropping_image_front: any;
  public cropping_image_front_format: any;
  front_image_selected: boolean = false;
  public base64image_front: any;

  public ShowFront_Saved: boolean = false;
  public ShowFront_Button: boolean = false;

  public ShowBack_Saved: boolean = false;
  public ShowBack_Button: boolean = false;

  public ShowSelfie_Saved: boolean = false;
  public ShowSelfie_Button: boolean = false;
  public post_image_selected: boolean = false;
  public payload_empty: boolean = true;

  public ctx: any;
  public canvas: any;
  public image: any;
  public angleInDegrees = 0;

  isNew :boolean = false;
  image_url :any=[];
  url :any=[];
  payload :any=[];
  public base64image: any;

  file :any=[];
  closeResult: string;
  image_label: string;
  product_id: number;


  constructor(private modalService: NgbModal, private toastService:NGXToastrService, private route : ActivatedRoute, private router : Router, private imageService: ImageService){

  }
  ngOnInit () {
     this.getImage();
     this.getProducts();
  }

  IMAGE_NAME = [
        {name: 'baseImage'},
        {name: 'smallImage'},
        {name: 'thumbnailImage'},
        {name: 'swatchImage'}    
  ]

  getImage(){
    const id = +this.route.snapshot.paramMap.get('id');

    id ? this.imageService.get(id)
    .subscribe(data => {
    this.pObj=data;

    }):this.isNew=true;
  }


  save(): void {


    if(this.isNew){
      this.imageService.add(this.pObj)
      .subscribe(result => {
        this.pObj=result;
        console.log(this.pObj)
        this.pObj && this.pObj.id //&& this.router.navigate(['tags/'])
        this.toastService.typeSuccessCustom("Success","Your image request is submitted for Admin's approval")
        // this.ts.success("Operation Performed Successfully");
      })
    }
      else {
        this.imageService.update(this.pObj).subscribe(aResult=>{
         alert("Updated Successfully")
        });
  }
      
      // this.location.back();
  }

  _payload(){
    if (this.payload_empty = true){
      this.datasend[this.image_url] = this.url;
      this.datasend[this.image_url +"Label"] = this.image_label;
      this.payload.push(this.datasend);
      this.payload_empty = false
    } else {
      this.datasend = this.payload[0]
      this.datasend[this.image_url] = this.url;
      this.datasend[this.image_url +"Label"] = this.image_label;
      this.payload_empty = false
    }
    console.log(this.payload);
  }

  clearform(){
    this.image_url = "";
    this.image_label = "";
    this.url = "";
    this.img = "";
  }

  save_data(){
    this.imageService.add(this.payload[0])
    .subscribe(result => {
        this.pObj=result;
        console.log(this.pObj)
        this.pObj && this.pObj.id //&& this.router.navigate(['tags/'])
        if (this.pObj && this.pObj.id){
          this.toastService.typeSuccessCustom("Success","Your image request is submitted for Admin's approval")
          if (this.product_id !== null){
            this.imageService.getProductById(this.product_id).subscribe(data => {
              this.product = data;
              this.product['images'] = [this.pObj.id];
              this.imageService.updateProduct(this.product).subscribe(data => {
                this.toastService.typeSuccessCustom("Success","Image associated with product.")
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
     this.post_image_selected = true;
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function () {
       me.base64image = reader.result;
     };
     reader.onerror = function (error) {
       console.log('Error: ', error);
     };

  }

  front_val(event) {
    event.target.value = null;
  }

  save_front() {
    var urlUpload = AppConfig.AMAZONS3_UPLOAD; // UPLOAD_KYC <- UPLOAD_KYC_PROXY
    this.imageService.getImageParams().subscribe(
      data => {
        this.AMAZONS3PARAM = data;
        // ------------------------ Front Upload Start ---------------------------
        this.imageService
          .API_FORM_POST_File(urlUpload, this.file, this.AMAZONS3PARAM)
          .subscribe(
            data => {
              this.url = this.ConvertXMLtoJSON(data);
            },
            err => {
              console.log(err);
            }
          );
      },
      err => {
        console.log(err);
      }
    );
  }

  getImageinfo(value) {
    this.image_url = value
  }



  ConvertXMLtoJSON(data) {
    // var dataj = "<?xml version='1.0' encoding='UTF-8'?><PostResponse><Location>https://socialchain-prod.s3.amazonaws.com/media%2F585d7febe63942f0b6c925a9cc12ed55%2Ffeed%2Fali.jpeg</Location><Bucket>socialchain-prod</Bucket><Key>media/585d7febe63942f0b6c925a9cc12ed55/feed/ali.jpeg</Key><ETag>'de1c6b1e1342cb40b4d012984d77e187'</ETag></PostResponse>"
    var dataj = data.text();
    var x2js = new X2JS();
    var jsonj = x2js.xml2js(dataj);
    var imagelocation = jsonj.PostResponse.Location;
    return imagelocation;
  }



goToImage(){
    this.router.navigate(['/images']);

}


getImages(){
  this.imageService.getAllImages().subscribe(data => {
    this.images = data;

});
}

getProducts(){
  this.imageService.getAllProducts().subscribe(data => {
    this.products = data;

});
}

getCategories(){
  this.imageService.getAllCategories().subscribe(data => {
    this.categories = data;
});
}
getTags(){
  this.imageService.getAllTags().subscribe(data => {
    this.tagsList = data;
});
}
getBrands(){
  this.imageService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.imageService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

getProductFamilies(){
  this.imageService.getAllProductFamilies().subscribe(data => {
    this.productFamilies = data;
});
}

// getTaxes(){
//   this.ImageService.getAllTaxes().subscribe(data => {
//     this.taxes = data['results'];
// });
// }

}
