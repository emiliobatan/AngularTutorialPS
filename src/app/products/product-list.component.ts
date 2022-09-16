import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;
    
    private _listFilter: string ='';
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        console.log('In setter: ' + value);
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];

    products: IProduct[] = [];

    /**
     * OLD STYLE 
     * private _ProductService
     * constructor(productService: ProductService){
     * this.productService = productService;
     * }
     * ******************************
     * NEW STYLE    (SHORT HAND SYNTAX)
     * Instead of creating a private variable 
     * And making a constructor function
     * We simply add the accessor keyword such as private 
     * to the constructor parameter 
     * Then this is a shortcut for declaring this variable, defining a parameter and setting the variable to the parameter
     */
    constructor(private productService: ProductService) {}

    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
        this.showImage = !this.showImage; // This will showImage if the showImage is false
                                          // and will not show when showImage is True
    }

    // OnInit lifecycle hook provides a place to perform any initialization
    // Its a great place to retrieve the data for the template 
    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        })
        
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
    // From this onClick event, when someone clicks on the star rating 
    // They will get the product list plus the rating of the product 
}
