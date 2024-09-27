import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerComponent } from './consumer.component';
import { ConsumerHomeComponent } from './pages/consumer-home/consumer-home.component';

const routes: Routes = [{ path: 'home', component: ConsumerHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerRoutingModule { }
