import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './basic/components/home/home.component';
import { LoginComponent } from './basic/components/login/login.component';
import { RegisterComponent } from './basic/components/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent},
  { path: 'consumidor', loadChildren: () => import('./consumer/consumer.module').then(m => m.ConsumerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
