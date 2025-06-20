
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Building, ArrowRight, Calendar } from 'lucide-react';

interface OwnershipHistoryProps {
  history: {
    id: string;
    startDate: string;
    endDate?: string;
    ownerType: 'individual' | 'company';
    ownerName: string;
    ownerDetails: string;
    isCurrent: boolean;
  }[];
}

const OwnershipHistory: React.FC<OwnershipHistoryProps> = ({ history }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Historique des propriétaires</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {history.map((record, index) => (
            <div 
              key={record.id} 
              className={`relative flex gap-4 pb-6 ${
                index !== history.length - 1 ? "border-l-2 border-dashed border-gray-200 pl-6" : "pl-6"
              }`}
            >
              {/* Circle marker */}
              <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-gabon-blue"></div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {record.ownerType === 'individual' ? (
                    <User className="h-4 w-4 text-gabon-blue" />
                  ) : (
                    <Building className="h-4 w-4 text-gabon-blue" />
                  )}
                  <span className="font-medium">
                    {record.ownerName}
                    {record.isCurrent && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        Actuel
                      </span>
                    )}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-1">
                  {record.ownerDetails}
                </div>
                
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>
                    {record.startDate}
                    {record.endDate && (
                      <>
                        <ArrowRight className="inline h-3 w-3 mx-1" />
                        {record.endDate}
                      </>
                    )}
                    {!record.endDate && " - présent"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnershipHistory;
