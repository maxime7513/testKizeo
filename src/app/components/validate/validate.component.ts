import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { PanierService } from 'src/app/services/panier.service';
import { FormulaireComponent } from '../formulaire/formulaire.component';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss']
})
export class ValidateComponent implements OnInit {
  etape2: boolean = false;
  etape3: boolean = false;
  @ViewChild(FormulaireComponent) form: FormulaireComponent;


  panier$: Observable<Product[]>;
  pricePanier$: Observable<number>;
  constructor(private panierService: PanierService, private router: Router, private toast: HotToastService) { }

  ngOnInit(): void {
    this.panier$ = this.panierService.panier$;
    this.pricePanier$ = this.panierService.pricePanier$;
  }

  panierLenght(){
    let panierLength;
    this.panier$!.subscribe(panier =>{
      panierLength = panier.length
    });
    return panierLength
  }

  changeEtape(){
    let panierLenght = this.panierLenght()
    if(panierLenght === 0){
      this.toast.close()
      this.toast.info('Votre panier est vide',{position: 'bottom-center'})
      return
    }else{
      this.etape2 = true
    }
  }

  back(){
    if(!this.etape2){
      this.router.navigate([''])
    }else{
      this.etape2 = false
    }
  }

  submit(){
    this.form.submit()
  }

}
