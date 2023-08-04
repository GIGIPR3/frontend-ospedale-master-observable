import { Component } from '@angular/core';
import { fetchService } from '../services/fetch.service';
import { ActivatedRoute } from '@angular/router';
import { Richiesta } from '../interfaces/Richiesta';
import { Appuntamento } from '../interfaces/Appuntamento';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gestionale-richieste',
  templateUrl: './gestionale-richieste.component.html',
  styleUrls: ['./gestionale-richieste.component.css']
})
export class GestionaleRichiesteComponent {

  constructor(private fetchservice: fetchService,  private route: ActivatedRoute) {}

  private s!: Subscription;

  isDirigenteActive: boolean = false
  isSetPrestazioneActive: boolean = false

  richieste : Richiesta[] = []

  richiesta: Richiesta = {
    richiestaId: 0,
    appuntamento: null,
    status: false,
    nuovaData: '',
    nuovoOrario: '',
    appuntamentoId: 0
  }

  appuntamento : Appuntamento = {
    appuntamentoId: null,
    data: '',
    orario : '',
    ricetta : '',
    completato : false,
    prestazioneId : 0,
    pazienteId : 0,
    prestazione:null,
    paziente : null
  }

  ngOnInit(): void {
    this.returnRichieste()
  }

  returnRichieste(){
    this.s = this.fetchservice.getRichieste().subscribe((result:Richiesta[])=>{this.richieste=[...result]})
  }

  invioRichiesta(req : Richiesta){
    if(req.status == true){
      console.log(req.richiestaId);
      this.appuntamento = req.appuntamento!
      this.appuntamento.orario = req.nuovoOrario
      this.appuntamento.data = req.nuovaData
      console.log(JSON.stringify(this.appuntamento));
      this.s = this.fetchservice.patchAppuntamento(this.appuntamento).subscribe();
      this.fetchservice.deleteRichiesta(req.richiestaId).then(() => this.returnRichieste())
    } else (
      req.status = false,
      this.fetchservice.deleteRichiesta(req.richiestaId),
      this.returnRichieste()
    )
  }


}
