import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ChronotachygrapheRapportDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // TODO: Remplacer par un vrai fetch
  const rapport = { id, titre: 'Rapport mensuel', date: '2025-06-01', auteur: 'Ministère des Transports', statut: 'Validé' };

  return (
    <div className="space-y-6">
      <Button variant="outline" onClick={() => navigate(-1)}>Retour</Button>
      <Card>
        <CardHeader>
          <CardTitle>Détail Rapport Chronotachygraphe</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Titre : {rapport.titre}</div>
          <div>Date : {rapport.date}</div>
          <div>Auteur : {rapport.auteur}</div>
          <div>Statut : {rapport.statut}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChronotachygrapheRapportDetails;
