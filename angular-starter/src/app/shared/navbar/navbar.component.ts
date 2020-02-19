import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  activities:any=[];
  read:any=[];
  notifications_previous:string;
  notifications_next:string;
  notifications_count:string;
  query:string;
  count:string;
  rows = [];
  closeResult: string;

  constructor(public translate: TranslateService, private layoutService: LayoutService, private configService:ConfigService,private authService:AuthService, private modalService: NgbModal, private productService: ProductService, private brandService: BrandService,private categoryService: CategoryService,private manufacturerService: ManufacturerService,private tagService: TagService,private websiteService: WebsiteService) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");
    this.getNotifications();
    this.getNotificationsCount();
    console.log(this.getNotifications());
    this.getActivityNotifications();
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
  }

  open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    // This function is used in open
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
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
    this.query = ""
    this.productService.getNotifications(this.query).subscribe(data => {
      this.notifications = data['results'];
      this.notifications_count = data['count'];
      this.notifications_next = data['next'];
      this.notifications_previous = data['previous'];
    });
  }

  getActivityNotifications(){
    this.productService.getActivityNotification().subscribe(data => {
      this.activities = data;
    });
  }

  getNotificationsCount(){
    this.productService.getNotificationsCount().subscribe(data => {
      this.count = data['count'];
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
          this.getNotificationsCount();
        });
      });
    });
  }

  deleteModal(id, modules, value, action){
    if(action == "Create"){
      if (modules == "Product"){
        this.productService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.productService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Brand") {
        this.brandService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.brandService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Catalog") {
         // Implement Catalogs
      } else if(modules == "Category") {
        this.categoryService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.categoryService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Tag") {
        this.tagService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.tagService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Website") {
        this.websiteService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.websiteService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Manufacturer") {
        this.manufacturerService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.manufacturerService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      }
    } else if(action=="Update"){
      console.log("Updated")

    }

  }


  updateModal(id, modules, value, action, unapproved_id){
    if (action == "Create"){
      if (modules == "Product"){
        this.productService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.productService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Brand") {
        this.brandService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.brandService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Catalog") {
         // Implement Catalogs
      } else if(modules == "Category") {
        this.categoryService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.categoryService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Tag") {
        this.tagService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.tagService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Website") {
        this.websiteService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.websiteService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Manufacturer") {
        this.manufacturerService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.manufacturerService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      }
    } else if (action == "Update"){
      if (modules == "Product"){
        this.productService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['unapproved_id'] = unapproved_id
          this.rows['hidden'] = value
          this.productService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Brand") {
        this.brandService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['unapproved_id'] = unapproved_id
          this.rows['hidden'] = value
          this.brandService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Catalog") {
         // Implement Catalogs
      } else if(modules == "Category") {
        this.categoryService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['unapproved_id'] = unapproved_id
          this.rows['hidden'] = value
          this.categoryService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Tag") {
        this.tagService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['unapproved_id'] = unapproved_id
          this.rows['hidden'] = value
          this.tagService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Website") {
        this.websiteService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['unapproved_id'] = unapproved_id
          this.rows['hidden'] = value
          this.websiteService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Manufacturer") {
        this.manufacturerService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['unapproved_id'] = unapproved_id
          this.rows['hidden'] = value
          this.manufacturerService.update(this.rows).subscribe(data => {
              this.rows = data;
          });
        });
      }
    } else if (action == "Delete"){
      if (modules == "Product"){
        this.productService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.productService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Brand") {
        this.brandService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.brandService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Catalog") {
         // Implement Catalogs
      } else if(modules == "Category") {
        this.categoryService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.categoryService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Tag") {
        this.tagService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.tagService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Website") {
        this.websiteService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.websiteService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      } else if(modules == "Manufacturer") {
        this.manufacturerService.get(id).subscribe(data => {
          this.rows = data;
          this.rows['hidden'] = value
          this.manufacturerService.delete(this.rows['id']).subscribe(data => {
              this.rows = data;
          });
        });
      }
    }
  }

  logOut(){
    this.authService.logout();
  }
}
