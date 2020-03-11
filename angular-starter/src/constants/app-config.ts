import { environment } from '../environments/environment';

export class AppConfig {
    public static URL_AppBase: string = environment.appRoot;
    public static URL_Products: string = AppConfig.URL_AppBase + 'api/v1/product/';
    public static URL_Images: string = AppConfig.URL_AppBase + 'api/v1/images/';
    public static URL_Tags: string = AppConfig.URL_AppBase + 'api/v1/tags/';
    public static URL_Websites: string = AppConfig.URL_AppBase + 'api/v1/websites/';
    public static URL_Categories: string = AppConfig.URL_AppBase + 'api/v1/categories/';
    public static URL_Brands: string = AppConfig.URL_AppBase + 'api/v1/brands/';
    public static URL_ProductFamilies: string = AppConfig.URL_AppBase + 'api/v1/productfamily/';
    public static URL_Taxes: string = AppConfig.URL_AppBase + 'api/v1/tax/';
    public static URL_SignIn: string = AppConfig.URL_AppBase + 'auth/sign-in/';
    public static URL_SignUp: string = AppConfig.URL_AppBase + 'auth/sign-up/';

}
