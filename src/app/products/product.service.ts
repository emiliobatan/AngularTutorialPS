import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { IProduct } from "./product";

// We want a getProducts method that returns the list of products
// Strongly type the return value using our IProduct interface
    /*
        We have no properties defined in this class so we are not using this service to share data 
        we are using it to encapsulate the data access features. By using this service to provide the list of products we take 
        the responsibility for managing the data away from the individual component
        This makes it easier to modify or reuse this logic 
     */

// A service is an ordinary class until we register it with an angular injector 
@Injectable({
    providedIn: 'root' // Pass an object into the injectable decorator and set providedIn property to root. 
                       //Now we can access the service from any component or other service in the application
})
export class ProductService {

    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
      }
}