import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { ProductsComponent } from './components/products/products.component';
import { PanierComponent } from './components/panier/panier.component';
import { SimulateurComponent } from './components/simulateur/simulateur.component';

@NgModule({
  declarations: [
    AppComponent,
    CardProductComponent,
    ProductsComponent,
    PanierComponent,
    SimulateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
