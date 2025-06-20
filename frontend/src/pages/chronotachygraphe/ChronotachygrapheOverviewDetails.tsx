import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ChronotachygrapheOverviewDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // TODO: Remplacer par un vrai fetch
  const overview = { id, titre: 'Vue d\'ensemble', date: '2025-06-01', description: 'Résumé des activités du mois.' };

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>Retour</Button>
      <Card>
        <CardHeader>
          <CardTitle>Détail Vue d'ensemble Chronotachygraphe</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Titre : {overview.titre}</div>
          <div>Date : {overview.date}</div>
          <div>Description : {overview.description}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChronotachygrapheOverviewDetails;
