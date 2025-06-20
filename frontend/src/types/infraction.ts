
export interface InfractionLocation {
  address: string;
  coordinates: string;
  zone: string;
}

export interface InfractionEvidence {
  type: string;
  date: string;
  imageUrl?: string;
}

export interface Infraction {
  id: string;
  plate: string;
  date: string;
  type: string;
  location: InfractionLocation;
  amount: number;
  status: 'pending' | 'processed' | 'paid';
  limitDate: string;
  paymentDate?: string;
  paymentMethod?: string;
  reference?: string;
  details?: string;
  evidence?: InfractionEvidence;
}

// API function to fetch infraction details
export const fetchInfractionDetails = async (id: string): Promise<Infraction> => {
  // Dans une vraie application, ceci serait un appel API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id: id,
    plate: 'L-4523-GB',
    date: '13/05/2025 09:02',
    type: 'Excès de vitesse',
    location: {
      address: 'Boulevard Triomphal, Libreville',
      coordinates: '0.3924, 9.4535',
      zone: 'Zone Urbaine'
    },
    amount: 75000,
    status: 'pending',
    limitDate: '27/05/2025 11:02',
    paymentDate: undefined,
    paymentMethod: undefined,
    reference: undefined,
    details: 'Vitesse mesurée: 78 km/h (zone 50 km/h)',
    evidence: {
      type: 'Capture radar',
      date: '13/05/2025 09:02',
      imageUrl: '/placeholder.svg'
    }
  };
};
