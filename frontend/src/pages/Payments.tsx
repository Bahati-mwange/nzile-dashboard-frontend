
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Clock, FileText, BarChart4, LineChart, Download, Filter } from 'lucide-react';
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent
} from '@/components/ui/chart';
import StatsCard from '@/components/dashboard/StatsCard';

// Payment type definition
type Payment = {
  reference: string;
  plate: string;
  date: string;
  dueDate: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'late' | 'paid';
};

// Convert value to millions with 2 decimal places
const toMillions = (value: number): string => {
  return (value / 1000000).toFixed(2);
};

// Mock data for payments
const paymentsList: Payment[] = [
  {
    reference: '',
    plate: 'L-4523-GB',
    date: '06/05/2025 09:13',
    dueDate: '20/05/2025 11:13',
    amount: 75000,
    paymentMethod: 'Non spécifié',
    status: 'pending',
  },
  {
    reference: 'PAY-123456',
    plate: 'AB-123-CD',
    date: '06/05/2025 06:13',
    dueDate: '20/05/2025 11:13',
    amount: 50000,
    paymentMethod: 'Mobile Money',
    status: 'late',
  },
  {
    reference: '',
    plate: 'PG-789-OW',
    date: '05/05/2025 11:13',
    dueDate: '20/05/2025 11:13',
    amount: 25000,
    paymentMethod: 'Non spécifié',
    status: 'late',
  },
  {
    reference: 'PAY-789012',
    plate: 'OG-456-PL',
    date: '06/05/2025 03:13',
    dueDate: '20/05/2025 11:13',
    amount: 30000,
    paymentMethod: 'Carte bancaire',
    status: 'paid',
  },
  {
    reference: '',
    plate: 'E-7890-OW',
    date: '06/05/2025 08:13',
    dueDate: '20/05/2025 11:13',
    amount: 100000,
    paymentMethod: 'Non spécifié',
    status: 'pending',
  },
];

// Payment status badge colors
const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  late: "bg-red-100 text-red-800 hover:bg-red-100",
  paid: "bg-green-100 text-green-800 hover:bg-green-100",
};

// Payment status display names
const statusNames = {
  pending: "En attente",
  late: "En retard",
  paid: "Payé",
};

// Payment method data for chart
const methodsData = [
  { name: 'Mobile Money', value: 35 },
  { name: 'Carte bancaire', value: 25 },
  { name: 'Non spécifié', value: 40 },
];

// Chart config
const chartConfig = {
  mobile: {
    label: "Mobile Money",
    theme: { light: "#9b87f5", dark: "#9b87f5" },
  },
  carte: {
    label: "Carte bancaire",
    theme: { light: "#33C3F0", dark: "#33C3F0" },
  },
  autre: {
    label: "Non spécifié",
    theme: { light: "#F97316", dark: "#F97316" },
  },
};

const Payments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('week');

  // Calculate statistics
  const totalPaid = paymentsList.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = paymentsList.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const pendingCount = paymentsList.filter(p => p.status === 'pending').length;
  const recoveryRate = Math.round((totalPaid / (totalPaid + pendingAmount)) * 100) || 0;

  // Filter payments based on search and filters
  const filteredPayments = paymentsList.filter(payment => {
    const matchesSearch = searchQuery === '' || 
      payment.plate.toLowerCase().includes(searchQuery.toLowerCase()) || 
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.paymentMethod === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Paiements & Statut</h1>
        <p className="text-muted-foreground">Gérez et suivez les paiements des infractions</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total perçu"
          value={`${toMillions(totalPaid)} M FCFA`}
          icon={<DollarSign className="h-5 w-5" />}
          trend="up"
          trendValue="+12.5% ce mois"
        />
        
        <StatsCard
          title="En attente"
          value={`${toMillions(pendingAmount)} M FCFA`}
          icon={<Clock className="h-5 w-5" />}
          description={`${pendingCount} paiements`}
        />
        
        <StatsCard
          title="Taux de recouvrement"
          value={`${recoveryRate}%`}
          icon={<BarChart4 className="h-5 w-5" />}
          description="Objectif: 85%"
        />
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="flex items-center justify-center pt-6">
            <Button className="w-full bg-[#0A3163] hover:bg-[#072548]">
              <FileText className="mr-2 h-4 w-4" />
              Générer un rapport
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Payments List */}
      <Card className="shadow-md">
        <CardHeader className="bg-slate-50 rounded-t-lg">
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <CardTitle>Liste des paiements</CardTitle>
              <CardDescription>Gérez les paiements des infractions routières</CardDescription>
            </div>
            <Tabs defaultValue="week" value={timeFilter} onValueChange={setTimeFilter} className="mb-0">
              <TabsList className="bg-white/80">
                <TabsTrigger value="week">Cette semaine</TabsTrigger>
                <TabsTrigger value="month">Ce mois</TabsTrigger>
                <TabsTrigger value="quarter">Ce trimestre</TabsTrigger>
                <TabsTrigger value="year">Cette année</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Input
                  placeholder="Rechercher par plaque, référence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="sm:max-w-[280px] pl-10"
                />
                <span className="absolute left-3 top-2.5 text-muted-foreground">
                  <Filter className="h-4 w-4" />
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tous les statuts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="late">En retard</SelectItem>
                    <SelectItem value="paid">Payé</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tous les moyens" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les moyens</SelectItem>
                    <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                    <SelectItem value="Carte bancaire">Carte bancaire</SelectItem>
                    <SelectItem value="Non spécifié">Non spécifié</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button variant="outline" className="shrink-0 border-slate-300">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
          
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Plaque</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Moyen</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment, index) => (
                  <TableRow key={index} className="bg-white hover:bg-slate-50">
                    <TableCell>{payment.reference || '-'}</TableCell>
                    <TableCell>{payment.plate}</TableCell>
                    <TableCell>
                      <div>{payment.date}</div>
                      <div className="text-xs text-muted-foreground">Échéance: {payment.dueDate}</div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {toMillions(payment.amount)} M FCFA
                    </TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[payment.status]}>
                        {statusNames[payment.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {payment.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800">Valider</Button>
                            <Button variant="outline" size="sm" className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800">Rejeter</Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">Reçu</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-md">
          <CardHeader className="bg-slate-50 rounded-t-lg">
            <CardTitle>Moyens de paiement</CardTitle>
            <CardDescription>Répartition des paiements par moyen</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <ChartContainer
              className="w-full h-full"
              config={chartConfig}
            >
              <div className="text-center text-muted-foreground p-8">
                <BarChart4 className="mx-auto h-16 w-16 opacity-30" />
                <p className="mt-2">Graphique des moyens de paiement</p>
                <ChartLegend>
                  <ChartLegendContent className="mt-4" />
                </ChartLegend>
              </div>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader className="bg-slate-50 rounded-t-lg">
            <CardTitle>Tendance des paiements</CardTitle>
            <CardDescription>Évolution des paiements sur les 12 derniers mois</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <LineChart className="mx-auto h-16 w-16 opacity-30" />
              <p className="mt-2">Graphique des tendances</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;
