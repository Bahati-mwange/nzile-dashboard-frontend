
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const infractionTypes = [
  { value: 'speed', label: 'Excès de vitesse' },
  { value: 'redlight', label: 'Feu rouge grillé' },
  { value: 'parking', label: 'Stationnement interdit' },
  { value: 'documents', label: 'Défaut de documents' },
  { value: 'alcohol', label: 'Conduite sous influence (alcool)' },
  { value: 'phone', label: 'Usage du téléphone' },
  { value: 'seatbelt', label: 'Non-port de la ceinture' },
  { value: 'technical', label: 'Défaut technique' },
  { value: 'insurance', label: 'Défaut d\'assurance' },
  { value: 'other', label: 'Autre infraction' },
];

const InfractionForm: React.FC = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enregistrer une nouvelle infraction</CardTitle>
        <CardDescription>
          Renseignez les informations relatives à l'infraction constatée
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plate">Plaque d'immatriculation</Label>
            <Input id="plate" placeholder="AB-123-CD" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date et heure</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: fr }) : "Sélectionner une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type d'infraction</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type d'infraction" />
              </SelectTrigger>
              <SelectContent>
                {infractionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Lieu</Label>
            <Input id="location" placeholder="Adresse ou coordonnées GPS" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Détails supplémentaires sur l'infraction" 
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Pièces jointes</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div className="mt-2">
              <Button variant="ghost" className="text-sm text-transport-blue">
                Ajouter des photos ou vidéos
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, MP4 jusqu'à 10MB
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuler</Button>
        <Button className="bg-transport-blue hover:bg-transport-lightBlue">Enregistrer l'infraction</Button>
      </CardFooter>
    </Card>
  );
};

export default InfractionForm;
