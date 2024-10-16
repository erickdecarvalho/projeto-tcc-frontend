import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/basic/components/login/login.component';
import { RegisterComponent } from 'src/app/basic/components/register/register.component';
import { HomeComponent } from 'src/app/basic/components/home/home.component';
import { ApisComponent } from 'src/app/basic/components/apis/apis.component';
import { ApiDetailComponent } from 'src/app/basic/components/api-detail/api-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'apis', component: ApisComponent },
  { path: 'provider', loadChildren: () => import('./provider/provider.module').then(m => m.ProviderModule) },
  { path: 'consumidor', loadChildren: () => import('./consumer/consumer.module').then(m => m.ConsumerModule) },
  { path: 'api/:id', component: ApiDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
