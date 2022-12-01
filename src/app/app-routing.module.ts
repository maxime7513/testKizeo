import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimulateurComponent } from './components/simulateur/simulateur.component';
import { ValidateComponent } from './components/validate/validate.component';

const routes: Routes = [
  { path: '', component: SimulateurComponent,
      data: {animation: 'Home'}
  },
  { path: 'validation', component: ValidateComponent,
    data: {animation: 'Validate'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
