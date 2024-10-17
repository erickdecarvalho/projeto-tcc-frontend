import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProviderComponent } from './provider.component';
import { MyApisComponent } from './pages/my-apis/my-apis.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyApiComponent } from './pages/my-api/my-api.component';

const routes: Routes = [
  { path: '', component: ProviderComponent },
  { path: 'my-apis', component: MyApisComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-api/:id', component: MyApiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
