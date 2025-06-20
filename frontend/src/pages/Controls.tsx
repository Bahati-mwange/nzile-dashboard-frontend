
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Calendar,
  Search, 
  Plus, 
  MapPin, 
  Check, 
  X, 
  MoreHorizontal,
  AlertTriangle,
  Car
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Types pour les contrôles routiers
interface RoadControl {
  id: string;
  location: string;
  date: Date;
  status: 'active' | 'completed' | 'planned';
  officersCount: number;
  vehiclesChecked: number;
  infractions: number;
  province: string;
  team: string;
}

// Données de démonstration
const demoControls: RoadControl[] = [
  {
    id: '1',
    location: 'Carrefour IAI, Libreville',
    date: new Date(2025, 3, 8),
    status: 'active',
    officersCount: 8,
    vehiclesChecked: 145,
    infractions: 23,
    province: 'Estuaire',
    team: 'Brigade routière A'
  },
  {
    id: '2',
    location: 'Rond-point de la Démocratie, Libreville',
    date: new Date(2025, 3, 10),
    status: 'planned',
    officersCount: 6,
    vehiclesChecked: 0,
    infractions: 0,
    province: 'Estuaire',
    team: 'Brigade routière C'
  },
  {
    id: '3',
    location: 'PK12, Route nationale 1',
    date: new Date(2025, 3, 5),
    status: 'completed',
    officersCount: 5,
    vehiclesChecked: 87,
    infractions: 12,
    province: 'Estuaire',
    team: 'Brigade routière B'
  },
  {
    id: '4',
    location: 'Carrefour SNI, Libreville',
    date: new Date(2025, 3, 9),
    status: 'active',
    officersCount: 4,
    vehiclesChecked: 56,
    infractions: 8,
    province: 'Estuaire',
    team: 'Brigade routière A'
  },
  {
    id: '5',
    location: 'Entrée de Ntoum',
    date: new Date(2025, 3, 12),
    status: 'planned',
    officersCount: 6,
    vehiclesChecked: 0,
    infractions: 0,
    province: 'Estuaire',
    team: 'Brigade routière D'
  },
  {
    id: '6',
    location: 'Bifurcation Kango',
    date: new Date(2025, 3, 4),
    status: 'completed',
    officersCount: 3,
    vehiclesChecked: 42,
    infractions: 5,
    province: 'Estuaire',
    team: 'Brigade routière B'
  },
  {
    id: '7',
    location: 'Entrée de Franceville',
    date: new Date(2025, 3, 6),
    status: 'completed',
    officersCount: 4,
    vehiclesChecked: 64,
    infractions: 9,
    province: 'Haut-Ogooué',
    team: 'Brigade provinciale F'
  },
  {
    id: '8',
    location: 'Carrefour Mbaya, Port-Gentil',
    date: new Date(2025, 3, 11),
    status: 'planned',
    officersCount: 5,
    vehiclesChecked: 0,
    infractions: 0,
    province: 'Ogooué-Maritime',
    team: 'Brigade maritime P'
  }
];

const Controls: React.FC = () => {
  const [controls, setControls] = useState<RoadControl[]>(demoControls);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredControls = controls.filter(control => {
    const matchesSearch = control.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.province.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         control.team.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !selectedDate || control.date.toDateString() === selectedDate.toDateString();
    
    return matchesSearch && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-500">En cours</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-slate-500">Terminé</Badge>;
      case 'planned':
        return <Badge variant="secondary">Planifié</Badge>;
      default:
        return null;
    }
  };

  const getTrendIcon = (num: number) => {
    if (num > 15) return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    if (num > 0) return null;
    return <Check className="h-4 w-4 text-green-500" />;
  };

  const clearDateFilter = () => {
    setSelectedDate(undefined);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contrôles routiers</h1>
          <p className="text-muted-foreground">
            Gestion des opérations de contrôle routier
          </p>
        </div>
        <Button className="bg-gabon-blue hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Planifier un contrôle
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total des contrôles</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{controls.length}</div>
            <p className="text-xs text-muted-foreground">
              {controls.filter(c => c.status === 'active').length} en cours
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Véhicules contrôlés</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {controls.reduce((sum, control) => sum + control.vehiclesChecked, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Ce mois-ci
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Infractions relevées</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {controls.reduce((sum, control) => sum + control.infractions, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Taux: {Math.round((controls.reduce((sum, control) => sum + control.infractions, 0) / 
              Math.max(controls.reduce((sum, control) => sum + control.vehiclesChecked, 0), 1)) * 100)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Liste des contrôles routiers</CardTitle>
          <CardDescription>
            Consultez et gérez les opérations de contrôle routier
          </CardDescription>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par lieu, province ou équipe..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal sm:w-[240px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PP', { locale: fr }) : 'Filtrer par date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                  {selectedDate && (
                    <div className="p-3 border-t border-border">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearDateFilter}
                        className="w-full"
                      >
                        Effacer la sélection
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lieu</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="hidden md:table-cell">Agents</TableHead>
                <TableHead className="hidden md:table-cell">Véhicules</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Infractions
                    <span className="sr-only">Trend</span>
                  </div>
                </TableHead>
                <TableHead className="hidden lg:table-cell">Province</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredControls.map(control => (
                <TableRow key={control.id}>
                  <TableCell className="font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gabon-blue" />
                    {control.location}
                  </TableCell>
                  <TableCell>
                    {format(control.date, 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>{getStatusBadge(control.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">{control.officersCount}</TableCell>
                  <TableCell className="hidden md:table-cell">{control.vehiclesChecked}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {control.infractions}
                      <span className="ml-2">
                        {getTrendIcon(control.infractions)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{control.province}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        {control.status === 'planned' && (
                          <DropdownMenuItem>Démarrer le contrôle</DropdownMenuItem>
                        )}
                        {control.status === 'active' && (
                          <DropdownMenuItem>Terminer le contrôle</DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredControls.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Aucun contrôle ne correspond à vos critères de recherche.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Controls;
