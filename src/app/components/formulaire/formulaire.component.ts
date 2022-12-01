import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {
  contactForm: FormGroup;
  formSend: boolean = false;
  @Input() products: Observable<Product[]>;
  productsFormat: any[] = [];
  prixCommande: number;
  constructor(private panierService: PanierService, private router: Router, private toast: HotToastService) { }

  ngOnInit(): void {
    this.initForm();
    this.panierService.panier$.subscribe(product => {
      product.forEach(product => {
        this.productsFormat.push({
          produit: product.title,
          quantite: product.quantity
        })
      })
    })
    this.panierService.pricePanier$.subscribe(price => {
      this.prixCommande = price
    })
  }

  initForm(){
    this.contactForm = new FormGroup(
      {
        nom: new FormControl('', Validators.required),
        prenom: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        adresse: new FormControl('', Validators.required),
        codePostal: new FormControl('', Validators.required),
      }
    );
  }

  // getter for error
  get nom() {
    return this.contactForm.get('nom');
  }
  get prenom() {
    return this.contactForm.get('prenom');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get adresse() {
    return this.contactForm.get('adresse');
  }
  get codePostal() {
    return this.contactForm.get('codePostal');
  }

  submit(){
    this.toast.close()
    this.formSend = true
    if (!this.contactForm.valid) {
      this.toast.error('Formulaire invalide',{position:'bottom-center'});
      return
    }  
    
    let reqJson = {
      produitsCommande: this.productsFormat,
      informationsClient: this.contactForm.value,
      jourLivraison: this.panierService.dayDelivery,
      heureLivraison: this.panierService.hourDelivery,
      prixCommande: this.prixCommande.toFixed(2)
    }

    this.contactForm.reset()
    this.toast.success('Votre commande à été validée avec succès')
    this.toast.info('Le resultat est dans la console')

    this.panierService.reset()
    this.router.navigate(["/"])
    console.log(reqJson)
  }
}
