import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ChronotachygrapheConducteurDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // TODO: Remplacer par un vrai fetch
  const conducteur = { id, nom: 'Mve Jean', permis: 'GA123456', infractions: 3, statut: 'Actif' };

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>Retour</Button>
      <Card>
        <CardHeader>
          <CardTitle>Détail Conducteur Chronotachygraphe</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Nom : {conducteur.nom}</div>
          <div>Permis : {conducteur.permis}</div>
          <div>Infractions : {conducteur.infractions}</div>
          <div>Statut : {conducteur.statut}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChronotachygrapheConducteurDetails;
