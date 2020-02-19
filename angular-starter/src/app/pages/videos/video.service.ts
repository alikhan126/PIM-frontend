import { Injectable } from '@angular/core';
// import { BaseHttpService } from '../../services/BaseHttpService';
import { HttpHeaders ,HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../constants/app-config';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// import { Adapter } from './Adapter';


// import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class  VideoService  {

  constructor(private http: HttpClient, 
    // private ts: ToastrService
    ) {
    // super(http);
}

getFieldPermissions(id){
  return this.http.get<any>(`${AppConfig.URL_TagPermissionCheck + "?role="}${id}`).pipe(
    map(x => x ),
    tap(_ => console.log(`get record=${id}`)),
    catchError(this.handleError<any>('getRecord'))
  );
}

add (record: any): Observable<any> {

  return this.http.post<any>(`${AppConfig.URL_Videos}`, record).pipe(
    map(x => x ),
    tap((newP: any) => console.log(`added record w/ id=${newP}`)),
    catchError(this.handleError<any>('add'))
  );
}

getAll() 
{

  return this.http.get<any []>(`${AppConfig.URL_Videos}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

getAllHidden() 
{

  return this.http.get<any []>(`${AppConfig.URL_Videos + "unapproved/" }`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

get(id){
  return this.http.get<any>(`${AppConfig.URL_Videos}${id}/`).pipe(
    map(x => x ),
    tap(_ => console.log(`get record=${id}`)),
    catchError(this.handleError<any>('getRecord'))
  );
}


getImageParams(){
  return this.http.get<any>(`${AppConfig.UPLOAD_IMAGE}`).pipe(
    map(x => x ),
    tap(_ => console.log(`get record`)),
    catchError(this.handleError<any>('getRecord'))
  );
}

getAllImages() 
{

  return this.http.get<any []>(`${AppConfig.URL_Videos}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

getAllTags() 
{

  return this.http.get<any []>(`${AppConfig.URL_Videos}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

getAllWebsites() 
{

  return this.http.get<any []>(`${AppConfig.URL_Videos}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

getAllProducts() 
{

  return this.http.get<any []>(`${AppConfig.URL_Products}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}

updateProduct (record: any): Observable<any> {
  return this.http.put(`${AppConfig.URL_Products}${record["id"]}/`, record).pipe(
    tap(_ => this.log(`updated record id=${record["id"]}`)),
    catchError(this.handleError<any>('updateRecord'))
  );
}

getProductById(id){
  return this.http.get<any>(`${AppConfig.URL_Products}${id}/`).pipe(
    map(x => x ),
    tap(_ => console.log(`get record=${id}`)),
    catchError(this.handleError<any>('getRecord'))
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

  return this.http.get<any []>(`${AppConfig.URL_Videos}`)
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


getUserRole(id) 
{

  return this.http.get<any>(`${AppConfig.URL_UserRole + "?user="}${id}`)
  .pipe(
    map(x => x ),
    tap(_ => console.log('fetched record')),
    catchError(this.handleError('getRecord', []))
  );
}




// delete (record: any | number): Observable<any> {
//   const id = typeof record === 'number' ? record : record.id;
//   const url = `${AppConfig.URL_Videos}${id}`;

//   return this.http.delete<Dealer>(url).pipe(
//     map(x => x["data"] ),
//     tap(_ => this.log(`deleted dealer id=${id}`)),
//     catchError(this.handleError<Dealer>('deleteDealer'))
//   );
// }

update (record: any): Observable<any> {
  return this.http.put(`${AppConfig.URL_Videos}${record["id"]}/`, record).pipe(
    tap(_ => this.log(`updated record id=${record["id"]}`)),
    catchError(this.handleError<any>('updateRecord'))
  );
}


delete(id){
  return this.http.delete<any>(`${AppConfig.URL_Videos}${id}/`).pipe(
    map(x => x ),
    tap(_ => console.log(`delete record=${id}`)),
    catchError(this.handleError<any>('deleteRecord'))
  );
}


API_FORM_POST_File(url: string, file, body?: any) {
    var form_data = new FormData();

    form_data.append('key', body.key);
    form_data.append('AWSAccessKeyId', body.AWSAccessKeyId);
    form_data.append('acl', body.acl);
    form_data.append('success_action_status', '201');
    form_data.append('policy', body.policy);
    form_data.append('signature', body.signature);
    form_data.append('Content-Type', 'image/*');
    form_data.append('file', file);

    const httpOptions = {
      headers: new HttpHeaders({
      }),
      responeType:'text',
      Observe: 'response'
    };


    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    httpOptions.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

    return this.http.post(url, form_data, httpOptions ).pipe(
    map(x => x),
    tap((newP: any) => console.log(`added record w/ id=${newP}`)),
    catchError(this.handleError<any>('add'))
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
