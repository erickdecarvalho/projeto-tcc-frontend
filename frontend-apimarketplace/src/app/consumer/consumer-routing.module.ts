import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerComponent } from './consumer.component';
import { ConsumerHomeComponent } from './pages/consumer-home/consumer-home.component';
import { HomeComponent } from '../basic/components/home/home.component';
import { ApisComponent } from '../basic/components/apis/apis.component';

const routes: Routes = [{ path: 'home', component: ApisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerRoutingModule { }
