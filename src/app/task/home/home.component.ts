import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PageEvent, Product } from '../shared/product-models';
import { ProductService } from '../shared/product.service';
import { PickListModule } from 'primeng/picklist';
import { PaginatorModule } from 'primeng/paginator';
import { log } from 'console';
import { ChoicesService } from '../shared/choices.service';
import { Choice } from '../shared/choices';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PickListModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sourceProducts: Product[] = [
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Bamboo Watch",
      "description": "Product Description",
      "image": "bamboo-watch.jpg",
      "price": 65,
      "category": "Accessories",
      "quantity": 24,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Black Watch",
      "description": "Product Description",
      "image": "black-watch.jpg",
      "price": 72,
      "category": "Accessories",
      "quantity": 61,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1002",
      "code": "zz21cz3c1",
      "name": "Blue Band",
      "description": "Product Description",
      "image": "blue-band.jpg",
      "price": 79,
      "category": "Fitness",
      "quantity": 2,
      "inventoryStatus": "LOWSTOCK",
      "rating": 3
    },
    {
      "id": "1003",
      "code": "244wgerg2",
      "name": "Blue T-Shirt",
      "description": "Product Description",
      "image": "blue-t-shirt.jpg",
      "price": 29,
      "category": "Clothing",
      "quantity": 25,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1004",
      "code": "h456wer53",
      "name": "Bracelet",
      "description": "Product Description",
      "image": "bracelet.jpg",
      "price": 15,
      "category": "Accessories",
      "quantity": 73,
      "inventoryStatus": "INSTOCK",
      "rating": 4
    },
    {
      "id": "1005",
      "code": "av2231fwg",
      "name": "Brown Purse",
      "description": "Product Description",
      "image": "brown-purse.jpg",
      "price": 120,
      "category": "Accessories",
      "quantity": 0,
      "inventoryStatus": "OUTOFSTOCK",
      "rating": 4
    },
    {
      "id": "1006",
      "code": "bib36pfvm",
      "name": "Chakra Bracelet",
      "description": "Product Description",
      "image": "chakra-bracelet.jpg",
      "price": 32,
      "category": "Accessories",
      "quantity": 5,
      "inventoryStatus": "LOWSTOCK",
      "rating": 3
    },
    {
      "id": "1007",
      "code": "mbvjkgip5",
      "name": "Galaxy Earrings",
      "description": "Product Description",
      "image": "galaxy-earrings.jpg",
      "price": 34,
      "category": "Accessories",
      "quantity": 23,
      "inventoryStatus": "INSTOCK",
      "rating": 5
    },
    {
      "id": "1008",
      "code": "vbb124btr",
      "name": "Game Controller",
      "description": "Product Description",
      "image": "game-controller.jpg",
      "price": 99,
      "category": "Electronics",
      "quantity": 2,
      "inventoryStatus": "LOWSTOCK",
      "rating": 4
    },
    {
      "id": "1009",
      "code": "cm230f032",
      "name": "Gaming Set",
      "description": "Product Description",
      "image": "gaming-set.jpg",
      "price": 299,
      "category": "Electronics",
      "quantity": 63,
      "inventoryStatus": "INSTOCK",
      "rating": 3
    }
  ];
  indexedSourceProducts: Product[] = [];
  indexedTargetProducts: Product[] = [];
  targetProducts: Product[] = [];

  sourceObjects: Choice[] = [];
  indexedObjects: Choice[] = [];

  first2: number = 0;
  rows2: number = 10;
  options = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 50, value: 50 }
  ];

  constructor(
    private carService: ProductService,
    private primengConfig: PrimeNGConfig,
    private objectService: ChoicesService
  ) { }

  ngOnInit() {

    this.targetProducts = [];
    this.primengConfig.ripple = true;
    this.indexedSourceProducts = this.sourceProducts.slice(0, 2);
    console.log(this.sourceProducts);
    console.log(this.indexedSourceProducts);

    this.indexedObjects = this.getObjects(this.first2, this.rows2);

  }

  getObjects(index: number, rows: number) {
    let objects: Choice[] = [];
    this.objectService.getChoices(index, rows).subscribe(
      (res) => {
        console.log(res);
        objects = res;
        this.indexedObjects = res;
        
      }
    );
    
    return objects;
  }

  onPageChange2(event: any) {
    
    this.first2 = event.first;
    this.rows2 = event.rows;
    this.indexedSourceProducts = (this.sourceProducts.slice(event.first, (event.first + event.rows))).filter(item => !this.targetProducts.includes(item));
  
  
    //this.sourceObjects = ;
  }


  sourcePaginator(event: any) {
    debugger;
    console.log(event);
    this.indexedSourceProducts = (this.sourceProducts.slice(event.first, (event.first + event.rows))).filter(item => !this.targetProducts.includes(item));
    console.log(this.indexedSourceProducts);

  }

  targetPaginator(event: any) {
    console.log(event);
    this.indexedTargetProducts = this.targetProducts.slice(event.first, (event.first + event.rows));
    console.log(this.targetProducts);

  }

}


