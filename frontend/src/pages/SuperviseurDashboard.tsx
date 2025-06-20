
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, Car, FileText, DollarSign, Shield, User, BarChart, 
  Download, Calendar, Search, MapPin, Filter 
} from 'lucide-react';
import { useApiData } from '@/hooks/useApiData';
import StatsCard from '@/components/dashboard/StatsCard';

// Typage pour les données
type Agent = {
  id: string;
  nom: string;
  prénom: string;
  email: string;
  téléphone: string;
  statut: 'actif' | 'inactif';
  nombreControles: number;
  montantRécolté: number;
  localisation?: { lat: number; lng: number; nom: string };
  matériel: { scanner: boolean; imprimante: boolean; autre?: string };
};

type Véhicule = {
  id: string;
  plaque: string;
  marque: string;
  modèle: string;
  année: string;
  genre: string;
  série: string;
  propriétaire: string;
  nombreControles: number;
};

type Conducteur = {
  id: string;
  nom: string;
  prénom: string;
  permis: string;
  téléphone: string;
  email?: string;
  nombreControles: number;
  nombreInfractions: number;
};

type Transaction = {
  id: string;
  numéro: string;
  cléPaiement: string;
  montant: number;
  date: string;
  statut: 'payé' | 'en_attente';
  agentId: string;
  agentNom: string;
  localisation?: string;
};

type Amende = {
  id: string;
  numéro: string;
  description: string;
  montant: number;
  date: string;
  véhiculePlaque: string;
  conducteurNom: string;
  statut: 'payé' | 'en_attente' | 'annulé';
};

type Contrôle = {
  id: string;
  date: string;
  lieu: string;
  agentId: string;
  agentNom: string;
  véhiculePlaque: string;
  conducteurNom: string;
  résultat: 'conforme' | 'non_conforme';
  nombreInfractions: number;
  montantTotal: number;
  géolocalisation?: { lat: number; lng: number };
};

type Utilisateur = {
  id: string;
  nom: string;
  prénom: string;
  email: string;
  rôle: 'admin' | 'superviseur' | 'agent';
  statut: 'actif' | 'inactif';
  dernièreConnexion?: string;
};

type Statistiques = {
  totalControles: number;
  totalMontant: number;
  zonesÀRisque: { nom: string; nombreInfractions: number }[];
  infractionsFréquentes: { type: string; nombre: number }[];
  tauxPaiement: number;
  activitéParHeure: { heure: number; nombre: number }[];
};

// Fonction pour générer des données de test
const générerDonnéesAgents = (): Agent[] => [
  {
    id: "A001",
    nom: "Nzoghe",
    prénom: "Jean-Paul",
    email: "jp.nzoghe@transport.gouv.ga",
    téléphone: "+241 77123456",
    statut: "actif",
    nombreControles: 156,
    montantRécolté: 2345000,
    localisation: { lat: -0.7071, lng: 8.7815, nom: "Libreville Centre" },
    matériel: { scanner: true, imprimante: true }
  },
  {
    id: "A002",
    nom: "Mboumba",
    prénom: "Claire",
    email: "c.mboumba@transport.gouv.ga",
    téléphone: "+241 66789012",
    statut: "actif",
    nombreControles: 98,
    montantRécolté: 1872000,
    localisation: { lat: -0.7169, lng: 8.7583, nom: "Port-Gentil" },
    matériel: { scanner: true, imprimante: false }
  },
  {
    id: "A003",
    nom: "Ondo",
    prénom: "Marc",
    email: "m.ondo@transport.gouv.ga",
    téléphone: "+241 74567890",
    statut: "inactif",
    nombreControles: 42,
    montantRécolté: 865000,
    matériel: { scanner: false, imprimante: true }
  },
  {
    id: "A004",
    nom: "Ekomi",
    prénom: "Sarah",
    email: "s.ekomi@transport.gouv.ga",
    téléphone: "+241 65432198",
    statut: "actif",
    nombreControles: 124,
    montantRécolté: 2150000,
    localisation: { lat: -1.6732, lng: 13.5878, nom: "Franceville" },
    matériel: { scanner: true, imprimante: true }
  },
  {
    id: "A005",
    nom: "Makanga",
    prénom: "Paul",
    email: "p.makanga@transport.gouv.ga",
    téléphone: "+241 77889900",
    statut: "actif",
    nombreControles: 87,
    montantRécolté: 1456000,
    localisation: { lat: 1.6138, lng: 11.3522, nom: "Oyem" },
    matériel: { scanner: true, imprimante: true }
  }
];

const générerDonnéesVéhicules = (): Véhicule[] => [
  {
    id: "V001",
    plaque: "GA-123-LBV",
    marque: "Toyota",
    modèle: "Land Cruiser",
    année: "2020",
    genre: "4x4",
    série: "VDJ200",
    propriétaire: "Ministère des Transports",
    nombreControles: 5
  },
  {
    id: "V002",
    plaque: "GA-456-POG",
    marque: "Mitsubishi",
    modèle: "Pajero",
    année: "2019",
    genre: "4x4",
    série: "V80",
    propriétaire: "SEEG",
    nombreControles: 3
  },
  {
    id: "V003",
    plaque: "GA-789-FCE",
    marque: "Ford",
    modèle: "Ranger",
    année: "2021",
    genre: "Pickup",
    série: "T6",
    propriétaire: "Société Gabonaise de Transport",
    nombreControles: 2
  },
  {
    id: "V004",
    plaque: "GA-234-LBV",
    marque: "Peugeot",
    modèle: "3008",
    année: "2018",
    genre: "SUV",
    série: "P84",
    propriétaire: "Radio Gabon",
    nombreControles: 4
  },
  {
    id: "V005",
    plaque: "GA-567-OYE",
    marque: "Renault",
    modèle: "Duster",
    année: "2020",
    genre: "SUV",
    série: "HSA",
    propriétaire: "Office National du Tourisme",
    nombreControles: 1
  }
];

const générerDonnéesConducteurs = (): Conducteur[] => [
  {
    id: "C001",
    nom: "Mengue",
    prénom: "François",
    permis: "GA12345678",
    téléphone: "+241 66123456",
    email: "f.mengue@gmail.com",
    nombreControles: 4,
    nombreInfractions: 1
  },
  {
    id: "C002",
    nom: "Ndong",
    prénom: "Marie",
    permis: "GA87654321",
    téléphone: "+241 77654321",
    nombreControles: 2,
    nombreInfractions: 0
  },
  {
    id: "C003",
    nom: "Obame",
    prénom: "Pierre",
    permis: "GA24681357",
    téléphone: "+241 65789012",
    email: "p.obame@yahoo.fr",
    nombreControles: 5,
    nombreInfractions: 2
  },
  {
    id: "C004",
    nom: "Biyogo",
    prénom: "Anne",
    permis: "GA13579246",
    téléphone: "+241 74321098",
    nombreControles: 1,
    nombreInfractions: 0
  },
  {
    id: "C005",
    nom: "Nguema",
    prénom: "Joseph",
    permis: "GA98765432",
    téléphone: "+241 66987654",
    email: "j.nguema@hotmail.com",
    nombreControles: 3,
    nombreInfractions: 1
  }
];

const générerDonnéesTransactions = (): Transaction[] => [
  {
    id: "T001",
    numéro: "TX-2025-001",
    cléPaiement: "PAY-GABON-12345",
    montant: 25000,
    date: "2025-05-12",
    statut: "payé",
    agentId: "A001",
    agentNom: "Nzoghe Jean-Paul",
    localisation: "Libreville Centre"
  },
  {
    id: "T002",
    numéro: "TX-2025-002",
    cléPaiement: "PAY-GABON-12346",
    montant: 15000,
    date: "2025-05-11",
    statut: "payé",
    agentId: "A002",
    agentNom: "Mboumba Claire",
    localisation: "Port-Gentil"
  },
  {
    id: "T003",
    numéro: "TX-2025-003",
    cléPaiement: "PAY-GABON-12347",
    montant: 50000,
    date: "2025-05-10",
    statut: "en_attente",
    agentId: "A004",
    agentNom: "Ekomi Sarah",
    localisation: "Franceville"
  },
  {
    id: "T004",
    numéro: "TX-2025-004",
    cléPaiement: "PAY-GABON-12348",
    montant: 30000,
    date: "2025-05-09",
    statut: "payé",
    agentId: "A005",
    agentNom: "Makanga Paul",
    localisation: "Oyem"
  },
  {
    id: "T005",
    numéro: "TX-2025-005",
    cléPaiement: "PAY-GABON-12349",
    montant: 20000,
    date: "2025-05-08",
    statut: "en_attente",
    agentId: "A001",
    agentNom: "Nzoghe Jean-Paul",
    localisation: "Libreville Centre"
  }
];

const générerDonnéesAmendes = (): Amende[] => [
  {
    id: "AM001",
    numéro: "AM-2025-001",
    description: "Excès de vitesse (20 km/h au-dessus de la limite)",
    montant: 25000,
    date: "2025-05-12",
    véhiculePlaque: "GA-123-LBV",
    conducteurNom: "Mengue François",
    statut: "payé"
  },
  {
    id: "AM002",
    numéro: "AM-2025-002",
    description: "Feu rouge non respecté",
    montant: 15000,
    date: "2025-05-11",
    véhiculePlaque: "GA-456-POG",
    conducteurNom: "Ndong Marie",
    statut: "payé"
  },
  {
    id: "AM003",
    numéro: "AM-2025-003",
    description: "Défaut d'assurance",
    montant: 50000,
    date: "2025-05-10",
    véhiculePlaque: "GA-789-FCE",
    conducteurNom: "Obame Pierre",
    statut: "en_attente"
  },
  {
    id: "AM004",
    numéro: "AM-2025-004",
    description: "Stationnement interdit",
    montant: 10000,
    date: "2025-05-09",
    véhiculePlaque: "GA-234-LBV",
    conducteurNom: "Biyogo Anne",
    statut: "payé"
  },
  {
    id: "AM005",
    numéro: "AM-2025-005",
    description: "Téléphone au volant",
    montant: 20000,
    date: "2025-05-08",
    véhiculePlaque: "GA-567-OYE",
    conducteurNom: "Nguema Joseph",
    statut: "en_attente"
  }
];

const générerDonnéesContrôles = (): Contrôle[] => [
  {
    id: "CT001",
    date: "2025-05-12",
    lieu: "Avenue Léon Mba, Libreville",
    agentId: "A001",
    agentNom: "Nzoghe Jean-Paul",
    véhiculePlaque: "GA-123-LBV",
    conducteurNom: "Mengue François",
    résultat: "non_conforme",
    nombreInfractions: 1,
    montantTotal: 25000,
    géolocalisation: { lat: -0.7071, lng: 8.7815 }
  },
  {
    id: "CT002",
    date: "2025-05-11",
    lieu: "Boulevard de l'Indépendance, Port-Gentil",
    agentId: "A002",
    agentNom: "Mboumba Claire",
    véhiculePlaque: "GA-456-POG",
    conducteurNom: "Ndong Marie",
    résultat: "non_conforme",
    nombreInfractions: 1,
    montantTotal: 15000,
    géolocalisation: { lat: -0.7169, lng: 8.7583 }
  },
  {
    id: "CT003",
    date: "2025-05-10",
    lieu: "Route Nationale 3, Franceville",
    agentId: "A004",
    agentNom: "Ekomi Sarah",
    véhiculePlaque: "GA-789-FCE",
    conducteurNom: "Obame Pierre",
    résultat: "non_conforme",
    nombreInfractions: 1,
    montantTotal: 50000,
    géolocalisation: { lat: -1.6732, lng: 13.5878 }
  },
  {
    id: "CT004",
    date: "2025-05-09",
    lieu: "Avenue Hassan II, Libreville",
    agentId: "A001",
    agentNom: "Nzoghe Jean-Paul",
    véhiculePlaque: "GA-234-LBV",
    conducteurNom: "Biyogo Anne",
    résultat: "conforme",
    nombreInfractions: 0,
    montantTotal: 0,
    géolocalisation: { lat: -0.7125, lng: 8.7800 }
  },
  {
    id: "CT005",
    date: "2025-05-08",
    lieu: "Centre-ville, Oyem",
    agentId: "A005",
    agentNom: "Makanga Paul",
    véhiculePlaque: "GA-567-OYE",
    conducteurNom: "Nguema Joseph",
    résultat: "non_conforme",
    nombreInfractions: 1,
    montantTotal: 20000,
    géolocalisation: { lat: 1.6138, lng: 11.3522 }
  }
];

const générerDonnéesUtilisateurs = (): Utilisateur[] => [
  {
    id: "U001",
    nom: "Nzoghe",
    prénom: "Jean-Paul",
    email: "jp.nzoghe@transport.gouv.ga",
    rôle: "agent",
    statut: "actif",
    dernièreConnexion: "2025-05-12 08:30"
  },
  {
    id: "U002",
    nom: "Mboumba",
    prénom: "Claire",
    email: "c.mboumba@transport.gouv.ga",
    rôle: "agent",
    statut: "actif",
    dernièreConnexion: "2025-05-11 09:15"
  },
  {
    id: "U003",
    nom: "Ondo",
    prénom: "Marc",
    email: "m.ondo@transport.gouv.ga",
    rôle: "agent",
    statut: "inactif",
    dernièreConnexion: "2025-04-28 14:20"
  },
  {
    id: "U004",
    nom: "Ekomi",
    prénom: "Sarah",
    email: "s.ekomi@transport.gouv.ga",
    rôle: "agent",
    statut: "actif",
    dernièreConnexion: "2025-05-10 11:45"
  },
  {
    id: "U005",
    nom: "Makanga",
    prénom: "Paul",
    email: "p.makanga@transport.gouv.ga",
    rôle: "agent",
    statut: "actif",
    dernièreConnexion: "2025-05-12 07:55"
  },
  {
    id: "U006",
    nom: "Bongo",
    prénom: "Olivier",
    email: "o.bongo@transport.gouv.ga",
    rôle: "superviseur",
    statut: "actif",
    dernièreConnexion: "2025-05-12 08:00"
  },
  {
    id: "U007",
    nom: "Moussavou",
    prénom: "Richard",
    email: "r.moussavou@transport.gouv.ga",
    rôle: "admin",
    statut: "actif",
    dernièreConnexion: "2025-05-12 07:30"
  }
];

const générerDonnéesStatistiques = (): Statistiques => ({
  totalControles: 457,
  totalMontant: 8756000,
  zonesÀRisque: [
    { nom: "Libreville Centre", nombreInfractions: 156 },
    { nom: "Port-Gentil", nombreInfractions: 98 },
    { nom: "Franceville", nombreInfractions: 65 },
    { nom: "Oyem", nombreInfractions: 42 },
    { nom: "Lambaréné", nombreInfractions: 28 }
  ],
  infractionsFréquentes: [
    { type: "Excès de vitesse", nombre: 124 },
    { type: "Défaut d'assurance", nombre: 87 },
    { type: "Feu rouge", nombre: 65 },
    { type: "Téléphone", nombre: 43 },
    { type: "Ceinture", nombre: 31 }
  ],
  tauxPaiement: 68.5,
  activitéParHeure: [
    { heure: 6, nombre: 12 },
    { heure: 7, nombre: 25 },
    { heure: 8, nombre: 38 },
    { heure: 9, nombre: 45 },
    { heure: 10, nombre: 42 },
    { heure: 11, nombre: 38 },
    { heure: 12, nombre: 32 },
    { heure: 13, nombre: 28 },
    { heure: 14, nombre: 35 },
    { heure: 15, nombre: 42 },
    { heure: 16, nombre: 48 },
    { heure: 17, nombre: 52 },
    { heure: 18, nombre: 45 },
    { heure: 19, nombre: 32 },
    { heure: 20, nombre: 18 },
    { heure: 21, nombre: 8 }
  ]
});

// Composant principal du tableau de bord superviseur
const SuperviseurDashboard: React.FC = () => {
  const [périodeFiltrage, setPériodeFiltrage] = useState<'jour' | 'semaine' | 'mois'>('jour');
  
  // Utilisation du hook personnalisé pour récupérer les données
  const { données: agents, chargement: agentsChargement } = useApiData<Agent[]>(
    'https://votre-api.com/agents',
    undefined,
    générerDonnéesAgents
  );

  const { données: véhicules, chargement: véhiculesChargement } = useApiData<Véhicule[]>(
    'https://votre-api.com/vehicules',
    undefined,
    générerDonnéesVéhicules
  );

  const { données: conducteurs, chargement: conducteursChargement } = useApiData<Conducteur[]>(
    'https://votre-api.com/conducteurs',
    undefined,
    générerDonnéesConducteurs
  );

  const { données: transactions, chargement: transactionsChargement } = useApiData<Transaction[]>(
    'https://votre-api.com/transactions',
    undefined,
    générerDonnéesTransactions
  );

  const { données: amendes, chargement: amendesChargement } = useApiData<Amende[]>(
    'https://votre-api.com/amendes',
    undefined,
    générerDonnéesAmendes
  );

  const { données: contrôles, chargement: contrôlesChargement } = useApiData<Contrôle[]>(
    'https://votre-api.com/controles',
    undefined,
    générerDonnéesContrôles
  );

  const { données: utilisateurs, chargement: utilisateursChargement } = useApiData<Utilisateur[]>(
    'https://votre-api.com/utilisateurs',
    undefined,
    générerDonnéesUtilisateurs
  );

  const { données: statistiques, chargement: statistiquesChargement } = useApiData<Statistiques>(
    'https://votre-api.com/statistiques',
    undefined,
    générerDonnéesStatistiques
  );

  // Fonctions utilitaires
  const handleExportCSV = () => {
    alert('Exportation CSV en cours...');
    // Logique d'exportation à implémenter
  };

  const handleExportPDF = () => {
    alert('Exportation PDF en cours...');
    // Logique d'exportation à implémenter
  };

  const changerPériode = (période: 'jour' | 'semaine' | 'mois') => {
    setPériodeFiltrage(période);
    // Logique de filtrage à implémenter
  };

  // Formatage des nombres avec séparateur de milliers
  const formaterNombre = (nombre: number) => {
    return nombre.toLocaleString('fr-FR');
  };

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold">Tableau de Bord Superviseur</h1>
        <p className="text-muted-foreground">
          Suivi des opérations de contrôle routier au Gabon
        </p>
      </div>

      {/* Cartes de statistiques globales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Contrôles effectués"
          value={statistiques ? formaterNombre(statistiques.totalControles) : "Chargement..."}
          icon={<Shield className="text-blue-600" />}
          description="Total des contrôles routiers"
          trend="up"
          trendValue="8% ce mois"
        />
        
        <StatsCard 
          title="Montant collecté"
          value={statistiques ? `${formaterNombre(statistiques.totalMontant)} FCFA` : "Chargement..."}
          icon={<DollarSign className="text-green-600" />}
          description="Total des amendes perçues"
          trend="up"
          trendValue="12% ce mois"
        />
        
        <StatsCard 
          title="Agents actifs"
          value={agents ? `${agents.filter(a => a.statut === 'actif').length}/${agents.length}` : "Chargement..."}
          icon={<Users className="text-purple-600" />}
          description="Agents disponibles sur le terrain"
          trend="neutral"
          trendValue="Stable"
        />
        
        <StatsCard 
          title="Taux de paiement"
          value={statistiques ? `${statistiques.tauxPaiement}%` : "Chargement..."}
          icon={<FileText className="text-amber-600" />}
          description="Amendes payées vs. émises"
          trend="up"
          trendValue="5% ce mois"
        />
      </div>

      {/* Filtres de période */}
      <div className="flex space-x-2">
        <Button 
          variant={périodeFiltrage === 'jour' ? 'default' : 'outline'}
          onClick={() => changerPériode('jour')}
          className="flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" /> Aujourd'hui
        </Button>
        <Button 
          variant={périodeFiltrage === 'semaine' ? 'default' : 'outline'}
          onClick={() => changerPériode('semaine')}
          className="flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" /> Cette semaine
        </Button>
        <Button 
          variant={périodeFiltrage === 'mois' ? 'default' : 'outline'}
          onClick={() => changerPériode('mois')}
          className="flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" /> Ce mois
        </Button>
        <Button 
          variant="outline" 
          className="ml-auto flex items-center gap-2"
        >
          <Filter className="h-4 w-4" /> Filtres avancés
        </Button>
      </div>

      {/* Navigation par onglets */}
      <Tabs defaultValue="statistiques" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="statistiques" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Statistiques
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Agents
          </TabsTrigger>
          <TabsTrigger value="contrôles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> Contrôles
          </TabsTrigger>
          <TabsTrigger value="amendes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Amendes
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> Transactions
          </TabsTrigger>
          <TabsTrigger value="véhicules" className="flex items-center gap-2">
            <Car className="h-4 w-4" /> Véhicules
          </TabsTrigger>
          <TabsTrigger value="conducteurs" className="flex items-center gap-2">
            <User className="h-4 w-4" /> Conducteurs
          </TabsTrigger>
          <TabsTrigger value="utilisateurs" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Utilisateurs
          </TabsTrigger>
        </TabsList>

        {/* Contenu des onglets */}
        <TabsContent value="statistiques" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Activité par heure</CardTitle>
                <CardDescription>Nombre de contrôles répartis sur la journée</CardDescription>
              </CardHeader>
              <CardContent>
                {statistiquesChargement ? (
                  <p>Chargement des statistiques...</p>
                ) : (
                  <div className="h-80">
                    {/* Ici vous intégrerez un graphique pour l'activité par heure */}
                    <p className="text-muted-foreground">Graphique: Activité par heure</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Infractions fréquentes</CardTitle>
                <CardDescription>Top 5 des infractions les plus constatées</CardDescription>
              </CardHeader>
              <CardContent>
                {statistiquesChargement ? (
                  <p>Chargement des statistiques...</p>
                ) : (
                  <div className="h-80">
                    {/* Ici vous intégrerez un graphique pour les infractions fréquentes */}
                    <p className="text-muted-foreground">Graphique: Infractions fréquentes</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Zones à risque</CardTitle>
                <CardDescription>Répartition géographique des infractions</CardDescription>
              </CardHeader>
              <CardContent>
                {statistiquesChargement ? (
                  <p>Chargement des statistiques...</p>
                ) : (
                  <div className="h-80">
                    {/* Ici vous intégrerez une carte ou un graphique pour les zones à risque */}
                    <p className="text-muted-foreground">Graphique: Zones à risque</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance des agents</CardTitle>
                <CardDescription>Nombre de contrôles et montants récoltés par agent</CardDescription>
              </CardHeader>
              <CardContent>
                {agentsChargement ? (
                  <p>Chargement des données agents...</p>
                ) : (
                  <div className="h-80">
                    {/* Ici vous intégrerez un graphique pour la performance des agents */}
                    <p className="text-muted-foreground">Graphique: Performance des agents</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Agents de contrôle</CardTitle>
                <CardDescription>Liste des agents et leur activité</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search className="h-4 w-4" /> Rechercher
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> Exporter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {agentsChargement ? (
                <p>Chargement des données agents...</p>
              ) : (
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">Agent</th>
                        <th className="py-3 px-4 text-left">Statut</th>
                        <th className="py-3 px-4 text-left">Contrôles</th>
                        <th className="py-3 px-4 text-left">Montant récolté</th>
                        <th className="py-3 px-4 text-left">Localisation</th>
                        <th className="py-3 px-4 text-left">Équipement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents?.map((agent) => (
                        <tr key={agent.id} className="border-b">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{agent.prénom} {agent.nom}</p>
                              <p className="text-xs text-muted-foreground">{agent.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs ${agent.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {agent.statut === 'actif' ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                          <td className="py-3 px-4">{formaterNombre(agent.nombreControles)}</td>
                          <td className="py-3 px-4">{formaterNombre(agent.montantRécolté)} FCFA</td>
                          <td className="py-3 px-4">
                            {agent.localisation ? (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                                {agent.localisation.nom}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Non disponible</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              {agent.matériel.scanner && <span className="bg-blue-100 text-blue-800 text-xs rounded px-1.5 py-0.5">Scanner</span>}
                              {agent.matériel.imprimante && <span className="bg-purple-100 text-purple-800 text-xs rounded px-1.5 py-0.5">Imprimante</span>}
                              {agent.matériel.autre && <span className="bg-amber-100 text-amber-800 text-xs rounded px-1.5 py-0.5">{agent.matériel.autre}</span>}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Autres onglets similaires (contrôles, amendes, transactions, etc.) */}
        <TabsContent value="contrôles" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Contrôles routiers</CardTitle>
                <CardDescription>Liste des contrôles effectués</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search className="h-4 w-4" /> Rechercher
                </Button>
                <Button variant="outline" className="flex items-center gap-2" onClick={handleExportCSV}>
                  <Download className="h-4 w-4" /> Exporter CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Contenu similaire aux autres onglets */}
              {contrôlesChargement ? (
                <p>Chargement des données de contrôles...</p>
              ) : (
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="py-3 px-4 text-left">Date</th>
                        <th className="py-3 px-4 text-left">Lieu</th>
                        <th className="py-3 px-4 text-left">Agent</th>
                        <th className="py-3 px-4 text-left">Véhicule</th>
                        <th className="py-3 px-4 text-left">Résultat</th>
                        <th className="py-3 px-4 text-left">Montant</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contrôles?.map((contrôle) => (
                        <tr key={contrôle.id} className="border-b">
                          <td className="py-3 px-4">{contrôle.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                              {contrôle.lieu}
                            </div>
                          </td>
                          <td className="py-3 px-4">{contrôle.agentNom}</td>
                          <td className="py-3 px-4">{contrôle.véhiculePlaque}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex rounded-full px-2 py-1 text-xs ${contrôle.résultat === 'conforme' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {contrôle.résultat === 'conforme' ? 'Conforme' : 'Non conforme'}
                            </span>
                          </td>
                          <td className="py-3 px-4">{formaterNombre(contrôle.montantTotal)} FCFA</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Les autres onglets suivront le même modèle */}
        {/* Intégrez des tableaux similaires pour amendes, transactions, véhicules, conducteurs et utilisateurs */}
        
      </Tabs>
    </div>
  );
};

export default SuperviseurDashboard;
