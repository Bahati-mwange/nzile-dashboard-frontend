
import React, { useState } from 'react';
import { Building, Search, Plus, Trash2, Edit, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import UserDeleteConfirmation from '@/components/users/UserDeleteConfirmation';

// Types for institutions
type Institution = {
  id: string;
  name: string;
  type: 'ministry' | 'police' | 'gendarmerie' | 'surveillance';
  address: string;
  province: string;
  director: string;
  phone: string;
  staff: number;
};

// Sample data for institutions
const initialInstitutions: Institution[] = [
  {
    id: '1',
    name: 'Ministère des Transports - Siège',
    type: 'ministry',
    address: 'Boulevard Triomphal, Libreville',
    province: 'Estuaire',
    director: 'Jean-Paul Ndong',
    phone: '+241 77 12 34 56',
    staff: 145,
  },
  {
    id: '2',
    name: 'Direction Provinciale des Transports - Port-Gentil',
    type: 'ministry',
    address: 'Avenue du Port, Port-Gentil',
    province: 'Ogooué-Maritime',
    director: 'Marie Moussavou',
    phone: '+241 66 98 76 54',
    staff: 78,
  },
  {
    id: '3',
    name: 'Commissariat Central - Libreville',
    type: 'police',
    address: 'Rond-point de la Démocratie, Libreville',
    province: 'Estuaire',
    director: 'Capitaine Pierre Ondo',
    phone: '+241 74 45 67 89',
    staff: 210,
  },
  {
    id: '4',
    name: 'Brigade de Gendarmerie - Franceville',
    type: 'gendarmerie',
    address: 'Route Principale, Franceville',
    province: 'Haut-Ogooué',
    director: 'Major Robert Mboulou',
    phone: '+241 65 78 90 12',
    staff: 85,
  },
  {
    id: '5',
    name: 'Centre de Surveillance Routière - Oyem',
    type: 'surveillance',
    address: 'Route Nationale 2, Oyem',
    province: 'Woleu-Ntem',
    director: 'François Ntoutoume',
    phone: '+241 77 23 45 67',
    staff: 42,
  },
];

// Type colors mapping
const typeColors = {
  ministry: 'bg-blue-100 text-blue-800',
  police: 'bg-green-100 text-green-800',
  gendarmerie: 'bg-yellow-100 text-yellow-800',
  surveillance: 'bg-purple-100 text-purple-800',
};

// Type display names
const typeNames = {
  ministry: 'Ministère',
  police: 'Police',
  gendarmerie: 'Gendarmerie',
  surveillance: 'Surveillance',
};

const Institutions: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>(initialInstitutions);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [institutionToDelete, setInstitutionToDelete] = useState<string | null>(null);

  // Filter institutions based on search query
  const filteredInstitutions = institutions.filter(
    institution => 
      institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      institution.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      typeNames[institution.type].toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete institution
  const handleDeleteInstitution = () => {
    if (institutionToDelete) {
      setInstitutions(institutions.filter(institution => institution.id !== institutionToDelete));
      setInstitutionToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  // Handle delete request
  const handleDeleteRequest = (institutionId: string) => {
    setInstitutionToDelete(institutionId);
    setIsDeleteDialogOpen(true);
  };

  // Stats for dashboard cards
  const ministryCount = institutions.filter(inst => inst.type === 'ministry').length;
  const policeCount = institutions.filter(inst => inst.type === 'police').length;
  const gendarmerieCount = institutions.filter(inst => inst.type === 'gendarmerie').length;
  const surveillanceCount = institutions.filter(inst => inst.type === 'surveillance').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Institutions</h1>
          <p className="text-muted-foreground">
            Gestion des institutions impliquées dans la sécurité routière
          </p>
        </div>
        <Button className="bg-gabon-blue hover:bg-gabon-blue/90">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une institution
        </Button>
      </div>

      {/* Dashboard cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Ministères</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <Building className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">{ministryCount}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Police</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <Building className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-green-600">{policeCount}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Gendarmerie</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <Building className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-2xl font-bold text-yellow-600">{gendarmerieCount}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-md font-medium">Surveillance</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <div className="flex items-center">
              <Building className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold text-purple-600">{surveillanceCount}</span>
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
            placeholder="Rechercher une institution..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Institutions table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Province</TableHead>
              <TableHead>Directeur</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Personnel</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInstitutions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-6">
                  Aucune institution trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredInstitutions.map((institution) => (
                <TableRow key={institution.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4" />
                      {institution.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${typeColors[institution.type]}`}>
                      {typeNames[institution.type]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                      {institution.province}
                    </div>
                  </TableCell>
                  <TableCell>{institution.director}</TableCell>
                  <TableCell>{institution.phone}</TableCell>
                  <TableCell>{institution.staff}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-600"
                        onClick={() => handleDeleteRequest(institution.id)}
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
        onConfirm={handleDeleteInstitution}
      />
    </div>
  );
};

export default Institutions;
