
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Infraction } from '@/types/infraction';

interface InfractionHeaderProps {
  infraction: Infraction;
}

const InfractionHeader: React.FC<InfractionHeaderProps> = ({ infraction }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => navigate('/monitoring/amendes')}>
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour
      </Button>
      <div>
        <h1 className="text-2xl font-bold">Infraction #{infraction.id}</h1>
        <p className="text-muted-foreground">Plaque d'immatriculation: {infraction.plate}</p>
      </div>
    </div>
  );
};

export default InfractionHeader;
