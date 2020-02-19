import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { PdfService } from '../pdf.service';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { AppConfig } from '../../../../constants/app-config';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
var X2JS = require("x2js");


@Component({
  selector: 'app-product',
  templateUrl: './addPdf.component.html',
  styleUrls: ['./addPdf.component.scss']
})
export class AddPDFComponent implements OnInit{

  pObj:any={};
  datasend:any={};
  front_file: any;

  pdfs:any=[];
  websites:any=[];
  products:any=[];
  product:any=[];
  tagsList:any=[];
  brands:any=[];
  categories:any=[];
  productFamilies:any=[];
  taxes:any=[];
  pdf:any=[];
  AMAZONS3PARAM:any=[];
  // public file = "";
  public cropping_pdf_front: any;
  public cropping_pdf_front_format: any;
  front_pdf_selected: boolean = false;
  public base64pdf_front: any;

  public ShowFront_Saved: boolean = false;
  public ShowFront_Button: boolean = false;

  public ShowBack_Saved: boolean = false;
  public ShowBack_Button: boolean = false;

  public ShowSelfie_Saved: boolean = false;
  public ShowSelfie_Button: boolean = false;
  public post_pdf_selected: boolean = false;
  public payload_empty: boolean = true;

  public ctx: any;
  public canvas: any;
  public angleInDegrees = 0;

  isNew :boolean = false;
  pdf_url :any=[];
  url :any=[];
  payload :any=[];
  public base64pdf: any;

  file :any=[];
  file_name :any=[];
  closeResult: string;
  pdf_label: string;
  product_id: number;


  constructor(private modalService: NgbModal, private toastService:NGXToastrService, private route : ActivatedRoute, private router : Router, private pdfService: PdfService){

  }
  ngOnInit () {
     this.getpdf();
     this.getProducts();
  }

  getpdf(){
    const id = +this.route.snapshot.paramMap.get('id');

    id ? this.pdfService.get(id)
    .subscribe(data => {
    this.pObj=data;

    }):this.isNew=true;
  }


  save(): void {


    if(this.isNew){
      this.pdfService.add(this.pObj)
      .subscribe(result => {
        this.pObj=result;
        console.log(this.pObj)
        this.pObj && this.pObj.id //&& this.router.navigate(['tags/'])
        this.toastService.typeSuccessCustom("Success","Your pdf request is submitted for Admin's approval")
        // this.ts.success("Operation Performed Successfully");
      })
    }
      else {
        this.pdfService.update(this.pObj).subscribe(aResult=>{
         alert("Updated Successfully")
        });
  }
      
      // this.location.back();
  }

  _payload(){
    if (this.payload_empty = true){
      this.datasend[this.pdf_url] = this.url;
      this.datasend["description"] = this.pdf_label;
      this.payload.push(this.datasend);
      this.payload_empty = false
    } else {
      this.datasend = this.payload[0]
      this.datasend[this.pdf_url] = this.url;
      this.datasend["description"] = this.pdf_label;
      this.payload_empty = false
    }
    console.log(this.payload);
  }

  clearform(){
    this.pdf_url = "";
    this.pdf_label = "";
    this.url = "";
    this.pdf = "";
  }

  save_data(){
    this.datasend["url"] = this.url;
    this.datasend['description'] = this.pdf_label;
    this.pdfService.add(this.datasend)
    .subscribe(result => {
        this.pObj=result;
        console.log(this.pObj)
        this.pObj && this.pObj.id //&& this.router.navigate(['tags/'])
        if (this.pObj && this.pObj.id){
          this.toastService.typeSuccessCustom("Success","Your Pdf request is submitted for Admin's approval")
          if (this.product_id !== null){

              this.pdfService.getProductById(this.product_id).subscribe(data => {
              this.product = data;
              if(this.product['pdf'] != undefined){
                this.product['pdf'].push(this.pObj.id)
                this.product['pdf'] = this.product['pdf']
              } else{
                this.product['pdf'] = [this.pObj.id]
              }
              this.pdfService.updateProduct(this.product).subscribe(data => {
                this.toastService.typeSuccessCustom("Success","PDF associated with product.")
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
     this.file_name = file.name
     let reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function () {
       me.base64pdf = reader.result;
       console.log(reader.result);
     };
     reader.onerror = function (error) {
       console.log('Error: ', error);
     };
     this.post_pdf_selected = true;


  }

  front_val(event) {
    event.target.value = null;
  }

  save_front() {
    var urlUpload = AppConfig.AMAZONS3_UPLOAD; // UPLOAD_KYC <- UPLOAD_KYC_PROXY
    this.pdfService.getPDFParams().subscribe(
      data => {
        this.AMAZONS3PARAM = data;
        this.AMAZONS3PARAM.key = this.AMAZONS3PARAM.key.replace("${filename}", this.file.name)

        // ------------------------ pdf Upload Start ---------------------------
        this.pdfService
          .API_FORM_POST_File(urlUpload, this.file, this.AMAZONS3PARAM)
          .subscribe(
            data => {
              this.url =  "http://foodservicedirect.com.s3.amazonaws.com/" + this.AMAZONS3PARAM.key
              // this.url = this.ConvertXMLtoJSON(data);
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

  getpdfinfo(value) {
    this.pdf_url = value
  }



  ConvertXMLtoJSON(data) {
    // var dataj = "<?xml version='1.0' encoding='UTF-8'?><PostResponse><Location>https://socialchain-prod.s3.amazonaws.com/media%2F2fab8272287043f68af86de5dd9e58de%2Ffeed%2FSamplepdf_1280x720_1mb.mp4</Location><Bucket>socialchain-prod</Bucket><Key>media/585d7febe63942f0b6c925a9cc12ed55/feed/ali.jpeg</Key><ETag>'de1c6b1e1342cb40b4d012984d77e187'</ETag></PostResponse>"
    var dataj = data.text();
    var x2js = new X2JS();
    var jsonj = x2js.xml2js(dataj);
    var pdflocation = jsonj.PostResponse.Location;
    return pdflocation;
  }



goTopdf(){
    this.router.navigate(['/pdf']);

}


getpdfs(){
  this.pdfService.getAll().subscribe(data => {
    this.pdfs = data;

});
}

getProducts(){
  this.pdfService.getAllProducts().subscribe(data => {
    this.products = data;

});
}

getCategories(){
  this.pdfService.getAllCategories().subscribe(data => {
    this.categories = data;
});
}
getTags(){
  this.pdfService.getAllTags().subscribe(data => {
    this.tagsList = data;
});
}
getBrands(){
  this.pdfService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.pdfService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

getProductFamilies(){
  this.pdfService.getAllProductFamilies().subscribe(data => {
    this.productFamilies = data;
});
}

// getTaxes(){
//   this.pdfService.getAllTaxes().subscribe(data => {
//     this.taxes = data['results'];
// });
// }

}
