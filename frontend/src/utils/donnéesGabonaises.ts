
// Utilitaires pour générer des données spécifiques au Gabon

// Liste des provinces du Gabon
export const provinces = [
  'Estuaire',
  'Haut-Ogooué',
  'Moyen-Ogooué',
  'Ngounié',
  'Nyanga',
  'Ogooué-Ivindo',
  'Ogooué-Lolo',
  'Ogooué-Maritime',
  'Woleu-Ntem'
];

// Liste des villes principales
export const villes = [
  'Libreville',
  'Port-Gentil',
  'Franceville',
  'Oyem',
  'Lambaréné',
  'Moanda',
  'Mouila',
  'Tchibanga',
  'Makokou',
  'Koulamoutou',
  'Bitam',
  'Ntoum',
  'Lastoursville',
  'Ndendé',
  'Mitzic'
];

// Générateur de plaques d'immatriculation gabonaises
export const générerPlaque = (): string => {
  const préfixe = 'GA';
  const numéros = Math.floor(Math.random() * 999).toString().padStart(3, '0');
  const suffixe = villes.map(v => v.substring(0, 3).toUpperCase())[Math.floor(Math.random() * villes.length)];
  return `${préfixe}-${numéros}-${suffixe}`;
};

// Générateur de noms gabonais
export const prénomsGabonais = [
  'Anicet', 'Bruno', 'Christian', 'David', 'Emile', 'Fabrice', 'Gilbert', 'Henri',
  'Irène', 'Jeanne', 'Karine', 'Laurent', 'Mireille', 'Nadège', 'Olivier', 'Pierre',
  'Quentin', 'René', 'Solange', 'Thierry', 'Ulrich', 'Victor', 'William', 'Xavier',
  'Yannick', 'Zoé', 'Antoine', 'Berthe', 'Céline', 'Daniel', 'Evelyne'
];

export const nomsGabonais = [
  'Ondo', 'Ndong', 'Obame', 'Nzue', 'Oyono', 'Mba', 'Nze', 'Aubame',
  'Mengue', 'Mboumba', 'Kombila', 'Ndoutoume', 'Biyoghe', 'Mintsa', 'Abessolo',
  'Asseko', 'Essone', 'Moussavou', 'Edzang', 'Koumba', 'Mayombo', 'Nguema',
  'Ekwa', 'Meyo', 'Bibang', 'Evoung', 'Nkoghe', 'Bibang', 'Angue'
];

export const générerNomComplet = (): string => {
  const prénom = prénomsGabonais[Math.floor(Math.random() * prénomsGabonais.length)];
  const nom = nomsGabonais[Math.floor(Math.random() * nomsGabonais.length)];
  return `${prénom} ${nom}`;
};

// Types d'infractions au code de la route au Gabon
export const typesInfractions = [
  'Excès de vitesse',
  'Non-port de la ceinture de sécurité',
  'Usage du téléphone au volant',
  'Non-respect d\'un feu rouge',
  'Stationnement interdit',
  'Défaut d\'assurance',
  'Défaut de contrôle technique',
  'Conduite en état d\'ivresse',
  'Conduite sans permis',
  'Défaut de carte grise',
  'Dépassement dangereux',
  'Pneus lisses',
  'Défaut d\'éclairage',
  'Surcharge de véhicule',
  'Non-respect de la priorité'
];

// Générateur de dates récentes (dans les 90 derniers jours)
export const générerDateRécente = (): Date => {
  const maintenant = new Date();
  const nombreJours = Math.floor(Math.random() * 90);
  maintenant.setDate(maintenant.getDate() - nombreJours);
  return maintenant;
};

// Formatter une date en format français
export const formaterDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Générateur de montant d'amende (en FCFA)
export const générerMontantAmende = (): number => {
  const montants = [5000, 10000, 15000, 25000, 50000, 75000, 100000, 150000, 200000];
  return montants[Math.floor(Math.random() * montants.length)];
};

// Générateur d'adresses gabonaises
export const générerAdresseGabonaise = (): string => {
  const quartiers = [
    'Lalala', 'Nzeng-Ayong', 'Louis', 'Akébé', 'Oloumi', 'Nomba', 'PK5', 'PK8', 'PK12',
    'Owendo', 'Glass', 'Montagne Sainte', 'Centre-ville', 'Batavéa', 'Okala', 'Mindoubé',
    'Nkembo', 'Rio', 'Plein Ciel', 'Awendjé'
  ];
  
  const rues = [
    'Avenue de l\'Indépendance', 'Boulevard Triomphal', 'Route Nationale 1',
    'Boulevard du Bord de Mer', 'Rue des Martyrs', 'Avenue Léon Mba',
    'Boulevard Omar Bongo', 'Avenue de la Démocratie', 'Rue de la Libération'
  ];
  
  const ville = villes[Math.floor(Math.random() * villes.length)];
  const quartier = quartiers[Math.floor(Math.random() * quartiers.length)];
  const rue = rues[Math.floor(Math.random() * rues.length)];
  
  return `${ville}, ${quartier}, ${rue}`;
};

// Statuts des infractions
export const statutsInfraction = ['En attente', 'Traité', 'Payé'];

// Générateur de statut d'infraction
export const générerStatutInfraction = (): string => {
  return statutsInfraction[Math.floor(Math.random() * statutsInfraction.length)];
};

// Marques de véhicules courantes au Gabon
export const marquesVéhicules = [
  'Toyota', 'Mitsubishi', 'Nissan', 'Hyundai', 'Kia',
  'Ford', 'Volkswagen', 'Peugeot', 'Renault', 'Mercedes-Benz',
  'BMW', 'Land Rover', 'Lexus', 'Suzuki', 'Honda'
];

// Modèles par marque
export const modèlesParMarque: Record<string, string[]> = {
  'Toyota': ['Corolla', 'Hilux', 'Land Cruiser', 'RAV4', 'Fortuner', 'Prado', 'Yaris'],
  'Mitsubishi': ['Pajero', 'L200', 'Outlander', 'ASX', 'Lancer'],
  'Nissan': ['Patrol', 'Navara', 'X-Trail', 'Qashqai', 'Sunny'],
  'Hyundai': ['Tucson', 'Santa Fe', 'i10', 'i20', 'Accent', 'Creta'],
  'Kia': ['Sportage', 'Sorento', 'Rio', 'Picanto', 'Seltos'],
  'Ford': ['Ranger', 'Everest', 'Focus', 'Fiesta', 'Explorer'],
  'Volkswagen': ['Golf', 'Polo', 'Tiguan', 'Touareg', 'Amarok'],
  'Peugeot': ['208', '308', '3008', '508', 'Partner'],
  'Renault': ['Duster', 'Kwid', 'Clio', 'Megane', 'Koleos'],
  'Mercedes-Benz': ['Classe C', 'Classe E', 'GLE', 'GLC', 'Sprinter'],
  'BMW': ['Série 3', 'Série 5', 'X3', 'X5', 'X6'],
  'Land Rover': ['Defender', 'Discovery', 'Range Rover', 'Evoque'],
  'Lexus': ['LX', 'RX', 'ES', 'IS', 'UX'],
  'Suzuki': ['Jimny', 'Vitara', 'Swift', 'Alto', 'Celerio'],
  'Honda': ['CR-V', 'Civic', 'Accord', 'HR-V', 'City']
};

// Générateur de véhicules gabonais
export const générerVéhicule = () => {
  const marque = marquesVéhicules[Math.floor(Math.random() * marquesVéhicules.length)];
  const modèle = modèlesParMarque[marque][Math.floor(Math.random() * modèlesParMarque[marque].length)];
  const année = 2010 + Math.floor(Math.random() * 13); // Entre 2010 et 2023
  const couleurs = ['Blanc', 'Noir', 'Gris', 'Rouge', 'Bleu', 'Vert', 'Marron', 'Argent'];
  const couleur = couleurs[Math.floor(Math.random() * couleurs.length)];
  const plaque = générerPlaque();
  
  return {
    marque,
    modèle,
    année,
    couleur,
    plaque,
    propriétaire: générerNomComplet()
  };
};

// Générateur d'infractions
export const générerInfraction = (id?: string) => {
  return {
    id: id || Math.random().toString(36).substring(2, 10),
    date: formaterDate(générerDateRécente()),
    plaque: générerPlaque(),
    lieu: générerAdresseGabonaise(),
    type: typesInfractions[Math.floor(Math.random() * typesInfractions.length)],
    statut: générerStatutInfraction(),
    montant: générerMontantAmende(),
    conducteur: générerNomComplet()
  };
};

// Générateur d'un tableau d'infractions
export const générerInfractions = (nombre: number) => {
  return Array.from({ length: nombre }, (_, i) => générerInfraction(`inf-${i+1}`));
};

// Générateur d'un tableau de véhicules
export const générerVéhicules = (nombre: number) => {
  return Array.from({ length: nombre }, (_, i) => ({ 
    id: `veh-${i+1}`, 
    ...générerVéhicule() 
  }));
};

// Générateur de conducteurs
export const générerConducteur = (id?: string) => {
  const dateNaissance = new Date();
  dateNaissance.setFullYear(dateNaissance.getFullYear() - 20 - Math.floor(Math.random() * 40)); // Entre 20 et 60 ans
  
  return {
    id: id || Math.random().toString(36).substring(2, 10),
    nom: générerNomComplet(),
    dateNaissance: formaterDate(dateNaissance),
    adresse: générerAdresseGabonaise(),
    numéroPermis: `P${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
    catégoriePermis: ['A', 'B', 'C', 'D', 'E'][Math.floor(Math.random() * 5)],
    dateExpiration: formaterDate(new Date(new Date().setFullYear(new Date().getFullYear() + Math.floor(Math.random() * 5))))
  };
};

// Générateur d'un tableau de conducteurs
export const générerConducteurs = (nombre: number) => {
  return Array.from({ length: nombre }, (_, i) => générerConducteur(`cond-${i+1}`));
};

// Statuts des équipements
export const statutsÉquipement = ['En ligne', 'Hors ligne', 'Maintenance'];

// Générateur d'équipements de surveillance
export const générerÉquipement = (id?: string) => {
  const types = ['Radar', 'Caméra', 'Portique', 'Balise'];
  const type = types[Math.floor(Math.random() * types.length)];
  const ville = villes[Math.floor(Math.random() * villes.length)];
  const statut = statutsÉquipement[Math.floor(Math.random() * statutsÉquipement.length)];
  
  return {
    id: id || Math.random().toString(36).substring(2, 10),
    nom: `${type} ${ville} ${Math.floor(Math.random() * 10) + 1}`,
    type,
    lieu: générerAdresseGabonaise(),
    statut,
    dernièreMaintenance: formaterDate(générerDateRécente())
  };
};

// Générateur d'équipements
export const générerÉquipements = (nombre: number) => {
  return Array.from({ length: nombre }, (_, i) => générerÉquipement(`equip-${i+1}`));
};

// Générateur d'activité quotidienne
export const générerActivitéQuotidienne = (jours: number) => {
  const joursSemaine = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
  return Array.from({ length: jours }, (_, i) => {
    const jour = joursSemaine[i % 7];
    return {
      jour,
      infractions: 30 + Math.floor(Math.random() * 50),
      contrôles: 50 + Math.floor(Math.random() * 70)
    };
  });
};
