
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MoreVertical } from 'lucide-react';

import InfractionHeader from './InfractionHeader';
import InfractionGeneralInfo from './InfractionGeneralInfo';
import InfractionFineInfo from './InfractionFineInfo';
import InfractionLocationInfo from './InfractionLocationInfo';
import InfractionEvidence from './InfractionEvidence';
import InfractionActions from './InfractionActions';

import { fetchInfractionDetails } from '@/types/infraction';

const InfractionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: infraction, isLoading, error } = useQuery({
    queryKey: ['infraction', id],
    queryFn: () => fetchInfractionDetails(id || 'unknown'),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Chargement des détails de l'infraction...</p>
      </div>
    );
  }

  if (error || !infraction) {
    return (
      <div className="space-y-4">
        <Button variant="outline" onClick={() => navigate('/monitoring/amendes')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center text-red-800">
              <p>Erreur lors du chargement des détails de l'infraction.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <InfractionHeader infraction={infraction} />

      <div className="bg-white rounded-lg border p-6 space-y-8">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">Détails de l'infraction</h2>
          <div className="flex items-center gap-2">
            <Badge
              className="bg-amber-100 border-amber-200 text-amber-800 hover:bg-amber-200"
              variant="outline"
            >
              En attente
            </Badge>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Informations générales et Amende */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfractionGeneralInfo infraction={infraction} />
          <InfractionFineInfo infraction={infraction} />
        </div>

        {/* Localisation */}
        <InfractionLocationInfo infraction={infraction} />

        {/* Preuve */}
        <InfractionEvidence infraction={infraction} />

        {/* Actions */}
        <InfractionActions />
      </div>
    </div>
  );
};

export default InfractionDetails;
