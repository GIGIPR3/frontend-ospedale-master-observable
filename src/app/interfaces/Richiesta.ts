import { Appuntamento } from "./Appuntamento";

export interface Richiesta {
  richiestaId: number;
  appuntamento: Appuntamento | null
  status: Boolean | null;
  nuovaData: string;
  nuovoOrario: string;
  appuntamentoId: number
}
