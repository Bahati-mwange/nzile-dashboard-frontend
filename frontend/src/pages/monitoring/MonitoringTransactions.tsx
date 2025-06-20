import React from 'react';
import { useApiData } from '@/hooks/useApiData';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Clock,
  Check,
  User,
  MapPin
} from 'lucide-react';
import MonitoringFilters from '@/components/monitoring/MonitoringFilters';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Type pour les données de transactions
type Transaction = {
  id: string;
  numéro: string;
  cléPaiement: string;
  contact: string;
  montant: number;
  date: string;
  statut: 'payé' | 'en_attente';
  usagerNom: string;
};

// Générer des données de transactions
const générerDonnéesTransactions = (): Transaction[] => [
  {
    id: "T001",
    numéro: "TX-2025-001",
    cléPaiement: "PAY-GABON-12345",
    contact: "062345678",
    montant: 25000,
    date: "2025-05-12",
    statut: "payé",
    usagerNom: "Mve Jean",
  },
  {
    id: "T002",
    numéro: "TX-2025-002",
    cléPaiement: "PAY-GABON-12346",
    contact: "062345679",
    montant: 15000,
    date: "2025-05-11",
    statut: "payé",
    usagerNom: "Ongola Marie",
  },
  {
    id: "T003",
    numéro: "TX-2025-003",
    cléPaiement: "PAY-GABON-12347",
    contact: "062345670",
    montant: 50000,
    date: "2025-05-10",
    statut: "en_attente",
    usagerNom: "Ekomi Sarah",
  },
  {
    id: "T004",
    numéro: "TX-2025-004",
    cléPaiement: "PAY-GABON-12348",
    contact: "062345671",
    montant: 30000,
    date: "2025-05-09",
    statut: "payé",
    usagerNom: "Makanga Paul",
  },
  {
    id: "T005",
    numéro: "TX-2025-005",
    cléPaiement: "PAY-GABON-12349",
    contact: "062345672",
    montant: 20000,
    date: "2025-05-08",
    statut: "en_attente",
    usagerNom: "Nzoghe Jean-Paul",
  },
  {
    id: "T006",
    numéro: "TX-2025-006",
    cléPaiement: "PAY-GABON-20001",
    contact: "062345680",
    montant: 1200000,
    date: "2025-05-07",
    statut: "payé",
    usagerNom: "Essono Pascal",
  },
  {
    id: "T007",
    numéro: "TX-2025-007",
    cléPaiement: "PAY-GABON-20002",
    contact: "062345681",
    montant: 950000,
    date: "2025-05-06",
    statut: "payé",
    usagerNom: "Mba Thérèse",
  },
  {
    id: "T008",
    numéro: "TX-2025-008",
    cléPaiement: "PAY-GABON-20003",
    contact: "062345682",
    montant: 2100000,
    date: "2025-05-05",
    statut: "en_attente",
    usagerNom: "Obame Louis",
  },
  {
    id: "T009",
    numéro: "TX-2025-009",
    cléPaiement: "PAY-GABON-20004",
    contact: "062345683",
    montant: 1750000,
    date: "2025-05-04",
    statut: "payé",
    usagerNom: "Mengue Irma",
  },
  {
    id: "T010",
    numéro: "TX-2025-010",
    cléPaiement: "PAY-GABON-20005",
    contact: "062345684",
    montant: 3000000,
    date: "2025-05-03",
    statut: "payé",
    usagerNom: "Ndombi Christian",
  },
  {
    id: "T011",
    numéro: "TX-2025-011",
    cléPaiement: "PAY-GABON-20006",
    contact: "062345685",
    montant: 2200000,
    date: "2025-05-02",
    statut: "en_attente",
    usagerNom: "Akendengue Olivia",
  },
  {
    id: "T012",
    numéro: "TX-2025-012",
    cléPaiement: "PAY-GABON-20007",
    contact: "062345686",
    montant: 1850000,
    date: "2025-05-01",
    statut: "payé",
    usagerNom: "Biyoghe Robert",
  },
  {
    id: "T013",
    numéro: "TX-2025-013",
    cléPaiement: "PAY-GABON-20008",
    contact: "062345687",
    montant: 2500000,
    date: "2025-04-30",
    statut: "payé",
    usagerNom: "Ndong Jeanne",
  },
  {
    id: "T014",
    numéro: "TX-2025-014",
    cléPaiement: "PAY-GABON-20009",
    contact: "062345688",
    montant: 1600000,
    date: "2025-04-29",
    statut: "payé",
    usagerNom: "Nzue Bruno",
  },
  {
    id: "T015",
    numéro: "TX-2025-015",
    cléPaiement: "PAY-GABON-20010",
    contact: "062345689",
    montant: 2800000,
    date: "2025-04-28",
    statut: "en_attente",
    usagerNom: "Ella Paulette",
  }
];

// Composant principal
const MonitoringTransactions: React.FC = () => {
  const navigate = useNavigate();
  const { données: transactions, chargement } = useApiData<Transaction[]>(
    'https://votre-api.com/transactions',
    undefined,
    générerDonnéesTransactions
  );

  const handleSearch = (term: string) => {
    console.log("Recherche:", term);
    // Implémentez la logique de recherche ici
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    console.log(`Export ${format}`);
    // Implémentez la logique d'exportation ici
  };

  const handlePeriodChange = (period: string) => {
    console.log("Période:", period);
    // Implémentez la logique de filtre par période ici
  };

  const handleViewDetails = (transactionId: string) => {
    navigate(`/transactions/${transactionId}`);
  };

  // Statistiques
  const montantPayé = 34000000; // 34 millions FCFA réceptionnés
  const montantTotal = montantPayé + 12000000; // exemple : total > 34M
  const montantEnAttente = montantTotal - montantPayé; // exemple : en attente > 0

  // Formatage des montants
  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR').format(montant) + ' FCFA';
  };

  return (
    <div className="space-y-6">
      <MonitoringFilters
        title="Suivi des Transactions"
        onSearch={handleSearch}
        onExport={handleExport}
        onPeriodChange={handlePeriodChange}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total transactions</p>
                <p className="text-2xl font-bold">{totalTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transactions payées</p>
                <p className="text-2xl font-bold">{transactionsPayées}</p>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">En attente</p>
                <p className="text-2xl font-bold">{transactionsEnAttente}</p>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Montant total</p>
                <p className="text-2xl font-bold">{formatMontant(montantTotal)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Montant perçu</p>
                <p className="text-2xl font-bold">{formatMontant(montantPayé)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Montant en attente</p>
                <p className="text-2xl font-bold">{formatMontant(montantEnAttente)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          {chargement ? (
            <p>Chargement des données des transactions...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Clé</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Usager</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions?.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.numéro}</TableCell>
                    <TableCell>{transaction.cléPaiement}</TableCell>
                    <TableCell>{transaction.contact}</TableCell>
                    <TableCell>{formatMontant(transaction.montant)}</TableCell>
                    <TableCell>{transaction.usagerNom}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${transaction.statut === 'payé' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{transaction.statut === 'payé' ? 'Payé' : 'En attente'}</span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(transaction.id)}>
                        <span className="sr-only">Détails</span>
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringTransactions;
