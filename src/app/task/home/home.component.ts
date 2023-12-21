import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { PageEvent, Product } from '../shared/product-models';
import { ProductService } from '../shared/product.service';
import { PickListModule } from 'primeng/picklist';
import { PaginatorModule } from 'primeng/paginator';
import { log } from 'console';
import { ChoicesService } from '../shared/choices.service';
import { Choice } from '../shared/choices';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PickListModule, PaginatorModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  sourceStartIndex: number = 1;
  sourceEndIndex: number = 10;
  sourceRows: number = 10;
  sourceObjects: any[] = [];
  totalCount: number = 2508;

  targetStartIndex: number = 1;
  targetEndIndex: number = 10;
  targetRows: number = 10;
  targetObjects: any[] = [];
  indexedTargetObjects: any[] = [];
  options = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 }
  ];

  constructor(
    private carService: ProductService,
    private primengConfig: PrimeNGConfig,
    private objectService: ChoicesService
  ) { }

  ngOnInit() {

    

  }

  getSourceObjects(index: number, pageSize: number) {
    let objects: Choice[] = [];
    this.objectService.getChoices(index, pageSize).subscribe(
      (res) => {
        console.log(res);
        objects = res;
        this.sourceObjects = res;
        
      }
    );
    
    return objects;
  }

  sourcePaginator(isFirst: boolean, isLast: boolean, isForward: boolean, isBackward: boolean) {
    //this.getSourceObjects(sourceIndex,sourceRows);
    if (isFirst) {
      this.sourceStartIndex = 1;
      this.sourceEndIndex = this.sourceRows;
      this.getSourceObjects(this.sourceStartIndex, this.sourceRows);
      //.sourceTracker();
    } else if (isLast) {
      // debugger;
      //this.sourceStartIndex = (this.totalCount - this.targetObjects.length) - this.sourceRows;
      let startIndex = (this.totalCount - this.targetObjects.length) - ((this.totalCount - this.targetObjects.length) % this.sourceRows);
      if (startIndex === (this.totalCount - this.targetObjects.length)) {
        startIndex = (this.totalCount - this.targetObjects.length) - this.sourceRows;
      };
      this.sourceStartIndex = startIndex + 1;
      this.sourceEndIndex = this.totalCount - this.targetObjects.length;
      this.getSourceObjects(this.sourceStartIndex, this.sourceRows);
    } else if (isForward) {
      this.sourceStartIndex = this.sourceStartIndex + this.sourceRows;
      this.sourceEndIndex = this.sourceEndIndex + this.sourceRows;
      this.getSourceObjects(this.sourceStartIndex, this.sourceRows);
    } else if (isBackward) {
      // debugger;
      this.sourceStartIndex = this.sourceStartIndex - this.sourceRows;
      let endIndex = this.sourceEndIndex - this.sourceRows;
      if ((endIndex % 10) !== 0) {
        endIndex = this.sourceEndIndex - (endIndex % 10);
      };
      this.sourceEndIndex = endIndex;
      this.getSourceObjects(this.sourceStartIndex - this.sourceRows, this.sourceRows);
    }
  }

  onMoveToTarget(event: any) {
    const movedItems = event.items;
    this.targetObjects.push(...movedItems);
    this.sourceTracker();
    this.targetPaginator(true, false, false, false);
  }

  onMoveToSource(event: any) {
    const movedItems = event.items;
    this.targetObjects = this.targetObjects.filter(object => !movedItems.some((i: any) => i.artifact_id === object.artifact_id));
    this.sourceTracker();
    this.targetPaginator(true, false, false, false);
  }

  targetPaginator(isFirst: boolean, isLast: boolean, isForward: boolean, isBackward: boolean) {
    if (isFirst) {
      this.targetStartIndex = 1;
      this.targetEndIndex = this.targetRows;
      this.indexedTargetObjects = this.targetObjects.slice(0, this.targetEndIndex);
    } else if (isLast) {
      let startIndex = this.targetObjects.length - (this.targetObjects.length % this.targetRows);
      if (startIndex === this.targetObjects.length) {
        startIndex = this.targetObjects.length - this.targetRows;
      };
      this.targetStartIndex = startIndex + 1;
      this.targetEndIndex = this.targetObjects.length;
      this.indexedTargetObjects = this.targetObjects.slice(this.targetStartIndex - 1, this.targetEndIndex);
    } else if (isForward) {
      this.targetStartIndex = this.targetStartIndex + this.targetRows;
      this.targetEndIndex = this.targetEndIndex + this.targetRows;
      this.indexedTargetObjects = this.targetObjects.slice(this.targetStartIndex - 1, this.targetEndIndex);

    } else if (isBackward) {
      this.targetStartIndex = this.targetStartIndex - this.targetRows;
      let endIndex = this.targetEndIndex - this.targetRows;
      if ((endIndex % 10) !== 0) {
        endIndex = this.targetEndIndex - (endIndex % 10);
      };
      this.targetEndIndex = endIndex;

      this.indexedTargetObjects = this.targetObjects.slice(this.targetStartIndex - 1, this.targetEndIndex);
    }

  }

  sourceTracker() {
    debugger;
    if ( (this.sourceEndIndex === (this.totalCount - this.targetObjects.length)) ) {

      this.getSourceObjects(this.sourceStartIndex, ((this.sourceEndIndex-this.sourceStartIndex)+1) );
    } else {
      if (this.sourceObjects.length > this.sourceRows) {
        const newPageSize = this.sourceRows;
        if ((this.sourceStartIndex + newPageSize) < (this.totalCount - this.targetObjects.length)) {
          this.getSourceObjects(this.sourceStartIndex, newPageSize);
        };
      } else if (this.sourceObjects.length < this.sourceRows) {
        //console.log('fetch', this.sourceRows-this.sourceObjects.length, 'more objects');
        const newPageSize = this.sourceRows + (this.sourceRows - this.sourceObjects.length);
        //if ((this.sourceStartIndex + newPageSize) > (this.totalCount - this.targetObjects.length)) {
          this.getSourceObjects(this.sourceStartIndex, newPageSize);
        //};
      }else if(this.sourceObjects.length===0) {
        const newPageSize = (this.totalCount)
        this.getSourceObjects(this.sourceStartIndex, newPageSize);
      }
    }
    
    

  }

  changeSourceRows() {
    // debugger;
    this.sourceObjects = [];
    // console.log(this.sourceRows);
    // let endIndex = this.sourceStartIndex + this.sourceRows - 1
    // this.sourceEndIndex = endIndex;
    // this.getSourceObjects(this.sourceStartIndex, this.sourceRows);
    this.sourceStartIndex = 1;
    this.sourceEndIndex = this.sourceRows;
    this.getSourceObjects(this.sourceStartIndex, this.sourceRows);
  }

  changeTargetRows() {
    // debugger;
    this.indexedTargetObjects = []
    // console.log(this.targetRows);
    this.targetStartIndex = 1;
    let endIndex = this.targetRows;
    this.targetEndIndex = endIndex;
    this.indexedTargetObjects = this.targetObjects.slice(this.targetStartIndex - 1, this.targetEndIndex);

  }

  isTargetObject(object: any) {
    let filteredObject = this.targetObjects.filter(x => x.artifact_id === object.artifact_id);
    if (filteredObject.length > 0) {
      return true;
    } else {
      return false;
    };
  }














  // onPageChange2(event: any) {

  //   this.first2 = event.first;
  //   this.rows2 = event.rows;
  //   this.indexedSourceProducts = (this.sourceProducts.slice(event.first, (event.first + event.rows))).filter(item => !this.targetProducts.includes(item));
  
  
  //   //this.sourceObjects = ;
  // }


  // sourcePaginator(event: any) {
  //   debugger;
  //   console.log(event);
  //   this.indexedSourceProducts = (this.sourceProducts.slice(event.first, (event.first + event.rows))).filter(item => !this.targetProducts.includes(item));
  //   console.log(this.indexedSourceProducts);

  // }

  // targetPaginator(event: any) {
  //   console.log(event);
  //   this.indexedTargetProducts = this.targetProducts.slice(event.first, (event.first + event.rows));
  //   console.log(this.targetProducts);

  // }

}


