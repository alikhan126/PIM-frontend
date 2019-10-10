import { Component,OnInit } from '@angular/core';
import { ProductService} from '../products.service';
import { Router } from '@angular/router';

declare var require: any;
// const data: any = require('../../shared/data/company.json');

@Component({
    selector: 'app-dt-basic',
    templateUrl: './productViews.component.html',
    styleUrls: ['./productViews.component.scss']
})

export class ProductViewsComponent {
    editing = {};
    rows = [];
    products :any[];
    totalRecords:number;
    temp = [];
    constructor(private productService: ProductService, private router: Router) {
    }
    ngOnInit() {
        this.productService.getAll().subscribe(data => {
            this.rows = data['results'];
            this.temp = data['results'];
            console.log(this.rows)
        });
    }
    loadingIndicator: boolean = true;
    reorderable: boolean = true;

    // DataTable Content Titles
    columns = [
        { prop: 'name' },
        { name: 'Type' },
        { name: 'SKU' },
        { name: 'MPN' },
        { name: 'EAN' },
        { name: 'Amount' },
        { name: 'Description' },
        { name: 'Tax Class Name' },
        { name: 'Short Description' },
        { name: 'Weight' },
        { name: 'Products Online' },
        { name: 'Visibility' },
        { name: 'Price' },
        { name: 'Special Price' },
        { name: 'Special Price From Date' },
        { name: 'Special Price To Date' },
        { name: 'Meta Title' },
        { name: 'Meta Keywords' },
        { name: 'Meta Description' },
        { name: 'Map Price' },
        { name: 'mapEnabled' },
        { name: 'giftMessageAvailable' },
        { name: 'customDesign' },
        { name: 'customDesignFrom' },
        { name: 'customDesignTo' },
        { name: 'customLayoutUpdate' },
        { name: 'pageLayout' },
        { name: 'productOptions_container' },
        { name: 'msrpDisplayActualPriceType' },
        { name: 'countryOfManufacture' },
        { name: 'quantity' },
        { name: 'outOfStockQuantity' },
        { name: 'useConfigMinQty' },
        { name: 'isQtyDecimal' },
        { name: 'outOfStock' },
        { name: 'Allow Backorders' },
        { name: 'useConfigBackorders' },
        { name: 'minCartQty' },
        { name: 'useConfigMinSaleQty' },
        { name: 'maxCartQty' },
        { name: 'useConfigMaxSaleQty' },
        { name: 'isInStock' },
        { name: 'notifyOnStockBelow' },
        { name: 'useConfigNotifyStockQty' },
        { name: 'manageStock' },
        { name: 'useConfigManageStock' },
        { name: 'useConfigQtyIncrements' },
        { name: 'qtyIncrements' },
        { name: 'useConfigEnableQtyInc' },
        { name: 'enableQtyIncrements' },
        { name: 'hideFromProductPage' },
        { name: 'customOptions' },
        { name: 'bundlePriceType' },
        { name: 'bundleSkuType' },
        { name: 'bundlePriceView' },
        { name: 'bundleValues' },
        { name: 'bundleShipmentType' },
        { name: 'configurableVariations' },
        { name: 'configurableVariations' },
        { name: 'allergenContent' },
        { name: 'caseQuantity' },
        { name: 'distributor' },
        { name: 'foodNutrition' },
        { name: 'foodPropertyContent' },
        { name: 'foodPropertiesList' },
        { name: 'fsdCategoryReference' },
        { name: 'fsdProductsReference' },
        { name: 'fsdProductReference' },
        { name: 'giftWrappingAvailable' },
        { name: 'skuHeight' },
        { name: 'skuLength' },
        { name: 'skuWidth' },
        { name: 'shelfLife' },
        { name: 'shippingTemp' },
        { name: 'shippingWeight' },
        { name: 'shipsIn' },
        { name: 'stockType' },
        { name: 'tsDimensionsHeight' },
        { name: 'tsDimensionsLength' },
        { name: 'tsDimensionsWidth' },
        { name: 'unitAmount' },
        { name: 'unitAmountType' },
        { name: 'upc' },
        { name: 'volume' },
        { name: 'bulletPoints' },
        { name: 'h1Tag' },
        { name: 'h2Tag' },
        { name: 'h3Tag' },
        { name: 'altTag' },
        { name: 'isDecimalDivided' },
        { name: 'crosssellPosition' },
        { name: 'upsellSkus' },
        { name: 'upsellPosition' },
        { name: 'deferredStockUpdate' },
        { name: 'brand' },
        { name: 'category' },
        { name: 'tags' },
        { name: 'images' },
        { name: 'websites' },
    ];
    // constructor() {
    //     this.rows = data;
    //     setTimeout(() => { this.loadingIndicator = false; }, 1500);
    // }

    getRowHeight(row) {
      return row.height;
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
    
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
    
        // update the rows
        this.rows = temp;
    }
}
