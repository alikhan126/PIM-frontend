import { Injectable } from '@angular/core';
// import { BaseHttpService } from '../../services/BaseHttpService';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../constants/app-config';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// import { Adapter } from './Adapter';


// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ProductService  {

  constructor(private http: HttpClient, 
    // private ts: ToastrService
    ) {
    // super(http);
}

add (record: any): Observable<any> {

  return this.http.post<any>(`${AppConfig.URL_Products}`, record).pipe(
    map(x => x ),
    tap((newP: any) => console.log(`added record w/ id=${newP}`)),
    catchError(this.handleError<any>('add'))
  );
}

importProducts (record: any): Observable<any> {

  return this.http.post<any>(`${AppConfig.URL_Import_Products}`, record).pipe(
    map(x => x ),
    catchError(this.handleError<any>('import'))
  );
}

addAdapters (record: any): Observable<any> {

  return this.http.post<any>(`${AppConfig.URL_Adapters}`, record).pipe(
    map(x => x ),
    catchError(this.handleError<any>('Adapters'))
  );
}

addExportAdapters (record: any): Observable<any> {

  return this.http.post<any>(`${AppConfig.URL_EXPORT_Adapters}`, record).pipe(
    map(x => x ),
    catchError(this.handleError<any>('Adapters'))
  );
}


getFieldPermissions(id){
  return this.http.get<any>(`${AppConfig.URL_ProductPermissionCheck + "?user="}${id}`).pipe(
    map(x => x ),
    tap(_ => console.log(`get record=${id}`)),
    catchError(this.handleError<any>('getRecord'))
  );
}

getAdapters() 
{

  return this.http.get<any []>(`${AppConfig.URL_Adapters}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

getExportAdapters() 
{

  return this.http.get<any []>(`${AppConfig.URL_EXPORT_Adapters}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

getNotifications() 
{

  return this.http.get<any []>(`${AppConfig.URL_Notifications}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched notifications')),
    catchError(this.handleError('getRecord', []))
  );
}


getAll() 
{

  return this.http.get<any []>(`${AppConfig.URL_Products}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

getFilteredProducts(params) 
{

  return this.http.get<any []>(`${AppConfig.URL_Search_Products}${params}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

get(id){
  return this.http.get<any>(`${AppConfig.URL_Products}${id}/`).pipe(
    map(x => x ),
    tap(_ => console.log(`get record=${id}`)),
    catchError(this.handleError<any>('getRecord'))
  );
}


getFildsToImport(){
  return this.http.get<any []>(`${AppConfig.URL_Fields}`)
  .pipe(
    map(x => x ),
    catchError(this.handleError('getRecord', []))
  );
}
getAllImages() 
{

  return this.http.get<any []>(`${AppConfig.URL_Images}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

getAllTags() 
{

  return this.http.get<any []>(`${AppConfig.URL_Tags}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

getAllWebsites() 
{

  return this.http.get<any []>(`${AppConfig.URL_Websites}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

getAllCategories() 
{

  return this.http.get<any []>(`${AppConfig.URL_Categories}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

getAllBrands() 
{

  return this.http.get<any []>(`${AppConfig.URL_Brands}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}


getAllProductFamilies() 
{

  return this.http.get<any []>(`${AppConfig.URL_ProductFamilies}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}


getAllTaxes () {
  return this.http.get<any []>(`${AppConfig.URL_Taxes}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}






// delete (record: any | number): Observable<any> {
//   const id = typeof record === 'number' ? record : record.id;
//   const url = `${AppConfig.URL_Products}${id}`;

//   return this.http.delete<Dealer>(url).pipe(
//     map(x => x["data"] ),
//     tap(_ => this.log(`deleted dealer id=${id}`)),
//     catchError(this.handleError<Dealer>('deleteDealer'))
//   );
// }

update (record: any): Observable<any> {
  return this.http.put(`${AppConfig.URL_Products}${record["id"]}/`, record).pipe(
    tap(_ => this.log(`updated record id=${record["id"]}`)),
    catchError(this.handleError<any>('updateRecord'))
  );
}

delete(id){
  return this.http.delete<any>(`${AppConfig.URL_Products}${id}/`).pipe(
    map(x => x ),
    tap(_ => console.log(`delete record=${id}`)),
    catchError(this.handleError<any>('deleteRecord'))
  );
}





private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    // alert(error);
    console.log(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    // this.log(`${operation} failed: ${error.message}`);
    // this.ts.error("Failed to Perform Operation");
    // // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

/** Log a  message with the MessageService */
private log(message: string) {
  //  alert(message)
    console.log(message)
  // this.ts.success("Operation Performed Successfully");
  // this.messageService.add(`DealerService: ${message}`);
}

}
