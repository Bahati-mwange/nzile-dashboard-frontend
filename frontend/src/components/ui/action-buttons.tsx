
import React from 'react';
import { Button } from './button';
import { FileText, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ActionButtonsProps {
  onViewDetails?: () => void;
  onExport?: () => void;
  disabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onViewDetails, 
  onExport,
  disabled = false
}) => {
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      toast({
        title: "Exportation en cours",
        description: "Votre document sera prêt dans quelques instants."
      });
    }
  };

  return (
    <div className="flex space-x-2">
      {onViewDetails && (
        <Button 
          variant="outline" 
          size="sm"
          className="border-gabon-blue text-gabon-blue hover:bg-gabon-blue hover:text-white"
          onClick={onViewDetails}
          disabled={disabled}
        >
          <FileText className="h-4 w-4 mr-1" />
          Détails
        </Button>
      )}
      <Button 
        variant="outline" 
        size="sm"
        className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
        onClick={handleExport}
        disabled={disabled}
      >
        <Download className="h-4 w-4 mr-1" />
        Exporter
      </Button>
    </div>
  );
};

export default ActionButtons;
