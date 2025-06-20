import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ChronotachygrapheVehiculeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // TODO: Remplacer par un vrai fetch
  const vehicule = { id, plaque: 'GA-123-LBV', marque: 'Toyota', statut: 'Actif', sessions: 5 };

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>Retour</Button>
      <Card>
        <CardHeader>
          <CardTitle>Détail Véhicule Chronotachygraphe</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Plaque : {vehicule.plaque}</div>
          <div>Marque : {vehicule.marque}</div>
          <div>Sessions : {vehicule.sessions}</div>
          <div>Statut : {vehicule.statut}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChronotachygrapheVehiculeDetails;
