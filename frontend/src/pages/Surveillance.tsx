
import React, { useState } from 'react';
import { Camera, MapPin, Plus, Search, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import UserDeleteConfirmation from '@/components/users/UserDeleteConfirmation';

// Types for surveillance systems
type SurveillanceSystem = {
  id: string;
  name: string;
  location: string;
  type: 'Camera' | 'Radar' | 'Sensor';
  status: 'active' | 'maintenance' | 'offline';
  lastMaintenance: string;
  installedDate: string;
};

// Sample data for surveillance systems
const initialSystems: SurveillanceSystem[] = [
  {
    id: '1',
    name: 'Carrefour PK12 - Nord',
    location: 'Libreville, PK12',
    type: 'Camera',
    status: 'active',
    lastMaintenance: '2025-03-15',
    installedDate: '2024-12-10',
  },
  {
    id: '2',
    name: 'Axe Nkembo - Est',
    location: 'Libreville, Nkembo',
    type: 'Radar',
    status: 'active',
    lastMaintenance: '2025-03-25',
    installedDate: '2024-11-05',
  },
  {
    id: '3',
    name: 'Route Nationale 1 - KM45',
    location: 'Akanda, Route Nationale 1',
    type: 'Camera',
    status: 'maintenance',
    lastMaintenance: '2025-04-05',
    installedDate: '2024-10-20',
  },
  {
    id: '4',
    name: 'Carrefour IAI - Sud',
    location: 'Libreville, IAI',
    type: 'Sensor',
    status: 'offline',
    lastMaintenance: '2025-02-10',
    installedDate: '2024-09-15',
  },
];

// Status color mapping
const statusColors = {
  active: 'bg-green-100 text-green-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  offline: 'bg-red-100 text-red-800',
};

const Surveillance: React.FC = () => {
  const [systems, setSystems] = useState<SurveillanceSystem[]>(initialSystems);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [systemToDelete, setSystemToDelete] = useState<string | null>(null);

  // Filter systems based on search query
  const filteredSystems = systems.filter(
    system => 
      system.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      system.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete system
  const handleDeleteSystem = () => {
    if (systemToDelete) {
      setSystems(systems.filter(system => system.id !== systemToDelete));
      setSystemToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  // Handle delete request
  const handleDeleteRequest = (systemId: string) => {
    setSystemToDelete(systemId);
    setIsDeleteDialogOpen(true);
  };

  // Stats for dashboard cards
  const activeSystems = systems.filter(system => system.status === 'active').length;
  const maintenanceSystems = systems.filter(system => system.status === 'maintenance').length;
  const offlineSystems = systems.filter(system => system.status === 'offline').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Systèmes de surveillance</h1>
          <p className="text-muted-foreground">
            Gestion et suivi des caméras, radars et capteurs routiers
          </p>
        </div>
        <Button className="bg-gabon-blue hover:bg-gabon-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un système
        </Button>
      </div>

      {/* Dashboard cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Systèmes actifs</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <Camera className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-green-600">{activeSystems}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">En maintenance</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <Camera className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-2xl font-bold text-yellow-600">{maintenanceSystems}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Hors ligne</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <Camera className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-2xl font-bold text-red-600">{offlineSystems}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and filter */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un système..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Surveillance systems table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière maintenance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSystems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                  Aucun système de surveillance trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredSystems.map((system) => (
                <TableRow key={system.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {system.type === 'Camera' && <Camera className="mr-2 h-4 w-4" />}
                      {system.type === 'Radar' && <Camera className="mr-2 h-4 w-4" />}
                      {system.type === 'Sensor' && <MapPin className="mr-2 h-4 w-4" />}
                      {system.name}
                    </div>
                  </TableCell>
                  <TableCell>{system.location}</TableCell>
                  <TableCell>{system.type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[system.status]}`}>
                      {system.status === 'active' && 'Actif'}
                      {system.status === 'maintenance' && 'En maintenance'}
                      {system.status === 'offline' && 'Hors ligne'}
                    </span>
                  </TableCell>
                  <TableCell>{system.lastMaintenance}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-600"
                        onClick={() => handleDeleteRequest(system.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <UserDeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteSystem}
      />
    </div>
  );
};

export default Surveillance;
