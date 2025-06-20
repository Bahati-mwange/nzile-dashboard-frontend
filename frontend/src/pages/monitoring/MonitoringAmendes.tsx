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
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Tag,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Type pour les données d'amendes
type Amende = {
  id: string;
  numéro: string;
  description: string;
  montant: number;
  date: string;
  véhiculePlaque: string;
  conducteurNom: string;
  conducteurId: string;
  statut: 'payé' | 'en_attente' | 'annulé';
};

// Paramètres réalistes alignés avec les autres pages
const totalAmendes = 5000; // 5000 contrôles
const tauxInfraction = 0.18; // 18% des contrôles donnent une amende
const nombreAmendes = Math.floor(totalAmendes * tauxInfraction);
const montantMoyenAmende = 34000000 / nombreAmendes; // 34M FCFA répartis

// Générer des données d'amendes réalistes
const générerDonnéesAmendes = (): Amende[] => Array.from({ length: nombreAmendes }, (_, i) => ({
  id: `AM${(i + 1).toString().padStart(3, '0')}`,
  numéro: `AM-2025-${(i + 1).toString().padStart(3, '0')}`,
  description: i % 3 === 0 ? "Excès de vitesse" : i % 3 === 1 ? "Feu rouge non respecté" : "Défaut d'assurance",
  montant: Math.round(montantMoyenAmende),
  date: `2025-05-${String(12 - (i % 10)).padStart(2, '0')}`,
  véhiculePlaque: `GA-${100 + i}-LBV`,
  conducteurNom: i % 2 === 0 ? "Mengue François" : "Ndong Marie",
  conducteurId: `C${(i + 1).toString().padStart(3, '0')}`,
  statut: i % 4 === 0 ? 'payé' : (i % 4 === 1 ? 'en_attente' : 'annulé')
}));

// Composant principal
const MonitoringAmendes: React.FC = () => {
  const navigate = useNavigate();
  const { données: amendes, chargement } = useApiData<Amende[]>(
    'https://votre-api.com/amendes',
    undefined,
    générerDonnéesAmendes
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

  const handleViewDetails = (amendeId: string) => {
    navigate(`/infractions/${amendeId}`);
  };

  // Statistiques
  const totalAmendesCount = amendes?.length || 0;
  const amendesPayées = amendes?.filter(a => a.statut === 'payé').length || 0;
  const amendesEnAttente = amendes?.filter(a => a.statut === 'en_attente').length || 0;
  const amendesAnnulées = amendes?.filter(a => a.statut === 'annulé').length || 0;

  const montantTotal = amendes?.reduce((sum, a) => sum + a.montant, 0) || 0;
  const montantPerçu = amendes?.filter(a => a.statut === 'payé')
    .reduce((sum, a) => sum + a.montant, 0) || 0;
  const montantEnAttente = amendes?.filter(a => a.statut === 'en_attente')
    .reduce((sum, a) => sum + a.montant, 0) || 0;

  // Formatage des montants
  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
  };

  return (
    <div className="space-y-6">
      <MonitoringFilters
        title="Suivi des Amendes"
        onSearch={handleSearch}
        onExport={handleExport}
        onPeriodChange={handlePeriodChange}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amendes</p>
                <p className="text-2xl font-bold">{totalAmendesCount}</p>
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
                <p className="text-sm text-muted-foreground">Amendes payées</p>
                <p className="text-2xl font-bold">{amendesPayées}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold">{amendesEnAttente}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="h-6 w-6 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Annulées</p>
                <p className="text-2xl font-bold">{amendesAnnulées}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Montant total</p>
                <p className="text-2xl font-bold">{formatMontant(montantTotal)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Montant perçu</p>
                <p className="text-2xl font-bold">{formatMontant(montantPerçu)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Montant en attente</p>
                <p className="text-2xl font-bold">{formatMontant(montantEnAttente)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          {chargement ? (
            <p>Chargement des données des amendes...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Conducteur</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {amendes?.map((amende) => (
                  <TableRow key={amende.id}>
                    <TableCell className="font-medium">{amende.numéro}</TableCell>
                    <TableCell>{amende.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                        {amende.véhiculePlaque}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        {amende.conducteurNom}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md truncate">{amende.description}</TableCell>
                    <TableCell>{formatMontant(amende.montant)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${amende.statut === 'payé' ? 'bg-green-100 text-green-800' :
                          amende.statut === 'en_attente' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {amende.statut === 'payé' ? 'Payé' :
                          amende.statut === 'en_attente' ? 'En attente' :
                            'Annulé'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(amende.id)}
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

export default MonitoringAmendes;
