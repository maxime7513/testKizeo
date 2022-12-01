import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { ProductsComponent } from './components/products/products.component';
import { PanierComponent } from './components/panier/panier.component';
import { SimulateurComponent } from './components/simulateur/simulateur.component';
import { ValidateComponent } from './components/validate/validate.component';

import {MatBadgeModule} from '@angular/material/badge';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { HotToastModule } from '@ngneat/hot-toast';
import { RecapitulatifComponent } from './components/recapitulatif/recapitulatif.component';
import { FormulaireComponent } from './components/formulaire/formulaire.component';

@NgModule({
  declarations: [
    AppComponent,
    CardProductComponent,
    ProductsComponent,
    PanierComponent,
    SimulateurComponent,
    ValidateComponent,
    RecapitulatifComponent,
    FormulaireComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    HotToastModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
