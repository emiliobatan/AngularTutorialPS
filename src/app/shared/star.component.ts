import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnChanges{
    @Input() rating: number = 0; // We need an input so we can grab the actual rating of the products 
                                    // Then in the product list component we need to property bing the rating to the product.starRating property
    cropWidth: number = 75;
    @Output() ratingClicked: EventEmitter<string> = 
        new EventEmitter<string>();

    // We need the onChanges hook because whenever the rating changes we need to change how many stars there are 
    // The width of the stars are 75 pixels so if we have a 4 star rating * 75 divided by 5 we get 60 pixels 
    ngOnChanges(): void {
        this.cropWidth = this.rating * 75/5;
    }

    onClick(): void {
        this.ratingClicked.emit(`The rating is ${this.rating} was clicked!`)
    }
}