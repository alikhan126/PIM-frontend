import { environment } from '../environments/environment';

export class AppConfig {
    public static URL_AppBase: string = environment.appRoot;
    public static URL_Products: string = AppConfig.URL_AppBase + 'api/v1/product/';
    public static URL_Search_Products: string = AppConfig.URL_AppBase + 'api/v1/search_product/';
    public static URL_Import_Products: string = AppConfig.URL_AppBase + 'api/v1/import/product/';
    public static URL_Adapters: string = AppConfig.URL_AppBase + 'api/v1/adapters/';
    public static URL_EXPORT_Adapters: string = AppConfig.URL_AppBase + 'api/v1/export_adapters/';
    public static URL_CATALOGS: string = AppConfig.URL_AppBase + 'api/v1/catalogs/';
    public static UPLOAD_IMAGE: string = AppConfig.URL_AppBase + 'api/v1/s3imageparams/';
    public static UPLOAD_PDF: string = AppConfig.URL_AppBase + 'api/v1/s3pdfparams/';
    public static AMAZONS3_UPLOAD: string = 'http://foodservicedirect.com.s3.amazonaws.com/';


    public static URL_ProductPermission: string = AppConfig.URL_AppBase + 'api/v1/fields/products/';
    public static URL_BrandPermission: string = AppConfig.URL_AppBase + 'api/v1/fields/brands/';
    public static URL_CategoryPermission: string = AppConfig.URL_AppBase + 'api/v1/fields/category/';
    public static URL_ManufacturerPermission: string = AppConfig.URL_AppBase + 'api/v1/fields/manfracturers/';
    public static URL_CatalogPermission: string = AppConfig.URL_AppBase + 'api/v1/fields/catalogs/';
    public static URL_TagPermission: string = AppConfig.URL_AppBase + 'api/v1/fields/tags/';
    public static URL_AdaptersPermission: string = AppConfig.URL_AppBase + 'api/v1/fields/adapters/';
    public static URL_WebsitePermission: string = AppConfig.URL_AppBase + 'api/v1/fields/websites/';

    public static URL_ProductPermissionCheck: string = AppConfig.URL_AppBase + 'api/v1/fields/product/';
    public static URL_UserRole: string = AppConfig.URL_AppBase + 'api/v1/user_role/';
    public static URL_BrandPermissionCheck: string = AppConfig.URL_AppBase + 'api/v1/fields/brand/';
    public static URL_CategoryPermissionCheck: string = AppConfig.URL_AppBase + 'api/v1/fields/categories/';
    public static URL_ManufacturerPermissionCheck: string = AppConfig.URL_AppBase + 'api/v1/fields/manfracturer/';
    public static URL_CatalogPermissionCheck: string = AppConfig.URL_AppBase + 'api/v1/fields/catalog/';
    public static URL_TagPermissionCheck: string = AppConfig.URL_AppBase + 'api/v1/fields/tag/';
    public static URL_AdapterPermissionCheck: string = AppConfig.URL_AppBase + 'api/v1/fields/adapter/';
    public static URL_WebsitePermissionCheck: string = AppConfig.URL_AppBase + 'api/v1/fields/website/';

    public static URL_Images: string = AppConfig.URL_AppBase + 'api/v1/images/';
    public static URL_Videos: string = AppConfig.URL_AppBase + 'api/v1/videos/';
    public static URL_PDF: string = AppConfig.URL_AppBase + 'api/v1/pdfs/';
    public static URL_Fields: string = AppConfig.URL_AppBase + 'api/v1/product/fields/';
    public static URL_Tags: string = AppConfig.URL_AppBase + 'api/v1/tags/';
    public static URL_Roles: string = AppConfig.URL_AppBase + 'api/v1/roles/';
    public static URL_Role: string = AppConfig.URL_AppBase + 'api/v1/role/';
    public static URL_AssignRoles: string = AppConfig.URL_AppBase + 'api/v1/assing_role/';
    public static URL_Users: string = AppConfig.URL_AppBase + 'api/v1/users/';
    public static URL_Websites: string = AppConfig.URL_AppBase + 'api/v1/websites/';
    public static URL_Categories: string = AppConfig.URL_AppBase + 'api/v1/categories/';
    public static URL_Manfracturer: string = AppConfig.URL_AppBase + 'api/v1/manfracturer/';
    public static URL_Brands: string = AppConfig.URL_AppBase + 'api/v1/brands/';
    public static URL_ProductFamilies: string = AppConfig.URL_AppBase + 'api/v1/productfamily/';
    public static URL_Taxes: string = AppConfig.URL_AppBase + 'api/v1/tax/';
    public static URL_Notifications: string = AppConfig.URL_AppBase + 'api/v1/notifications/';
    public static URL_ReadNotifications: string = AppConfig.URL_AppBase + 'api/v1/read_notifications/';
    public static URL_NotificationsCount: string = AppConfig.URL_AppBase + 'api/v1/unread_count/';
    public static URL_SignIn: string = AppConfig.URL_AppBase + 'auth/sign-in/';
    public static URL_SignUp: string = AppConfig.URL_AppBase + 'auth/sign-up/';
    public static URL_ForgotPassword: string = AppConfig.URL_AppBase + 'auth/forgotpassword/';
    public static URL_ForgotPasswordConfirm: string = AppConfig.URL_AppBase + 'auth/forgot_password_confirm/';
    public static URL_ChangePassword: string = AppConfig.URL_AppBase + 'auth/update_password/';

}
