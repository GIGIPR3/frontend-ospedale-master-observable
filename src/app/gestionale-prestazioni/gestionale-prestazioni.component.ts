import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fetchService } from '../services/fetch.service';
import { Prestazione } from '../interfaces/prestazione';
import { Medico } from '../interfaces/medico';
import {ActivatedRoute, Router, RouterState, RouterStateSnapshot} from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gestionale-prestazioni',
  templateUrl: './gestionale-prestazioni.component.html',
  styleUrls: ['./gestionale-prestazioni.component.css']
})
export class GestionalePrestazioniComponent implements OnInit, OnDestroy{
  constructor(private fetchservice: fetchService,  private route: ActivatedRoute, private router: Router ) {}

  private s!: Subscription;

  // @Input() receivedMedici: Medico[] | undefined;

  medici : Medico[] = []

  @Output() prenotazionePrestazione = new EventEmitter<Prestazione>();

  isDirigenteActive: boolean = false
  isSetPrestazioneActive: boolean = false

  renderPutPrestazioni(){
    if ( this.router.routerState.snapshot.url == '/admin/dirigente/prestazioni') {
      this.isDirigenteActive = true} else ( console.log("edsdsdsd", this.router.routerState.snapshot.url), this.isSetPrestazioneActive = true )
  }
  prestazioni: Prestazione[] = [];

  medicoId = 0;
  firstName = '';
  lastName = '';
  codiceFiscale = '';
  active = '';
  email = '';
  medico = '';
  tipologia = '';

  ngOnInit(): void {
    this.returnPrestazioni();
    this.renderPutPrestazioni()
    this.returnMedici()
  }

  returnPrestazioni() {
    this.s = this.fetchservice.getPrestazioni().subscribe((result:Prestazione[])=> {this.prestazioni=[...result]})

  }

  bottonePrestazione() {
    const data = {
      tipologia: this.tipologia,
      medicoId: this.medicoId,
    };

    this.s = this.fetchservice.submitPrestazione(data).subscribe({
      next:(res)=>{
        this.returnPrestazioni();
      }
    })
  }

  bottoneDeletePrestazione(id: number) {
    this.fetchservice.deletePrestazione(id).then(()=> this.returnPrestazioni());
  }

  prenotaPrestazione(data : any){
    this.prenotazionePrestazione.emit(data);
  }

  returnMedici(){
    this.s = this.fetchservice.getMedico().subscribe((result:Medico[])=>{this.medici=[...result]})
    return this.s;
  }

  ngOnDestroy(): void {
    if (this.s && !this.s.closed) {
      this.s.unsubscribe()
  }
}

}
