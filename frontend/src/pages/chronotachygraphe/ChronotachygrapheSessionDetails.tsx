import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ChronotachygrapheSessionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // TODO: Remplacer par un vrai fetch
  const session = { id, conducteur: 'Mve Jean', vehicule: 'GA-123-LBV', debut: '2025-06-01', fin: '2025-06-02', statut: 'Clôturée' };

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>Retour</Button>
      <Card>
        <CardHeader>
          <CardTitle>Détail Session Chronotachygraphe</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Conducteur : {session.conducteur}</div>
          <div>Véhicule : {session.vehicule}</div>
          <div>Début : {session.debut}</div>
          <div>Fin : {session.fin}</div>
          <div>Statut : {session.statut}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChronotachygrapheSessionDetails;
