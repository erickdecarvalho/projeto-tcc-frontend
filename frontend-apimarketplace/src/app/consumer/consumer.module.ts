import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumerRoutingModule } from './consumer-routing.module';
import { ConsumerComponent } from './consumer.component';
import { ConsumerHomeComponent } from './pages/consumer-home/consumer-home.component';


@NgModule({
  declarations: [
    ConsumerComponent,
    ConsumerHomeComponent
  ],
  imports: [
    CommonModule,
    ConsumerRoutingModule
  ]
})
export class ConsumerModule { }
