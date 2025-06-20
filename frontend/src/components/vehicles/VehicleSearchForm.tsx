
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface VehicleSearchFormProps {
  onSearch?: (query: { plate: string; owner: string }) => void;
}

const VehicleSearchForm: React.FC<VehicleSearchFormProps> = ({ onSearch }) => {
  const [plate, setPlate] = useState('');
  const [owner, setOwner] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch({ plate, owner });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recherche de véhicule</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="plate" className="text-sm font-medium">Plaque d'immatriculation</label>
              <Input
                id="plate"
                placeholder="Ex: GA-123-LBV"
                value={plate}
                onChange={e => setPlate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="owner" className="text-sm font-medium">Propriétaire</label>
              <Input
                id="owner"
                placeholder="Ex: Nom du propriétaire"
                value={owner}
                onChange={e => setOwner(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setPlate('');
                setOwner('');
                if (onSearch) onSearch({ plate: '', owner: '' });
              }}
            >
              Réinitialiser
            </Button>
            <Button type="submit" className="bg-gabon-blue hover:bg-gabon-blue/90">
              <Search className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VehicleSearchForm;
