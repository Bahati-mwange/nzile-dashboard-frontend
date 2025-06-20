
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Infraction, statusStyles, statusLabels } from '@/data/mockInfractions';

interface InfractionTableProps {
  infractions: Infraction[];
}

const InfractionTable: React.FC<InfractionTableProps> = ({ infractions }) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Plaque</TableHead>
          <TableHead>Conducteur</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Détails</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {infractions.map((infraction) => (
          <TableRow key={infraction.id}>
            <TableCell>{infraction.date}</TableCell>
            <TableCell className="font-medium">{infraction.plate}</TableCell>
            <TableCell>{infraction.driver}</TableCell>
            <TableCell>{infraction.type}</TableCell>
            <TableCell className="max-w-md truncate">{infraction.details}</TableCell>
            <TableCell>
              <Badge 
                variant="outline" 
                className={statusStyles[infraction.status]}
              >
                {statusLabels[infraction.status]}
              </Badge>
            </TableCell>
            <TableCell>{infraction.amount.toLocaleString()} FCFA</TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(`/infractions/${infraction.id}`)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InfractionTable;
