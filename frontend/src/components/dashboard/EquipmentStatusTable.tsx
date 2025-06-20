
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Equipment {
  id: string;
  name: string;
  location: string;
  type: string;
  status: 'online' | 'offline' | 'maintenance';
  lastMaintenance: string;
}

const statusStyles = {
  online: 'bg-green-100 text-green-800 border-green-200',
  offline: 'bg-red-100 text-red-800 border-red-200',
  maintenance: 'bg-blue-100 text-blue-800 border-blue-200',
};

const statusLabels = {
  online: 'En ligne',
  offline: 'Hors ligne',
  maintenance: 'En maintenance',
};

interface EquipmentStatusTableProps {
  equipment: Equipment[];
}

const EquipmentStatusTable: React.FC<EquipmentStatusTableProps> = ({ equipment }) => {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-medium">Équipement</TableHead>
            <TableHead className="font-medium">Localisation</TableHead>
            <TableHead className="font-medium">Type</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium">Dernière maintenance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => (
            <TableRow key={item.id} className="hover:bg-gray-50">
              <TableCell className="font-medium text-gabon-blue">{item.name}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={statusStyles[item.status]}
                >
                  {statusLabels[item.status]}
                </Badge>
              </TableCell>
              <TableCell>{item.lastMaintenance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EquipmentStatusTable;
