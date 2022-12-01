import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { PanierService } from 'src/app/services/panier.service';

interface Hour {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  getScreenWidth: number;
  panier$: Observable<Product[]> | undefined;
  quantity$: Observable<number> | undefined;
  pricePanier$: Observable<number> | undefined;
  hours: Hour[] = [
    {value: 10, viewValue: '10h00'},
    {value: 10.5, viewValue: '10h30'},
    {value: 11, viewValue: '11h00'},
    {value: 11.5, viewValue: '11h30'},
    {value: 12, viewValue: '12h00'},
    {value: 12.5, viewValue: '12h30'},
    {value: 13, viewValue: '13h00'},
    {value: 13.5, viewValue: '13h30'},
  ];
  semaines: Hour[] = [
    {value: 1, viewValue: '2 semaines'},
    {value: 2, viewValue: '3 semaines'},
    {value: 3, viewValue: '4 semaines'},
    {value: 4, viewValue: '5 semaines'},
    {value: 5, viewValue: '6 semaines'},
    {value: 6, viewValue: '7 semaines'},
    {value: 7, viewValue: '8 semaines'},
  ];
  showPanier$: Observable<boolean>;
  hourSelect: number;
  weekReccurenceSelect: number;
  samedi: boolean = false;
  dimanche: boolean = false;
  dateNow: Date = new Date;
  nextSamedi: Date;
  nextDimanche: Date;
  recurrence: boolean;
  formSend: boolean = false;
  constructor(private panierService: PanierService, private router: Router, private toast: HotToastService) {
    this.getScreenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.panier$ = this.panierService.panier$;
    this.quantity$ = this.panierService.productQuantity$;
    this.pricePanier$ = this.panierService.pricePanier$;
    this.showPanier$ = this.panierService.showPanier$;
    this.hourSelect = this.panierService.hourDelivery;
    this.recurrence = this.panierService.recurrenceDelivery;
    this.nextSamedi = this.setDay(this.dateNow, 6);
    this.nextDimanche = this.setDay(this.dateNow, 7);
    if(this.panierService.dayDelivery.includes(this.nextSamedi.toLocaleDateString())){
      this.samedi = true;
    }
    if(this.panierService.dayDelivery.includes(this.nextDimanche.toLocaleDateString())){
      this.dimanche = true;
    }
  }

  setDay(date: Date, dayOfWeek: number) {
    date = new Date(date.getTime ());
    date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);
    return date;
  }

  dateChange(){
    let tab = [];
    if(this.samedi){
      tab.push(this.nextSamedi.toLocaleDateString())
      if(this.recurrence){
        let date: Date = new Date();
        for(let i = 1; i <= this.weekReccurenceSelect;i++){
          tab.push(new Date(date.setDate(this.nextSamedi.getDate() + (7*i))).toLocaleDateString())
        }
      }
    }
    if(this.dimanche){
      tab.push(this.nextDimanche.toLocaleDateString())
      if(this.recurrence){
        let date: Date = new Date();
        for(let i = 1; i <= this.weekReccurenceSelect;i++){
          tab.push(new Date(date.setDate(this.nextDimanche.getDate() + (7*i))).toLocaleDateString())
        }
      }
    }
    this.panierService.changeDayDelivery(tab)
    this.panierService.recurrenceDelivery = this.recurrence
  }

  hourChange(){
    this.panierService.hourDelivery = this.hourSelect;
  }

  openPanier(){
    this.panierService.openPanier()
  }
  closePanier(){
    this.panierService.closePanier()
  }

  addProduct(product: Product){
    this.panierService.addProduct(product)
    this.panierService.openPanier()
  }

  removeProduct(product: Product){
    this.panierService.removeProduct(product)
  }
  
  panierLenght(){
    let panierLength;
    this.panier$!.subscribe(panier =>{
      panierLength = panier.length
    });
    return panierLength
  }

  send(){
    this.toast.close()
    this.formSend = true;
    let panierLength = this.panierLenght()
    
    if(panierLength === 0){
      this.toast.info('Votre panier est vide',{position: 'bottom-center'})
      return
    }else if(!this.samedi && !this.dimanche){
      this.toast.error('Veuillez renseigner le jour de livraison',{position: 'bottom-center'})
      this.openPanier()
      return
    }else if(!this.hourSelect){
      this.toast.error('Veuillez renseigner l\'heure de livraison',{position: 'bottom-center'})
      this.openPanier()
      return
    }else if(this.recurrence && (!this.weekReccurenceSelect)){
      this.openPanier()
      this.toast.error('Veuillez renseigner le nombre de semaines de récurrence',{position: 'bottom-center'})
      setTimeout(()=>{
        let div = (document.getElementById('autoscroll') as HTMLElement);
        let y = (document.getElementById('recurrence') as HTMLElement).offsetTop;
        div.scrollTo({top: y - 100 , behavior: 'smooth'});
      },700)
      return
    }

    this.router.navigate(['validation'])
  }
}
