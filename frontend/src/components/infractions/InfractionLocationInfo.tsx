
import React from 'react';
import { Infraction } from '@/types/infraction';

interface InfractionLocationInfoProps {
  infraction: Infraction;
}

const InfractionLocationInfo: React.FC<InfractionLocationInfoProps> = ({ infraction }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-muted-foreground">Localisation</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Coordonnées</p>
          <p className="font-medium">{infraction.location.coordinates}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-sm text-muted-foreground">Adresse</p>
          <p className="font-medium">{infraction.location.address}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Zone</p>
          <p className="font-medium">{infraction.location.zone}</p>
        </div>
      </div>
    </div>
  );
};

export default InfractionLocationInfo;
