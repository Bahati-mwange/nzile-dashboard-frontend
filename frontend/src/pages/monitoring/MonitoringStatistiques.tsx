import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Car,
  FileWarning,
  Shield,
  Calendar,
  Clock,
  DollarSign,
  Activity
} from 'lucide-react';
import DailyActivityChart from '@/components/dashboard/DailyActivityChart';
import HourlyActivityChart from '@/pages/HourlyActivityChart';
import StatusDistributionChart from '@/components/dashboard/StatusDistributionChart';

const statusDistributionData = [
  { name: 'En attente', value: 45 },
  { name: 'Payé', value: 115 },
  { name: 'Contesté', value: 25 }
];
// Génération de données pour le graphique d'activité quotidienne
const generateDailyData = () => {
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  return days.map(day => {
    // Plus d'activité en semaine, moins le weekend
    const isWeekend = day === 'Samedi' || day === 'Dimanche';
    const baseFactor = isWeekend ? 0.6 : 1;

    // Ajoutons une tendance à la hausse du lundi au vendredi
    const dayIndex = days.indexOf(day);
    const dayTrend = dayIndex < 5 ? 1 + (dayIndex * 0.1) : 1;

    const controles = Math.floor((Math.random() * 50 + 100) * baseFactor * dayTrend);
    const infractions = Math.floor(controles * (Math.random() * 0.2 + 0.2)); // Entre 20% et 40% des contrôles

    return {
      day,
      controles,
      infractions
    };
  });
};

const MonitoringStatistiques: React.FC = () => {
  const [period, setPeriod] = useState('jour');

  // Statistiques générales dynamiques
  // On considère 25 000 personnes flashées par jour
  const personnesFlasheesJour = 25000;
  const joursSemaine = 7;
  const personnesSemaine = personnesFlasheesJour * joursSemaine;
  const personnesMois = personnesFlasheesJour * 30;
  const stats = {
    agentsActifs: 42,
    vehiculesControles: personnesSemaine, // exemple : véhicules contrôlés sur une semaine
    infractionsDetectees: Math.floor(personnesSemaine * 0.18), // 18% d'infractions
    operationsControle: 89,
    montantCollecte: Math.floor(personnesSemaine * 0.18 * 50000), // 50 000 FCFA par infraction
  };

  // Format des nombres avec séparateur de milliers
  const formaterNombre = (nombre: number) => {
    return nombre.toLocaleString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Statistiques de Surveillance</h1>

      {/* Cartes statistiques */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Agents actifs</p>
                <p className="text-2xl font-bold">{stats.agentsActifs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Car className="h-6 w-6 text-indigo-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Véhicules contrôlés</p>
                <p className="text-2xl font-bold">{formaterNombre(stats.vehiculesControles)}</p>
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
                <p className="text-sm text-muted-foreground">Infractions détectées</p>
                <p className="text-2xl font-bold">{formaterNombre(stats.infractionsDetectees)}</p>
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
                <p className="text-sm text-muted-foreground">Opérations de contrôle</p>
                <p className="text-2xl font-bold">{stats.operationsControle}</p>
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
                <p className="text-sm text-muted-foreground">Montant collecté</p>
                <p className="text-2xl font-bold">{formaterNombre(stats.montantCollecte)} F</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques d'activité */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Activité par jour
              </CardTitle>
              <Tabs defaultValue="semaine" className="w-fit">
                <TabsList className="h-8">
                  <TabsTrigger value="semaine" className="text-xs px-3">Semaine</TabsTrigger>
                  <TabsTrigger value="mois" className="text-xs px-3">Mois</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <DailyActivityChart data={generateDailyData()} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Activité par heure
              </CardTitle>
              <Tabs defaultValue="jour" onValueChange={setPeriod} className="w-fit">
                <TabsList className="h-8">
                  <TabsTrigger value="jour" className="text-xs px-3">Jour</TabsTrigger>
                  <TabsTrigger value="semaine" className="text-xs px-3">Semaine</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <HourlyActivityChart />
          </CardContent>
        </Card>
      </div>

      {/* Distribution des statuts */}
      <Card>
        <CardHeader className="pb-3 border-b">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Distribution des infractions par statut
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[350px]">
            <StatusDistributionChart data={statusDistributionData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringStatistiques;