
import React from 'react';
import { Infraction } from '@/types/infraction';

interface InfractionFineInfoProps {
  infraction: Infraction;
}

const InfractionFineInfo: React.FC<InfractionFineInfoProps> = ({ infraction }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-muted-foreground">Amende</h3>
      
      <div className="grid grid-cols-2 gap-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Montant</p>
          <p className="font-medium">{infraction.amount.toLocaleString()} FCFA</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Date limite</p>
          <p className="font-medium">{infraction.limitDate}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Date de paiement</p>
          <p className="font-medium">{infraction.paymentDate || 'Non payé'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Méthode</p>
          <p className="font-medium">{infraction.paymentMethod || 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Référence</p>
          <p className="font-medium">{infraction.reference || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default InfractionFineInfo;
