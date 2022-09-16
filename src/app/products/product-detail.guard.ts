import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// Since a guard is a service, it needs to be registered with an Angular injector 
// The CLI registers this guard with the root application injector using the provideIn property
@Injectable({
  providedIn: 'root'
})
export class ProductsDetailGuard implements CanActivate {

  constructor(private router: Router) {}


  // We want this method to check the route URL and ensure that the ID passed in is Valid 
  // If it is not valid we want to navigate back to the Product list page 
  // Navigation requires the router, so we need to create a constructor
  // canActivate method has two parameters: 
  // activatedRouteSnapshot: to provide current information 
  // RouterStateSnapshot to provide router state information


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const id = Number(route.paramMap.get('id')); // Need the number function to convert the string to a number 
      if (isNaN(id) || id < 1){
        alert('Invalid product id');
        this.router.navigate(['/products']);
        return false;
      }
    return true;
  }
  

}
