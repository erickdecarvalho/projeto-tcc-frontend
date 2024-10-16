import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importando HttpClientModule
import { ReactiveFormsModule } from '@angular/forms'; // Importando ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApisComponent } from 'src/app/basic/components/apis/apis.component';
import { HomeComponent } from 'src/app/basic/components/home/home.component';
import { ApiDetailComponent } from './basic/components/api-detail/api-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApisComponent,
    ApiDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
