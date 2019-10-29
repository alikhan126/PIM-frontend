import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
// import {ProductService} from '../products.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import * as Papa from 'papaparse';
import { ProductService } from '../products.service';

@Component({
    selector: 'app-regular-table',
    templateUrl: './regular-table.component.html',
    styleUrls: ['./regular-table.component.scss']
})

export class RegularTableComponent implements OnInit  {

    databaseColumns:any=[];

    uploader: FileUploader = new FileUploader({
        // url: URL,
        isHTML5: true
      });
      uploadForm: FormGroup;
      fileColumns:any=[];
      formData : FormData;
      pObj:any={};
      id:any;
      file:any;
      databaseObjects:any=[];
      fileData:any=[];
      buildedData:any=[];
      mappingObj:any={};
      sampleProduct:any={}
      constructor( private productService:ProductService,  private formBuilder: FormBuilder,private route : ActivatedRoute, private router : Router){

    }

    ngOnInit () {
  
      this.productService.getFildsToImport().subscribe(result=>{
        this.databaseObjects=result;

        this.databaseObjects.map(ele=>{
          this.databaseColumns.push(ele.name);
        })


      })
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

checkMap(){
  console.log(this.mappingObj)
}


convertTOTyped(databaseKey,stringValue){

  
  let databaseObj=this.databaseObjects.find(obj=>  obj.name == databaseKey);


  if(!databaseObj || databaseObj && !databaseObj.type){
    console.log (databaseKey+" not exist in database skipping")
    return null;
  }
  else if(databaseObj.type == 'number'){
    return Number(stringValue)
  }
  else if (databaseObj.type == 'object'){
    try{
      return stringValue ? JSON.parse(stringValue) : null;
    }
    catch(err){
      console.log("Exception for "+databaseKey+"for value "+stringValue +" must be type object")
      return null;
    }
  }
  else if( databaseObj.type == 'boolean'){
    if(stringValue == 'true' || stringValue == '1'){
      return true;
    }
    else if (stringValue == 'false' || stringValue == '0') {
      return false;
    }
    else {
      console.log("Wrong boolean value against "+databaseKey+" sending false")
      return false;
    }
  }
  else{
    return stringValue;
  }

}


buildData(){

  this.fileData.map(obj=>{
    let mappedObj={};
    Object.keys(obj).forEach(key=>{
      let convertedValue=this.convertTOTyped(this.mappingObj[key],obj[key]);
      convertedValue ? mappedObj[this.mappingObj[key]]= convertedValue : null;
    })
    this.buildedData.push(mappedObj);
  })



  console.log(JSON.stringify(this.buildedData))

  this.productService.importProducts(this.buildedData).subscribe(response=>{
    console.log(response)
  })
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
    
    
    onChangeFile(fileIs :File[]){
      console.log(fileIs)

      Papa.parse(fileIs[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result,file) => {
          this.fileData=result.data;
          this.fileColumns=Object.keys(result.data[0])
          this.fileColumns.forEach(element => {
           if( this.databaseColumns.indexOf(element)>=0){
             this.mappingObj[element]=element;
           }
           else {

             this.mappingObj[element]=null;
           }
          });

          // console.log(this.fileColumns)
          // this.dataList = result.data;
        }
      });
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