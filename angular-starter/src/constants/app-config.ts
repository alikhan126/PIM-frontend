import { environment } from '../environments/environment';

export class AppConfig {
    public static URL_AppBase: string = environment.appRoot;
    public static URL_Products: string = AppConfig.URL_AppBase + 'api/v1/product/';

}
