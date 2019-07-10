import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'addCard', loadChildren: './add-card/add-card.module#AddCardPageModule' },
  { path: 'manualCard', loadChildren: './manual-card/manual-card.module#ManualCardPageModule' },
  { path: 'example-modal', loadChildren: './example-modal/example-modal.module#ExampleModalPageModule' },
  { path: 'exemple-modal', loadChildren: './exemple-modal/exemple-modal.module#ExempleModalPageModule' },
  { path: 'start', loadChildren: './start/start.module#StartPageModule' },
  { path: 'parameters', loadChildren: './parameters/parameters.module#ParametersPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
