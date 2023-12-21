import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TaskRoutingModule,
    HttpClientModule,
    ButtonModule,
  ]
})
export class TaskModule { }
