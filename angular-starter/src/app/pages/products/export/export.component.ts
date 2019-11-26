import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
// import {ProductService} from '../products.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import * as Papa from 'papaparse';
import { ProductService } from '../products.service';

import { NGXToastrService} from  '../../../shared/services/toastr.service';
import { ExcelService } from 'app/shared/services/excel.service';
@Component({
    selector: 'app-export',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.scss']
})

export class ExportComponent implements OnInit  {

    databaseColumns:any=[];
    adapters:any=[];
    showAdapters:boolean=false;
    selectedAdapter:any={};
    adaptersName:string="";

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
      constructor( private exportExcelService : ExcelService, private toasterService: NGXToastrService,private productService:ProductService,  private formBuilder: FormBuilder,private route : ActivatedRoute, private router : Router){

    }

    ngOnInit () {
  
      this.productService.getFildsToImport().subscribe(result=>{
        this.databaseObjects=result;

        this.databaseObjects.map(ele=>{
          this.databaseColumns.push(ele.name);
          this.mappingObj[ele.name]=ele.name;
        })


      })

      this.getAdaptersFunction();

      this.uploadForm =  new FormGroup ({
        'upload': new FormControl(null),
        'name': new FormControl(null),
        'size':new FormControl(null),
        'url_type':new FormControl(null),
        'package_id':new FormControl(null)
      });

  

  
    }

checkMap(){
  console.log(this.mappingObj)
}


mapAsAdapter(){
  this.mappingObj=this.selectedAdapter;
}
getAdaptersFunction(){
  this.productService.getAdapters().subscribe(resp=>{
    if (resp){
        this.adapters=resp;
    }
  })
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
    if(stringValue == 'true' || stringValue == '1' || stringValue == 'TRUE'  ){
      return true;
    }
    else if (stringValue == 'false' || stringValue == '0' || stringValue == 'FALSE') {
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



  // console.log(JSON.stringify(this.buildedData))

  this.productService.importProducts(this.buildedData).subscribe(response=>{
     console.log(response)
     this.router.navigate(['products/']);
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

          this.mappingObj ? this.showAdapters=true :null;
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
    


    saveAdapter () {
      // if( Object.keys(this.mappingObj).length ){
      //   this.productService.addAdapters({name:this.adaptersName , fields:this.mappingObj}).subscribe(resp=>{
      //     this.toasterService.typeSuccessCustom("Success!","Adapter Created Successfully!");
      //     this.adaptersName="";
      //   })
      // }
      // else {
      //     this.toasterService.typeError("Invalid Input","Please map fields first");
      // }
    }

exportData(){
this.productService.getAll().subscribe(resp=>{
  if(resp){
    if(resp.length && this.mappingObj && Object.keys(this.mappingObj).length  ){
      this.exportExcelService.generateExcel(true,this.mappingObj,resp);
    }
  }
})  
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