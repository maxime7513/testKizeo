import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  getScreenWidth: number;
  products: Product[] = [
    { title: 'croissant', type: 'boulangerie', price: 0.9, img: 'croissant'},
    { title: 'pain au chocolat', type:'boulangerie', price: 0.95, img: 'pain-chocolat'},
    { title: 'pain au raisin', type:'boulangerie', price: 1, img: 'pain-au-raisin'},
    { title: 'pain au céréales', type:'boulangerie', price: 1.3, img: 'pain-cereales'},
    { title: 'panini', type:'snacking', price: 2.5, img: 'panini'},
    { title: 'mini burger', type:'snacking', price: 3.7, img: 'burger'},
    { title: 'part de cake', type:'gateaux', price: 1.6, img: 'cake'},
    { title: 'croque monsieur', type:'snacking', price: 2.5, img: 'croque-monsieur2'},
    { title: 'Mini Donuts', type:'gateaux', price: 1.7, img: 'donuts'},
    { title: 'hot dog', type:'snacking', price: 2.5, img: 'hot-dog'},
    { title: 'pain au blé complet', type:'boulangerie', price: 1.25, img: 'pain-ble'},
    { title: 'omelette nature', type:'snacking', price: 3, img: 'omelette'},
    { title: 'crumble au pommes', type:'gateaux', price: 1.8, img: 'crumble'},
    { title: 'eclair au chocolat', type:'gateaux', price: 1.6, img: 'eclair'},
    { title: 'pancakes (lot de 3)', type:'gateaux', price: 2, img: 'pancakes'},
    { title: 'pain perdu brioché', type:'boulangerie', price: 1.13, img: 'pain-brioche'},
    { title: 'plateau de fruits', type:'fruits', price: 24, img: 'plateau-fruits'},
    { title: 'salade de fruits', type:'fruits', price: 3.7, img: 'salade-fruits'},
    { title: 'brochettes de fruits', type:'fruits', price: 4.3, img: 'brochette-fruits'},
    { title: 'jus d\'oranges 33cl', type:'boissons', price: 3, img: 'jus-orange'},
    { title: 'jus de carotte 33cl', type:'boissons', price: 2, img: 'jus-carotte'},
    { title: 'jus de pasteque 33cl', type:'boissons', price: 2, img: 'jus-ananas'},
    { title: 'smoothie 50cl', type:'boissons', price: 5, img: 'smoothie'},
    { title: 'chocolat chaud 20cl', type:'boissons', price: 2.5, img: 'chocolat-chaud3'},
    { title: 'thé à la menthe 20cl', type:'boissons', price: 2.5, img: 'the'},
    { title: 'capuccino 20cl', type:'boissons', price: 2.9, img: 'cafe'},
  ];
  selectProducts: Product[] = [];
  categories: string[] = ['snacking', 'gateaux', 'boulangerie', 'fruits', 'boissons', 'tout nos produits'];
  selectCategory: string = 'tout nos produits';

  panierOpen$!: Observable<boolean>;
  @ViewChild('mySelect') mySelect : any;
    constructor(private panierService: PanierService) {
    this.getScreenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.panierOpen$ = this.panierService.showPanier$;
    this.productByCategory()
  }

  productByCategory(){
    this.selectProducts = [];
    this.products.forEach((product)=>{
      if(this.selectCategory === 'tout nos produits'){
        this.selectProducts.push(product)
      }else if(product.type === this.selectCategory){
        this.selectProducts.push(product)
      }
    })
  }

  changeCategorie(category: string){
    this.selectCategory = category;
    this.productByCategory();
    if(this.getScreenWidth <= 900){
      this.mySelect.open();
    }
  }
}
