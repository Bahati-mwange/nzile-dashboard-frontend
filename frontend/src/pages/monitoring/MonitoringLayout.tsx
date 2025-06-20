
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  Users, 
  Car, 
  User, 
  DollarSign, 
  FileWarning, 
  Shield, 
  BarChart,
  Activity,
  Search,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "@/components/ui/use-toast";

const MonitoringLayout: React.FC = () => {
  const navItems = [
    { name: 'Statistiques', path: '/monitoring/statistiques', icon: <BarChart className="h-5 w-5" />, description: 'Dashboard analytique global' },
    { name: 'Agents', path: '/monitoring/agents', icon: <Users className="h-5 w-5" />, description: 'Suivi des agents de terrain' },
    { name: 'Véhicules', path: '/monitoring/vehicules', icon: <Car className="h-5 w-5" />, description: 'Gestion du parc automobile' },
    { name: 'Conducteurs', path: '/monitoring/conducteurs', icon: <User className="h-5 w-5" />, description: 'Base de données conducteurs' },
    { name: 'Transactions', path: '/monitoring/transactions', icon: <DollarSign className="h-5 w-5" />, description: 'Suivi des paiements' },
    { name: 'Amendes', path: '/monitoring/amendes', icon: <FileWarning className="h-5 w-5" />, description: 'Gestion des infractions' },
    { name: 'Contrôles', path: '/monitoring/controles', icon: <Shield className="h-5 w-5" />, description: 'Opérations de terrain' },
    { name: 'Utilisateurs', path: '/monitoring/utilisateurs', icon: <Users className="h-5 w-5" />, description: 'Administration des comptes' },
  ];

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchTerm = new FormData(form).get('globalSearch')?.toString();
    
    if (searchTerm) {
      toast({
        title: "Recherche lancée",
        description: `Recherche de "${searchTerm}" dans tout le système`,
      });
    }
  };

  const handleExportData = () => {
    toast({
      title: "Export des données",
      description: "Préparation de l'export global en cours...",
    });
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="border-b pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Activity className="h-6 w-6 text-blue-600" />
              Centre de Monitoring
            </h1>
            <p className="text-muted-foreground">
              Suivi en temps réel des opérations de contrôle routier au Gabon
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <form onSubmit={handleGlobalSearch} className="flex w-full sm:w-auto">
              <Input 
                name="globalSearch" 
                placeholder="Recherche globale..."
                className="rounded-r-none" 
              />
              <Button type="submit" variant="default" className="rounded-l-none">
                <Search className="h-4 w-4 mr-1" /> Rechercher
              </Button>
            </form>
            <Button onClick={handleExportData} variant="outline">
              <Download className="h-4 w-4 mr-1" /> Exporter
            </Button>
          </div>
        </div>
        
        {/* Navigation par onglets pour écrans larges */}
        <div className="hidden md:block">
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-[#0A3163] text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
                title={item.description}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        {/* Navigation par tabs pour mobiles */}
        <div className="md:hidden mt-4">
          <Tabs defaultValue="statistiques" className="w-full">
            <TabsList className="w-full overflow-x-auto flex justify-start pb-1.5 scrollbar-thin">
              {navItems.map((item) => (
                <TabsTrigger 
                  key={item.path}
                  value={item.path.split('/').pop() || ''}
                  className="flex items-center gap-1.5"
                  asChild
                >
                  <NavLink to={item.path}>
                    {item.icon}
                    <span className="truncate max-w-[80px]">{item.name}</span>
                  </NavLink>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Contenu de la page */}
      <Card className="shadow-sm bg-white/70 backdrop-blur-sm">
        <CardHeader className="bg-gray-50/70 border-b">
          <CardTitle className="text-lg font-medium">
            Tableau de bord de supervision
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringLayout;
