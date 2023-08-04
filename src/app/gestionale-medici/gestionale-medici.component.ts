import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { fetchService } from '../services/fetch.service';
import { Medico } from '../interfaces/medico';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gestionale-medici',
  templateUrl: './gestionale-medici.component.html',
  styleUrls: ['./gestionale-medici.component.css'],
})
export class GestionaleMediciComponent implements OnInit, OnDestroy {

  constructor(private fetchservice: fetchService) {}

  private s!: Subscription;

  @Output() mediciEvent = new EventEmitter<Medico[]>();

  medici: Medico[] = [];

  medicoId = 0;
  firstName = '';
  lastName = '';
  codiceFiscale = '';
  active = '';
  email = '';
  medico = '';
  tipologia = '';

  ngOnInit(): void {
    this.returnMedici();
  }

  returnMedici() {
    this.s = this.fetchservice.getMedico().subscribe((result:Medico[])=>{this.medici=[...result]})
    this.mediciEvent.emit(this.medici);
      console.log('get medici', this.medici);
    return this.s;
  }

  bottoneMedico() {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
      active: this.active,
      email: this.email,
    };
    this.s = this.fetchservice.submitMedico(data).subscribe({
      next:(result)=>{
        this.returnMedici()
      }
    })
  }

  bottoneDeleteMedico(id: number) {
    this.fetchservice.deleteMedico(id).then(() => this.returnMedici());
  }

  isMedicoActive(medico : Medico){
    medico.active = !medico.active
      console.log(medico.active);
      this.s = this.fetchservice.patchMedico(medico).subscribe();
  }

  ngOnDestroy(): void {
      if (this.s && !this.s.closed) {
        this.s.unsubscribe()
    }
  }
}
