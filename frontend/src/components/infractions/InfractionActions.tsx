
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const InfractionActions: React.FC = () => {
  // Fonction pour gérer la validation de l'infraction
  const handleValidate = () => {
    toast({
      title: "Infraction validée",
      description: "L'infraction a été validée avec succès.",
      variant: "success"
    });
  };

  // Fonction pour gérer le rejet de l'infraction
  const handleReject = () => {
    toast({
      title: "Infraction rejetée",
      description: "L'infraction a été rejetée avec succès.",
      variant: "destructive"
    });
  };

  return (
    <div className="flex gap-4 pt-4">
      <Button 
        className="bg-green-600 hover:bg-green-700 text-white" 
        onClick={handleValidate}
      >
        <Check className="mr-2 h-4 w-4" />
        Valider l'infraction
      </Button>
      <Button 
        className="bg-red-600 hover:bg-red-700 text-white"
        onClick={handleReject}
      >
        <X className="mr-2 h-4 w-4" />
        Rejeter l'infraction
      </Button>
    </div>
  );
};

export default InfractionActions;
