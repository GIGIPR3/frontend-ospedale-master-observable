import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardFn } from './guards/auth.guard';
import { LoginComponentComponent } from './login-component/login-component.component';
import { MedicoComponent } from './medico/medico.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PazienteComponent } from './paziente/paziente.component';


const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'admin',
    canActivate : [authGuardFn("admin")],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  // { path: 'paziente/:id', component: PazienteComponent },
  { path: 'paziente', component: PazienteComponent, canActivate : [authGuardFn("paziente")] },
  // { path: 'medico/:id', component: MedicoComponent },
  { path: 'medico', component: MedicoComponent, canActivate : [authGuardFn("medico")]},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
