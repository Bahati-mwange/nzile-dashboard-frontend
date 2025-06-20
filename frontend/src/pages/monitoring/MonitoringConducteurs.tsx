import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import { Card, CardContent } from '@/components/ui/card';
import { User, FileWarning, Shield, Phone } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import MonitoringFilters from '@/components/monitoring/MonitoringFilters';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Type pour les données conducteur
type Conducteur = {
  id: string;
  nom: string;
  prénom: string;
  permis: string;
  téléphone: string;
  email?: string;
  nombreControles: number;
  nombreInfractions: number;
  derniereInfraction?: string;
};

// Générer des données conducteurs
const générerDonnéesConducteurs = (): Conducteur[] => [
  {
    id: "C001",
    nom: "Mengue",
    prénom: "François",
    permis: "GA12345678",
    téléphone: "+241 66123456",
    email: "f.mengue@gmail.com",
    nombreControles: 4,
    nombreInfractions: 1,
    derniereInfraction: "2025-04-15"
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
    nombreInfractions: 2,
    derniereInfraction: "2025-05-03"
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
    nombreInfractions: 1,
    derniereInfraction: "2025-03-22"
  }
];

const MonitoringConducteurs: React.FC = () => {
  const navigate = useNavigate();
  const { données: conducteurs, chargement } = useApiData<Conducteur[]>(
    'https://votre-api.com/conducteurs',
    undefined,
    générerDonnéesConducteurs
  );

  const handleSearch = (term: string) => {
    console.log("Recherche:", term);
    // Implémentez la logique de recherche ici
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Export ${format}`);
    // Implémentez la logique d'exportation ici
  };

  const handleViewDetails = (conducteurId: string) => {
    navigate(`/drivers/${conducteurId}`);
  };

  // Statistiques
  const totalConducteurs = conducteurs?.length || 0;
  const totalInfractions = conducteurs?.reduce((sum, c) => sum + c.nombreInfractions, 0) || 0;
  const totalControles = conducteurs?.reduce((sum, c) => sum + c.nombreControles, 0) || 0;
  const conducteursSansInfraction = conducteurs?.filter(c => c.nombreInfractions === 0).length || 0;

  return (
    <div className="space-y-6">
      <MonitoringFilters
        title="Suivi des Conducteurs"
        onSearch={handleSearch}
        onExport={handleExport}
        showPeriodFilter={false}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Conducteurs</p>
                <p className="text-2xl font-bold">{totalConducteurs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sans Infraction</p>
                <p className="text-2xl font-bold">{conducteursSansInfraction}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Contrôles</p>
                <p className="text-2xl font-bold">{totalControles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <FileWarning className="h-6 w-6 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Infractions</p>
                <p className="text-2xl font-bold">{totalInfractions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          {chargement ? (
            <p>Chargement des données des conducteurs...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Conducteur</TableHead>
                  <TableHead>N° Permis</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Contrôles</TableHead>
                  <TableHead>Infractions</TableHead>
                  <TableHead>Dernière Infraction</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conducteurs?.map((conducteur) => (
                  <TableRow key={conducteur.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{conducteur.prénom} {conducteur.nom}</p>
                        {conducteur.email && (
                          <p className="text-xs text-muted-foreground">{conducteur.email}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{conducteur.permis}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {conducteur.téléphone}
                      </div>
                    </TableCell>
                    <TableCell>{conducteur.nombreControles}</TableCell>
                    <TableCell className={conducteur.nombreInfractions > 0 ? "text-red-600 font-medium" : ""}>
                      {conducteur.nombreInfractions}
                    </TableCell>
                    <TableCell>
                      {conducteur.derniereInfraction || 'Aucune infraction'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(conducteur.id)}
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

export default MonitoringConducteurs;
