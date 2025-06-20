import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import MonitoringFilters from '@/components/monitoring/MonitoringFilters';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Users,
  User,
  Shield,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { gaboneseFirstNames, gaboneseSurnames, localities } from '@/data/mockdata';

// Type pour les données agent
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

// Paramètres réalistes
const agentsActifs = 142;
const montantTotalTransactions = 34000000; // 34 millions FCFA (page transactions)
const personnesFlasheesJour = 5000;
const joursSemaine = 7;
const personnesSemaine = personnesFlasheesJour * joursSemaine;
const montantParAgent = Math.floor(montantTotalTransactions / agentsActifs);
const controlesParAgent = Math.floor(5000 / agentsActifs);
let reste = 5000 - (controlesParAgent * agentsActifs);

// Générer des données agents gabonais
const générerDonnéesAgents = (): Agent[] => Array.from({ length: agentsActifs }, (_, i) => {
  const nom = getRandomItem(gaboneseSurnames);
  const prénom = getRandomItem(gaboneseFirstNames);
  const localite = getRandomItem(localities);
  return {
    id: `A${(i + 1).toString().padStart(3, '0')}`,
    nom,
    prénom,
    email: `${prénom.toLowerCase()}.${nom.toLowerCase()}@transport.gouv.ga`,
    téléphone: `+241 77${(100000 + i).toString().slice(0, 6)}`,
    statut: i % 7 === 0 ? 'inactif' : 'actif',
    nombreControles: controlesParAgent + (i < reste ? 1 : 0),
    montantRécolté: montantParAgent,
    localisation: { lat: 0, lng: 0, nom: localite.name },
    matériel: {
      scanner: true,
      imprimante: true,
      autre: 'Zebra, Caméra, Radar, GPS, 4G'
    }
  };
});

// Formatage des nombres avec séparateur de milliers
const formaterNombre = (nombre: number) => {
  return nombre.toLocaleString('fr-FR');
};

// Composant principal
const MonitoringAgents: React.FC = () => {
  const navigate = useNavigate();
  const { données: agents, chargement } = useApiData<Agent[]>(
    'https://votre-api.com/agents',
    undefined,
    générerDonnéesAgents
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

  const handleViewDetails = (agentId: string) => {
    navigate(`/users/${agentId}`);
  };

  // Statistiques
  const totalAgents = agents?.length || 0;
  const agentsActifs = agents?.filter(a => a.statut === 'actif').length || 0;
  const agentsInactifs = agents?.filter(a => a.statut === 'inactif').length || 0;
  const totalControles = agents?.reduce((sum, a) => sum + a.nombreControles, 0) || 0;
  const totalMontant = agents?.reduce((sum, a) => sum + a.montantRécolté, 0) || 0;

  return (
    <div className="space-y-6">
      <MonitoringFilters
        title="Suivi des Agents de Contrôle"
        onSearch={handleSearch}
        onExport={handleExport}
        onPeriodChange={handlePeriodChange}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-bold">{totalAgents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <User className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Agents actifs</p>
                <p className="text-2xl font-bold">{agentsActifs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <User className="h-6 w-6 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Agents inactifs</p>
                <p className="text-2xl font-bold">{agentsInactifs}</p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contrôles effectués</p>
                <p className="text-2xl font-bold">{formaterNombre(totalControles)}</p>
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
                <p className="text-sm text-muted-foreground">Montant récolté</p>
                <p className="text-2xl font-bold">{formaterNombre(totalMontant)} F</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          {chargement ? (
            <p>Chargement des données des agents...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Contrôles</TableHead>
                  <TableHead>Montant récolté</TableHead>
                  {/* <TableHead>Équipement</TableHead> */}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents?.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{agent.prénom} {agent.nom}</p>
                        <p className="text-xs text-muted-foreground">ID: {agent.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs">{agent.email}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs">{agent.téléphone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${agent.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {agent.statut === 'actif' ? 'Actif' : 'Inactif'}
                      </span>
                    </TableCell>
                    <TableCell>
                      {agent.localisation ? (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          {agent.localisation.nom}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs">Non localisé</span>
                      )}
                    </TableCell>
                    <TableCell>{formaterNombre(agent.nombreControles)}</TableCell>
                    <TableCell>{formaterNombre(agent.montantRécolté)} FCFA</TableCell>
                    {/* <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {agent.matériel.scanner && (
                          <span className="bg-blue-100 text-blue-800 text-xs rounded px-1.5 py-0.5 flex items-center gap-0.5">
                            <Smartphone className="h-3 w-3" />
                            Scanner
                          </span>
                        )}
                        {agent.matériel.imprimante && (
                          <span className="bg-purple-100 text-purple-800 text-xs rounded px-1.5 py-0.5">
                            Imprimante
                          </span>
                        )}
                        {agent.matériel.autre && (
                          <span className="bg-amber-100 text-amber-800 text-xs rounded px-1.5 py-0.5">
                            {agent.matériel.autre}
                          </span>
                        )}
                      </div>
                    </TableCell> */}
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/agents/${agent.id}`)}

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

export default MonitoringAgents;
// Fonction utilitaire pour obtenir un élément aléatoire d'un tableau typé
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

