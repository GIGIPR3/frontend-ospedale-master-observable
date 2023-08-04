import { Paziente } from "./paziente";
import { Prestazione } from "./prestazione";

export interface Appuntamento {
    appuntamentoId: number | null;
    data: string;
    orario : string;
    ricetta : string;
    completato : boolean;
    prestazioneId : number;
    pazienteId : number;
    prestazione: Prestazione | null;
    paziente : Paziente | null
}