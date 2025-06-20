
import React from 'react';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentInfractionsTable from '@/components/dashboard/RecentInfractionsTable';
import InfractionStats from '@/components/dashboard/InfractionStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, DollarSign, Zap, AlertTriangle, ListX, CalendarDays, UserCheck } from 'lucide-react';
import EquipmentStatusTable from '@/components/dashboard/EquipmentStatusTable';
import DailyActivityChart from '@/components/dashboard/DailyActivityChart';
import StatusDistributionChart from '@/components/dashboard/StatusDistributionChart';

// Données fictives pour les statistiques
const infractions = [
  {
    id: '1',
    date: '04/04/2025',
    plate: 'GA-123-LBV',
    location: 'Libreville, Boulevard Triomphal',
    type: 'Excès de vitesse',
    status: 'pending' as const,
    amount: 25000,
  },
  {
    id: '2',
    date: '03/04/2025',
    plate: 'GA-456-OWE',
    location: 'Port-Gentil, Avenue du Bord de Mer',
    type: 'Feu rouge',
    status: 'processed' as const,
    amount: 15000,
  },
  {
    id: '3',
    date: '02/04/2025',
    plate: 'GA-789-FCV',
    location: 'Franceville, Route Nationale 3',
    type: 'Stationnement interdit',
    status: 'paid' as const,
    amount: 10000,
  },
  {
    id: '4',
    date: '01/04/2025',
    plate: 'GA-012-OYE',
    location: 'Oyem, Centre-ville',
    type: 'Non-port de la ceinture',
    status: 'processed' as const,
    amount: 20000,
  },
  {
    id: '5',
    date: '31/03/2025',
    plate: 'GA-345-LBV',
    location: 'Libreville, Boulevard de l\'Indépendance',
    type: 'Téléphone au volant',
    status: 'pending' as const,
    amount: 25000,
  },
];

// Données fictives pour le graphique
const infractionTypeData = [
  { name: 'Excès de vitesse', count: 156 },
  { name: 'Stationnement', count: 87 },
  { name: 'Feu rouge', count: 42 },
  { name: 'Téléphone', count: 65 },
  { name: 'Ceinture', count: 28 },
  { name: 'Alcool', count: 19 },
  { name: 'Documents', count: 31 },
];

// Données des provinces avec le plus d'infractions
const provinceData = [
  { name: 'Estuaire', count: 245 },
  { name: 'Haut-Ogooué', count: 124 },
  { name: 'Moyen-Ogooué', count: 78 },
  { name: 'Ogooué-Maritime', count: 156 },
  { name: 'Woleu-Ntem', count: 67 },
];

// Données fictives des équipements
const equipmentData = [
  { id: '1', name: 'Radar Triomphal', location: 'Libreville', type: 'Radar', status: 'online' as const, lastMaintenance: '01/04/2025' },
  { id: '2', name: 'Caméra Nkembo', location: 'Libreville', type: 'Caméra', status: 'online' as const, lastMaintenance: '28/03/2025' },
  { id: '3', name: 'Radar Port-Gentil', location: 'Port-Gentil', type: 'Radar', status: 'offline' as const, lastMaintenance: '20/03/2025' },
  { id: '4', name: 'Caméra Franceville', location: 'Franceville', type: 'Caméra', status: 'maintenance' as const, lastMaintenance: '05/04/2025' },
  { id: '5', name: 'Radar Oyem', location: 'Oyem', type: 'Radar', status: 'online' as const, lastMaintenance: '02/04/2025' },
];

// Données d'activité quotidienne
const dailyActivityData = [
  { day: 'Lun', infractions: 42, controles: 78 },
  { day: 'Mar', infractions: 56, controles: 94 },
  { day: 'Mer', infractions: 48, controles: 82 },
  { day: 'Jeu', infractions: 61, controles: 102 },
  { day: 'Ven', infractions: 74, controles: 120 },
  { day: 'Sam', infractions: 52, controles: 88 },
  { day: 'Dim', infractions: 39, controles: 65 },
];

// Distribution par statut
const statusDistributionData = [
  { name: 'En attente', value: 45 },
  { name: 'Traité', value: 35 },
  { name: 'Payé', value: 20 },
];

const Dashboard: React.FC = () => {
  // Calculs pour les statistiques additionnelles
  const totalPayments = infractions
    .filter(inf => inf.status === 'paid')
    .reduce((sum, inf) => sum + inf.amount, 0);

  const onlineEquipment = equipmentData.filter(eq => eq.status === 'online').length;
  const totalInfractions = infractions.length;

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">Système national de gestion du trafic routier</p>
      </div>

      {/* Stats Cards - Now 4 in a row, evenly sized */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* <StatsCard
          title="Véhicules enregistrés"
          value="239,517"
          icon={<Car className="text-gabon-green" />}
          description="Nombre total de véhicules dans la base nationale"
          trend="up"
          trendValue="2.1% ce mois"
        /> */}
        {/* <StatsCard
          title="Paiements perçus"
          value={`${totalPayments.toLocaleString()} FCFA`}
          icon={<DollarSign className="text-green-600" />}
          description="Amendes et taxes collectées"
          trend="up"
          trendValue="5.7% ce mois"
        /> */}
        <StatsCard
          title="Contrôles"
          value="1,243"
          icon={<CalendarDays className="text-blue-600" />}
          description="Contrôles routiers effectués ce mois"
          trend="up"
          trendValue="8.3% vs mois dernier"
        />
        <StatsCard
          title="Agents actifs"
          value="78"
          icon={<UserCheck className="text-purple-600" />}
          description="Agents sur le terrain aujourd'hui"
          trend="neutral"
          trendValue="Stable"
        />
        <StatsCard
          title="Équipements en ligne"
          value={`${onlineEquipment}/${equipmentData.length}`}
          icon={<Zap className="text-yellow-500" />}
          description="Radars et caméras actifs"
          trend="neutral"
          trendValue="Stable"
        />
        <StatsCard
          title="Infractions"
          value={totalInfractions.toString()}
          icon={<AlertTriangle className="text-red-500" />}
          description="Infractions enregistrées ces 30 derniers jours"
          trend="down"
          trendValue="3.2% vs période précédente"
        />
      </div>

      {/* Daily Activity Chart */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Activité quotidienne</CardTitle>
          <CardDescription>Contrôles et infractions des 7 derniers jours</CardDescription>
        </CardHeader>
        <CardContent>
          <DailyActivityChart data={dailyActivityData} />
        </CardContent>
      </Card> */}

      {/* Status Distribution Chart and Type Distribution Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Statut des infractions</CardTitle>
            <CardDescription>Distribution par statut de traitement</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusDistributionChart data={statusDistributionData} />
          </CardContent>
        </Card>

        <InfractionStats
          data={infractionTypeData}
          title="Types d'infractions"
          variant="infraction"
        />
      </div>

      {/* Provincial Distribution */}
      {/* <InfractionStats
        data={provinceData}
        title="Répartition géographique"
        variant="province"
      /> */}

      {/* Tables */}
      {/* <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListX className="h-5 w-5 text-red-500" />
              Infractions récentes
            </CardTitle>
            <CardDescription>
              Les dernières infractions enregistrées dans le système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentInfractionsTable infractions={infractions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Status des équipements
            </CardTitle>
            <CardDescription>
              État actuel du réseau de surveillance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EquipmentStatusTable equipment={equipmentData} />
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};

export default Dashboard;
