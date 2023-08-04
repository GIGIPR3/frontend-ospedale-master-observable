import { Component } from '@angular/core';
import { fetchService } from '../services/fetch.service';
import { Paziente } from '../interfaces/paziente';
import { Router } from '@angular/router';
import { Medico } from '../interfaces/medico';
import { Subscription } from 'rxjs';
import { Richiesta } from '../interfaces/Richiesta';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private fetchservice: fetchService, private router: Router) {}

  private s!: Subscription;

  pazienti: Paziente[] = [];
  medici: Medico[] = [];

  numeroRichieste : number = 0

  pazienteId: string = '';

  medicId: string = '';

  ngOnInit(): void {
    this.returnPazienti()
    this.returnRichieste()
    this.returnMedici()
  }

  returnPazienti() {
    this.s = this.fetchservice.getPaziente().subscribe((result:Paziente[])=>{this.pazienti=[...result]})
    /* this.fetchservice.getPaziente().then((data) => {
      this.pazienti = data;
      console.log('get di pazienti', this.pazienti);
    }); */
    return this.s;
  }

  returnMedici(){
    this.s = this.fetchservice.getMedico().subscribe((result:Medico[])=>{this.medici=[...result]})
    return this.s;
  }

  onSelectMedici(medicId: string) {
    this.router.navigate(['medico', medicId]);
  }

  onSelect(pazienteId: string) {
    this.router.navigate(['paziente', pazienteId]);

  }

  returnRichieste(){
    this.s = this.fetchservice.getRichieste().subscribe((result:Richiesta[])=>{})
    /* this.fetchservice.getRichieste().then((data) => {
      this.numeroRichieste = data.length;
    }); */
  }
}
