
import React from 'react';
import { FileText, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InfractionPageHeaderProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}

const InfractionPageHeader: React.FC<InfractionPageHeaderProps> = ({
  showForm,
  setShowForm,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Gestion des infractions
        </h1>
        <p className="text-muted-foreground">
          Enregistrez et suivez les infractions routières
        </p>
      </div>
      <Button 
        className="bg-transport-blue hover:bg-transport-lightBlue"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Voir la liste
          </>
        ) : (
          <>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle infraction
          </>
        )}
      </Button>
    </div>
  );
};

export default InfractionPageHeader;
