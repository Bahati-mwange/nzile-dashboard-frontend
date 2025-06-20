
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

interface Infraction {
  id: string;
  date: string;
  plate: string;
  location: string;
  type: string;
  status: 'pending' | 'processed' | 'paid';
  amount: number;
}

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processed: 'bg-blue-100 text-blue-800 border-blue-200',
  paid: 'bg-green-100 text-green-800 border-green-200',
};

interface RecentInfractionsTableProps {
  infractions: Infraction[];
}

const RecentInfractionsTable: React.FC<RecentInfractionsTableProps> = ({ infractions }) => {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-medium">Date</TableHead>
            <TableHead className="font-medium">Plaque</TableHead>
            <TableHead className="font-medium">Localisation</TableHead>
            <TableHead className="font-medium">Type</TableHead>
            <TableHead className="font-medium">Statut</TableHead>
            <TableHead className="font-medium">Montant</TableHead>
            <TableHead className="text-right font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {infractions.map((infraction) => (
            <TableRow key={infraction.id} className="hover:bg-gray-50">
              <TableCell>{infraction.date}</TableCell>
              <TableCell className="font-medium text-gabon-blue">{infraction.plate}</TableCell>
              <TableCell>{infraction.location}</TableCell>
              <TableCell>{infraction.type}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={statusStyles[infraction.status]}
                >
                  {infraction.status === 'pending' ? 'En attente' : 
                   infraction.status === 'processed' ? 'Traité' : 'Payé'}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{infraction.amount.toLocaleString()} FCFA</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="hover:text-gabon-blue">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentInfractionsTable;
