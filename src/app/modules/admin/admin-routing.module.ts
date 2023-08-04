import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirigenteComponent } from 'src/app/dirigente/dirigente.component';
import { GestionaleAppuntamentiComponent } from 'src/app/gestionale-appuntamenti/gestionale-appuntamenti.component';
import { GestionaleClientiComponent } from 'src/app/gestionale-clienti/gestionale-clienti.component';
import { GestionaleMediciComponent } from 'src/app/gestionale-medici/gestionale-medici.component';
import { GestionalePrestazioniComponent } from 'src/app/gestionale-prestazioni/gestionale-prestazioni.component';
import { GestionaleRichiesteComponent } from 'src/app/gestionale-richieste/gestionale-richieste.component';
import { MedicoComponent } from 'src/app/medico/medico.component';
import { PazienteComponent } from 'src/app/paziente/paziente.component';
import { UserComponent } from 'src/app/user/user.component';

const routes: Routes = [
  {path: '', component: UserComponent},
  {
    path: 'dirigente',
    component: DirigenteComponent,
    children: [
      { path: 'medici', component: GestionaleMediciComponent },
      { path: 'pazienti', component: GestionaleClientiComponent },
      { path: 'appuntamenti', component: GestionaleAppuntamentiComponent },
      { path: 'prestazioni', component: GestionalePrestazioniComponent },
      { path: 'richieste', component: GestionaleRichiesteComponent },
      { path: '', redirectTo: '/admin', pathMatch: 'full'}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
