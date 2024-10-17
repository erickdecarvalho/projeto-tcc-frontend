import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderComponent } from './provider.component';
import { MyApisComponent } from './pages/my-apis/my-apis.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyApiComponent } from './pages/my-api/my-api.component';


@NgModule({
  declarations: [
    ProviderComponent,
    MyApisComponent,
    ProfileComponent,
    MyApiComponent
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    FormsModule
  ]
})
export class ProviderModule { }
