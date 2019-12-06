import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
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


  constructor(public translate: TranslateService, private layoutService: LayoutService, private configService:ConfigService,private authService:AuthService, private productService: ProductService) {
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
      this.read = data;
    });
  }

  updateModal(id, modules){
    if (modules == "Product"){
      this.productService.get('id').subscribe(data => {
        this.rows = data;
        this.rows['hidden'] = false
        console.log(this.rows);
        this.productService.update(this.rows['id']).subscribe(data => {
            this.productService.getAll().subscribe(data => {
                this.rows = data;
                console.log(this.rows)
            });
        });
    });
    };
  }

  logOut(){
    this.authService.logout();
  }
}
