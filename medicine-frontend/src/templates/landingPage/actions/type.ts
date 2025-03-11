export interface registerPatientType {
  password: string;
  medecin_perso: string;
  nom: string;
  prenom: string;
  sexe: "homme" | "femme" | "autre";
  num_tel: string;
  date_naissance: string;
  num_secu_sociale: string;
  email: string;
}
