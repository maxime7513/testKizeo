import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private panier: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public readonly panier$: Observable<Product[]> = this.panier.asObservable();
  
  private productQuantity: BehaviorSubject<number> = new BehaviorSubject(null);
  public readonly productQuantity$: Observable<number> = this.productQuantity.asObservable();
  
  private pricePanier: BehaviorSubject<number> = new BehaviorSubject(0);
  public readonly pricePanier$: Observable<number> = this.pricePanier.asObservable();

  public dayDelivery: string[] = [];
  public hourDelivery: number = null;
  public recurrenceDelivery: boolean = false;
  private showPanier: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly showPanier$: Observable<boolean> = this.showPanier.asObservable();
  constructor() { }

  addProduct(product: Product){
    let produitExist = false,
    panier = this.panier.getValue();
    panier.forEach((productPanier: Product) => {
      if(product.title === productPanier.title){
        productPanier.quantity++;
        produitExist = true;
      }
    })

    if(!produitExist){
      product.quantity = 1;
      panier.unshift(product)
    }

    this.panier.next(panier)
    this.calcProductQuantity()
    this.calcPrice()
  }

  removeProduct(product: Product){
    let panier = this.panier.getValue();
    panier.forEach((productPanier: Product) => {
      if(product.title === productPanier.title){
        if(productPanier.quantity! > 1){
          productPanier.quantity!--;
        }else{
          panier = panier.filter(product => productPanier.title !== product.title)
        }
      }
    })

    this.panier.next(panier)
    this.calcProductQuantity()
    this.calcPrice()
  }

  
  calcProductQuantity(){
    let quantity = 0,
    panier = this.panier.getValue();
    panier.forEach((product)=>{
      quantity += product.quantity!
    })
    this.productQuantity.next(quantity)
  }

  calcPrice(){
    let price = 0,
    panier = this.panier.getValue();
    panier.forEach((product)=>{
      price += product.price * product.quantity!
    })


    if(this.dayDelivery.length > 0){
      price = price * this.dayDelivery.length
    }
    this.pricePanier.next(price)
  }

  changeDayDelivery(jourTab: string[]){
    this.dayDelivery = jourTab
    this.calcPrice()
  }

  openPanier(){
    this.showPanier.next(true)
  }
  closePanier(){
    this.showPanier.next(false)
  }
  
  reset(){
    this.panier.next([]);
    this.productQuantity.next(null);
    this.pricePanier.next(0);
    this.dayDelivery = [];
    this.hourDelivery = null;
    this.recurrenceDelivery = false;
    this.showPanier.next(false)
  }
}
