import { Medico } from "./medico";

export interface Prestazione {
  prestazioneId: number;
  tipologia: string;
  medico: Medico
}
