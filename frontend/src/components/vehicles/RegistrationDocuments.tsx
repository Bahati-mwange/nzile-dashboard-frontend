
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, FileText, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface RegistrationDocumentsProps {
  registration: {
    id: string;
    registrationNumber: string;
    issueDate: string;
    issuingAuthority: string;
    documents: {
      name: string;
      type: string;
      url: string;
    }[];
    status: 'active' | 'expired';
  };
}

const RegistrationDocuments: React.FC<RegistrationDocumentsProps> = ({ registration }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">Carte Grise</CardTitle>
          <Badge variant={registration.status === 'active' ? 'default' : 'destructive'}>
            {registration.status === 'active' ? 'Active' : 'Expirée'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Numéro d'immatriculation</p>
            <p className="font-medium">{registration.registrationNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date d'émission</p>
            <p className="font-medium">{registration.issueDate}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500">Autorité émettrice</p>
            <p className="font-medium">{registration.issuingAuthority}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-2">Documents</p>
          <div className="space-y-2">
            {registration.documents.map((doc, index) => (
              <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{doc.name}</span>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{doc.name}</DialogTitle>
                      </DialogHeader>
                      <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-500">Aperçu du document</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationDocuments;
