
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Download,
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Regulation {
  id: string;
  title: string;
  type: 'loi' | 'decret' | 'arrete' | 'ordonnance';
  number: string;
  date: string;
  description: string;
  category: string;
}

const demoRegulations: Regulation[] = [
  {
    id: '1',
    title: 'Code de la route gabonais',
    type: 'loi',
    number: '2021-005',
    date: '2021-03-15',
    description: 'Loi portant sur l\'organisation de la circulation routière au Gabon',
    category: 'circulation'
  },
  {
    id: '2',
    title: 'Contrôle technique des véhicules',
    type: 'decret',
    number: '0291/PR/MTAC',
    date: '2020-05-22',
    description: 'Décret fixant les modalités du contrôle technique des véhicules automobiles',
    category: 'contrôle'
  },
  {
    id: '3',
    title: 'Permis de conduire',
    type: 'arrete',
    number: '00113/MTPEN/CAB',
    date: '2019-11-10',
    description: 'Arrêté relatif aux conditions d\'obtention et de renouvellement du permis de conduire',
    category: 'permis'
  },
  {
    id: '4',
    title: 'Limitation de vitesse',
    type: 'arrete',
    number: '00245/MTAC/DGTT',
    date: '2020-07-18',
    description: 'Arrêté fixant les limites de vitesse sur les différentes catégories de routes gabonaises',
    category: 'circulation'
  },
  {
    id: '5',
    title: 'Immatriculation des véhicules',
    type: 'decret',
    number: '0348/PR/MTAC',
    date: '2021-01-30',
    description: 'Décret relatif aux conditions d\'immatriculation des véhicules automobiles',
    category: 'immatriculation'
  },
  {
    id: '6',
    title: 'Transport public des voyageurs',
    type: 'loi',
    number: '2019-012',
    date: '2019-08-05',
    description: 'Loi régissant l\'organisation et l\'exploitation des services de transport public routier de voyageurs',
    category: 'transport'
  },
  {
    id: '7',
    title: 'Infractions routières',
    type: 'ordonnance',
    number: '008/PR/2022',
    date: '2022-02-11',
    description: 'Ordonnance portant sanctions applicables aux infractions au code de la route',
    category: 'infractions'
  },
  {
    id: '8',
    title: 'Ceinture de sécurité',
    type: 'arrete',
    number: '00189/MTPEN/DGTT',
    date: '2018-09-25',
    description: 'Arrêté relatif au port obligatoire de la ceinture de sécurité dans les véhicules',
    category: 'sécurité'
  }
];

const Regulations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredRegulations = demoRegulations.filter(regulation => {
    const matchesSearch = regulation.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          regulation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || regulation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const categories = Array.from(new Set(demoRegulations.map(r => r.category)));

  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'loi': return 'bg-blue-100 text-blue-800';
      case 'decret': return 'bg-green-100 text-green-800';
      case 'arrete': return 'bg-yellow-100 text-yellow-800';
      case 'ordonnance': return 'bg-purple-100 text-purple-800';
      default: return '';
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Règlementation</h1>
          <p className="text-muted-foreground">
            Code de la route et textes législatifs relatifs au trafic routier
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-[600px] grid-cols-3">
          <TabsTrigger value="all">Tous les textes</TabsTrigger>
          <TabsTrigger value="recent">Récents</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
        </TabsList>

        <div className="my-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un texte de loi..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {selectedCategory && (
          <div className="mb-4 flex items-center">
            <span className="mr-2">Filtré par:</span>
            <Badge className="mr-2 bg-gabon-blue">{selectedCategory}</Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => filterByCategory(null)}
              className="h-7 text-xs"
            >
              Effacer
            </Button>
          </div>
        )}

        <TabsContent value="all" className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRegulations.map(regulation => (
            <Card key={regulation.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge className={getBadgeColor(regulation.type)}>
                    {regulation.type.charAt(0).toUpperCase() + regulation.type.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{regulation.date}</span>
                </div>
                <CardTitle className="mt-2">{regulation.title}</CardTitle>
                <CardDescription>N° {regulation.number}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {regulation.description}
                </p>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => filterByCategory(regulation.category)}
                >
                  {regulation.category}
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" /> Consulter
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Textes récents</CardTitle>
              <CardDescription>
                Derniers textes de loi publiés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demoRegulations
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map(regulation => (
                    <div key={regulation.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="bg-gabon-blue/10 p-2 rounded-full">
                        <BookOpen className="h-5 w-5 text-gabon-blue" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{regulation.title}</h4>
                          <Badge className={getBadgeColor(regulation.type)}>
                            {regulation.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{regulation.description}</p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <span>Publié le {regulation.date}</span>
                          <Separator orientation="vertical" className="mx-2 h-3" />
                          <span>N° {regulation.number}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(category => (
              <Card 
                key={category} 
                className="cursor-pointer hover:border-gabon-blue transition-colors"
                onClick={() => filterByCategory(category)}
              >
                <CardHeader>
                  <CardTitle className="capitalize">{category}</CardTitle>
                  <CardDescription>
                    {demoRegulations.filter(r => r.category === category).length} textes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {demoRegulations
                      .filter(r => r.category === category)
                      .slice(0, 3)
                      .map(regulation => (
                        <li key={regulation.id} className="text-sm">
                          • {regulation.title}
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Regulations;
