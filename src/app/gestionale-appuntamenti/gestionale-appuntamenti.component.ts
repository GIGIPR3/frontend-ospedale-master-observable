import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appuntamento } from '../interfaces/Appuntamento';
import { Richiesta } from '../interfaces/Richiesta';
import { Prestazione } from '../interfaces/prestazione';
import { fetchService } from '../services/fetch.service';
import { LogAuthService } from '../services/log.auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gestionale-appuntamenti',
  templateUrl: './gestionale-appuntamenti.component.html',
  styleUrls: ['./gestionale-appuntamenti.component.css'],
})
export class GestionaleAppuntamentiComponent {
  private s!: Subscription;

  constructor(
    private fetchservice: fetchService,
    private route: ActivatedRoute,
    private router: Router,
    private logAuth: LogAuthService
  ) {}

  ngOnInit(): void {
    console.log(this.id);
    this.returnAppuntamenti(this.numberId!);
  }

  appuntamenti: Appuntamento[] = [];
  selectedAppuntamentoId: number = 0;
  nuovaPrestazione: Prestazione | undefined;

  richiesta: Richiesta = {
    richiestaId: 0,
    appuntamento: null,
    status: null,
    nuovaData: '',
    nuovoOrario: '',
    appuntamentoId: 0,
  };

  nuovoAppuntamento: Appuntamento = {
    appuntamentoId: null,
    data: '',
    orario: '',
    ricetta: '',
    completato: false,
    prestazioneId: 0,
    pazienteId: 0,
    prestazione: null,
    paziente: null,
  };

  isMedicoActive: boolean = false;

  id: string | null = this.route.snapshot.paramMap.get('id');
  numberId: number | undefined = this.logAuth.id;

  completaAppuntamento(appuntamento: Appuntamento) {
    appuntamento.completato = !appuntamento.completato;
    this.s = this.fetchservice.patchAppuntamento(appuntamento).subscribe();
  }

  deleteAppuntamento(id: number) {
    this.fetchservice
      .deleteAppuntamento(id)
      .then(() => this.returnAppuntamenti(this.numberId!));
  }

  bottonePostAppuntamento() {
    this.nuovoAppuntamento.pazienteId = this.numberId!;
    this.nuovoAppuntamento.prestazioneId = Number(
      this.nuovaPrestazione?.prestazioneId
    );
    console.log(this.nuovoAppuntamento);
    this.s = this.fetchservice.postAppuntamento(this.appuntamenti).subscribe({
      next: (res) => {
        this.returnAppuntamenti(this.numberId!);
        console.log('Request successful');
      },
      error: (err) => {
        console.error('Error occurred:', err);
      },
    });
  }
  /*
    !attenzione
  */
  bottoneModificaAppuntamento(appId: number) {
    this.richiesta.appuntamentoId = appId;
    console.log(this.richiesta);
    this.s = this.fetchservice.submitRichiesta(this.richiesta).subscribe({
      next:(res) => {
        this.returnAppuntamenti();
      },
    });
  }

  openModal(appuntamentoId: number) {
    this.selectedAppuntamentoId = appuntamentoId;
  }

  returnAppuntamenti(id: number) {
    switch (this.route.snapshot.routeConfig?.path) {
      case 'medico' ||
        this.router.routerState.snapshot.url == '/dirigente/appuntamenti':
        this.isMedicoActive = true;
        this.s = this.fetchservice
          .getAppuntamentiByMedico(id)
          .subscribe((result: Appuntamento[]) => {
            this.appuntamenti = [...result];
          });
        break;

      case 'paziente':
        this.s = this.fetchservice
          .getAppuntamentiByPaziente(id)
          .subscribe((result: Appuntamento[]) => {
            this.appuntamenti = [...result];
          });
        break;

      default:
        this.s = this.fetchservice
          .getAllAppuntamenti()
          .subscribe((result: Appuntamento[]) => {
            this.appuntamenti = [...result];
          });
        break;
    }
  }

  bottoneDeletePrestazione(id: number) {
    this.fetchservice.deletePrestazione(id);
  }

  ngOnDestroy(): void {
    if (this.s && !this.s.closed) {
      this.s.unsubscribe();
    }
  }
}
