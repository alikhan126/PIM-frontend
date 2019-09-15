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

add (dealer: any): Observable<any> {
  return this.http.post<any>(`${AppConfig.URL_Products}`, dealer).pipe(
    map(x => x["data"] ),
    tap((newP: any) => console.log(`added record w/ id=${newP}`)),
    catchError(this.handleError<any>('add'))
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
// get(id){
//   return this.http.get<Dealer>(`${AppConfig.URL_Dealers}${id}`).pipe(
//     map(x => x["data"] ),
//     tap(_ => console.log(`updated dealer id=${id}`)),
//     catchError(this.handleError<any>('getdealer'))
//   );
// }





// delete (dealer: any | number): Observable<any> {
//   const id = typeof dealer === 'number' ? dealer : dealer.dealerId;
//   const url = `${AppConfig.URL_Dealers}${id}`;

//   return this.http.delete<Dealer>(url).pipe(
//     map(x => x["data"] ),
//     tap(_ => this.log(`deleted dealer id=${id}`)),
//     catchError(this.handleError<Dealer>('deleteDealer'))
//   );
// }

// update (dealer: any): Observable<any> {
//   return this.http.put(`${AppConfig.URL_Dealers}${dealer["dealerId"]}`, dealer).pipe(
//     tap(_ => this.log(`updated dealer id=${dealer["dealerId"]}`)),
//     catchError(this.handleError<any>('updatedealer'))
//   );
// }






private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
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
