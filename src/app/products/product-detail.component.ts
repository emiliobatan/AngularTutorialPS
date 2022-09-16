import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: IProduct | undefined;
  

  constructor(private route: ActivatedRoute,
              private router: Router) { } 
  // ActivatedRoute service provides information on the state of the current route, including the parameters 
  // Set ActivatedRoute as a dependency by defining it as a parameter to the constructor function and add the needed import 

  // Put the code to read the route parameter inside the ngOnInit() function 
  // ngOnInit is executed when the component is initialized
  ngOnInit(): void {
    const id  = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`
    this.product = {
      "productId": 1,
      "productName": "Leaf Rake",
      "productCode": "GDN-0011",
      "releaseDate": "March 19, 2021",
      "description": "Leaf rake with 48-inch wooden handle.",
      "price": 19.95,
      "starRating": 3.2,
      "imageUrl": "assets/images/leaf_rake.png"
    };
  }

  // method will navigate back to the products page 
  onBack() : void {
    this.router.navigate(['/products']);
  }
}
