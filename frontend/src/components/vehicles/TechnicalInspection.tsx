
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, CheckCircle2, AlertTriangle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TechnicalInspectionProps {
  inspections: {
    id: string;
    date: string;
    expiryDate: string;
    status: 'valid' | 'expired' | 'soon';
    centerName: string;
    documents: string[];
    notes?: string;
  }[];
}

const statusConfig = {
  valid: {
    label: 'Valide',
    icon: <CheckCircle2 className="h-4 w-4" />,
    className: 'bg-green-100 text-green-800 border-green-200'
  },
  expired: {
    label: 'Expirée',
    icon: <AlertTriangle className="h-4 w-4" />,
    className: 'bg-red-100 text-red-800 border-red-200'
  },
  soon: {
    label: 'Bientôt expirée',
    icon: <CalendarClock className="h-4 w-4" />,
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }
};

const TechnicalInspection: React.FC<TechnicalInspectionProps> = ({ inspections }) => {
  const currentInspection = inspections[0]; // Most recent inspection

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">Visite Technique</CardTitle>
          <Badge variant="outline" className={statusConfig[currentInspection.status].className}>
            <span className="flex items-center gap-1">
              {statusConfig[currentInspection.status].icon}
              {statusConfig[currentInspection.status].label}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Date de visite</p>
            <p className="font-medium">{currentInspection.date}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date d'expiration</p>
            <p className="font-medium">{currentInspection.expiryDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Centre de contrôle</p>
            <p className="font-medium">{currentInspection.centerName}</p>
          </div>
        </div>
        
        {currentInspection.notes && (
          <div>
            <p className="text-sm text-gray-500">Notes</p>
            <p className="text-sm mt-1">{currentInspection.notes}</p>
          </div>
        )}
        
        <div>
          <p className="text-sm text-gray-500 mb-2">Documents</p>
          <div className="flex gap-2">
            {currentInspection.documents.map((doc, index) => (
              <Button key={index} variant="outline" size="sm" className="text-xs">
                <Download className="h-3.5 w-3.5 mr-1" /> {doc}
              </Button>
            ))}
          </div>
        </div>
        
        {inspections.length > 1 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Historique</p>
            <div className="space-y-2">
              {inspections.slice(1).map((inspection, index) => (
                <div key={index} className="flex justify-between items-center text-sm p-2 border rounded-md">
                  <div>
                    <span className="font-medium">{inspection.date}</span> • {inspection.centerName}
                  </div>
                  <Badge variant="outline" className={statusConfig[inspection.status].className}>
                    {statusConfig[inspection.status].label}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TechnicalInspection;
