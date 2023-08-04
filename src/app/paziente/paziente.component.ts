import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestionaleAppuntamentiComponent } from '../gestionale-appuntamenti/gestionale-appuntamenti.component';
import { Appuntamento } from '../interfaces/Appuntamento';
import { Paziente } from '../interfaces/paziente';
import { Prestazione } from '../interfaces/prestazione';
import { fetchService } from '../services/fetch.service';
import { LogAuthService } from '../services/log.auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-paziente',
  templateUrl: './paziente.component.html',
  styleUrls: ['./paziente.component.css'],
})
export class PazienteComponent {
  constructor(
    private fetchservice: fetchService,
    private route: ActivatedRoute,
    private logAuth : LogAuthService
    ) {}

    private s!: Subscription;

    @ViewChild(GestionaleAppuntamentiComponent) childComponent: GestionaleAppuntamentiComponent | undefined;

    ngOnInit(): void {
      this.returnSelectedPaziente(this.numberId!);
    }


  nuovaPrestazione: Prestazione | undefined;

  dsadsa(){
    this.childComponent?.returnAppuntamenti
  }
  selectedAppuntamentoId: number = 0

  nuovoAppuntamento : Appuntamento = {
    appuntamentoId: null,
    data: '',
    orario : '',
    ricetta : '',
    completato : false,
    prestazioneId : 0,
    pazienteId : 0,
    prestazione: null,
    paziente: null
  }

  pazienteSelezionato: Paziente = {
    pazienteId: 0,
    firstName: '',
    lastName: '',
    codiceFiscale: '',
    email: '',
  };

  id: string | null = this.route.snapshot.paramMap.get('id');
  numberId: number | undefined = this.logAuth.id;

  prestazioni: Prestazione[] = [];

  bottonePostAppuntamento() {
    this.nuovoAppuntamento.pazienteId = this.numberId!;
    this.nuovoAppuntamento.prestazioneId = Number(this.nuovaPrestazione?.prestazioneId);
    console.log(this.nuovoAppuntamento);
    this.s = this.fetchservice.postAppuntamento(this.nuovoAppuntamento).subscribe()
  }

  addPrestazione(receivedPrestazione : Prestazione){
    this.nuovaPrestazione = receivedPrestazione
    console.log(this.nuovaPrestazione!);

  }

  returnSelectedPaziente(id: number) {
    this.s = this.fetchservice.getPazienteById(id).subscribe((result:Paziente)=>{this.pazienteSelezionato=result})

  }

}
