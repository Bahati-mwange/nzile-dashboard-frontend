
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  FileText, 
  ClipboardCheck, 
  Calendar, 
  MapPin, 
  User, 
  Car, 
  FileCheck,
  Printer
} from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ActionButtons from '@/components/ui/action-buttons';
import Logo from '@/components/ui/logo';
import { toast } from '@/hooks/use-toast';

interface Report {
  id: string;
  reference: string;
  date: string;
  vehiclePlate: string;
  driverName: string;
  reason: string;
  details: string;
  location: string;
  amount: number;
  status: 'pending' | 'paid' | 'contested';
  agent: string;
  images?: string[];
  documents?: { name: string, url: string }[];
}

const fetchReportDetails = async (id: string): Promise<Report> => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    id,
    reference: `PV-${id}-2025`,
    date: '2025-05-12',
    vehiclePlate: 'GA-123-LBV',
    driverName: 'Ndong Mba Jean',
    reason: 'Excès de vitesse',
    details: 'Vitesse constatée: 78 km/h en zone limitée à 50 km/h.',
    location: 'Boulevard Triomphal, Libreville',
    amount: 75000,
    status: 'pending',
    agent: 'Koumba Pierre',
    images: ['/placeholder.svg'],
    documents: [
      { name: 'Procès-verbal', url: '#' },
      { name: 'Mesure radar', url: '#' }
    ]
  };
};

const ReportDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { data: report, isLoading: queryLoading } = useQuery({
    queryKey: ['report', id],
    queryFn: () => fetchReportDetails(id || ''),
  });

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "PV exporté avec succès",
        description: "Le document a été téléchargé dans votre dossier de téléchargements."
      });
    }, 1500);
  };

  const handlePrint = () => {
    toast({
      title: "Impression en cours",
      description: "Préparation du document pour impression..."
    });
  };

  const getStatusBadge = (status: 'pending' | 'paid' | 'contested') => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">En attente</Badge>;
      case 'paid':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Payé</Badge>;
      case 'contested':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Contesté</Badge>;
    }
  };

  if (queryLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse">
          <Logo size="small" />
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => navigate('/reports')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Card>
          <CardContent className="py-6">
            <p className="text-center text-muted-foreground">Rapport introuvable</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/reports')}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Retour
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{report.reference}</h1>
            <p className="text-muted-foreground">Détails du procès-verbal</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handlePrint}
            className="border-gabon-blue text-gabon-blue hover:bg-gabon-blue hover:text-white"
          >
            <Printer className="h-4 w-4 mr-1" />
            Imprimer
          </Button>
          <Button 
            onClick={handleExport}
            disabled={isLoading}
            className="bg-gabon-blue hover:bg-gabon-blue/90"
          >
            <FileCheck className="h-4 w-4 mr-1" />
            {isLoading ? 'Exportation...' : 'Exporter le PV'}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Tabs defaultValue="overview">
          <div className="border-b px-6 pt-6">
            <TabsList>
              <TabsTrigger value="overview">Vue générale</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Informations générales */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-gabon-blue" /> 
                    Informations générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Référence</p>
                      <p className="font-medium">{report.reference}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{new Date(report.date).toLocaleDateString('fr-GA')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Agent</p>
                      <p className="font-medium">{report.agent}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Statut</p>
                      <div>{getStatusBadge(report.status)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Véhicule et conducteur */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Car className="h-5 w-5 mr-2 text-gabon-blue" /> 
                    Véhicule et conducteur
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Immatriculation</p>
                    <p className="font-medium">{report.vehiclePlate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conducteur</p>
                    <p className="font-medium">{report.driverName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Localisation</p>
                    <p className="font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gabon-blue inline" />
                      {report.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Infraction */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <ClipboardCheck className="h-5 w-5 mr-2 text-gabon-blue" /> 
                  Détails de l'infraction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Motif</p>
                  <p className="font-medium">{report.reason}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p>{report.details}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Montant de l'amende</p>
                  <p className="font-medium text-lg">{report.amount.toLocaleString()} FCFA</p>
                </div>
                {report.images && report.images.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Preuve</p>
                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
                      <img 
                        src={report.images[0]} 
                        alt="Preuve d'infraction" 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="p-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documents associés</CardTitle>
                <CardDescription>Liste des documents liés à ce procès-verbal</CardDescription>
              </CardHeader>
              <CardContent>
                {report.documents && report.documents.length > 0 ? (
                  <div className="space-y-4">
                    {report.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-gabon-blue" />
                          <span>{doc.name}</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            Visualiser
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    Aucun document associé
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="p-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Historique des actions</CardTitle>
                <CardDescription>Suivi chronologique des actions sur ce PV</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gabon-blue/10 flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-gabon-blue" />
                    </div>
                    <div>
                      <p className="font-medium">PV créé</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(report.date).toLocaleDateString('fr-GA')} à {new Date(report.date).toLocaleTimeString('fr-GA')}
                      </p>
                      <p className="text-sm">Par {report.agent}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportDetails;
