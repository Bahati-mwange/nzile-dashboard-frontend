
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, CalendarClock, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InsuranceDetailsProps {
  insurance: {
    id: string;
    company: string;
    policyNumber: string;
    startDate: string;
    expiryDate: string;
    status: 'valid' | 'expired' | 'soon';
    coverageType: string;
    documents: string[];
  };
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

const InsuranceDetails: React.FC<InsuranceDetailsProps> = ({ insurance }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-bold">Assurance</CardTitle>
            <span className="text-sm text-gray-500">{insurance.company}</span>
          </div>
          <Badge variant="outline" className={statusConfig[insurance.status].className}>
            <span className="flex items-center gap-1">
              {statusConfig[insurance.status].icon}
              {statusConfig[insurance.status].label}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">N° de police</p>
            <p className="font-medium">{insurance.policyNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Type de couverture</p>
            <p className="font-medium">{insurance.coverageType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date de début</p>
            <p className="font-medium">{insurance.startDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date d'expiration</p>
            <p className="font-medium">{insurance.expiryDate}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-2">Documents</p>
          <div className="flex gap-2">
            {insurance.documents.map((doc, index) => (
              <Button key={index} variant="outline" size="sm" className="text-xs">
                <FileText className="h-3.5 w-3.5 mr-1" /> {doc}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="pt-2">
          <Button variant="outline" className="w-full" size="sm">
            <Building className="h-4 w-4 mr-1" />
            Détails de l'assureur
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsuranceDetails;
