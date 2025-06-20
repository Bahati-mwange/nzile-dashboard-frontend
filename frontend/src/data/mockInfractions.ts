
// Mock data for infractions with Gabonese names
export type InfractionStatus = 'pending' | 'processed' | 'paid';

export interface Infraction {
  id: string;
  date: string;
  plate: string;
  location: string;
  type: string;
  status: InfractionStatus;
  amount: number;
  driver: string;
  details: string;
}

export const infractions: Infraction[] = [
  {
    id: 'kli99m8n',
    date: '04/04/2025',
    plate: 'GA-123-LBV',
    location: 'Libreville, Boulevard Triomphal',
    type: 'Excès de vitesse',
    status: 'pending',
    amount: 50000,
    driver: 'Ndong Mba Jean',
    details: 'Vitesse mesurée: 78 km/h (zone 50 km/h)',
  },
  {
    id: '2',
    date: '03/04/2025',
    plate: 'GA-456-OWE',
    location: 'Port-Gentil, Avenue Savorgnan',
    type: 'Feu rouge',
    status: 'processed',
    amount: 35000,
    driver: 'Ondo Sophie',
    details: 'Passage au feu rouge à l\'intersection principale',
  },
  {
    id: '3',
    date: '02/04/2025',
    plate: 'GA-789-FCV',
    location: 'Franceville, Avenue Hassan II',
    type: 'Stationnement interdit',
    status: 'paid',
    amount: 15000,
    driver: 'Moussavou Pierre',
    details: 'Stationnement en zone interdite (livraison)',
  },
  {
    id: '4',
    date: '01/04/2025',
    plate: 'GA-012-OYM',
    location: 'Oyem, Route Nationale 2',
    type: 'Non-port de la ceinture',
    status: 'processed',
    amount: 25000,
    driver: 'Obiang Marie',
    details: 'Conducteur sans ceinture de sécurité',
  },
  {
    id: '5',
    date: '31/03/2025',
    plate: 'GA-345-LBV',
    location: 'Libreville, Bord de mer',
    type: 'Téléphone au volant',
    status: 'pending',
    amount: 45000,
    driver: 'Nzoghe Marcel',
    details: 'Utilisation du téléphone portable en conduisant',
  },
];

export const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processed: 'bg-blue-100 text-blue-800 border-blue-200',
  paid: 'bg-green-100 text-green-800 border-green-200',
};

export const statusLabels = {
  pending: 'En attente',
  processed: 'Traité',
  paid: 'Payé',
};
