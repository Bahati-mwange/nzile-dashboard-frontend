import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import MonitoringFilters from '@/components/monitoring/MonitoringFilters';
import {
  Shield,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  User,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Type pour les données de contrôle
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
  statut: 'terminé' | 'en_cours';
  géolocalisation?: { lat: number; lng: number };
};

// Paramètres réalistes alignés avec les autres pages
const totalControles = 5000;
const agentsActifs = 142;
const tauxNonConforme = 0.18; // 18% non conformes
const nombreNonConformes = Math.floor(totalControles * tauxNonConforme);
const nombreConformes = totalControles - nombreNonConformes;
const montantTotalTransactions = 34000000;
const montantMoyenNonConforme = Math.round(montantTotalTransactions / nombreNonConformes);

// Générer des données de contrôles réalistes
const générerDonnéesContrôles = (): Contrôle[] => Array.from({ length: totalControles }, (_, i) => {
  const isNonConforme = i < nombreNonConformes;
  return {
    id: `CT${(i+1).toString().padStart(3, '0')}`,
    date: `2025-05-${String(12 - (i % 10)).padStart(2, '0')}`,
    lieu: i % 2 === 0 ? "Avenue Léon Mba, Libreville" : "Boulevard de l'Indépendance, Port-Gentil",
    agentId: `A${((i % agentsActifs) + 1).toString().padStart(3, '0')}`,
    agentNom: i % 2 === 0 ? "Nzoghe Jean-Paul" : "Mboumba Claire",
    véhiculePlaque: `GA-${100 + i}-LBV`,
    conducteurNom: i % 2 === 0 ? "Mengue François" : "Ndong Marie",
    résultat: isNonConforme ? 'non_conforme' : 'conforme',
    nombreInfractions: isNonConforme ? 1 : 0,
    montantTotal: isNonConforme ? montantMoyenNonConforme : 0,
    statut: 'terminé',
    géolocalisation: { lat: 0, lng: 0 }
  };
});

// Composant principal
const MonitoringControles: React.FC = () => {
  const navigate = useNavigate();
  const { données: contrôles, chargement } = useApiData<Contrôle[]>(
    'https://votre-api.com/controles',
    undefined,
    générerDonnéesContrôles
  );

  const handleSearch = (term: string) => {
    console.log("Recherche:", term);
    // Implémentez la logique de recherche ici
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Export ${format}`);
    // Implémentez la logique d'exportation ici
  };

  const handlePeriodChange = (period: string) => {
    console.log("Période:", period);
    // Implémentez la logique de filtre par période ici
  };

  const handleViewDetails = (controleId: string) => {
    navigate(`/controls/${controleId}`);
  };

  // Statistiques
  const totalControles = contrôles?.length || 0;
  const controlesConformes = contrôles?.filter(c => c.résultat === 'conforme').length || 0;
  const controlesNonConformes = contrôles?.filter(c => c.résultat === 'non_conforme').length || 0;
  const totalAmendesCollectées = contrôles?.reduce((total, c) => total + c.montantTotal, 0) || 0;

  // Formatage des montants
  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
  };

  return (
    <div className="space-y-6">
      <MonitoringFilters
        title="Suivi des Contrôles Routiers"
        onSearch={handleSearch}
        onExport={handleExport}
        onPeriodChange={handlePeriodChange}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-blue-700" />
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
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Véhicules conformes</p>
                <p className="text-2xl font-bold">{controlesConformes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Véhicules non conformes</p>
                <p className="text-2xl font-bold">{controlesNonConformes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amendes collectées</p>
                <p className="text-2xl font-bold">{formatMontant(totalAmendesCollectées)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          {chargement ? (
            <p>Chargement des données de contrôles...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Conducteur</TableHead>
                  <TableHead>Résultat</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contrôles?.map((contrôle) => (
                  <TableRow key={contrôle.id}>
                    <TableCell>{contrôle.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        {contrôle.lieu}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        {contrôle.agentNom}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                        {contrôle.véhiculePlaque}
                      </div>
                    </TableCell>
                    <TableCell>{contrôle.conducteurNom}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${contrôle.résultat === 'conforme' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {contrôle.résultat === 'conforme' ? 'Conforme' : 'Non conforme'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${contrôle.statut === 'terminé' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                        {contrôle.statut === 'terminé' ? 'Terminé' : 'En cours'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/controles/${contrôle.id}`)}
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

export default MonitoringControles;
