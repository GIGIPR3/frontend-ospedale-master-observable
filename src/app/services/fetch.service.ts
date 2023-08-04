import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Medico } from "../interfaces/medico";
import { Prestazione } from "../interfaces/prestazione";
import { Richiesta } from "../interfaces/Richiesta";
import { Paziente } from "../interfaces/paziente";
import { Appuntamento } from "../interfaces/Appuntamento";

@Injectable({
  providedIn: 'root'
})

export class fetchService {

  constructor(private http: HttpClient){

  }

  pazienti: any;
  medici: any;
  prestazioni: any;

  /* GET */

  getPaziente(){
    return this.http.get<Paziente[]>('http://localhost:8080/ospedale/v1/getPazienti')
  }

  getPazienteById(id: number){
    return this.http.get<Paziente>(`http://localhost:8080/ospedale/v1/getPazienteById/${id}`)
  }

  getAllAppuntamenti(){
    return this.http.get<Appuntamento[]>(`http://localhost:8080/ospedale/v1/getAppuntamenti`)
  }

  getAppuntamentiByPaziente(id:number) {
    return this.http.get<Appuntamento[]>(`http://localhost:8080/ospedale/v1/getAppuntamentoByPazienteId/${id}`)
  }

  getAppuntamentiByMedico(id:number) {
    return this.http.get<Appuntamento[]>(`http://localhost:8080/ospedale/v1/getAppuntamentoByMedicoId/${id}`)
  }


  getMedico(){
    return this.http.get<Medico[]>(`http://localhost:8080/ospedale/v1/getMedico`)
  }

  getMedicoById(id: number){
    return this.http.get<Medico>(`http://localhost:8080/ospedale/v1/getMedico/${id}`)
  }

  getPrestazioni(){
    return this.http.get<Prestazione[]>(`http://localhost:8080/ospedale/v1/getPrestazioni`)
  }

  getRichieste() {
    return this.http.get<Richiesta[]>(`http://localhost:8080/ospedale/v1/getRichieste`)
  }

  getMedicoByEmail(email : string) {
    return this.http.get<Medico>(`http://localhost:8080/ospedale/v1/getMedicoByEmail/${email}`)
  }

  getPazienteByEmail(email : string) {
    return this.http.get<Paziente>(`http://localhost:8080/ospedale/v1/getPazienteByEmail/${email}`)
  }

  /* POST */

  postAppuntamento(data:object){
    return this.http.post('http://localhost:8080/ospedale/v1/postAppuntamento', data)
  }

  patchAppuntamento(data:object){
    return this.http.patch('http://localhost:8080/ospedale/v1/patchAppuntamento', data)
  }

  patchRichiesta(data : object){
    return this.http.patch('http://localhost:8080/ospedale/v1/patchRichiesta', data)
  }

  patchMedico(data:object){
    return this.http.patch(`http://localhost:8080/ospedale/v1/patchMedico`, data)
  }


  submitPaziente(data:object){
    return this.http.post('http://localhost:8080/ospedale/v1/postPaziente', data)
  }


  submitMedico(data:object){
    return this.http.post('http://localhost:8080/ospedale/v1/postMedico', data)
  }


  submitPrestazione(data:object){
    return this.http.post('http://localhost:8080/ospedale/v1/postPrestazione', data)
  }

  submitRichiesta(data:object){
    return this.http.post('http://localhost:8080/ospedale/v1/postRichiesta', data)
    /* console.log("post prestazione", data);

    return fetch('http://localhost:8080/ospedale/v1/postRichiesta',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":'application/json;charset=utf-8'
      }
    }).then(response =>response.json()) */
  }

  /* DELETE */

  deletePaziente(id:number){
    return fetch(`http://localhost:8080/ospedale/v1/deletePaziente${id}`,{
      method:"DELETE"
    })
  }

  deleteMedico(id:number){
    return fetch(`http://localhost:8080/ospedale/v1/medico/${id}`,{
      method:"DELETE"
    })
  }

  deletePrestazione(id:number){
    return fetch(`http://localhost:8080/ospedale/v1/deletePrestazione${id}`,{
      method:"DELETE"
    })
  }

  deleteRichiesta(id:number){
    return fetch(`http://localhost:8080/ospedale/v1/deleteRichiesta/${id}`,{
      method:"DELETE"
    })
  }

  deleteAppuntamento(id:number){
    return fetch(`http://localhost:8080/ospedale/v1/deleteAppuntamento/${id}`,{
      method:"DELETE"
    })
  }



}
