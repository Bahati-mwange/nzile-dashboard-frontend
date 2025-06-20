
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Infraction } from '@/types/infraction';

interface InfractionGeneralInfoProps {
  infraction: Infraction;
}

const InfractionGeneralInfo: React.FC<InfractionGeneralInfoProps> = ({ infraction }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-muted-foreground">Informations générales</h3>
      
      <div className="grid grid-cols-2 gap-y-4">
        <div>
          <p className="text-sm text-muted-foreground">ID</p>
          <p className="font-medium">{infraction.id}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Type</p>
          <p className="font-medium">{infraction.type}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="font-medium">{infraction.date}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Plaque</p>
          <p className="font-medium">{infraction.plate}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Statut</p>
          <Badge 
            className="bg-amber-100 border-amber-200 text-amber-800"
            variant="outline"
          >
            En attente
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default InfractionGeneralInfo;
