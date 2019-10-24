import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
// import {ProductService} from '../products.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
@Component({
    selector: 'app-regular-table',
    templateUrl: './regular-table.component.html',
    styleUrls: ['./regular-table.component.scss']
})

export class RegularTableComponent implements OnInit  {
    uploader: FileUploader = new FileUploader({
        // url: URL,
        isHTML5: true
      });
      uploadForm: FormGroup;
    
      formData : FormData;
      pObj:any={};
      id:any;
      file:any;
      constructor( private formBuilder: FormBuilder,private route : ActivatedRoute, private router : Router){

    }

    ngOnInit () {
  
      this.uploadForm =  new FormGroup ({
        'upload': new FormControl(null),
        'name': new FormControl(null),
        'size':new FormControl(null),
        'url_type':new FormControl(null),
        'package_id':new FormControl(null)
      });
  
      // this.uploadForms = new FormGroup({
      //   'upload': new FormControl(null),
      //   'name': new FormControl(null),
      //   'size':new FormControl({value:null,disabled:true}),
      //   'url_type':new FormControl({value:'upload',disabled:true}),
      //   'package_id':new FormControl({disabled:true})
      // });
  

  
    }



     
fileSelected(e){

    if(this.uploader.queue && this.uploader.queue.length ){
      let qlength=this.uploader.queue.length;
      if(this.uploader.queue[qlength-1].file){
        this.file=this.uploader.queue[qlength-1].file;
        this.uploadForm.get('size').setValue(this.file.size);
        this.uploadForm.get('upload').setValue(this.file.rawFile);
    
        
      }
    
    
    }
    
    
    
    }
    
    
     onFileSelect  (event) {
      if (event.target.files.length > 0) {
         this.file = event.target.files[0];
         this.uploadForm.get('size').setValue(this.file.size);
    
        //  this.uploadForm.get('upload').setValue(this.file);
         console.log("file",this.file)
          
        // this.uploadForm.get('upload').setValue(this.file);
    
      }
    }
    
      save(): void {
    
        var f= new FormData();

        f.append('upload',this.uploadForm.value.upload);
    
        if(this.uploadForm  && this.uploadForm.value.upload  ){
            console.log(this.uploadForm.value.upload)
        }
    
        else {
          alert("Please provide a file");
        }
          
      }
      
}