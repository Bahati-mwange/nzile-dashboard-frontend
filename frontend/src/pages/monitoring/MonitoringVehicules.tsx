
import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import MonitoringFilters from '@/components/monitoring/MonitoringFilters';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Car, AlertTriangle, Calendar, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Type pour les données de véhicule
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
  dernierControle?: string;
  statutAssurance: 'valide' | 'expirée' | 'bientôt expirée';
  statutTechnique: 'valide' | 'expiré' | 'bientôt expiré';
};

// Générer des données de véhicules
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
    nombreControles: 5,
    dernierControle: "2025-05-01",
    statutAssurance: 'valide',
    statutTechnique: 'valide'
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
    nombreControles: 3,
    dernierControle: "2025-04-15",
    statutAssurance: 'bientôt expirée',
    statutTechnique: 'valide'
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
    nombreControles: 2,
    dernierControle: "2025-03-22",
    statutAssurance: 'expirée',
    statutTechnique: 'expiré'
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
    nombreControles: 4,
    dernierControle: "2025-05-05",
    statutAssurance: 'valide',
    statutTechnique: 'bientôt expiré'
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
    nombreControles: 1,
    dernierControle: "2025-02-18",
    statutAssurance: 'valide',
    statutTechnique: 'valide'
  }
];

// Composant principal
const MonitoringVehicules: React.FC = () => {
  const navigate = useNavigate();
  const { données: véhicules, chargement } = useApiData<Véhicule[]>(
    'https://votre-api.com/vehicules',
    undefined,
    générerDonnéesVéhicules
  );

  const handleSearch = (term: string) => {
    console.log("Recherche:", term);
    // Implémentez la logique de recherche ici
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Export ${format}`);
    // Implémentez la logique d'exportation ici
  };

  const handleViewDetails = (véhiculeId: string) => {
    navigate(`/vehicles/${véhiculeId}`);
  };

  // Statistiques
  const totalVéhicules = véhicules?.length || 0;
  const véhiculesAvecProblèmes = véhicules?.filter(v =>
    v.statutAssurance !== 'valide' || v.statutTechnique !== 'valide'
  ).length || 0;

  return (
    <div className="space-y-6">
      <MonitoringFilters
        title="Suivi des Véhicules"
        onSearch={handleSearch}
        onExport={handleExport}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Car className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Véhicules</p>
                <p className="text-2xl font-bold">{totalVéhicules}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avec Problèmes</p>
                <p className="text-2xl font-bold">{véhiculesAvecProblèmes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contrôlés ce mois</p>
                <p className="text-2xl font-bold">
                  {véhicules?.filter(v => v.dernierControle &&
                    new Date(v.dernierControle).getMonth() === new Date().getMonth()
                  ).length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          {chargement ? (
            <p>Chargement des données des véhicules...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plaque</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Propriétaire</TableHead>
                  <TableHead>Dernier contrôle</TableHead>
                  <TableHead>Statut assurance</TableHead>
                  <TableHead>Statut technique</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {véhicules?.map((véhicule) => (
                  <TableRow key={véhicule.id}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                        {véhicule.plaque}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{véhicule.marque} {véhicule.modèle}</p>
                      <p className="text-xs text-muted-foreground">{véhicule.année} - {véhicule.genre}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        {véhicule.propriétaire}
                      </div>
                    </TableCell>
                    <TableCell>{véhicule.dernierControle || 'Aucun'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${véhicule.statutAssurance === 'valide' ? 'bg-green-100 text-green-800' :
                        véhicule.statutAssurance === 'bientôt expirée' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                        {véhicule.statutAssurance === 'valide' ? 'Valide' :
                          véhicule.statutAssurance === 'bientôt expirée' ? 'Expiration proche' :
                            'Expirée'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${véhicule.statutTechnique === 'valide' ? 'bg-green-100 text-green-800' :
                        véhicule.statutTechnique === 'bientôt expiré' ? 'bg-amber-100 text-amber-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                        {véhicule.statutTechnique === 'valide' ? 'Valide' :
                          véhicule.statutTechnique === 'bientôt expiré' ? 'Expiration proche' :
                            'Expiré'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/vehicules/${véhicule.id}`)}
                      >
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringVehicules;
