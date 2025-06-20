
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

// Type pour les conducteurs
type Driver = {
  id: string;
  name: string;
  licenseNumber: string;
  licenseType: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'suspended';
  infractions: number;
  address: string;
  phoneNumber: string;
  email?: string;
};

// Données fictives pour les conducteurs avec des noms gabonais
const drivers: Driver[] = [
  {
    id: '1',
    name: 'Ndong Mba Jean-Marc',
    licenseNumber: 'GA10023456',
    licenseType: 'B',
    expiryDate: '2028-05-15',
    status: 'valid',
    infractions: 2,
    address: '123 Avenue de l\'Indépendance, Libreville',
    phoneNumber: '+241 77 12 34 56',
    email: 'ndong.jean@email.com',
  },
  {
    id: '2',
    name: 'Ondo Assoumou Marie',
    licenseNumber: 'GA10078901',
    licenseType: 'B, C',
    expiryDate: '2027-11-22',
    status: 'valid',
    infractions: 0,
    address: '45 Boulevard Omar Bongo, Libreville',
    phoneNumber: '+241 66 98 76 54',
  },
  {
    id: '3',
    name: 'Obame Pierre',
    licenseNumber: 'GA10045678',
    licenseType: 'A, B',
    expiryDate: '2024-03-10',
    status: 'expired',
    infractions: 5,
    address: '78 Rue des Palmiers, Port-Gentil',
    phoneNumber: '+241 74 56 78 90',
  },
  {
    id: '4',
    name: 'Moussavou Florence',
    licenseNumber: 'GA10090123',
    licenseType: 'B',
    expiryDate: '2026-07-30',
    status: 'suspended',
    infractions: 3,
    address: '12 Avenue de la Mer, Libreville',
    phoneNumber: '+241 65 43 21 98',
    email: 'moussavou.florence@email.com',
  },
];

const Drivers: React.FC = () => {
  const getStatusBadge = (status: Driver['status']) => {
    switch (status) {
      case 'valid':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Valide
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            Expirée
          </Badge>
        );
      case 'suspended':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Suspendue
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des conducteurs</h1>
          <p className="text-muted-foreground">
            Recherchez, consultez et gérez les données des conducteurs
          </p>
        </div>
        <Button className="bg-gabon-blue hover:bg-gabon-blue/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un conducteur
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recherche de conducteur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nom du conducteur</label>
              <Input id="name" placeholder="Nom et prénom" />
            </div>
            <div className="space-y-2">
              <label htmlFor="license" className="text-sm font-medium">Numéro de permis</label>
              <Input id="license" placeholder="Ex: GA10023456" />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full bg-gabon-blue hover:bg-gabon-blue/90">
                <Search className="mr-2 h-4 w-4" />
                Rechercher
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="valid">Permis valides</TabsTrigger>
            <TabsTrigger value="expired">Permis expirés</TabsTrigger>
            <TabsTrigger value="suspended">Permis suspendus</TabsTrigger>
          </TabsList>
          
          <div className="text-sm text-muted-foreground">
            Affichage de {drivers.length} conducteurs
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Numéro de permis</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date d'expiration</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Infractions</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>{driver.licenseNumber}</TableCell>
                    <TableCell>{driver.licenseType}</TableCell>
                    <TableCell>{new Date(driver.expiryDate).toLocaleDateString('fr-GA')}</TableCell>
                    <TableCell>{getStatusBadge(driver.status)}</TableCell>
                    <TableCell>
                      {driver.infractions > 0 ? (
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                          {driver.infractions} infractions
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          Aucune infraction
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{driver.phoneNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-center py-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="valid" className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Numéro de permis</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date d'expiration</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Infractions</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers
                  .filter(driver => driver.status === 'valid')
                  .map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>{driver.licenseNumber}</TableCell>
                      <TableCell>{driver.licenseType}</TableCell>
                      <TableCell>{new Date(driver.expiryDate).toLocaleDateString('fr-GA')}</TableCell>
                      <TableCell>{getStatusBadge(driver.status)}</TableCell>
                      <TableCell>
                        {driver.infractions > 0 ? (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            {driver.infractions} infractions
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Aucune infraction
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{driver.phoneNumber}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="expired" className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Numéro de permis</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date d'expiration</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Infractions</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers
                  .filter(driver => driver.status === 'expired')
                  .map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>{driver.licenseNumber}</TableCell>
                      <TableCell>{driver.licenseType}</TableCell>
                      <TableCell>{new Date(driver.expiryDate).toLocaleDateString('fr-GA')}</TableCell>
                      <TableCell>{getStatusBadge(driver.status)}</TableCell>
                      <TableCell>
                        {driver.infractions > 0 ? (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            {driver.infractions} infractions
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Aucune infraction
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{driver.phoneNumber}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="suspended" className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Numéro de permis</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date d'expiration</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Infractions</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers
                  .filter(driver => driver.status === 'suspended')
                  .map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>{driver.licenseNumber}</TableCell>
                      <TableCell>{driver.licenseType}</TableCell>
                      <TableCell>{new Date(driver.expiryDate).toLocaleDateString('fr-GA')}</TableCell>
                      <TableCell>{getStatusBadge(driver.status)}</TableCell>
                      <TableCell>
                        {driver.infractions > 0 ? (
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            {driver.infractions} infractions
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            Aucune infraction
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{driver.phoneNumber}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Drivers;
