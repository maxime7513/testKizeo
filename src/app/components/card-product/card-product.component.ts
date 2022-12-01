import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  @Input() product!: Product;

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
  }

  addProduct(product: Product){
    this.panierService.addProduct(product)
    this.panierService.openPanier()
  }

}
