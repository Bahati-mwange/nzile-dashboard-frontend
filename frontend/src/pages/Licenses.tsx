
import React, { useState } from 'react';
import { Search, Plus, Filter, Download, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Fake data for licenses
const licensesData = [
  { 
    id: '1', 
    number: 'P-GAB-2022-123456', 
    name: 'Jean Moussavou', 
    category: 'B', 
    issueDate: '2022-05-15', 
    expiryDate: '2027-05-14', 
    status: 'valid' 
  },
  { 
    id: '2', 
    number: 'P-GAB-2021-789012', 
    name: 'Marie Koumba', 
    category: 'A,B', 
    issueDate: '2021-03-10', 
    expiryDate: '2026-03-09', 
    status: 'valid' 
  },
  { 
    id: '3', 
    number: 'P-GAB-2019-345678', 
    name: 'Pierre Ndong', 
    category: 'C', 
    issueDate: '2019-11-22', 
    expiryDate: '2024-11-21', 
    status: 'expiring' 
  },
  { 
    id: '4', 
    number: 'P-GAB-2018-901234', 
    name: 'Sophie Obiang', 
    category: 'B,D', 
    issueDate: '2018-07-05', 
    expiryDate: '2023-07-04', 
    status: 'expired' 
  },
  { 
    id: '5', 
    number: 'P-GAB-2020-567890', 
    name: 'Paul Ondo', 
    category: 'B', 
    issueDate: '2020-09-30', 
    expiryDate: '2025-09-29', 
    status: 'valid' 
  },
];

// Status badge styles
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'valid':
      return <Badge className="bg-green-500">Valide</Badge>;
    case 'expiring':
      return <Badge className="bg-yellow-500">Bientôt expiré</Badge>;
    case 'expired':
      return <Badge className="bg-red-500">Expiré</Badge>;
    case 'suspended':
      return <Badge className="bg-orange-500">Suspendu</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const Licenses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter licenses based on search query
  const filteredLicenses = licensesData.filter(license => 
    license.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    license.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats data
  const validLicenses = licensesData.filter(license => license.status === 'valid').length;
  const expiredLicenses = licensesData.filter(license => license.status === 'expired').length;
  const expiringLicenses = licensesData.filter(license => license.status === 'expiring').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Permis de conduire</h1>
          <p className="text-muted-foreground">
            Gestion des permis de conduire et suivi des validités
          </p>
        </div>
        <Button className="bg-gabon-blue hover:bg-gabon-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un permis
        </Button>
      </div>

      {/* Statistics cards */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Permis valides</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <BadgeCheck className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-green-600">{validLicenses}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Permis expirants</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <BadgeCheck className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-2xl font-bold text-yellow-600">{expiringLicenses}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Permis expirés</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <BadgeCheck className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-2xl font-bold text-red-600">{expiredLicenses}</span>
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
            placeholder="Rechercher un permis par numéro ou nom..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Download className="h-4 w-4" />
        </Button>
      </div>

      {/* Licenses table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Numéro</TableHead>
              <TableHead>Titulaire</TableHead>
              <TableHead>Catégories</TableHead>
              <TableHead>Date d'émission</TableHead>
              <TableHead>Date d'expiration</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLicenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                  Aucun permis trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredLicenses.map((license) => (
                <TableRow key={license.id}>
                  <TableCell className="font-medium">{license.number}</TableCell>
                  <TableCell>{license.name}</TableCell>
                  <TableCell>{license.category}</TableCell>
                  <TableCell>{license.issueDate}</TableCell>
                  <TableCell>{license.expiryDate}</TableCell>
                  <TableCell>{getStatusBadge(license.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Licenses;
