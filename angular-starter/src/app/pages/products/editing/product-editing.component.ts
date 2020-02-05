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
    roles = [];
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
    FSD:any=[];
    closeResult: string;
    permission: string;
    perm: string;
    ShipsFree:any=[];
    NevershipsFree:any=[];
    IncludedinTreshold:any=[];

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
        this.getUserRole();
        this.getWebsites();
        this.getTags();
        this.getBrands();
        this.getCategories();
        this.getFields();
        this.Simple = "simple";
        this.Grouped = "grouped";
        this.Configurable = "configurable";
        this.Virtual = "virtual";
        this.Bundle = "bundle";
        this.Downloadable = "downloadable";
        this.Catalog = "Catalog";
        this.Search = "Search";
        this.NotVisibleIndividually = "Not Visible Individually";
        this.FoodProducts = "Food Products";
        this.NonFoodProducts = "Non Food Products";
        this.Stocked = "Stocked";
        this.SpecialOrder = "Special Order";
        this.FromPartners = "From Partners";
        this.FSD = "FSD";
        this.ShipsFree = "Ships Free";
        this.NevershipsFree = "Never ships Free";
        this.IncludedinTreshold = "Included in Treshold";
    }

    VISIBILITY_CHOICES = [
        {name : 'Search'},
        {name : 'Catalog'},
        {name : 'Not Visible Individually'},
      ]

    

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
        if (user.is_admin == false){
            this.permission = "Update";
            this.perm = "All";
            let cellvalue = this.titleCaseWord(cell);
            if(this.roles['products'].includes(this.perm) || this.roles['products'].includes(this.permission) ){
                this.productService.getFieldPermissions(user.role).subscribe(data => {
                    if(data[0].edit.includes(cellvalue)){
                        this.editing[rowIndex + '-' + cell] = false;
                        this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                            this.rows[rowIndex] = data;
                            this.rows[rowIndex][cell] = event.target.value;
                            this.productService.update(this.rows[rowIndex]).subscribe(data => {
                                this.toastService.typeSuccessCustom("Success","Your product request is submitted for Admin's approval")
                                this.productService.getAll().subscribe(data => {
                                    this.rows = data;
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
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.productService.update(this.rows[rowIndex]).subscribe(data => {
                    this.productService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
        }
    }

    deleteProduct(event, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Delete";
            this.perm = "All";
            if(this.roles['products'].includes(this.perm) || this.roles['products'].includes(this.permission)){
                this.editing[rowIndex + '-' + cell] = false;
                this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                    this.rows[rowIndex] = data;
                    this.rows[rowIndex][cell] = event.target.value;
                    this.productService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                        this.toastService.typeSuccessCustom("Success","Your product request is submitted for Admin's approval")
                        this.productService.getAll().subscribe(data => {
                            this.rows = data;
                        });
                    });
                });
            } else {
                alert("You don't have access to delete products!");
            }
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = event.target.value;
                this.productService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                    this.productService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
        }
    }

    updateRelationshipValue(value, cell, rowIndex) {
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Update";
            this.perm = "All";
            let cellvalue = this.titleCaseWord(cell);
            if(this.roles['products'].includes(this.perm) || this.roles['products'].includes(this.permission)){
                this.productService.getFieldPermissions(user.role).subscribe(data => {
                    if(data[0].edit.includes(cellvalue)){
                        this.editing[rowIndex + '-' + cell] = false;
                        this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                            this.rows[rowIndex] = data;
                            this.rows[rowIndex][cell] = value;
                            this.productService.update(this.rows[rowIndex]).subscribe(data => {
                                this.toastService.typeSuccessCustom("Success","Your product request is submitted for Admin's approval")
                                this.productService.getAll().subscribe(data => {
                                    this.rows = data;
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
        } else {
            this.editing[rowIndex + '-' + cell] = false;
            this.productService.get(this.rows[rowIndex]['id']).subscribe(data => {
                this.rows[rowIndex] = data;
                this.rows[rowIndex][cell] = value;
                this.productService.update(this.rows[rowIndex]).subscribe(data => {
                    this.productService.getAll().subscribe(data => {
                        this.rows = data;
                    });
                });
            });
        }
    }

    addProduct(){
        let user=JSON.parse(localStorage.getItem('currentUser'));
        if (user.is_admin == false){
            this.permission = "Create";
            this.perm = "All";
            if(this.roles['products'].includes(this.perm) || this.roles['products'].includes(this.permission)){
                this.router.navigate(['/products/0']);
            } else {
                alert("You don't have access to add products!");
            }
        } else {
            this.router.navigate(['/products/0']);
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

getUserRole(){
    let user=JSON.parse(localStorage.getItem('currentUser'));
    this.productService.getUserRole(user.user_id).subscribe(data => {
      this.roles = data['role'];
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
    this.getAllProducts();
    this.navigateToProducts();
}
getAllProducts(){
    this.productService.getAll().subscribe(data => {
        this.rows = data;
        this.temp = data;
    });

}
searchNow(){
    this.rows=[];
    this.generateParams();
    // if(para){
    //     this.getSearchedResults(para);
    // }
}

navigateToProducts(){
    this.router.navigate(['/products']);
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