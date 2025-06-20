
import React, { useState } from 'react';
import { Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Check, X } from 'lucide-react';
import { Infraction } from '@/types/infraction';
import { toast } from '@/components/ui/use-toast';

interface InfractionEvidenceProps {
  infraction: Infraction;
}

const InfractionEvidence: React.FC<InfractionEvidenceProps> = ({ infraction }) => {
  const [showEvidence, setShowEvidence] = useState(false);

  // Fonction pour gérer la validation de l'infraction
  const handleValidate = () => {
    toast({
      title: "Infraction validée",
      description: "L'infraction a été validée avec succès.",
    });
  };

  // Fonction pour gérer le rejet de l'infraction
  const handleReject = () => {
    toast({
      title: "Infraction rejetée",
      description: "L'infraction a été rejetée avec succès.",
    });
  };

  return (
    <>
      <div className="space-y-4">
        <h3 className="font-medium text-muted-foreground">Preuve</h3>
        
        <div className="flex gap-4">
          <Button onClick={() => setShowEvidence(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Voir la preuve
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
        </div>
      </div>

      {/* Modal pour la preuve */}
      <Dialog open={showEvidence} onOpenChange={setShowEvidence}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Preuve de l'infraction</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
              <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                Capture radar
              </div>
            </AspectRatio>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Détails:</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Type:</p>
                  <p>{infraction.evidence?.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date:</p>
                  <p>{infraction.evidence?.date}</p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setShowEvidence(false)}>
              Fermer
            </Button>
            <div className="flex gap-2">
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  handleValidate();
                  setShowEvidence(false);
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Valider
              </Button>
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  handleReject();
                  setShowEvidence(false);
                }}
              >
                <X className="mr-2 h-4 w-4" />
                Rejeter
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InfractionEvidence;
