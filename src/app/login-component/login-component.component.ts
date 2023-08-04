import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from '../interfaces/medico';
import { Paziente } from '../interfaces/paziente';
import { fetchService } from '../services/fetch.service';
import { LogAuthService } from '../services/log.auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  constructor(private fetchservice : fetchService, private logAuth : LogAuthService, private router: Router){}

  private s!: Subscription;



  emailLog : string = "";
  medico : Medico | null = null
  paziente : Paziente | null = null

  getEmailfromInput(){
    if (this.emailLog === "admin") {
      this.logAuth.role = "admin"
      this.logAuth.updateCookies()
      this.router.navigate(['/admin'])
      console.log("admin logged");
    } else {
      this.s = this.fetchservice.getMedicoByEmail(this.emailLog).subscribe({next: (n : Medico) => {
        console.log('Subscriber: ',n)
        this.medico=n;
        this.logAuth.id = this.medico?.medicoId!
          this.logAuth.role = "medico"
          this.logAuth.updateCookies()
          this.router.navigate(['/medico'])
          console.log(this.medico);
      },
      error: (err : string) => {
        console.error(err);
        this.s = this.fetchservice.getPazienteByEmail(this.emailLog).subscribe({
          next: (n : Paziente) => {
            console.log('Subscriber: ',n)
            this.paziente = n ;
            this.logAuth.id = this.paziente?.pazienteId!
            this.logAuth.role = "paziente"
            this.logAuth.updateCookies()
            this.router.navigate(['/paziente'])
            console.log(this.paziente);
          },
          error: (err : string) => {
            console.error(err);
          },
          complete: () => {
            console.log('Subscriber: completed',)
          }

        })

      },
      complete: () => {
        console.log('Subscriber: completed',)
      }});
    }
  }
    /* async getEmailfromInput(){
    if (this.emailLog === "admin") {
      this.logAuth.role = "admin"
      this.logAuth.updateCookies()
      this.router.navigate(['/admin'])
      console.log("admin logged");
    } else {
        this.s = this.fetchservice.getMedicoByEmail(this.emailLog).subscribe({next: (n : number) => {
          console.log('Subscriber: ',n)
        },
        error: (err : string) => {
          console.error(err);
        },
        complete: () => {
          console.log('Subscriber: completed',)
        }});
        if (medicoResponse.status === 200 && medicoResponse.headers.get('content-type')!.includes('application/json')) {
          const medicoData = await medicoResponse.json();
          this.medico = medicoData;
          this.logAuth.id = this.medico?.medicoId!
          this.logAuth.role = "medico"
          this.logAuth.updateCookies()
          this.router.navigate(['/medico'])
          console.log(this.medico);
        } else {
          const pazienteResponse = await this.fetchservice.getPazienteByEmail(this.emailLog);
          if (pazienteResponse.status === 200 && pazienteResponse.headers.get('content-type')!.includes('application/json')) {
            const pazienteData = await pazienteResponse.json();
            this.paziente = pazienteData;
            this.logAuth.id = this.paziente?.pazienteId!
            this.logAuth.role = "paziente"
            this.logAuth.updateCookies()
            this.router.navigate(['/paziente'])
            console.log(this.paziente);
          }
        }

    }
  } */
}
