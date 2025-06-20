
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CreditCard, Smartphone, Landmark, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Transaction {
  id: string;
  amount: number;
  method: 'cash' | 'airtel' | 'moov' | 'card' | 'transfer';
  date: string;
  reference: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  title?: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions, title = "Historique des transactions" }) => {
  const getMethodIcon = (method: Transaction['method']) => {
    switch (method) {
      case 'cash':
        return <Coins className="h-4 w-4 text-yellow-600" />;
      case 'airtel':
      case 'moov':
        return <Smartphone className="h-4 w-4 text-blue-600" />;
      case 'card':
        return <CreditCard className="h-4 w-4 text-purple-600" />;
      case 'transfer':
        return <Landmark className="h-4 w-4 text-green-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMethodName = (method: Transaction['method']) => {
    switch (method) {
      case 'cash': return 'Espèces';
      case 'airtel': return 'Airtel Money';
      case 'moov': return 'Moov Money';
      case 'card': return 'Carte bancaire';
      case 'transfer': return 'Virement bancaire';
    }
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Complété</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">En attente</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Échoué</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Référence</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString('fr-GA')}</TableCell>
                  <TableCell>{transaction.reference}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getMethodIcon(transaction.method)}
                      <span>{getMethodName(transaction.method)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.amount.toLocaleString()} FCFA</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            Aucune transaction enregistrée
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
