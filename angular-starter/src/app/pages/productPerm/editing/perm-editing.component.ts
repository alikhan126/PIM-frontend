import { Component,OnInit } from '@angular/core';
import { PermissionService} from '../perm.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


declare var require: any;

@Component({
    selector: 'app-dt-editing',
    templateUrl: './perm-editing.component.html',
    styleUrls: ['./perm-editing.component.scss']
})

export class PermEditComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    temp = [];
    roles =[];
    permission :string;
    closeResult: string;

    // @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

    constructor(private modalService: NgbModal, private permissionService: PermissionService, private router: Router) {
    }
    ngOnInit() {
        this.getRoles();
        this.permissionService.getAll().subscribe(data => {
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

    PRODUCT_FIELD_CHOICES = [
        {name : 'Name'},
        {name : 'Type'},
        {name : 'Sku'},
        {name : 'Mpn'},
        {name : 'Ean'},
        {name : 'Amount'},
        {name : 'Description'},
        {name : 'Taxclassname'},
        {name : 'AttributeSetCode'},
        {name : 'Shortdescription'},
        {name : 'Weight'},
        {name : 'Productsonline'},
        {name : 'Visibility'},
        {name : 'Price'},
        {name : 'Specialprice'},
        {name : 'Specialpricefromdate'},
        {name : 'Specialpricetodate'},
        {name : 'Metatitle'},
        {name : 'Metakeywords'},
        {name : 'Metadescription'},
        {name : 'Mapprice'},
        {name : 'Msrpprice'},
        {name : 'Mapenabled'},
        {name : 'Giftmessageavailable'},
        {name : 'Customdesign'},
        {name : 'Customdesignfrom'},
        {name : 'Customdesignto'},
        {name : 'Customlayoutupdate'},
        {name : 'Pagelayout'},
        {name : 'Productoptionscontainer'},
        {name : 'Msrpdisplayactualpricetype'},
        {name : 'Countryofmanufacture'},
        {name : 'Quantity'},
        {name : 'Outofstockquantity'},
        {name : 'Useconfigminqty'},
        {name : 'Isqtydecimal'},
        {name : 'Outofstock'},
        {name : 'Allowbackorders'},
        {name : 'Useconfigbackorders'},
        {name : 'Mincartqty'},
        {name : 'Useconfigminsaleqty'},
        {name : 'Maxcartqty'},
        {name : 'Useconfigmaxsaleqty'},
        {name : 'Isinstock'},
        {name : 'Notifyonstockbelow'},
        {name : 'Useconfignotifystockqty'},
        {name : 'Managestock'},
        {name : 'Useconfigmanagestock'},
        {name : 'Useconfigqtyincrements'},
        {name : 'Qtyincrements'},
        {name : 'Useconfigenableqtyinc'},
        {name : 'Enableqtyincrements'},
        {name : 'Hidefromproductpage'},
        {name : 'Customoptions'},
        {name : 'Bundlepricetype'},
        {name : 'Bundleskutype'},
        {name : 'Bundlepriceview'},
        {name : 'Bundlevalues'},
        {name : 'Bundleshipmenttype'},
        {name : 'Configurablevariations'},
        {name : 'Configurablevariationlabels'},
        {name : 'Allergencontent'},
        {name : 'Casequantity'},
        {name : 'Distributor'},
        {name : 'Foodnutrition'},
        {name : 'Foodpropertycontent'},
        {name : 'Foodpropertieslist'},
        {name : 'Fsdcategoryreference'},
        {name : 'Fsdproductsreference'},
        {name : 'Fsdproductreference'},
        {name : 'Giftwrappingavailable'},
        {name : 'Skuheight'},
        {name : 'Skulength'},
        {name : 'Skuwidth'},
        {name : 'Shelflife'},
        {name : 'Shippingtemp'},
        {name : 'Shippingweight'},
        {name : 'Shipsin'},
        {name : 'Stocktype'},
        {name : 'Tsdimensionsheight'},
        {name : 'Tsdimensionslength'},
        {name : 'Tsdimensionswidth'},
        {name : 'Unitamount'},
        {name : 'Unitamounttype'},
        {name : 'Upc'},
        {name : 'Volume'},
        {name : 'Bulletpoints'},
        {name : 'H1tag'},
        {name : 'H2tag'},
        {name : 'H3tag'},
        {name : 'Alttag'},
        {name : 'Isdecimaldivided'},
        {name : 'Crosssellskus'},
        {name : 'Crosssellposition'},
        {name : 'Upsellskus'},
        {name : 'Upsellposition'},
        {name : 'Deferredstockupdate'},
        {name : 'Brand'},
        {name : 'Tags'},
        {name : 'Websites'},
        {name : 'Images'},
        {name : 'Category'},
    ]

    // Editing content code
    updateValue(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.permissionService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.permissionService.update(this.rows[rowIndex]).subscribe(data => {
                this.permissionService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    updateRelationship(value, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.permissionService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = value;
            this.permissionService.update(this.rows[rowIndex]).subscribe(data => {
                this.permissionService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    updateRelationshipValue(value, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.permissionService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = value;
            this.permissionService.update(this.rows[rowIndex]).subscribe(data => {
                this.permissionService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    deleteRole(event, cell, rowIndex) {
        this.editing[rowIndex + '-' + cell] = false;
        this.permissionService.get(this.rows[rowIndex]['id']).subscribe(data => {
            this.rows[rowIndex] = data;
            this.rows[rowIndex][cell] = event.target.value;
            this.permissionService.delete(this.rows[rowIndex]['id']).subscribe(data => {
                this.permissionService.getAll().subscribe(data => {
                    this.rows = data;
                });
            });
        });
    }

    addPerm(){
        this.router.navigate(['/fields/0']);

    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val || d.manufacturer['name'].toLowerCase().indexOf(val) !== -1;
        });

        // update the rows
        this.rows = temp;
    }

    getRoles(){
            this.permissionService.getAllRoles().subscribe(data => {
            this.roles = data;
        });
    }

}