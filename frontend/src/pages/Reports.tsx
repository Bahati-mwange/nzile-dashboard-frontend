import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Filter } from 'lucide-react';
import ReportTable from '@/components/reports/ReportTable';
import ReportForm from '@/components/reports/ReportForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Types pour les PV
export type Report = {
  id: string;
  vehiclePlate: string;
  driverName: string;
  reason: string;
  amount: number;
  date: string;
  location: string;
  status: 'pending' | 'paid' | 'contested';
  officer: string;
};

// Données fictives pour les PV
const initialReports: Report[] = [
  {
    id: 'PV-2025-001',
    vehiclePlate: 'GA-123-LBV',
    driverName: 'Arsène Mpiga',
    reason: 'Excès de vitesse (20 km/h)',
    amount: 25000,
    date: '2025-04-01',
    location: 'Boulevard Triomphal, Libreville',
    status: 'pending',
    officer: 'Lt. Jean Koumba',
  },
  {
    id: 'PV-2025-002',
    vehiclePlate: 'GA-456-OWE',
    driverName: 'Nicole Assélé',
    reason: 'Stationnement interdit',
    amount: 15000,
    date: '2025-04-02',
    location: 'Avenue de l\'Indépendance, Libreville',
    status: 'paid',
    officer: 'Sgt. Marie Moussavou',
  },
  {
    id: 'PV-2025-003',
    vehiclePlate: 'GA-789-FCV',
    driverName: 'Pascal Oyougou',
    reason: 'Feu rouge grillé',
    amount: 50000,
    date: '2025-04-03',
    location: 'Carrefour IAI, Libreville',
    status: 'contested',
    officer: 'Cpt. Pierre Ndong',
  },
  {
    id: 'PV-2025-004',
    vehiclePlate: 'MN-012-OP',
    driverName: 'Paulette Akerey',
    reason: 'Défaut d\'assurance',
    amount: 100000,
    date: '2025-04-03',
    location: 'Route nationale 1, Lambaréné',
    status: 'pending',
    officer: 'Lt. François Ondo',
  },
  {
    id: 'PV-2025-005',
    vehiclePlate: 'GA-345-LBV',
    driverName: 'Bruno Ndong',
    reason: 'Téléphone au volant',
    amount: 25000,
    date: '2025-03-31',
    location: 'Boulevard de l\'Indépendance, Libreville',
    status: 'pending',
    officer: 'Cpt. Ang��lique Mapaga',
  },
];

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const handleReportAdd = (newReport: Omit<Report, 'id'>) => {
    const id = `PV-2025-${(reports.length + 1).toString().padStart(3, '0')}`;
    const reportWithId = { ...newReport, id };
    setReports([...reports, reportWithId]);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des PV</h1>
          <p className="text-muted-foreground">
            Créez, consultez et gérez les procès-verbaux d'infractions routières
          </p>
        </div>
        <Button className="bg-gabon-blue hover:bg-gabon-blue/90" onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Créer un PV
        </Button>
      </div>

      {isFormOpen ? (
        <Card>
          <CardHeader>
            <CardTitle>Nouveau PV</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportForm onSubmit={handleReportAdd} onCancel={() => setIsFormOpen(false)} />
          </CardContent>
        </Card>
      ) : (
        <>
          <Alert className="bg-amber-50 border-amber-200">
            <AlertDescription className="text-amber-800">
              Les PV impayés depuis plus de 30 jours font l'objet de majoration automatique de 10%.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">Tous les PV</TabsTrigger>
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="paid">Payés</TabsTrigger>
                <TabsTrigger value="contested">Contestés</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrer
              </Button>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <ReportTable reports={reports} />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <ReportTable reports={reports.filter(r => r.status === 'pending')} />
            </TabsContent>
            
            <TabsContent value="paid" className="mt-0">
              <ReportTable reports={reports.filter(r => r.status === 'paid')} />
            </TabsContent>
            
            <TabsContent value="contested" className="mt-0">
              <ReportTable reports={reports.filter(r => r.status === 'contested')} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Reports;
