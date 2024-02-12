export interface Dahra {
    id: number;
    imageSrc: string;
    nom: string,
    nomOuztas: string,
    numeroTelephone: string ,
    numeroTelephoneOuztas: string,
    adresse: string,
    region:string,
    nombreTalibe: number,
    isActivated: boolean; // Nouvelle propriété pour suivre l'état d'activation du dahra
  }