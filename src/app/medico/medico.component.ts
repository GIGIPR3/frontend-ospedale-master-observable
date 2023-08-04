import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appuntamento } from '../interfaces/Appuntamento';
import { Medico } from '../interfaces/medico';
import { Prestazione } from '../interfaces/prestazione';
import { fetchService } from '../services/fetch.service';
import { LogAuthService } from '../services/log.auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent {

  constructor(
    private fetchservice: fetchService,
    private route: ActivatedRoute,
    private logAuth : LogAuthService
  ) {}

  private s!: Subscription;


  medicoSelezionato: Medico = {
    medicoId: 0,
    firstName: '',
    lastName: '',
    active: true,
    email: ''
  };

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

  nuovaPrestazione: Prestazione | undefined;

  appuntamenti : Appuntamento[] = []

  id: string | null = this.route.snapshot.paramMap.get('id');
  numberId: number | undefined = this.logAuth.id;

  ngOnInit(): void {
    console.log("id medico", this.numberId);
    this.returnSelectedMedico(this.numberId!)
  }

  returnSelectedMedico(id: number) {
    this.s = this.fetchservice.getMedicoById(id).subscribe((result:Medico)=>{this.medicoSelezionato=result})
  }

  addPrestazione(receivedPrestazione : Prestazione){
    this.nuovaPrestazione = receivedPrestazione
    console.log(this.nuovaPrestazione!);

  }

  returnAppuntamenti(id: number) {
    this.s = this.fetchservice.getAppuntamentiByMedico(id).subscribe((result:Appuntamento[])=>{this.appuntamenti=[...result]})
  }


}
