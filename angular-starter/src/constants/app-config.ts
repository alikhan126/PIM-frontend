import { environment } from '../environments/environment';

export class AppConfig {
    public static URL_AppBase: string = environment.appRoot;
    public static URL_Products: string = AppConfig.URL_AppBase + 'api/v1/product/';
    public static URL_Import_Products: string = AppConfig.URL_AppBase + 'api/v1/import/product/';
    public static URL_Adapters: string = AppConfig.URL_AppBase + 'api/v1/adapters/';
    public static URL_ProductPermissionCheck: string = AppConfig.URL_AppBase + 'api/v1/fields/product/';
    public static URL_ProductPermission: string = AppConfig.URL_AppBase + 'api/v1/fields/products/';
    public static URL_BrandPermissionCheck: string = AppConfig.URL_AppBase + 'api/v1/fields/brand/';
    public static URL_BrandPermission: string = AppConfig.URL_AppBase + 'api/v1/fields/brands/';

    public static URL_Images: string = AppConfig.URL_AppBase + 'api/v1/images/';
    public static URL_Fields: string = AppConfig.URL_AppBase + 'api/v1/product/fields/';
    public static URL_Tags: string = AppConfig.URL_AppBase + 'api/v1/tags/';
    public static URL_Roles: string = AppConfig.URL_AppBase + 'api/v1/roles/';
    public static URL_Users: string = AppConfig.URL_AppBase + 'api/v1/users/';
    public static URL_Websites: string = AppConfig.URL_AppBase + 'api/v1/websites/';
    public static URL_Categories: string = AppConfig.URL_AppBase + 'api/v1/categories/';
    public static URL_Manfracturer: string = AppConfig.URL_AppBase + 'api/v1/manfracturer/';
    public static URL_Brands: string = AppConfig.URL_AppBase + 'api/v1/brands/';
    public static URL_ProductFamilies: string = AppConfig.URL_AppBase + 'api/v1/productfamily/';
    public static URL_Taxes: string = AppConfig.URL_AppBase + 'api/v1/tax/';
    public static URL_SignIn: string = AppConfig.URL_AppBase + 'auth/sign-in/';
    public static URL_SignUp: string = AppConfig.URL_AppBase + 'auth/sign-up/';

}
