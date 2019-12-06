import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';

import { BrandService } from '../../pages/brands/brands.service';
import { CategoryService } from '../../pages/categories/category.service';
import { ManufacturerService } from '../../pages/manfacturer/manufacturer.service';
import { TagService} from '../../pages/tags/tags.service';
import { WebsiteService} from '../../pages/websites/websites.service';
import { ProductService} from '../../pages/products/products.service';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  currentLang = "en";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};
  notifications:any=[];
  read:any=[];
  notifications_previous:string;
  notifications_next:string;
  notifications_count:string;
  query:string;
  rows = [];


  constructor(public translate: TranslateService, private layoutService: LayoutService, private configService:ConfigService,private authService:AuthService, private productService: ProductService, private brandService: BrandService,private categoryService: CategoryService,private manufacturerService: ManufacturerService,private tagService: TagService,private websiteService: WebsiteService) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");
    this.getNotifications();
    console.log(this.notifications);
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
  }

  ngAfterViewInit() {
    if(this.config.layout.dir) {
      const dir = this.config.layout.dir;
        if (dir === "rtl") {
          this.placement = "bottom-left";
        } else if (dir === "ltr") {
          this.placement = "bottom-right";
        }
    }
  }


  ChangeLanguage(language: string) {
    this.translate.use(language);
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName("app-sidebar")[0];
    if (appSidebar.classList.contains("hide-sidebar")) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }

  getNotifications(){
    this.query = "?is_read=False"
    this.productService.getNotifications(this.query).subscribe(data => {
      this.notifications = data['results'];
      this.notifications_count = data['count'];
      this.notifications_next = data['next'];
      this.notifications_previous = data['previous'];
    });
  }

  readNotifications(){
    this.productService.readNotification().subscribe(data => {
      this.productService.getNotifications(this.query).subscribe(data => {
        this.notifications = data['results'];
        this.notifications_count = data['count'];
        this.notifications_next = data['next'];
        this.notifications_previous = data['previous'];
      });
    });
  }

  updateNotifications(id){
    this.productService.getNotification(id).subscribe(data => {
      this.rows = data;
      this.rows['is_read'] = true
      this.productService.updateNotification(this.rows).subscribe(data => {
          this.productService.getNotifications(this.query).subscribe(data => {
          this.notifications = data['results'];
          this.notifications_count = data['count'];
          this.notifications_next = data['next'];
          this.notifications_previous = data['previous'];
        });
      });
    });
  }


  updateModal(id, modules){
    if (modules == "Product"){
      this.productService.get(id).subscribe(data => {
        this.rows = data;
        this.rows['hidden'] = false
        this.productService.update(this.rows).subscribe(data => {
            this.rows = data;
        });
      });
    } else if(modules == "Brand") {
      this.brandService.get(id).subscribe(data => {
        this.rows = data;
        this.rows['hidden'] = false
        this.brandService.update(this.rows).subscribe(data => {
            this.rows = data;
        });
      });
    } else if(modules == "Catalog") {
       // Implement Catalogs
    } else if(modules == "Category") {
      this.categoryService.get(id).subscribe(data => {
        this.rows = data;
        this.rows['hidden'] = false
        this.categoryService.update(this.rows).subscribe(data => {
            this.rows = data;
        });
      });
    } else if(modules == "Tag") {
      this.tagService.get(id).subscribe(data => {
        this.rows = data;
        this.rows['hidden'] = false
        this.tagService.update(this.rows).subscribe(data => {
            this.rows = data;
        });
      });
    } else if(modules == "Website") {
      this.websiteService.get(id).subscribe(data => {
        this.rows = data;
        this.rows['hidden'] = false
        this.websiteService.update(this.rows).subscribe(data => {
            this.rows = data;
        });
      });
    } else if(modules == "Manufacturer") {
      this.manufacturerService.get(id).subscribe(data => {
        this.rows = data;
        this.rows['hidden'] = false
        this.manufacturerService.update(this.rows).subscribe(data => {
            this.rows = data;
        });
      });
    }
  }

  logOut(){
    this.authService.logout();
  }
}
