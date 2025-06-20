
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
  Shield,
  UserCog,
  User as UserIcon,
  Mail,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import UserEditDialog from '@/components/users/UserEditDialog';
import { cn } from '@/lib/utils';
import { util } from 'zod';

// Type pour les données utilisateur
type Utilisateur = {
  id: string;
  nom: string;
  prénom: string;
  email: string;
  rôle: 'admin' | 'superviseur' | 'agent';
  statut: 'actif' | 'inactif';
  dernièreConnexion?: string;
};

// Générer des données utilisateurs
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

// Composant principal
const MonitoringUtilisateurs: React.FC = () => {
  const navigate = useNavigate();
  const { données: utilisateurs, chargement } = useApiData<Utilisateur[]>(
    'https://votre-api.com/utilisateurs',
    undefined,
    générerDonnéesUtilisateurs
  );

  const handleSearch = (term: string) => {
    console.log("Recherche:", term);
    // Implémentez la logique de recherche ici
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Export ${format}`);
    // Implémentez la logique d'exportation ici
  };

  const handleViewDetails = (utilisateurId: string) => {
    navigate(`/users/${utilisateurId}`);
  };

  // Statistiques
  const totalUtilisateurs = utilisateurs?.length || 0;
  const utilisateursActifs = utilisateurs?.filter(u => u.statut === 'actif').length || 0;
  const utilisateursInactifs = utilisateurs?.filter(u => u.statut === 'inactif').length || 0;

  const admins = utilisateurs?.filter(u => u.rôle === 'admin').length || 0;
  const superviseurs = utilisateurs?.filter(u => u.rôle === 'superviseur').length || 0;
  const agents = utilisateurs?.filter(u => u.rôle === 'agent').length || 0;

  function onDeleteRequest(id: any) {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="space-y-6">
      <MonitoringFilters
        title="Suivi des Utilisateurs"
        onSearch={handleSearch}
        onExport={handleExport}
        showPeriodFilter={false}
      />

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{totalUtilisateurs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <UserIcon className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Actifs</p>
                <p className="text-2xl font-bold">{utilisateursActifs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <UserIcon className="h-6 w-6 text-red-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inactifs</p>
                <p className="text-2xl font-bold">{utilisateursInactifs}</p>
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
                <p className="text-sm text-muted-foreground">Admins</p>
                <p className="text-2xl font-bold">{admins}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <UserCog className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Superviseurs</p>
                <p className="text-2xl font-bold">{superviseurs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <UserIcon className="h-6 w-6 text-teal-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Agents</p>
                <p className="text-2xl font-bold">{agents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          {chargement ? (
            <p>Chargement des données des utilisateurs...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {utilisateurs?.map((utilisateur) => (
                  <TableRow key={utilisateur.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-100 rounded-full p-1.5">
                          <UserIcon className="h-4 w-4 text-gray-700" />
                        </div>
                        <div>
                          <p className="font-medium">{utilisateur.prénom} {utilisateur.nom}</p>
                          <p className="text-xs text-muted-foreground">ID: {utilisateur.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        {utilisateur.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${utilisateur.rôle === 'admin' ? 'bg-purple-100 text-purple-800' :
                        utilisateur.rôle === 'superviseur' ? 'bg-amber-100 text-amber-800' :
                          'bg-teal-100 text-teal-800'
                        }`}>
                        {utilisateur.rôle === 'admin' ? 'Administrateur' :
                          utilisateur.rôle === 'superviseur' ? 'Superviseur' :
                            'Agent'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${utilisateur.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {utilisateur.statut === 'actif' ? 'Actif' : 'Inactif'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        {utilisateur.dernièreConnexion || 'Jamais'}
                      </div>
                    </TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <UserEditDialog user={utilisateur} onSubmit={() => Edit(utilisateur)} />
                        </Dialog>
                        <DropdownMenuItem
                          className="text-red-600"
                          onSelect={(e) => {
                            e.preventDefault();
                            onDeleteRequest(utilisateur.id);
                          }}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default MonitoringUtilisateurs;
