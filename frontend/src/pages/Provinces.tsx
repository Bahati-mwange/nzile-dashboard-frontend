
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { MapPin, Search, Plus, Edit, Trash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Types pour les provinces
interface Province {
  id: string;
  name: string;
  capital: string;
  population: number;
  area: number;
  prefect: string;
}

// Données de test
const demoProvinces: Province[] = [
  { 
    id: '1', 
    name: 'Estuaire', 
    capital: 'Libreville', 
    population: 895689, 
    area: 20740, 
    prefect: 'Jean-Pierre Moussavou' 
  },
  { 
    id: '2', 
    name: 'Haut-Ogooué', 
    capital: 'Franceville', 
    population: 250047, 
    area: 36547, 
    prefect: 'Marie Ndombi' 
  },
  { 
    id: '3', 
    name: 'Moyen-Ogooué', 
    capital: 'Lambaréné', 
    population: 69287, 
    area: 18535, 
    prefect: 'Paul Biyoghe' 
  },
  { 
    id: '4', 
    name: 'Ngounié', 
    capital: 'Mouila', 
    population: 100300, 
    area: 23877, 
    prefect: 'Sophie Mba' 
  },
  { 
    id: '5', 
    name: 'Nyanga', 
    capital: 'Tchibanga', 
    population: 52854, 
    area: 21285, 
    prefect: 'Eric Djoue' 
  },
  { 
    id: '6', 
    name: 'Ogooué-Ivindo', 
    capital: 'Makokou', 
    population: 63293, 
    area: 46075, 
    prefect: 'Carine Mboumba' 
  },
  { 
    id: '7', 
    name: 'Ogooué-Lolo', 
    capital: 'Koulamoutou', 
    population: 65771, 
    area: 25380, 
    prefect: 'Pierre Ndong' 
  },
  { 
    id: '8', 
    name: 'Ogooué-Maritime', 
    capital: 'Port-Gentil', 
    population: 157562, 
    area: 22890, 
    prefect: 'Rose Mihindou' 
  },
  { 
    id: '9', 
    name: 'Woleu-Ntem', 
    capital: 'Oyem', 
    population: 154986, 
    area: 38465, 
    prefect: 'Antoine Ntoutoume' 
  }
];

const Provinces: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>(demoProvinces);
  const [searchTerm, setSearchTerm] = useState('');
  const toast = useToast(); // This returns the toast function directly

  const filteredProvinces = provinces.filter(province =>
    province.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    province.capital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id: string) => {
    setProvinces(provinces.filter(province => province.id !== id));
    toast({
      title: "Province supprimée",
      description: "La province a été supprimée avec succès.",
      variant: "default",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Provinces</h1>
          <p className="text-muted-foreground">
            Gestion des provinces et divisions administratives du Gabon
          </p>
        </div>
        <Button className="bg-gabon-green hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" /> Ajouter une province
        </Button>
      </div>

      <Tabs defaultValue="liste" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="liste">Liste des provinces</TabsTrigger>
          <TabsTrigger value="carte">Carte</TabsTrigger>
        </TabsList>

        <TabsContent value="liste" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Provinces du Gabon</CardTitle>
              <CardDescription>
                Liste des 9 provinces du Gabon et leurs informations administratives
              </CardDescription>
              <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
                <div className="relative w-full">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une province..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Chef-lieu</TableHead>
                    <TableHead className="hidden md:table-cell">Population</TableHead>
                    <TableHead className="hidden md:table-cell">Superficie (km²)</TableHead>
                    <TableHead className="hidden lg:table-cell">Préfet</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProvinces.map(province => (
                    <TableRow key={province.id}>
                      <TableCell className="font-medium">{province.name}</TableCell>
                      <TableCell>{province.capital}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {province.population.toLocaleString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {province.area.toLocaleString()}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{province.prefect}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500"
                          onClick={() => handleDelete(province.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carte" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Carte du Gabon</CardTitle>
              <CardDescription>
                Carte interactive des provinces du Gabon
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gabon-blue" />
                  <p className="text-muted-foreground">
                    Carte interactive des provinces du Gabon (à implémenter)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Provinces;
