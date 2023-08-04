import { Component, EventEmitter, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Paziente } from '../interfaces/paziente';
import { fetchService } from '../services/fetch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gestionale-clienti',
  templateUrl: './gestionale-clienti.component.html',
  styleUrls: ['./gestionale-clienti.component.css'],
})
export class GestionaleClientiComponent implements OnInit {
  constructor(private fetchservice: fetchService) {}

  pazienti: Paziente[] = [];

  private s!: Subscription;

  ngOnInit(): void {
    this.returnPazienti();
  }


  medicoId = 0;
  firstName = '';
  lastName = '';
  codiceFiscale = '';
  active = '';
  email = '';
  medico = '';
  tipologia = '';

  returnPazienti() {
    this.s = this.fetchservice.getPaziente().subscribe((result:Paziente[])=>{this.pazienti=[...result]})
    return this.s;
  }

  bottonePaziente() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      codiceFiscale: this.codiceFiscale,
      email: this.email,
    };
    this.s = this.fetchservice.submitPaziente(data).subscribe({
      next:(res)=>{
        this.returnPazienti();
      }
    });

  }

  bottoneDeletePaziente(id: number) {
    this.fetchservice.deletePaziente(id).then(() => this.returnPazienti());
  }

  ngOnDestroy(): void {
    if (this.s && !this.s.closed) {
      this.s.unsubscribe()
  }
}
}
