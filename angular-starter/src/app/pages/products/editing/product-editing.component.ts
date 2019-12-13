import { Component,OnInit } from '@angular/core';
import { ProductService} from '../products.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';


@Component({
    selector: 'app-dt-editing',
    templateUrl: './product-editing.component.html',
    styleUrls: ['./product-editing.component.scss']
})

export class ProductsEditComponent implements OnInit{


    catalogName:string="";  //catalog name
    url:string=""; //catalog url
    description:string=""; // catalog description
    hidden:boolean=false; //catlog is hidden or not
    showCatalog:boolean=false; // show catalog form to save 
    shareable:boolean=false; //show searchable button based on based on shareable link 



    numberFilterOptions=["equals","lessThan","greaterThan","between"];
    numberFilterValue:string="equals";
    lessThan:number=null;
    greaterThan:number=null;
    query:string;
    filter:any={name:"All",type:"string"};
    fields:any=[];
    images:any=[];
    websites:any=[];
    tags:any=[];
    brands:any=[];
    category:any=[];
    // productFamilies:any=[];
    taxes:any=[];  
    editing = {};
    rows = [];
    products :any[];
    Downloadable:any=[];
    Simple:any=[];
    Grouped:any=[];
    Bundle:any=[];
    Configurable:any=[];
    Catalog:any=[];
    NotVisibleIndividually:any=[];
    Search:any=[];
    FoodProducts:any=[];
    NonFoodProducts:any=[];
    Virtual:any=[];
    totalRecords:number;
    temp = [];
    Stocked:any=[];
    SpecialOrder:any=[];
    FromPartners:any=[];
    closeResult: string;
    permission: string;
    perm: string;

    queryParams:any={};
    
    constructor( private toastService:NGXToastrService ,private activatedRoute : ActivatedRoute  , private ts:NGXToastrService , private modalService: NgbModal, private productService: ProductService, private router: Router) {
    }

    ngOnInit() {

        this.activatedRoute.queryParams
        // .filter(params => params)
        .subscribe(params => {
          this.queryParams=params;
          this.applySearch();
        });

        // this.getAllProducts();
        this.getImages();
        this.getWebsites();
        this.getTags();
        this.getBrands();
        this.getCategories();
        this.getFields();
        this.Simple = "Simple";
        this.Grouped = "Grouped";
        this.Configurable = "Configurable";
        this.Virtual = "Virtual";
        this.Bundle = "Bundle";
        this.Downloadable = "Downloadable";
        this.Catalog = "Catalog";
        this.Search = "Search";
        this.NotVisibleIndividually = "NotVisibleIndividually";
        this.FoodProducts = "FoodProducts";
        this.NonFoodProducts = "NonFoodProducts";
        this.Stocked = "Stocked";
        this.SpecialOrder = "SpecialOrder";
        this.FromPartners = "FromPartners";
    }

    

  resetCatalog(){
      this.catalogName="";
      this.hidden=false;
      this.description="";
      this.url="";
      this.showCatalog=false;
  }  

saveAsCatalog(){

    if(this.catalogName && this.description && this.url && this.hasOwnProperty('hidden') ){

    
    if(window.location.href.indexOf(this.url)){
        this.url=window.location.href;
    }
    else {
        this.toastService.typeError("Validation Failed","Please provide valid url");
        return;
    }
    this.productService.addCatalog({
    name:this.catalogName,
    description:this.description,
    url:this.url,
    hidden:this.hidden
    }).subscribe(data=>{
    if(data && Object.keys(data).length)        
    {
        this.toastService.typeSuccessCustom("Catalog Added","A new catalog " +this.catalogName+"is added!")
        this.resetCatalog();
    }

    })
    }

    else {
        this.toastService.typeError("Validation Failed","Please provide all parameters");
        return;

    }
}
    applySearch(){
        if (Object.keys(this.queryParams).length){
            this.queryParams.name && this.queryParams.name != 'q' ? this.filter['name']=this.queryParams.name : this.filter['name']="All";
            this.queryParams.type ? this.filter['type']=this.queryParams.type :this.filter['type']="string";
            this.queryParams.query ? this.query=this.queryParams.query :null;
            this.queryParams.numberFilterValue ? this.numberFilterValue=this.queryParams.numberFilterValue : null;
            this.queryParams.hasOwnProperty('lessThan') ? this.lessThan=this.queryParams.lessThan :null;
            this.queryParams.hasOwnProperty('greaterThan') ? this.greaterThan=this.queryParams.greaterThan :null;
            this.queryParams.queryCall ? this.getSearchedResults(this.queryParams.queryCall) : this.router.navigate['/products'];

            this.shareable=true;
            this.url=this.queryParams.queryCall;
        }
        else {
            this.getAllProducts();
        }
    }




    getData(){
        this.productService.getAll().subscribe(data => {
            this.rows = data;
            this.temp = data;
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

    getValues(values,key){
        let valArray=[];
        values.map(value=> valArray.push(value[key]));
        return valArray.join(" , ");
    }
    
    getFields(){
        this.productService.getFildsToImport().subscribe(result=>{
            this.fields=result;
            this.fields.unshift({name:"All",type:"string"})
          })
    }
    

    getIds(values){
        let valArray=[];
        values.map(value=> valArray.push(value.id));
        return valArray;
    }

    titleCaseWord(word: string) {
        if (!word) return word;
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
    // Editing content code
    updateValue(event, cell, rowIndex) {
        const user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "Update";
        this.perm = "All";
        let cellvalue = this.titleCaseWord(cell);
        if(user.roles['products'].includes(this.permission) || user.roles['products'].includes(this.perm) ){
            this.productService.getFieldPermissions(user.user_id).subscribe(data => {
                if(data.edit.includes(cellvalue)){
                    this.editing[rowIndex + '-' + cell] = false;
                    this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                        this.rows[rowIndex] = data;
                        this.rows[rowIndex][cell] = event.target.value;
                        this.productService.update(this.rows[rowIndex]).subscribe(data => {
                            this.productService.getAll().subscribe(data => {
                                this.rows = data;
                                console.log(this.rows)
                            });
                        });
                    });
                } else {
                    alert("You don't have access to edit " + cellvalue +" field!");
                };
            });
        } else {
            alert("You don't have access to edit products!");
        }
    }

    deleteProduct(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "Delete";
        this.perm = "All";
        if(user.roles['products'].includes(this.permission) || user.roles['products'].includes(this.perm)){
            this.editing[rowIndex + '-' + cell] = false;
            this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                console.log(this.rows[rowIndex])
                this.rows[rowIndex][cell] = event.target.value;
                this.productService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                    this.productService.getAll().subscribe(data => {
                        this.rows = data;
                        console.log(this.rows)
                    });
                });
            });
        } else {
            alert("You don't have access to delete products!");
        }
    }

    updateRelationshipValue(value, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "Update";
        this.perm = "All";
        let cellvalue = this.titleCaseWord(cell);
        if(user.roles['products'].includes(this.permission) || user.roles['products'].includes(this.perm) ){
            this.productService.getFieldPermissions(user.user_id).subscribe(data => {
                if(data.edit.includes(cellvalue)){
                    this.editing[rowIndex + '-' + cell] = false;
                    this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                        this.rows[rowIndex] = data;
                        this.rows[rowIndex][cell] = value;
                        this.productService.update(this.rows[rowIndex]).subscribe(data => {
                            this.productService.getAll().subscribe(data => {
                                this.rows = data;
                                console.log(this.rows)
                            });
                        });
                    });
                } else {
                    alert("You don't have access to edit " + cellvalue +" field!");
                };
            });
        } else {
            alert("You don't have access to edit products!");
        }
    }

    addProduct(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        this.permission = "Create";
        this.perm = "All";
        if(user.roles['products'].includes(this.permission) || user.roles['products'].includes(this.perm) ){
            this.router.navigate(['/products/0']);
        } else {
            alert("You don't have access to add products!");
        }
    }


    

  goToProducts(){
    this.router.navigate(['/products']);

}


getImages(){
  this.productService.getAllImages().subscribe(data => {
    this.images = data;

});
}

getCategories(){
  this.productService.getAllCategories().subscribe(data => {
    this.category = data;
});
}
getTags(){
  this.productService.getAllTags().subscribe(data => {
    this.tags = data;
});
}
getBrands(){
  this.productService.getAllBrands().subscribe(data => {
    this.brands = data;
});
}

getWebsites(){
  this.productService.getAllWebsites().subscribe(data => {
    this.websites = data;
});
}

// getProductFamilies(){
//   this.productService.getAllProductFamilies().subscribe(data => {
//     this.productFamilies = data;
// });
// }

updateFilter(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
}


resetFilters(){

    this.numberFilterValue='equals';
    this.lessThan=null;
    this.greaterThan=null;
    this.query=null;
}
getAllProducts(){
    this.productService.getAll().subscribe(data => {
        this.rows = data;
        this.temp = data;
    });

}
searchNow(){
    this.generateParams();
    // if(para){
    //     this.getSearchedResults(para);
    // }
}
generateParams(){
    if( (this.query || this.lessThan || this.greaterThan)  && this.filter )
    {
        let filterAgainst=this.filter.name;
        let params;
        if(this.filter.type != 'number' || (this.filter.type == 'number' && this.numberFilterValue == 'equals') ) {
            filterAgainst == 'All' ? filterAgainst='q' : null;

             params="?"+filterAgainst+"=" +this.query;
            //  return params;
            this.router.navigate(['/products'], { queryParams: { 'queryCall': params,'name':filterAgainst,'type':this.filter.type,'query':this.query} });
        //     this.productService.getFilteredProducts(params).subscribe(resp=>{
        //        if(resp && resp.length){
        //            this.rows=resp;
        //        }
        //    })
        }
        else {
            if (this.numberFilterValue == 'lessThan' && this.lessThan!=null ) {
                params="?"+filterAgainst+"=true&lessThan="+this.lessThan;
            }
            else if (this.numberFilterValue == 'greaterThan' && this.greaterThan!=null ) {
                params="?"+filterAgainst+"=true&greaterThan="+this.greaterThan;
            }
            else if (this.numberFilterValue == 'between' && this.lessThan!=null && this.greaterThan!=null && this.lessThan>=this.greaterThan) {
                params="?"+filterAgainst+"=true&lessThan="+this.lessThan+"&greaterThan="+this.greaterThan;
            }
            else {
                this.ts.typeError("Wrong Filter Value!","Please add valid filters")
                this.router.navigate(['/products']);
                
            }

            let queryObj={};

            queryObj['name']=this.filter.name;
            queryObj['type']=this.filter.type;
            queryObj['numberFilterValue']=this.numberFilterValue;
            params.slice(1).split('&').map(ele=> {  queryObj[ele.split('=')[0]]=ele.split('=')[1] } )
            queryObj['queryCall']=params;

            this.router.navigate(['/products'], { queryParams: queryObj });

            // this.productService.getFilteredProducts(params).subscribe(resp=>{
            //     if(resp && resp.length){
            //         this.rows=resp;
            //     }
            //     else {
            //         this.rows=[];
            //     }
            // })


        }


    }
    else {

        this.ts.typeError("Empty Filter Value!","Please provide a filter value to be filtered on!");
            this.router.navigate(['/products'])
        // let filterAgaints = 'q';
        //  let params="?"+filterAgaints+"=" +this.query;
        //  this.productService.getFilteredProducts(params).subscribe(resp=>{
        //     if(resp && resp.length){
        //         this.rows=resp;
        //     }
        // })
    }

}



getSearchedResults(params){
    this.productService.getFilteredProducts(params).subscribe(resp=>{
        if(resp && resp.length){
            this.rows=resp;
        }
        else {
            this.rows=[];
        }
    })
}
wildSearchNew(){
    // alert(JSON.stringify(this.queryParams))
    // return ;
    if( (this.query || this.lessThan || this.greaterThan)  && this.filter )
    {
        let filterAgainst=this.filter.name;
        let params;
        if(this.filter.type != 'number' || (this.filter.type == 'number' && this.numberFilterValue == 'equals') ) {
            filterAgainst == 'All' ? filterAgainst='q' : null;

             params="?"+filterAgainst+"=" +this.query;
            this.router.navigate(['/products'], { queryParams: { 'queryCall': params,'name':filterAgainst,'type':this.filter.type,'query':this.query} });
            this.productService.getFilteredProducts(params).subscribe(resp=>{
               if(resp && resp.length){
                   this.rows=resp;
               }
           })
        }
        else {
            if (this.numberFilterValue == 'lessThan' && this.lessThan!=null ) {
                params="?"+filterAgainst+"=true&lessThan="+this.lessThan;
            }
            else if (this.numberFilterValue == 'greaterThan' && this.greaterThan!=null ) {
                params="?"+filterAgainst+"=true&greaterThan="+this.greaterThan;
            }
            else if (this.numberFilterValue == 'between' && this.lessThan!=null && this.greaterThan!=null && this.lessThan>=this.greaterThan) {
                params="?"+filterAgainst+"=true&lessThan="+this.lessThan+"&greaterThan="+this.greaterThan;
            }
            else {
                this.ts.typeError("Wrong Filter Value!","Please add valid filters")
                return;
            }
            this.router.navigate(['/products'], { queryParams: { 'query': params} });
            this.productService.getFilteredProducts(params).subscribe(resp=>{
                if(resp && resp.length){
                    this.rows=resp;
                }
                else {
                    this.rows=[];
                }
            })


        }


    } else {

        this.ts.typeError("Empty Filter Value!","Please provide a filter value to be filtered on!")
        this.router.navigate(['/products'])
        // let filterAgaints = 'q';
        //  let params="?"+filterAgaints+"=" +this.query;
        //  this.productService.getFilteredProducts(params).subscribe(resp=>{
        //     if(resp && resp.length){
        //         this.rows=resp;
        //     }
        // })
    }

}
wildSearch(event){
    if (event.key === "Enter") {
        let filterValue=event.target.value;
        console.log(filterValue)
        console.log(this.filter)

        if(filterValue && this.filter){
            let filterAgaints=this.filter.name;
            filterAgaints == 'All' ? filterAgaints='q' : null;

             let params="?"+filterAgaints+"=" +filterValue;
             this.productService.getFilteredProducts(params).subscribe(resp=>{
                if(resp && resp.length){
                    this.rows=resp;
                }
            })
        } else {
            let filterAgaints = 'q';
             let params="?"+filterAgaints+"=" +filterValue;
             this.productService.getFilteredProducts(params).subscribe(resp=>{
                if(resp && resp.length){
                    this.rows=resp;
                }
            })
        }

    }
}

}