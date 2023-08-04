import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PazienteComponent } from './paziente/paziente.component';
import { UserComponent } from './user/user.component';

import { CookieService } from 'ngx-cookie-service';
import { DirigenteComponent } from './dirigente/dirigente.component';
import { GestionaleAppuntamentiComponent } from './gestionale-appuntamenti/gestionale-appuntamenti.component';
import { GestionaleClientiComponent } from './gestionale-clienti/gestionale-clienti.component';
import { GestionaleMediciComponent } from './gestionale-medici/gestionale-medici.component';
import { GestionalePrestazioniComponent } from './gestionale-prestazioni/gestionale-prestazioni.component';
import { GestionaleRichiesteComponent } from './gestionale-richieste/gestionale-richieste.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { MedicoComponent } from './medico/medico.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    PazienteComponent,
    MedicoComponent,
    DirigenteComponent,
    GestionaleClientiComponent,
    GestionaleMediciComponent,
    GestionalePrestazioniComponent,
    GestionaleRichiesteComponent,
    GestionaleAppuntamentiComponent,
    LoginComponentComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
