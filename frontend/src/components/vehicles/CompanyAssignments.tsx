
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompanyAssignmentsProps {
  companyInfo: {
    id: string;
    name: string;
    logo?: string;
    industry: string;
  };
  assignments: {
    id: string;
    employeeName: string;
    employeeId: string;
    employeePosition: string;
    startDate: string;
    endDate?: string;
    status: 'active' | 'expired';
  }[];
}

const CompanyAssignments: React.FC<CompanyAssignmentsProps> = ({ companyInfo, assignments }) => {
  const activeAssignment = assignments.find(a => a.status === 'active');
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-gabon-blue" />
            <CardTitle className="text-lg font-bold">Affectation Entreprise</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
            {companyInfo.logo ? (
              <img src={companyInfo.logo} alt={companyInfo.name} className="h-10 w-10 object-contain" />
            ) : (
              <Building className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{companyInfo.name}</h3>
            <p className="text-xs text-gray-500">{companyInfo.industry}</p>
          </div>
        </div>
        
        {activeAssignment ? (
          <div className="p-3 bg-slate-50 rounded-md">
            <p className="text-sm text-gray-500 mb-2">Conducteur actuel</p>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{activeAssignment.employeeName}</h4>
                  <Badge>Actuel</Badge>
                </div>
                <p className="text-xs text-gray-500">{activeAssignment.employeePosition}</p>
                <p className="text-xs flex items-center mt-1 text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  Depuis: {activeAssignment.startDate}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Aucune affectation active</p>
        )}
        
        {assignments.length > 1 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Historique d'affectations</p>
            <div className="space-y-2">
              {assignments
                .filter(a => a !== activeAssignment)
                .map((assignment) => (
                  <div key={assignment.id} className="p-2 border rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">{assignment.employeeName}</span>
                      <Badge variant="outline" className="text-xs">
                        {assignment.status === 'active' ? 'Actif' : 'Terminé'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{assignment.employeePosition}</p>
                    <p className="text-xs flex items-center mt-1 text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {assignment.startDate} - {assignment.endDate || 'présent'}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        <Button variant="outline" className="w-full" size="sm">
          <Building className="h-4 w-4 mr-1" />
          Voir détails de l'entreprise
        </Button>
      </CardContent>
    </Card>
  );
};

export default CompanyAssignments;
