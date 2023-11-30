import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TaskRoutingModule,
    HttpClientModule,
  ]
})
export class TaskModule { }
