import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-recapitulatif',
  templateUrl: './recapitulatif.component.html',
  styleUrls: ['./recapitulatif.component.scss']
})
export class RecapitulatifComponent implements OnInit {
  @Input() products: Observable<Product[]>;

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
  }

  addProduct(product: Product){
    this.panierService.addProduct(product)
    this.panierService.openPanier()
  }

  removeProduct(product: Product){
    this.panierService.removeProduct(product)
  }
}
